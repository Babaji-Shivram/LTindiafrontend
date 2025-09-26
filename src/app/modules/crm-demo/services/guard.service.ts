import { Injectable } from '@angular/core';
import { Lead, QualificationContext, GuardResult } from './models';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private mockDataService: MockDataService) {}

  canAdvanceStage(lead: Lead, targetStageId: string): GuardResult {
    const context = this.mockDataService.getQualificationContext(lead.lid);
    const blockers: string[] = [];
    let requiresApproval = false;
    let approvalLevel = 0;

    // Stage-specific validations
    switch (targetStageId) {
      case 'qualified':
        return this.validateProspectToQualified(context, blockers);
      
      case 'proposal':
        return this.validateQualifiedToProposal(context, blockers);
      
      case 'negotiation':
        return this.validateProposalToNegotiation(context, blockers);
      
      case 'approval_pending':
      case 'ready_quote':
        return this.validateNegotiationToNext(lead, context, targetStageId, blockers);
      
      case 'won':
        return this.validateToWon(context, blockers);
      
      case 'lost':
        return this.validateToLost(lead, blockers);
      
      default:
        return { allowed: true, blockers: [] };
    }
  }

  private validateProspectToQualified(context: QualificationContext | undefined, blockers: string[]): GuardResult {
    if (!context) {
      blockers.push('Qualification context not found');
      return { allowed: false, blockers };
    }

    // Check required documents
    if (context.docs.IEC.status !== 'verified') {
      blockers.push('IEC Certificate must be verified');
    }
    
    if (context.docs.GSTIN.status !== 'verified') {
      blockers.push('GSTIN must be verified');
    }
    
    if (context.docs.PAN.status !== 'verified') {
      blockers.push('PAN must be verified');
    }

    // Check KYC completion
    if (!context.kyc) {
      blockers.push('KYC must be completed');
    }

    // Check basic operations profile
    if (context.opsProfile.lanes.length === 0) {
      blockers.push('At least one shipping lane must be specified');
    }

    if (context.opsProfile.ports.length === 0) {
      blockers.push('At least one port must be specified');
    }

    return { allowed: blockers.length === 0, blockers };
  }

  private validateQualifiedToProposal(context: QualificationContext | undefined, blockers: string[]): GuardResult {
    if (!context) {
      blockers.push('Qualification context not found');
      return { allowed: false, blockers };
    }

    // Check decision maker identified
    if (!context.decisionMaker.identified) {
      blockers.push('Decision maker must be identified');
    }

    if (!context.decisionMaker.name) {
      blockers.push('Decision maker name is required');
    }

    if (!context.decisionMaker.contact) {
      blockers.push('Decision maker contact is required');
    }

    // Check basic commercials
    if (!context.commercials.paymentTerms) {
      blockers.push('Payment terms must be specified');
    }

    return { allowed: blockers.length === 0, blockers };
  }

  private validateProposalToNegotiation(context: QualificationContext | undefined, blockers: string[]): GuardResult {
    if (!context) {
      blockers.push('Qualification context not found');
      return { allowed: false, blockers };
    }

    // Check operations profile is complete
    if (context.opsProfile.commodities.length === 0) {
      blockers.push('At least one commodity type must be specified');
    }

    if (context.opsProfile.services.length === 0) {
      blockers.push('At least one service type must be specified');
    }

    if (context.commercials.volume === 0) {
      blockers.push('Expected volume must be specified');
    }

    return { allowed: blockers.length === 0, blockers };
  }

  private validateNegotiationToNext(
    lead: Lead, 
    context: QualificationContext | undefined, 
    targetStageId: string,
    blockers: string[]
  ): GuardResult {
    if (!context) {
      blockers.push('Qualification context not found');
      return { allowed: false, blockers };
    }

    // Check if approval is required
    const requiresApproval = this.checkApprovalRequirements(lead, context);
    
    if (requiresApproval.required) {
      // If approval is required, must go to approval_pending stage
      if (targetStageId !== 'approval_pending') {
        blockers.push('Approval required - must advance to Approval Pending stage');
        return { allowed: false, blockers };
      }
      
      return { 
        allowed: true, 
        blockers: [],
        requiresApproval: true,
        approvalLevel: requiresApproval.level
      };
    } else {
      // If no approval required, can go directly to ready_quote
      if (targetStageId === 'approval_pending') {
        blockers.push('No approval required - advance directly to Ready for Quote');
        return { allowed: false, blockers };
      }
      
      return { allowed: true, blockers: [] };
    }
  }

  private validateToWon(context: QualificationContext | undefined, blockers: string[]): GuardResult {
    // Won stage can be reached from ready_quote or approval_pending
    // No additional validations for demo
    return { allowed: true, blockers: [] };
  }

  private validateToLost(lead: Lead, blockers: string[]): GuardResult {
    // For demo purposes, lost requires a reason
    // In real implementation, this would check if reason is provided
    return { allowed: true, blockers: [] };
  }

  private checkApprovalRequirements(lead: Lead, context: QualificationContext): { required: boolean; level: number; reasons: string[] } {
    const reasons: string[] = [];
    let level = 0;

    // Check value threshold (₹25L = 2,500,000)
    if (lead.value > 2500000) {
      reasons.push(`Deal value ₹${(lead.value / 100000).toFixed(1)}L exceeds ₹25L threshold`);
      level = Math.max(level, 2);
    }

    // Check discount threshold (15%)
    if (context.commercials.discount > 15) {
      reasons.push(`Discount ${context.commercials.discount}% exceeds 15% threshold`);
      level = Math.max(level, 1);
    }

    // Check credit terms threshold (45 days)
    if (context.commercials.creditDays > 45) {
      reasons.push(`Credit terms ${context.commercials.creditDays} days exceeds 45 days threshold`);
      level = Math.max(level, 1);
    }

    return {
      required: reasons.length > 0,
      level,
      reasons
    };
  }

  getApprovalRequirements(lead: Lead): { required: boolean; level: number; reasons: string[] } {
    const context = this.mockDataService.getQualificationContext(lead.lid);
    if (!context) {
      return { required: false, level: 0, reasons: [] };
    }
    
    return this.checkApprovalRequirements(lead, context);
  }

  // Check if lead is stuck (days in stage > target days)
  isLeadStuck(lead: Lead): boolean {
    const stages = this.mockDataService.getStages();
    const stage = stages.find(s => s.id === lead.stageId);
    return stage ? lead.daysInStage > stage.targetDays : false;
  }

  // Get leads that are stuck
  getStuckLeads(): Lead[] {
    const leads = this.mockDataService.getLeads();
    return leads.filter(lead => this.isLeadStuck(lead));
  }

  // Get leads requiring approval
  getLeadsRequiringApproval(): Lead[] {
    const leads = this.mockDataService.getLeads();
    return leads.filter(lead => {
      const approval = this.getApprovalRequirements(lead);
      return approval.required && lead.stageId === 'approval_pending';
    });
  }

  // Validate document expiry
  checkDocumentExpiry(context: QualificationContext): { expiring: string[]; expired: string[] } {
    const expiring: string[] = [];
    const expired: string[] = [];
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

    Object.entries(context.docs).forEach(([docType, doc]) => {
      if (doc.validTill) {
        if (doc.validTill < now) {
          expired.push(docType);
        } else if (doc.validTill < thirtyDaysFromNow) {
          expiring.push(docType);
        }
      }
    });

    return { expiring, expired };
  }
}
