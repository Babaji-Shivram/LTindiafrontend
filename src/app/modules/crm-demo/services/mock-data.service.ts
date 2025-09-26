import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  Lead, Stage, QualificationContext, Activity, Enquiry, Quote, 
  HistoryEntry, SavedView, ApprovalRequest 
} from './models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private leadsSubject = new BehaviorSubject<Lead[]>([]);
  private qualificationSubject = new BehaviorSubject<Map<number, QualificationContext>>(new Map());
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  private enquiriesSubject = new BehaviorSubject<Enquiry[]>([]);
  private quotesSubject = new BehaviorSubject<Quote[]>([]);
  private historySubject = new BehaviorSubject<HistoryEntry[]>([]);
  private approvalsSubject = new BehaviorSubject<ApprovalRequest[]>([]);

  leads$ = this.leadsSubject.asObservable();
  qualificationContexts$ = this.qualificationSubject.asObservable();
  activities$ = this.activitiesSubject.asObservable();
  enquiries$ = this.enquiriesSubject.asObservable();
  quotes$ = this.quotesSubject.asObservable();
  history$ = this.historySubject.asObservable();
  approvals$ = this.approvalsSubject.asObservable();

  private stages: Stage[] = [
    { id: 'prospect', name: 'Prospect', sortOrder: 1, requiresApproval: false, targetDays: 7, color: '#6b7280' },
    { id: 'qualified', name: 'Qualified', sortOrder: 2, requiresApproval: false, targetDays: 14, color: '#3b82f6' },
    { id: 'proposal', name: 'Proposal', sortOrder: 3, requiresApproval: false, targetDays: 21, color: '#8b5cf6' },
    { id: 'negotiation', name: 'Negotiation', sortOrder: 4, requiresApproval: false, targetDays: 30, color: '#f59e0b' },
    { id: 'approval_pending', name: 'Approval Pending', sortOrder: 5, requiresApproval: true, targetDays: 7, color: '#ef4444' },
    { id: 'ready_quote', name: 'Ready for Quote', sortOrder: 6, requiresApproval: false, targetDays: 14, color: '#10b981' },
    { id: 'won', name: 'Won', sortOrder: 7, requiresApproval: false, targetDays: 0, color: '#059669' },
    { id: 'lost', name: 'Lost', sortOrder: 8, requiresApproval: false, targetDays: 0, color: '#dc2626' }
  ];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockLeads: Lead[] = [
      {
        lid: 1,
        company: 'Acme Shipping Ltd',
        contactName: 'John Smith',
        stageId: 'prospect',
        value: 450000,
        probability: 25,
        temperature: 'warm',
        priority: 'high',
        expectedClose: new Date('2025-12-15'),
        owner: 'Rahul Sharma',
        daysInStage: 5,
        createdDate: new Date('2025-08-20'),
        lastActivityDate: new Date('2025-09-01'),
        source: 'Website',
        phone: '+91-9876543210',
        email: 'john.smith@acme.com',
        notes: 'Interested in container shipping services'
      },
      {
        lid: 2,
        company: 'Global Logistics Inc',
        contactName: 'Sarah Johnson',
        stageId: 'qualified',
        value: 780000,
        probability: 60,
        temperature: 'hot',
        priority: 'high',
        expectedClose: new Date('2025-11-30'),
        owner: 'Priya Patel',
        daysInStage: 12,
        createdDate: new Date('2025-08-10'),
        lastActivityDate: new Date('2025-08-30'),
        source: 'Referral',
        phone: '+91-9876543211',
        email: 'sarah.j@globallogistics.com',
        notes: 'Looking for FCL services to US ports'
      },
      {
        lid: 3,
        company: 'Maritime Solutions Pvt Ltd',
        contactName: 'Mike Chen',
        stageId: 'proposal',
        value: 920000,
        probability: 75,
        temperature: 'hot',
        priority: 'medium',
        expectedClose: new Date('2025-10-20'),
        owner: 'Amit Kumar',
        daysInStage: 18,
        createdDate: new Date('2025-07-25'),
        lastActivityDate: new Date('2025-08-28'),
        source: 'Cold Call',
        phone: '+91-9876543212',
        email: 'mike.chen@maritime.com',
        notes: 'Regular LCL shipments required'
      },
      {
        lid: 4,
        company: 'Ocean Freight Co',
        contactName: 'Lisa Wong',
        stageId: 'negotiation',
        value: 1250000,
        probability: 80,
        temperature: 'hot',
        priority: 'high',
        expectedClose: new Date('2025-10-10'),
        owner: 'Rahul Sharma',
        daysInStage: 25,
        createdDate: new Date('2025-07-15'),
        lastActivityDate: new Date('2025-08-25'),
        source: 'Trade Show',
        phone: '+91-9876543213',
        email: 'lisa.wong@oceanfreight.com',
        notes: 'Bulk cargo specialist, high volume'
      },
      {
        lid: 5,
        company: 'Port Authority Ltd',
        contactName: 'David Brown',
        stageId: 'approval_pending',
        value: 2800000,
        probability: 85,
        temperature: 'hot',
        priority: 'high',
        expectedClose: new Date('2025-09-30'),
        owner: 'Priya Patel',
        daysInStage: 8,
        createdDate: new Date('2025-06-20'),
        lastActivityDate: new Date('2025-08-20'),
        source: 'Partnership',
        phone: '+91-9876543214',
        email: 'david.brown@portauth.com',
        notes: 'Government contract, needs approval'
      },
      {
        lid: 6,
        company: 'Cargo Express India',
        contactName: 'Emma Davis',
        stageId: 'ready_quote',
        value: 670000,
        probability: 70,
        temperature: 'warm',
        priority: 'medium',
        expectedClose: new Date('2025-11-15'),
        owner: 'Amit Kumar',
        daysInStage: 6,
        createdDate: new Date('2025-07-30'),
        lastActivityDate: new Date('2025-08-15'),
        source: 'Existing Customer',
        phone: '+91-9876543215',
        email: 'emma.davis@cargoexpress.in',
        notes: 'Repeat customer, good payment history'
      },
      {
        lid: 7,
        company: 'Shipping Masters',
        contactName: 'Tom Wilson',
        stageId: 'won',
        value: 890000,
        probability: 100,
        temperature: 'hot',
        priority: 'high',
        expectedClose: new Date('2025-08-15'),
        owner: 'Rahul Sharma',
        daysInStage: 2,
        createdDate: new Date('2025-06-01'),
        lastActivityDate: new Date('2025-08-12'),
        source: 'Website',
        phone: '+91-9876543216',
        email: 'tom.wilson@shipmasters.com',
        notes: 'Contract signed, implementation started'
      },
      {
        lid: 8,
        company: 'Fleet Management Inc',
        contactName: 'Anna Taylor',
        stageId: 'lost',
        value: 560000,
        probability: 0,
        temperature: 'cold',
        priority: 'low',
        expectedClose: new Date('2025-08-30'),
        owner: 'Priya Patel',
        daysInStage: 5,
        createdDate: new Date('2025-07-01'),
        lastActivityDate: new Date('2025-08-25'),
        source: 'LinkedIn',
        phone: '+91-9876543217',
        email: 'anna.taylor@fleetmgmt.com',
        notes: 'Chose competitor due to pricing'
      },
      {
        lid: 9,
        company: 'Container Services Ltd',
        contactName: 'Chris Miller',
        stageId: 'prospect',
        value: 340000,
        probability: 30,
        temperature: 'cold',
        priority: 'low',
        expectedClose: new Date('2025-12-30'),
        owner: 'Amit Kumar',
        daysInStage: 15,
        createdDate: new Date('2025-08-15'),
        lastActivityDate: new Date('2025-08-20'),
        source: 'Cold Email',
        phone: '+91-9876543218',
        email: 'chris.miller@containerservices.com',
        notes: 'Initial interest shown'
      },
      {
        lid: 10,
        company: 'Dock Operations Pvt Ltd',
        contactName: 'Rachel Green',
        stageId: 'qualified',
        value: 480000,
        probability: 50,
        temperature: 'warm',
        priority: 'medium',
        expectedClose: new Date('2025-11-20'),
        owner: 'Rahul Sharma',
        daysInStage: 20,
        createdDate: new Date('2025-07-20'),
        lastActivityDate: new Date('2025-08-18'),
        source: 'Referral',
        phone: '+91-9876543219',
        email: 'rachel.green@dockops.com',
        notes: 'Port handling services required'
      }
    ];

    // Initialize qualification contexts
    const qualificationContexts = new Map<number, QualificationContext>();
    
    // Acme Shipping - missing docs
    qualificationContexts.set(1, {
      docs: {
        IEC: { status: 'missing' },
        GSTIN: { status: 'missing' },
        PAN: { status: 'missing' }
      },
      kyc: false,
      opsProfile: {
        lanes: [],
        ports: [],
        volumeClass: 'medium',
        commodities: [],
        services: []
      },
      commercials: {
        paymentTerms: '',
        creditDays: 0,
        discount: 0,
        volume: 0
      },
      decisionMaker: {
        identified: false,
        name: '',
        designation: '',
        contact: ''
      }
    });

    // Global Logistics - verified docs
    qualificationContexts.set(2, {
      docs: {
        IEC: { status: 'verified', uploadDate: new Date('2025-08-15'), validTill: new Date('2027-08-15') },
        GSTIN: { status: 'verified', uploadDate: new Date('2025-08-15'), validTill: new Date('2026-08-15') },
        PAN: { status: 'verified', uploadDate: new Date('2025-08-15') }
      },
      kyc: true,
      opsProfile: {
        lanes: ['India-USA', 'India-Europe'],
        ports: ['INNSA', 'INMUN', 'USNYC'],
        volumeClass: 'large',
        commodities: ['Electronics', 'Textiles'],
        services: ['FCL', 'LCL']
      },
      commercials: {
        paymentTerms: '30 days',
        creditDays: 30,
        discount: 5,
        volume: 1000
      },
      decisionMaker: {
        identified: true,
        name: 'Sarah Johnson',
        designation: 'VP Operations',
        contact: 'sarah.j@globallogistics.com'
      }
    });

    this.leadsSubject.next(mockLeads);
    this.qualificationSubject.next(qualificationContexts);
    this.initializeActivities();
    this.initializeEnquiries();
    this.initializeQuotes();
    this.initializeHistory();
  }

  private initializeActivities() {
    const activities: Activity[] = [
      {
        id: 1,
        leadId: 1,
        type: 'call',
        title: 'Initial Discovery Call',
        description: 'Discussed shipping requirements and volume expectations',
        date: new Date('2025-09-01'),
        owner: 'Rahul Sharma',
        outcome: 'Positive response, needs formal quote'
      },
      {
        id: 2,
        leadId: 2,
        type: 'meeting',
        title: 'Site Visit & Presentation',
        description: 'Presented our FCL services and port network',
        date: new Date('2025-08-30'),
        owner: 'Priya Patel',
        outcome: 'Very interested, requested detailed proposal'
      }
    ];
    this.activitiesSubject.next(activities);
  }

  private initializeEnquiries() {
    const enquiries: Enquiry[] = [
      {
        id: 1,
        leadId: 2,
        subject: 'FCL Shipments India to USA',
        status: 'quoted',
        expectedClose: new Date('2025-11-30'),
        value: 780000,
        requirements: '20 FCL containers monthly, India to US East Coast ports',
        createdDate: new Date('2025-08-25')
      }
    ];
    this.enquiriesSubject.next(enquiries);
  }

  private initializeQuotes() {
    const quotes: Quote[] = [
      {
        id: 1,
        leadId: 2,
        enquiryId: 1,
        quoteNumber: 'QT-2025-0001',
        status: 'sent',
        value: 780000,
        validTill: new Date('2025-10-15'),
        sentDate: new Date('2025-09-01'),
        terms: '30 days credit, FOB terms'
      }
    ];
    this.quotesSubject.next(quotes);
  }

  private initializeHistory() {
    const history: HistoryEntry[] = [
      {
        id: 1,
        leadId: 2,
        action: 'Stage Change',
        fromStage: 'prospect',
        toStage: 'qualified',
        date: new Date('2025-08-20'),
        user: 'Priya Patel',
        remarks: 'Documentation verified, KYC completed',
        system: false
      }
    ];
    this.historySubject.next(history);
  }

  // Public methods
  getStages(): Stage[] {
    return [...this.stages];
  }

  getLeads(): Lead[] {
    return this.leadsSubject.value;
  }

  getQualificationContext(leadId: number): QualificationContext | undefined {
    return this.qualificationSubject.value.get(leadId);
  }

  updateLead(lead: Lead): void {
    const leads = this.leadsSubject.value;
    const index = leads.findIndex(l => l.lid === lead.lid);
    if (index >= 0) {
      leads[index] = { ...lead };
      this.leadsSubject.next([...leads]);
    }
  }

  updateQualificationContext(leadId: number, context: QualificationContext): void {
    const contexts = this.qualificationSubject.value;
    contexts.set(leadId, { ...context });
    this.qualificationSubject.next(new Map(contexts));
  }

  addLead(lead: Omit<Lead, 'lid' | 'createdDate' | 'lastActivityDate' | 'daysInStage'>): Lead {
    const leads = this.leadsSubject.value;
    const newLead: Lead = {
      ...lead,
      lid: Math.max(...leads.map(l => l.lid)) + 1,
      createdDate: new Date(),
      lastActivityDate: new Date(),
      daysInStage: 0
    };
    
    leads.push(newLead);
    this.leadsSubject.next([...leads]);
    
    // Initialize qualification context
    const contexts = this.qualificationSubject.value;
    contexts.set(newLead.lid, {
      docs: {
        IEC: { status: 'missing' },
        GSTIN: { status: 'missing' },
        PAN: { status: 'missing' }
      },
      kyc: false,
      opsProfile: {
        lanes: [],
        ports: [],
        volumeClass: 'small',
        commodities: [],
        services: []
      },
      commercials: {
        paymentTerms: '',
        creditDays: 0,
        discount: 0,
        volume: 0
      },
      decisionMaker: {
        identified: false,
        name: '',
        designation: '',
        contact: ''
      }
    });
    this.qualificationSubject.next(new Map(contexts));
    
    return newLead;
  }

  addHistoryEntry(entry: Omit<HistoryEntry, 'id' | 'date' | 'user'>): void {
    const history = this.historySubject.value;
    const newEntry: HistoryEntry = {
      ...entry,
      id: Math.max(...history.map(h => h.id), 0) + 1,
      date: new Date(),
      user: 'Current User' // In real app, get from auth service
    };
    
    history.push(newEntry);
    this.historySubject.next([...history]);
  }

  getActivitiesForLead(leadId: number): Activity[] {
    return this.activitiesSubject.value.filter(a => a.leadId === leadId);
  }

  getEnquiriesForLead(leadId: number): Enquiry[] {
    return this.enquiriesSubject.value.filter(e => e.leadId === leadId);
  }

  getQuotesForLead(leadId: number): Quote[] {
    return this.quotesSubject.value.filter(q => q.leadId === leadId);
  }

  getHistoryForLead(leadId: number): HistoryEntry[] {
    return this.historySubject.value.filter(h => h.leadId === leadId);
  }

  // Saved Views (localStorage)
  getSavedViews(): SavedView[] {
    const saved = localStorage.getItem('crm-demo-saved-views');
    return saved ? JSON.parse(saved) : [];
  }

  saveSavedView(view: Omit<SavedView, 'id' | 'createdDate'>): void {
    const views = this.getSavedViews();
    const newView: SavedView = {
      ...view,
      id: Date.now().toString(),
      createdDate: new Date()
    };
    
    views.push(newView);
    localStorage.setItem('crm-demo-saved-views', JSON.stringify(views));
  }

  deleteSavedView(id: string): void {
    const views = this.getSavedViews().filter(v => v.id !== id);
    localStorage.setItem('crm-demo-saved-views', JSON.stringify(views));
  }
}
