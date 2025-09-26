// CRM Demo Models and Interfaces

export interface Stage {
  id: string;
  name: string;
  sortOrder: number;
  requiresApproval: boolean;
  targetDays: number;
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
  lastActivity: Date;
  source: string;
  phone: string;
  email: string;
  qualificationContext: QualificationContext;
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
    volumeClass: 'small' | 'medium' | 'large';
    commodities: string[];
  };
  commercials: {
    paymentTerms: string;
    discount: number;
    creditDays: number;
  };
}

export interface DocumentStatus {
  status: 'missing' | 'uploaded' | 'verified' | 'expiring';
  validTill?: Date;
  uploadedDate?: Date;
}

export interface Activity {
  id: number;
  leadId: number;
  type: 'call' | 'email' | 'meeting' | 'note' | 'stage_change';
  description: string;
  createdDate: Date;
  createdBy: string;
}

export interface Enquiry {
  id: number;
  leadId: number;
  status: 'draft' | 'sent' | 'responded' | 'expired';
  expectedClose: Date;
  value: number;
  createdDate: Date;
}

export interface Quote {
  id: number;
  leadId: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  value: number;
  validTill: Date;
  createdDate: Date;
}

export interface HistoryEntry {
  id: number;
  leadId: number;
  action: string;
  fromStage?: string;
  toStage?: string;
  timestamp: Date;
  performedBy: string;
  remark?: string;
}

export interface GuardResult {
  allowed: boolean;
  missingItems: string[];
  message: string;
}

export interface SavedView {
  id: string;
  name: string;
  query: {
    stageIds?: string[];
    owners?: string[];
    priorities?: string[];
    temperatures?: string[];
    search?: string;
    filters?: any;
  };
}

export interface TableDensity {
  id: 'compact' | 'comfortable' | 'spacious';
  name: string;
  fontSize: string;
  rowHeight: string;
  cellPadding: string;
}

export interface ViewMode {
  id: 'board' | 'table';
  name: string;
}

export interface TablePreset {
  id: 'compact' | 'sales' | 'ops-approval';
  name: string;
  columns: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
