/**
 * CRM Company Master Interface
 * Purpose: Prospect and lead company information within CRM module
 */
export interface CRMCompanyMaster {
  lid: number;                // Primary Key (Company ID)
  sName: string;              // Company Name (Required, Max: 200)
  email: string;              // Primary Email (Max: 100)
  mobileNo: string;           // Mobile Number (Max: 15)
  contactNo: string;          // Landline Number (Max: 15)
  addressLine1: string;       // Address Line 1 (Required, Max: 100)
  addressLine2?: string;      // Address Line 2 (Max: 100)
  addressLine3?: string;      // Address Line 3 (Max: 100)
  website?: string;           // Website URL (Max: 100)
  description?: string;       // Company Description (Max: 500)
  contactPerson: string;      // Primary Contact Person (Max: 100)
  officeLocation?: string;    // Office Location (Max: 100)
  lUser: number;              // Created By User ID
  dEntry: Date;               // Entry Date
  bDel: boolean;              // Deletion Flag
}

/**
 * Customer Master Interface
 * Purpose: Converted customers from CRM leads for operational use
 */
export interface BSCustomerMaster {
  lid: number;               // Primary Key (Customer ID)
  custName: string;          // Customer Name
  email: string;             // Email Address
  address: string;           // Customer Address
  contactPerson: string;     // Contact Person Name
  mobileNo: string;          // Mobile Number
  contactNo: string;         // Landline Number
  website?: string;          // Website URL
  gstNo?: string;            // GST Number
  panNo?: string;            // PAN Number
  city: string;              // City
  state: string;             // State
  country: string;           // Country
  pincode: string;           // PIN Code
  creditLimit: number;       // Credit Limit
  creditDays: number;        // Credit Days
  bDel: boolean;             // Deletion Flag
  lUser: number;             // Created By User
  dEntry: Date;              // Entry Date
}

/**
 * Company Master Create/Update DTO
 */
export interface CRMCompanyCreateRequest {
  sName: string;
  email: string;
  mobileNo: string;
  contactNo?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  website?: string;
  description?: string;
  contactPerson: string;
  officeLocation?: string;
}

/**
 * Company Auto-complete Response
 */
export interface CompanyAutoComplete {
  lid: number;
  sName: string;
  email: string;
  contactPerson: string;
  addressLine1: string;
}

/**
 * Company Conversion Workflow
 */
export interface CompanyConversionRequest {
  crmCompanyId: number;
  gstNo?: string;
  panNo?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  creditLimit: number;
  creditDays: number;
}

/**
 * Company Master Filter Options
 */
export interface CompanyFilterOptions {
  searchTerm?: string;
  city?: string;
  state?: string;
  createdBy?: number;
  dateFrom?: Date;
  dateTo?: Date;
  isActive?: boolean;
}

/**
 * Company Master Response with Pagination
 */
export interface CompanyMasterResponse {
  companies: CRMCompanyMaster[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
