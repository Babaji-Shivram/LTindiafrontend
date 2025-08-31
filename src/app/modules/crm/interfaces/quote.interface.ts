/**
 * CRM Quote Management Interfaces
 * Purpose: Handle quote generation and management from enquiries
 */

export interface CrmQuote {
  quoteID: string;
  enquiryID: string;
  quoteNumber: string;
  quoteDate: Date;
  validityDate: Date;
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  finalAmount: number;
  currency: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'REVISED';
  approvalRequired: boolean;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_REQUIRED';
  sentToCustomer: boolean;
  sentDate?: Date;
  customerResponse?: string;
  responseDate?: Date;
  createdBy: string;
  createdOn: Date;
  lastUpdated: Date;
  
  // Related data
  enquiry?: any;
  quoteItems?: QuoteItem[];
  revisions?: QuoteRevision[];
  approvalHistory?: any[];
}

export interface QuoteItem {
  quoteItemID: string;
  quoteID: string;
  serviceID: string;
  serviceName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate: number;
  taxAmount: number;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number;
  itemOrder: number;
}

export interface QuoteRevision {
  revisionID: string;
  quoteID: string;
  revisionNumber: number;
  revisionDate: Date;
  revisionReason: string;
  previousAmount: number;
  newAmount: number;
  changedBy: string;
  changeRemarks: string;
}

export interface CreateQuoteRequest {
  enquiryID: string;
  validityDays: number;
  currency: string;
  quoteItems: Omit<QuoteItem, 'quoteItemID' | 'quoteID'>[];
  discountAmount?: number;
  remarks?: string;
  requiresApproval?: boolean;
}

export interface QuoteFilterOptions {
  status?: string[];
  approvalStatus?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  amountFrom?: number;
  amountTo?: number;
  customerName?: string;
  searchTerm?: string;
}

export interface QuoteListResponse {
  quotes: CrmQuote[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SendQuoteRequest {
  quoteID: string;
  recipientEmail: string;
  ccEmails?: string[];
  subject: string;
  message: string;
  attachmentType: 'PDF' | 'EXCEL' | 'BOTH';
}

export interface QuoteApprovalRequest {
  quoteID: string;
  action: 'APPROVE' | 'REJECT';
  remarks: string;
  approverID: string;
}
