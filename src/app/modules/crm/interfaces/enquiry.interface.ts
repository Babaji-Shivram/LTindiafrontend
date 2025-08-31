/**
 * CRM Enquiry Management Interfaces
 * Purpose: Handle enquiry workflow from leads
 */

export interface CrmEnquiry {
  enquiryID: string;
  leadID: string;
  enquiryNumber: string;
  enquiryDate: Date;
  serviceTypeID: string;
  serviceTypeName: string;
  requirements: string;
  expectedValue: number;
  expectedDate: Date;
  priorityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'QUOTED' | 'CLOSED' | 'CANCELLED';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_REQUIRED';
  assignedTo: string;
  createdBy: string;
  createdOn: Date;
  lastUpdated: Date;
  
  // Related data
  lead?: any;
  serviceDetails?: EnquiryServiceDetail[];
  quotes?: any[];
  followUps?: any[];
}

export interface EnquiryServiceDetail {
  serviceDetailID: string;
  enquiryID: string;
  serviceID: string;
  serviceName: string;
  locationID?: string;
  locationName?: string;
  quantity: number;
  unitType: string;
  estimatedCost: number;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  timeline: string;
}

export interface CreateEnquiryRequest {
  leadID: string;
  serviceTypeID: string;
  requirements: string;
  expectedValue: number;
  expectedDate: string;
  priorityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  serviceDetails: Omit<EnquiryServiceDetail, 'serviceDetailID' | 'enquiryID'>[];
  assignedTo?: string;
}

export interface EnquiryFilterOptions {
  status?: string[];
  priorityLevel?: string[];
  serviceType?: string[];
  assignedTo?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}

export interface EnquiryListResponse {
  enquiries: CrmEnquiry[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EnquiryStatusUpdate {
  enquiryID: string;
  newStatus: string;
  remarks?: string;
  updatedBy: string;
}
