// Lead Creation Workflow Interfaces

export interface CRMCompany {
  companyId: number;
  companyName: string;
  companyCode: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  website?: string;
  isActive: boolean;
}

export interface CustomerSector {
  sectorId: number;
  sectorName: string;
  isActive: boolean;
}

export interface CompanyType {
  companyTypeId: number;
  companyTypeName: string;
  description?: string;
  isActive: boolean;
}

export interface BusinessCategory {
  businessCategoryId: number;
  businessCategoryName: string;
  description?: string;
  isActive: boolean;
}

export interface ContactRole {
  roleId: number;
  roleName: string;
  description?: string;
  isActive: boolean;
}

export interface LeadSource {
  leadSourceId: number;
  leadSourceName: string;
  requiresSourceValue: boolean;
  placeholder?: string;
  description?: string;
  isActive: boolean;
}

export interface Branch {
  branchId: number;
  branchName: string;
  branchCode: string;
  city: string;
  state: string;
  isActive: boolean;
}

export interface SalesUser {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  branchId: number;
  branchName: string;
  isActive: boolean;
}

export interface Service {
  serviceId: number;
  serviceName: string;
  serviceCode: string;
  serviceType: 'IMPORT' | 'EXPORT' | 'DOMESTIC' | 'WAREHOUSE' | 'TRANSPORT';
  isActive: boolean;
}

export interface ServiceLocation {
  locationId: number;
  locationName: string;
  locationType: 'PORT' | 'AIRPORT' | 'WAREHOUSE' | 'BRANCH';
  serviceId: number;
  isActive: boolean;
}

export interface ServiceRequirement {
  serviceId: number;
  serviceName: string;
  locationId?: number;
  locationName?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
}

export interface LeadCreationFormData {
  // Step 1: Company Information
  companyId?: number; // If existing company selected
  companyName: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  website?: string;

  // Step 2: Business Classification
  sectorId: number;
  companyTypeId: number;
  businessCategoryId: number;
  turnover: string;
  employeeCount: string;

  // Step 3: Contact Information
  contactName: string;
  designation: string;
  contactRoleId: number;
  email: string;
  mobileNumber: string;
  alternateNumber?: string;

  // Step 4: Lead Source
  leadSourceId: number;
  leadSourceValue: string;

  // Step 5: Sales Assignment
  branchId: number;
  salesPersonId: number;

  // Step 6: Service Requirements
  serviceRequirements: ServiceRequirement[];

  // Additional Fields
  estimatedValue?: number;
  expectedClosureDate?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
}

export interface LeadCreationValidationRules {
  turnover: {
    pattern: RegExp;
    message: string;
  };
  employeeCount: {
    min: number;
    max: number;
    message: string;
  };
  email: {
    pattern: RegExp;
    message: string;
  };
  mobile: {
    pattern: RegExp;
    message: string;
  };
}

export interface LeadCreationStep {
  stepNumber: number;
  stepName: string;
  isComplete: boolean;
  isValid: boolean;
  errors: string[];
}

export interface CompanySearchResult {
  companyId: number;
  companyName: string;
  companyCode: string;
  city?: string;
  state?: string;
  contactPerson?: string;
  email?: string;
  mobile?: string;
}
