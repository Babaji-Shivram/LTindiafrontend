import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Enhanced interfaces for the new CRM workflow components
export interface CrmEnquiry {
  enquiryID: string;
  leadID: string;
  leadCompany: string;
  leadContact: string;
  enquiryDate: Date;
  serviceTypeID: string;
  serviceTypeName: string;
  requirements: string;
  expectedValue: number;
  expectedDate: Date;
  status: 'OPEN' | 'QUOTED' | 'CLOSED' | 'CANCELLED';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_REQUIRED';
  assignedTo: string;
  createdBy: string;
  createdOn: Date;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface CrmQuote {
  quoteID: string;
  enquiryID: string;
  leadID: string;
  leadCompany: string;
  leadContact: string;
  quoteNumber: string;
  quoteDate: Date;
  validityDate: Date;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  approvalRequired: boolean;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_REQUIRED';
  serviceType: string;
  terms: string;
  notes: string;
  createdBy: string;
  createdOn: Date;
  sentDate?: Date;
  responseDate?: Date;
}

export interface CrmContract {
  contractID: string;
  quoteID: string;
  leadID: string;
  leadCompany: string;
  contractNumber: string;
  contractDate: Date;
  contractValue: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  startDate: Date;
  endDate: Date;
  terms: string;
  createdBy: string;
  createdOn: Date;
}

export interface ApprovalWorkflow {
  workflowID: string;
  entityType: 'LEAD' | 'ENQUIRY' | 'QUOTE' | 'CONTRACT';
  entityID: string;
  entityNumber: string;
  entityTitle: string;
  currentStage: string;
  currentApproverID: string;
  currentApproverName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestedBy: string;
  requestedOn: Date;
  completedOn?: Date;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  remarks: string;
  approvalStages: ApprovalStage[];
}

export interface ApprovalStage {
  stageID: string;
  stageName: string;
  stageOrder: number;
  approverID: string;
  approverName: string;
  approverRole: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SKIPPED';
  actionDate?: Date;
  remarks?: string;
  isCurrentStage: boolean;
}

export interface CrmVisit {
  visitID: string;
  leadID: string;
  leadCompany: string;
  leadContact: string;
  visitType: 'PLANNED' | 'FOLLOW_UP' | 'PRESENTATION' | 'NEGOTIATION' | 'CLOSURE';
  plannedDate: Date;
  plannedTime: string;
  actualDate?: Date;
  actualTime?: string;
  duration: number;
  purpose: string;
  location: string;
  address: string;
  assignedTo: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes: string;
  outcome?: string;
  nextAction?: string;
  createdBy: string;
  createdOn: Date;
  contactPerson: string;
  contactPhone: string;
}

export interface CrmFollowUp {
  followUpID: string;
  leadID: string;
  followUpDate: Date;
  followUpType: 'CALL' | 'EMAIL' | 'VISIT' | 'MEETING';
  description: string;
  nextAction: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  assignedTo: string;
  createdBy: string;
  createdOn: Date;
  completedOn?: Date;
  outcome?: string;
}

export interface CrmTarget {
  targetID: string;
  userID: string;
  userName: string;
  targetMonth: Date;
  targetType: 'LEADS' | 'ENQUIRIES' | 'QUOTES' | 'CONTRACTS' | 'REVENUE';
  targetValue: number;
  achievedValue: number;
  achievementPercentage: number;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  createdBy: string;
  createdOn: Date;
}

@Injectable({ providedIn: 'root' })
export class EnhancedCrmService {
  // Data subjects for reactive updates
  private enquiriesSubject = new BehaviorSubject<CrmEnquiry[]>([]);
  private quotesSubject = new BehaviorSubject<CrmQuote[]>([]);
  private contractsSubject = new BehaviorSubject<CrmContract[]>([]);
  private workflowsSubject = new BehaviorSubject<ApprovalWorkflow[]>([]);
  private visitsSubject = new BehaviorSubject<CrmVisit[]>([]);
  private followUpsSubject = new BehaviorSubject<CrmFollowUp[]>([]);
  private targetsSubject = new BehaviorSubject<CrmTarget[]>([]);

  // Public observables
  enquiries$ = this.enquiriesSubject.asObservable();
  quotes$ = this.quotesSubject.asObservable();
  contracts$ = this.contractsSubject.asObservable();
  workflows$ = this.workflowsSubject.asObservable();
  visits$ = this.visitsSubject.asObservable();
  followUps$ = this.followUpsSubject.asObservable();
  targets$ = this.targetsSubject.asObservable();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with mock data - replace with actual API calls
    this.loadMockEnquiries();
    this.loadMockQuotes();
    this.loadMockContracts();
    this.loadMockWorkflows();
    this.loadMockVisits();
    this.loadMockFollowUps();
    this.loadMockTargets();
  }

