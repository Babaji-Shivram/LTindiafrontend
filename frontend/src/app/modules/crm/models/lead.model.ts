export type LeadStage =
  | 'New' | 'Qualified' | 'Proposal' | 'Negotiation'
  | 'Approval Pending' | 'Won' | 'Lost' | 'On Hold' | 'Rejected';

export interface Lead {
  id: string;
  companyID: string;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  mobileNo: string;
  leadStageID: string;
  stage: LeadStage;
  leadSourceID: string;
  leadSourceValue: string;
  owner?: string;
  value?: number;
  priority?: 'high' | 'medium' | 'low';
  nextFollowUp?: string; // ISO date
  createdOn?: string;    // ISO date
  stageEntryDate?: string; // ISO date - when the lead entered current stage
  // Flags for future use
  isEnquiry?: boolean;
  isQuote?: boolean;
  isKYC?: boolean;
  isContract?: boolean;
  // Optional fields
  companyTypeID?: string;
  businessCategoryID?: string;
  roleId?: string;
}

export interface LeadStageMS {
  leadStageID: string;
  stageName: string;
  stageOrder: number;
  isActive: boolean;
}

export interface LeadSourceMS {
  leadSourceID: string;
  sourceName: string;
  isActive: boolean;
}

export interface CompanyMS {
  companyID: string;
  companyName: string;
  companyCode: string;
  isActive: boolean;
}

export interface CompanyTypeMS {
  companyTypeID: string;
  typeName: string;
  isActive: boolean;
}

export interface BusinessCategoryMS {
  businessCategoryID: string;
  categoryName: string;
  isActive: boolean;
}

export interface RoleMS {
  roleId: string;
  roleName: string;
  isActive: boolean;
}

export interface LeadFormData {
  companyID: string;
  leadStageID: string;
  leadSourceID: string;
  leadSourceValue: string;
  email: string;
  mobileNo: string;
  contact: string;
  value?: number;
  nextFollowUp?: string;
  companyTypeID?: string;
  businessCategoryID?: string;
  roleId?: string;
}
