import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { MockCrmService } from '../../services/mock-crm.service';
import { Lead, LeadStage, LeadStageMS } from '../../models/lead.model';

@Component({
  selector: 'app-lead-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lead-board.component.html',
  styleUrls: ['./lead-board.component.css']
})
export class LeadBoardComponent implements OnInit {
  leads$!: Observable<Lead[]>;
  leadStages$!: Observable<LeadStageMS[]>;
  draggedLead: Lead | null = null;
  
  stages: LeadStage[] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Approval Pending'];

  constructor(private crm: MockCrmService) {}

  ngOnInit() {
    this.leads$ = this.crm.leads$;
    this.leadStages$ = this.crm.getLeadStages();
  }

  getLeadsByStage(leads: Lead[], stage: LeadStage): Lead[] {
    return leads.filter(lead => lead.stage === stage);
  }

  getStageCount(stage: LeadStage): Observable<number> {
    const stageMS = this.getStageId(stage);
    return this.leads$.pipe(
      map(leads => leads.filter(lead => lead.stage === stage).length)
    );
  }

  getOverdueCount(stage: LeadStage): Observable<number> {
    return this.leads$.pipe(
      map(leads => {
        const now = new Date();
        return leads.filter(lead => {
          if (lead.stage !== stage || !lead.createdOn) return false;
          const createdDate = new Date(lead.createdOn);
          const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff > 7; // More than 7 days in stage
        }).length;
      })
    );
  }

  getTotalValue(leads: Lead[]): number {
    return leads.reduce((total, lead) => total + (lead.value || 0), 0);
  }

  getAverageValue(leads: Lead[]): number {
    if (leads.length === 0) return 0;
    return this.getTotalValue(leads) / leads.length;
  }

  getDaysInStage(lead: Lead): number {
    if (!lead.createdOn) return 0;
    const now = new Date();
    const createdDate = new Date(lead.createdOn);
    return Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  private getStageId(stage: LeadStage): string {
    const stageMap: Record<LeadStage, string> = {
      'New': 'LS-1',
      'Qualified': 'LS-2',
      'Proposal': 'LS-3',
      'Negotiation': 'LS-4',
      'Approval Pending': 'LS-5',
      'Won': 'LS-6',
      'Lost': 'LS-7',
      'On Hold': 'LS-8',
      'Rejected': 'LS-9'
    };
    return stageMap[stage] || 'LS-1';
  }

  getStageClass(stage: string): string {
    const stageClassMap: Record<string, string> = {
      'New': 'stage-new',
      'Qualified': 'stage-qualified',
      'Proposal': 'stage-proposal',
      'Negotiation': 'stage-negotiation',
      'Approval Pending': 'stage-approval',
      'Won': 'stage-won',
      'Lost': 'stage-lost',
      'On Hold': 'stage-hold',
      'Rejected': 'stage-rejected'
    };
    return stageClassMap[stage] || '';
  }

  // Drag and Drop handlers
  onDragStart(event: DragEvent, lead: Lead) {
    this.draggedLead = lead;
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/html', lead.id);
    
    // Add visual feedback
    const target = event.target as HTMLElement;
    target.style.opacity = '0.5';
  }

  onDragEnd(event: DragEvent) {
    // Reset visual feedback
    const target = event.target as HTMLElement;
    target.style.opacity = '1';
    this.draggedLead = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent, targetStage: LeadStage) {
    event.preventDefault();
    
    if (this.draggedLead && this.draggedLead.stage !== targetStage) {
      // Update the lead's stage
      this.crm.updateLeadStage(this.draggedLead.id, targetStage).subscribe({
        next: (updatedLead) => {
          console.log(`Lead ${updatedLead.id} moved to ${targetStage}`);
        },
        error: (error) => {
          console.error('Error updating lead stage:', error);
        }
      });
    }
    
    this.draggedLead = null;
  }
}