  // Enquiry Management
  getEnquiries(): Observable<CrmEnquiry[]> {
    return this.enquiries$;
  }

  getEnquiryById(id: string): Observable<CrmEnquiry | undefined> {
    return this.enquiries$.pipe(
      map(enquiries => enquiries.find(e => e.enquiryID === id))
    );
  }

  createEnquiry(enquiry: Partial<CrmEnquiry>): Observable<CrmEnquiry> {
    const newEnquiry: CrmEnquiry = {
      enquiryID: `ENQ-${Date.now().toString().slice(-6)}`,
      leadID: enquiry.leadID || '',
      leadCompany: enquiry.leadCompany || '',
      leadContact: enquiry.leadContact || '',
      enquiryDate: new Date(),
      serviceTypeID: enquiry.serviceTypeID || '',
      serviceTypeName: enquiry.serviceTypeName || '',
      requirements: enquiry.requirements || '',
      expectedValue: enquiry.expectedValue || 0,
      expectedDate: enquiry.expectedDate || new Date(),
      status: 'OPEN',
      approvalStatus: 'NOT_REQUIRED',
      assignedTo: enquiry.assignedTo || '',
      createdBy: 'Current User',
      createdOn: new Date(),
      priority: enquiry.priority || 'MEDIUM'
    };

    const currentEnquiries = this.enquiriesSubject.value;
    this.enquiriesSubject.next([...currentEnquiries, newEnquiry]);
    return of(newEnquiry);
  }

  updateEnquiry(enquiry: CrmEnquiry): Observable<CrmEnquiry> {
    const currentEnquiries = this.enquiriesSubject.value;
    const index = currentEnquiries.findIndex(e => e.enquiryID === enquiry.enquiryID);
    if (index !== -1) {
      currentEnquiries[index] = enquiry;
      this.enquiriesSubject.next([...currentEnquiries]);
    }
    return of(enquiry);
  }

  // Quote Management
  getQuotes(): Observable<CrmQuote[]> {
    return this.quotes$;
  }

  getQuoteById(id: string): Observable<CrmQuote | undefined> {
    return this.quotes$.pipe(
      map(quotes => quotes.find(q => q.quoteID === id))
    );
  }

  createQuote(quote: Partial<CrmQuote>): Observable<CrmQuote> {
    const newQuote: CrmQuote = {
      quoteID: `QUO-${Date.now().toString().slice(-6)}`,
      enquiryID: quote.enquiryID || '',
      leadID: quote.leadID || '',
      leadCompany: quote.leadCompany || '',
      leadContact: quote.leadContact || '',
      quoteNumber: `Q-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`,
      quoteDate: new Date(),
      validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      totalAmount: quote.totalAmount || 0,
      status: 'DRAFT',
      approvalRequired: quote.approvalRequired || false,
      approvalStatus: 'NOT_REQUIRED',
      serviceType: quote.serviceType || '',
      terms: quote.terms || '',
      notes: quote.notes || '',
      createdBy: 'Current User',
      createdOn: new Date()
    };

    const currentQuotes = this.quotesSubject.value;
    this.quotesSubject.next([...currentQuotes, newQuote]);
    return of(newQuote);
  }

  updateQuote(quote: CrmQuote): Observable<CrmQuote> {
    const currentQuotes = this.quotesSubject.value;
    const index = currentQuotes.findIndex(q => q.quoteID === quote.quoteID);
    if (index !== -1) {
      currentQuotes[index] = quote;
      this.quotesSubject.next([...currentQuotes]);
    }
    return of(quote);
  }

  // Contract Management
  getContracts(): Observable<CrmContract[]> {
    return this.contracts$;
  }

  createContract(contract: Partial<CrmContract>): Observable<CrmContract> {
    const newContract: CrmContract = {
      contractID: `CON-${Date.now().toString().slice(-6)}`,
      quoteID: contract.quoteID || '',
      leadID: contract.leadID || '',
      leadCompany: contract.leadCompany || '',
      contractNumber: `C-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`,
      contractDate: new Date(),
      contractValue: contract.contractValue || 0,
      status: 'DRAFT',
      startDate: contract.startDate || new Date(),
      endDate: contract.endDate || new Date(),
      terms: contract.terms || '',
      createdBy: 'Current User',
      createdOn: new Date()
    };

    const currentContracts = this.contractsSubject.value;
    this.contractsSubject.next([...currentContracts, newContract]);
    return of(newContract);
  }

