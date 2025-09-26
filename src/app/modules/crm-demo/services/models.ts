// CRM Demo Models and Interfaces

export interface Stage {
  id: string;
  name: string;
  sortOrder: number;
  requiresApproval: boolean;
  targetDays: number;
  color: string;
}

export interface Lead {
  lid: number;
  company: string;
  contactName: string;
  stageId: string;
  value: number;
  probability: number;
  temperature: 'cold' | 'warm' | 'hot';
  priority: 'low' | 'medium' | 'high';
  expectedClose: Date;
  owner: string;
  daysInStage: number;
  createdDate: Date;
  lastActivityDate: Date;
  source: string;
  phone: string;
  email: string;
  notes: string;
}

export interface QualificationContext {
  docs: {
    IEC: DocumentStatus;
    GSTIN: DocumentStatus;
    PAN: DocumentStatus;
    CIN?: DocumentStatus;
  };
  kyc: boolean;
  opsProfile: {
    lanes: string[];
    ports: string[];
    volumeClass: 'small' | 'medium' | 'large' | 'enterprise';
    commodities: string[];
    services: string[];
  };
  commercials: {
    paymentTerms: string;
    creditDays: number;
    discount: number;
    volume: number;
  };
  decisionMaker: {
    identified: boolean;
    name: string;
    designation: string;
    contact: string;
  };
}

export interface DocumentStatus {
  status: 'missing' | 'uploaded' | 'verified' | 'expiring';
  uploadDate?: Date;
  validTill?: Date;
  fileName?: string;
}

export interface Activity {
  id: number;
  leadId: number;
  type: 'call' | 'email' | 'meeting' | 'quote' | 'stage_change' | 'note';
  title: string;
  description: string;
  date: Date;
  owner: string;
  outcome?: string;
}

export interface Enquiry {
  id: number;
  leadId: number;
  subject: string;
  status: 'open' | 'quoted' | 'won' | 'lost';
  expectedClose: Date;
  value: number;
  requirements: string;
  createdDate: Date;
}

export interface Quote {
  id: number;
  leadId: number;
  enquiryId: number;
  quoteNumber: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  value: number;
  validTill: Date;
  sentDate?: Date;
  terms: string;
}

export interface HistoryEntry {
  id: number;
  leadId: number;
  action: string;
  fromStage?: string;
  toStage?: string;
  date: Date;
  user: string;
  remarks: string;
  system: boolean;
}

export interface GuardResult {
  allowed: boolean;
  blockers: string[];
  requiresApproval?: boolean;
  approvalLevel?: number;
}

export interface SavedView {
  id: string;
  name: string;
  query: any;
  createdBy: string;
  createdDate: Date;
  isPublic: boolean;
}

export interface TableDensity {
  id: 'compact' | 'comfortable' | 'spacious';
  name: string;
  fontSize: string;
  rowHeight: string;
  padding: string;
}

export interface TablePreset {
  id: 'compact' | 'sales' | 'ops-approval';
  name: string;
  columns: string[];
  description: string;
}

export interface ApprovalRequest {
  id: number;
  leadId: number;
  type: 'discount' | 'credit_terms' | 'value_threshold';
  currentValue: any;
  requestedValue: any;
  reason: string;
  level: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  requestedDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
  comments?: string;
}