  // Approval Workflow Management
  getWorkflows(): Observable<ApprovalWorkflow[]> {
    return this.workflows$;
  }

  submitForApproval(entityType: string, entityId: string, remarks: string): Observable<ApprovalWorkflow> {
    // Create new approval workflow
    const workflow: ApprovalWorkflow = {
      workflowID: `WF-${Date.now().toString().slice(-6)}`,
      entityType: entityType as any,
      entityID: entityId,
      entityNumber: `${entityType}-${entityId}`,
      entityTitle: `${entityType} approval request`,
      currentStage: 'Manager Approval',
      currentApproverID: 'USER-001',
      currentApproverName: 'Manager',
      status: 'PENDING',
      requestedBy: 'Current User',
      requestedOn: new Date(),
      priority: 'MEDIUM',
      remarks: remarks,
      approvalStages: [
        {
          stageID: 'ST-1',
          stageName: 'Manager Approval',
          stageOrder: 1,
          approverID: 'USER-001',
          approverName: 'Manager',
          approverRole: 'Manager',
          status: 'PENDING',
          isCurrentStage: true
        }
      ]
    };

    const currentWorkflows = this.workflowsSubject.value;
    this.workflowsSubject.next([...currentWorkflows, workflow]);
    return of(workflow);
  }

  approveReject(workflowId: string, action: 'APPROVED' | 'REJECTED', remarks: string): Observable<ApprovalWorkflow> {
    const currentWorkflows = this.workflowsSubject.value;
    const workflow = currentWorkflows.find(w => w.workflowID === workflowId);
    
    if (workflow) {
      workflow.status = action;
      workflow.completedOn = new Date();
      
      // Update current stage
      const currentStage = workflow.approvalStages.find(s => s.isCurrentStage);
      if (currentStage) {
        currentStage.status = action;
        currentStage.actionDate = new Date();
        currentStage.remarks = remarks;
        currentStage.isCurrentStage = false;
      }

      this.workflowsSubject.next([...currentWorkflows]);
    }

    return of(workflow!);
  }

  // Visit Planning Management
  getVisits(): Observable<CrmVisit[]> {
    return this.visits$;
  }

  createVisit(visit: Partial<CrmVisit>): Observable<CrmVisit> {
    const newVisit: CrmVisit = {
      visitID: `VST-${Date.now().toString().slice(-6)}`,
      leadID: visit.leadID || '',
      leadCompany: visit.leadCompany || '',
      leadContact: visit.leadContact || '',
      visitType: visit.visitType || 'PLANNED',
      plannedDate: visit.plannedDate || new Date(),
      plannedTime: visit.plannedTime || '10:00 AM',
      duration: visit.duration || 60,
      purpose: visit.purpose || '',
      location: visit.location || '',
      address: visit.address || '',
      assignedTo: visit.assignedTo || '',
      status: 'PLANNED',
      priority: visit.priority || 'MEDIUM',
      notes: visit.notes || '',
      createdBy: 'Current User',
      createdOn: new Date(),
      contactPerson: visit.contactPerson || '',
      contactPhone: visit.contactPhone || ''
    };

    const currentVisits = this.visitsSubject.value;
    this.visitsSubject.next([...currentVisits, newVisit]);
    return of(newVisit);
  }

  updateVisit(visit: CrmVisit): Observable<CrmVisit> {
    const currentVisits = this.visitsSubject.value;
    const index = currentVisits.findIndex(v => v.visitID === visit.visitID);
    if (index !== -1) {
      currentVisits[index] = visit;
      this.visitsSubject.next([...currentVisits]);
    }
    return of(visit);
  }

  // Follow-up Management
  getFollowUps(): Observable<CrmFollowUp[]> {
    return this.followUps$;
  }

  createFollowUp(followUp: Partial<CrmFollowUp>): Observable<CrmFollowUp> {
    const newFollowUp: CrmFollowUp = {
      followUpID: `FU-${Date.now().toString().slice(-6)}`,
      leadID: followUp.leadID || '',
      followUpDate: followUp.followUpDate || new Date(),
      followUpType: followUp.followUpType || 'CALL',
      description: followUp.description || '',
      nextAction: followUp.nextAction || '',
      status: 'PENDING',
      assignedTo: followUp.assignedTo || '',
      createdBy: 'Current User',
      createdOn: new Date()
    };

    const currentFollowUps = this.followUpsSubject.value;
    this.followUpsSubject.next([...currentFollowUps, newFollowUp]);
    return of(newFollowUp);
  }

  // Sales Target Management
  getTargets(): Observable<CrmTarget[]> {
    return this.targets$;
  }

  createTarget(target: Partial<CrmTarget>): Observable<CrmTarget> {
    const newTarget: CrmTarget = {
      targetID: `TGT-${Date.now().toString().slice(-6)}`,
      userID: target.userID || '',
      userName: target.userName || '',
      targetMonth: target.targetMonth || new Date(),
      targetType: target.targetType || 'LEADS',
      targetValue: target.targetValue || 0,
      achievedValue: 0,
      achievementPercentage: 0,
      status: 'ACTIVE',
      createdBy: 'Current User',
      createdOn: new Date()
    };

    const currentTargets = this.targetsSubject.value;
    this.targetsSubject.next([...currentTargets, newTarget]);
    return of(newTarget);
  }

  // Analytics and Reporting
  getCrmAnalytics(): Observable<any> {
    return of({
      totalEnquiries: this.enquiriesSubject.value.length,
      totalQuotes: this.quotesSubject.value.length,
      totalContracts: this.contractsSubject.value.length,
      pendingApprovals: this.workflowsSubject.value.filter(w => w.status === 'PENDING').length,
      upcomingVisits: this.visitsSubject.value.filter(v => v.status === 'PLANNED').length,
      conversionRate: this.calculateConversionRate(),
      revenueTargetAchievement: this.calculateTargetAchievement()
    });
  }

  private calculateConversionRate(): number {
    const enquiries = this.enquiriesSubject.value.length;
    const quotes = this.quotesSubject.value.length;
    return enquiries > 0 ? (quotes / enquiries) * 100 : 0;
  }

  private calculateTargetAchievement(): number {
    const targets = this.targetsSubject.value;
    const currentMonth = targets.filter(t => 
      t.targetMonth.getMonth() === new Date().getMonth() &&
      t.targetMonth.getFullYear() === new Date().getFullYear()
    );
    
    if (currentMonth.length === 0) return 0;
    
    const totalTarget = currentMonth.reduce((sum, t) => sum + t.targetValue, 0);
    const totalAchieved = currentMonth.reduce((sum, t) => sum + t.achievedValue, 0);
    
    return totalTarget > 0 ? (totalAchieved / totalTarget) * 100 : 0;
  }

  // Mock data loaders (replace with actual API calls)
  private loadMockEnquiries() {
    const mockEnquiries: CrmEnquiry[] = [
      {
        enquiryID: 'ENQ-001',
        leadID: 'L-1001',
        leadCompany: 'Acme Exports',
        leadContact: 'Priya N',
        enquiryDate: new Date('2024-01-15'),
        serviceTypeID: 'ST-001',
        serviceTypeName: 'Ocean Freight',
        requirements: 'Container shipment from Mumbai to Dubai',
        expectedValue: 250000,
        expectedDate: new Date('2024-02-15'),
        status: 'OPEN',
        approvalStatus: 'NOT_REQUIRED',
        assignedTo: 'Alex',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-15'),
        priority: 'HIGH'
      }
    ];
    this.enquiriesSubject.next(mockEnquiries);
  }

  private loadMockQuotes() {
    const mockQuotes: CrmQuote[] = [
      {
        quoteID: 'QUO-001',
        enquiryID: 'ENQ-001',
        leadID: 'L-1001',
        leadCompany: 'Acme Exports',
        leadContact: 'Priya N',
        quoteNumber: 'Q-2024-001',
        quoteDate: new Date('2024-01-20'),
        validityDate: new Date('2024-02-20'),
        totalAmount: 250000,
        status: 'SENT',
        approvalRequired: true,
        approvalStatus: 'APPROVED',
        serviceType: 'Ocean Freight',
        terms: 'Standard shipping terms apply',
        notes: 'Urgent delivery required',
        createdBy: 'Alex',
        createdOn: new Date('2024-01-20'),
        sentDate: new Date('2024-01-21')
      }
    ];
    this.quotesSubject.next(mockQuotes);
  }

  private loadMockContracts() {
    this.contractsSubject.next([]);
  }

  private loadMockWorkflows() {
    this.workflowsSubject.next([]);
  }

  private loadMockVisits() {
    this.visitsSubject.next([]);
  }

  private loadMockFollowUps() {
    this.followUpsSubject.next([]);
  }

  private loadMockTargets() {
    this.targetsSubject.next([]);
  }
}
