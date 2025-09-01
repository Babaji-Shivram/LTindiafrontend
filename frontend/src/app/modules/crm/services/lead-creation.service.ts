import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {
  CRMCompany,
  CustomerSector,
  CompanyType,
  BusinessCategory,
  ContactRole,
  LeadSource,
  Branch,
  SalesUser,
  Service,
  ServiceLocation,
  LeadCreationFormData,
  LeadCreationValidationRules,
  CompanySearchResult
} from '../interfaces/lead-creation.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadCreationService {
  private currentUserId = 1; // This should come from auth service
  private userBranches: number[] = [1, 2]; // User's accessible branches

  // Mock master data - In real app, these would come from API
  private mockCompanies: CRMCompany[] = [
    {
      companyId: 1,
      companyName: 'Acme International Trading',
      companyCode: 'ACM001',
      addressLine1: '123 Business District',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      website: 'www.acme-trading.com',
      isActive: true
    },
    {
      companyId: 2,
      companyName: 'Global Logistics Solutions',
      companyCode: 'GLS002',
      addressLine1: '456 Export Zone',
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      pincode: '600001',
      website: 'www.globallogistics.com',
      isActive: true
    },
    {
      companyId: 3,
      companyName: 'Maritime Freight Services',
      companyCode: 'MFS003',
      addressLine1: '789 Port Area',
      city: 'Cochin',
      state: 'Kerala',
      country: 'India',
      pincode: '682001',
      isActive: true
    }
  ];

  private mockSectors: CustomerSector[] = [
    { sectorId: 1, sectorName: 'Manufacturing', isActive: true },
    { sectorId: 2, sectorName: 'Import/Export', isActive: true },
    { sectorId: 3, sectorName: 'Technology', isActive: true },
    { sectorId: 4, sectorName: 'Pharmaceutical', isActive: true },
    { sectorId: 5, sectorName: 'Automotive', isActive: true },
    { sectorId: 6, sectorName: 'Textiles', isActive: true },
    { sectorId: 7, sectorName: 'Electronics', isActive: true },
    { sectorId: 8, sectorName: 'Agriculture', isActive: true }
  ];

  private mockCompanyTypes: CompanyType[] = [
    { companyTypeId: 1, companyTypeName: 'Importer', description: 'Companies importing goods', isActive: true },
    { companyTypeId: 2, companyTypeName: 'Exporter', description: 'Companies exporting goods', isActive: true },
    { companyTypeId: 3, companyTypeName: 'Freight Forwarder', description: 'Logistics service providers', isActive: true },
    { companyTypeId: 4, companyTypeName: 'Manufacturer', description: 'Manufacturing companies', isActive: true },
    { companyTypeId: 5, companyTypeName: 'Trader', description: 'Trading companies', isActive: true },
    { companyTypeId: 6, companyTypeName: 'Distributor', description: 'Distribution companies', isActive: true }
  ];

  private mockBusinessCategories: BusinessCategory[] = [
    { businessCategoryId: 1, businessCategoryName: 'Small Scale Enterprise', description: 'SSE', isActive: true },
    { businessCategoryId: 2, businessCategoryName: 'Medium Scale Enterprise', description: 'MSE', isActive: true },
    { businessCategoryId: 3, businessCategoryName: 'Large Scale Enterprise', description: 'LSE', isActive: true },
    { businessCategoryId: 4, businessCategoryName: 'Multi-National Corporation', description: 'MNC', isActive: true },
    { businessCategoryId: 5, businessCategoryName: 'Government Entity', description: 'GOV', isActive: true },
    { businessCategoryId: 6, businessCategoryName: 'Non-Profit Organization', description: 'NPO', isActive: true }
  ];

  private mockContactRoles: ContactRole[] = [
    { roleId: 1, roleName: 'Chief Executive Officer', description: 'CEO', isActive: true },
    { roleId: 2, roleName: 'Managing Director', description: 'MD', isActive: true },
    { roleId: 3, roleName: 'General Manager', description: 'GM', isActive: true },
    { roleId: 4, roleName: 'Import Manager', description: 'Import operations', isActive: true },
    { roleId: 5, roleName: 'Export Manager', description: 'Export operations', isActive: true },
    { roleId: 6, roleName: 'Logistics Manager', description: 'Logistics operations', isActive: true },
    { roleId: 7, roleName: 'Purchase Manager', description: 'Procurement', isActive: true },
    { roleId: 8, roleName: 'Operations Head', description: 'Operations', isActive: true },
    { roleId: 9, roleName: 'Business Development Manager', description: 'BD', isActive: true },
    { roleId: 10, roleName: 'Assistant Manager', description: 'Assistant', isActive: true }
  ];

  private mockLeadSources: LeadSource[] = [
    { 
      leadSourceId: 1, 
      leadSourceName: 'Website Inquiry', 
      requiresSourceValue: true,
      placeholder: 'e.g., Contact form, Service page inquiry',
      description: 'Lead from website inquiry',
      isActive: true 
    },
    { 
      leadSourceId: 2, 
      leadSourceName: 'Trade Show', 
      requiresSourceValue: true,
      placeholder: 'e.g., IIMEX Mumbai 2025, Logistics Expo Chennai',
      description: 'Lead from trade show',
      isActive: true 
    },
    { 
      leadSourceId: 3, 
      leadSourceName: 'Referral', 
      requiresSourceValue: true,
      placeholder: 'e.g., Referred by [Client Name], Partner referral',
      description: 'Lead from referral',
      isActive: true 
    },
    { 
      leadSourceId: 4, 
      leadSourceName: 'Cold Call', 
      requiresSourceValue: true,
      placeholder: 'e.g., Outbound sales call, Telemarketing campaign',
      description: 'Lead from cold call',
      isActive: true 
    },
    { 
      leadSourceId: 5, 
      leadSourceName: 'Email Campaign', 
      requiresSourceValue: true,
      placeholder: 'e.g., Newsletter signup, Marketing email response',
      description: 'Lead from email campaign',
      isActive: true 
    },
    { 
      leadSourceId: 6, 
      leadSourceName: 'Social Media', 
      requiresSourceValue: true,
      placeholder: 'e.g., LinkedIn message, Facebook inquiry',
      description: 'Lead from social media',
      isActive: true 
    },
    { 
      leadSourceId: 7, 
      leadSourceName: 'Partner Channel', 
      requiresSourceValue: true,
      placeholder: 'e.g., Channel partner [Name], Agent referral',
      description: 'Lead from partner channel',
      isActive: true 
    },
    { 
      leadSourceId: 8, 
      leadSourceName: 'Walk-in', 
      requiresSourceValue: false,
      placeholder: '',
      description: 'Walk-in customer',
      isActive: true 
    }
  ];

  private mockBranches: Branch[] = [
    { branchId: 1, branchName: 'Mumbai Head Office', branchCode: 'MUM001', city: 'Mumbai', state: 'Maharashtra', isActive: true },
    { branchId: 2, branchName: 'Chennai Branch', branchCode: 'CHE002', city: 'Chennai', state: 'Tamil Nadu', isActive: true },
    { branchId: 3, branchName: 'Delhi Branch', branchCode: 'DEL003', city: 'Delhi', state: 'Delhi', isActive: true },
    { branchId: 4, branchName: 'Bangalore Branch', branchCode: 'BLR004', city: 'Bangalore', state: 'Karnataka', isActive: true },
    { branchId: 5, branchName: 'Cochin Branch', branchCode: 'COC005', city: 'Cochin', state: 'Kerala', isActive: true }
  ];

  private mockSalesUsers: SalesUser[] = [
    { userId: 1, userName: 'rajesh.kumar', firstName: 'Rajesh', lastName: 'Kumar', designation: 'Senior Sales Manager', email: 'rajesh@company.com', branchId: 1, branchName: 'Mumbai Head Office', isActive: true },
    { userId: 2, userName: 'priya.sharma', firstName: 'Priya', lastName: 'Sharma', designation: 'Sales Executive', email: 'priya@company.com', branchId: 1, branchName: 'Mumbai Head Office', isActive: true },
    { userId: 3, userName: 'suresh.reddy', firstName: 'Suresh', lastName: 'Reddy', designation: 'Regional Sales Manager', email: 'suresh@company.com', branchId: 2, branchName: 'Chennai Branch', isActive: true },
    { userId: 4, userName: 'anita.gupta', firstName: 'Anita', lastName: 'Gupta', designation: 'Sales Representative', email: 'anita@company.com', branchId: 2, branchName: 'Chennai Branch', isActive: true },
    { userId: 5, userName: 'vikram.singh', firstName: 'Vikram', lastName: 'Singh', designation: 'Area Sales Manager', email: 'vikram@company.com', branchId: 3, branchName: 'Delhi Branch', isActive: true }
  ];

  private mockServices: Service[] = [
    { serviceId: 1, serviceName: 'Sea Import', serviceCode: 'SEA-IMP', serviceType: 'IMPORT', isActive: true },
    { serviceId: 2, serviceName: 'Sea Export', serviceCode: 'SEA-EXP', serviceType: 'EXPORT', isActive: true },
    { serviceId: 3, serviceName: 'Air Import', serviceCode: 'AIR-IMP', serviceType: 'IMPORT', isActive: true },
    { serviceId: 4, serviceName: 'Air Export', serviceCode: 'AIR-EXP', serviceType: 'EXPORT', isActive: true },
    { serviceId: 5, serviceName: 'Domestic Transportation', serviceCode: 'DOM-TRN', serviceType: 'DOMESTIC', isActive: true },
    { serviceId: 6, serviceName: 'Warehousing', serviceCode: 'WHR-SVC', serviceType: 'WAREHOUSE', isActive: true },
    { serviceId: 7, serviceName: 'Customs Clearance', serviceCode: 'CUS-CLR', serviceType: 'IMPORT', isActive: true }
  ];

  private mockServiceLocations: ServiceLocation[] = [
    // Sea Import/Export Locations
    { locationId: 1, locationName: 'JNPT - Mumbai', locationType: 'PORT', serviceId: 1, isActive: true },
    { locationId: 2, locationName: 'JNPT - Mumbai', locationType: 'PORT', serviceId: 2, isActive: true },
    { locationId: 3, locationName: 'Chennai Port', locationType: 'PORT', serviceId: 1, isActive: true },
    { locationId: 4, locationName: 'Chennai Port', locationType: 'PORT', serviceId: 2, isActive: true },
    { locationId: 5, locationName: 'Cochin Port', locationType: 'PORT', serviceId: 1, isActive: true },
    { locationId: 6, locationName: 'Cochin Port', locationType: 'PORT', serviceId: 2, isActive: true },
    
    // Air Import/Export Locations
    { locationId: 7, locationName: 'Mumbai Airport', locationType: 'AIRPORT', serviceId: 3, isActive: true },
    { locationId: 8, locationName: 'Mumbai Airport', locationType: 'AIRPORT', serviceId: 4, isActive: true },
    { locationId: 9, locationName: 'Delhi Airport', locationType: 'AIRPORT', serviceId: 3, isActive: true },
    { locationId: 10, locationName: 'Delhi Airport', locationType: 'AIRPORT', serviceId: 4, isActive: true },
    
    // Warehouse Locations
    { locationId: 11, locationName: 'Mumbai Warehouse', locationType: 'WAREHOUSE', serviceId: 6, isActive: true },
    { locationId: 12, locationName: 'Chennai Warehouse', locationType: 'WAREHOUSE', serviceId: 6, isActive: true },
    { locationId: 13, locationName: 'Delhi Warehouse', locationType: 'WAREHOUSE', serviceId: 6, isActive: true }
  ];

  // Validation rules
  private validationRules: LeadCreationValidationRules = {
    turnover: {
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      message: 'Please enter a valid turnover amount (e.g., 10000000 or 1.5)'
    },
    employeeCount: {
      min: 1,
      max: 999999,
      message: 'Employee count must be between 1 and 999999'
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    mobile: {
      pattern: /^[6-9]\d{9}$/,
      message: 'Please enter a valid 10-digit mobile number starting with 6-9'
    }
  };

  constructor() {}

  // Step 1: Company Information
  searchCompanies(searchTerm: string): Observable<CompanySearchResult[]> {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return of([]);
    }

    const filtered = this.mockCompanies
      .filter(company => 
        company.isActive && (
          company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.companyCode.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .map(company => ({
        companyId: company.companyId,
        companyName: company.companyName,
        companyCode: company.companyCode,
        city: company.city,
        state: company.state
      }));

    return of(filtered);
  }

  getCompanyById(companyId: number): Observable<CRMCompany | null> {
    const company = this.mockCompanies.find(c => c.companyId === companyId && c.isActive);
    return of(company || null);
  }

  // Step 2: Business Classification
  getCustomerSectors(): Observable<CustomerSector[]> {
    return of(this.mockSectors.filter(s => s.isActive));
  }

  getCompanyTypes(): Observable<CompanyType[]> {
    return of(this.mockCompanyTypes.filter(ct => ct.isActive));
  }

  getBusinessCategories(): Observable<BusinessCategory[]> {
    return of(this.mockBusinessCategories.filter(bc => bc.isActive));
  }

  // Step 3: Contact Information
  getContactRoles(): Observable<ContactRole[]> {
    return of(this.mockContactRoles.filter(cr => cr.isActive));
  }

  // Step 4: Lead Source
  getLeadSources(): Observable<LeadSource[]> {
    return of(this.mockLeadSources.filter(ls => ls.isActive));
  }

  getLeadSourceById(leadSourceId: number): Observable<LeadSource | null> {
    const source = this.mockLeadSources.find(ls => ls.leadSourceId === leadSourceId && ls.isActive);
    return of(source || null);
  }

  // Step 5: Sales Assignment
  getUserAccessibleBranches(userId: number): Observable<Branch[]> {
    // In real app, this would check user permissions
    const accessibleBranches = this.mockBranches.filter(branch => 
      branch.isActive && this.userBranches.includes(branch.branchId)
    );
    return of(accessibleBranches);
  }

  getSalesTeamByBranch(branchId: number): Observable<SalesUser[]> {
    const salesTeam = this.mockSalesUsers.filter(user => 
      user.isActive && user.branchId === branchId
    );
    return of(salesTeam);
  }

  // Step 6: Service Requirements
  getAvailableServices(): Observable<Service[]> {
    return of(this.mockServices.filter(s => s.isActive));
  }

  getServiceLocations(serviceId: number): Observable<ServiceLocation[]> {
    const locations = this.mockServiceLocations.filter(loc => 
      loc.isActive && loc.serviceId === serviceId
    );
    return of(locations);
  }

  // Validation Methods
  validateTurnover(turnover: string): boolean {
    return this.validationRules.turnover.pattern.test(turnover);
  }

  validateEmployeeCount(count: string): boolean {
    const num = parseInt(count, 10);
    return !isNaN(num) && 
           num >= this.validationRules.employeeCount.min && 
           num <= this.validationRules.employeeCount.max;
  }

  validateEmail(email: string): boolean {
    return this.validationRules.email.pattern.test(email);
  }

  validateMobile(mobile: string): boolean {
    return this.validationRules.mobile.pattern.test(mobile);
  }

  getValidationRules(): LeadCreationValidationRules {
    return this.validationRules;
  }

  // Create Lead
  createLead(formData: LeadCreationFormData): Observable<any> {
    // Simulate API call
    console.log('Creating lead with data:', formData);
    
    // Validate required fields
    const errors = this.validateLeadCreationForm(formData);
    if (errors.length > 0) {
      return throwError({ message: 'Validation failed', errors });
    }

    // Simulate successful creation
    const leadId = 'LEAD-' + Date.now();
    return of({
      success: true,
      leadId: leadId,
      message: 'Lead created successfully'
    });
  }

  private validateLeadCreationForm(formData: LeadCreationFormData): string[] {
    const errors: string[] = [];

    // Required field validation
    if (!formData.companyName?.trim()) errors.push('Company name is required');
    if (!formData.sectorId) errors.push('Sector is required');
    if (!formData.companyTypeId) errors.push('Company type is required');
    if (!formData.businessCategoryId) errors.push('Business category is required');
    if (!formData.turnover?.trim()) errors.push('Turnover is required');
    if (!formData.employeeCount?.trim()) errors.push('Employee count is required');
    if (!formData.contactName?.trim()) errors.push('Contact name is required');
    if (!formData.designation?.trim()) errors.push('Designation is required');
    if (!formData.contactRoleId) errors.push('Contact role is required');
    if (!formData.email?.trim()) errors.push('Email is required');
    if (!formData.mobileNumber?.trim()) errors.push('Mobile number is required');
    if (!formData.leadSourceId) errors.push('Lead source is required');
    if (!formData.leadSourceValue?.trim()) errors.push('Lead source value is required');
    if (!formData.branchId) errors.push('Branch is required');
    if (!formData.salesPersonId) errors.push('Sales person is required');
    if (!formData.serviceRequirements?.length) errors.push('At least one service requirement is needed');

    // Format validation
    if (formData.turnover && !this.validateTurnover(formData.turnover)) {
      errors.push(this.validationRules.turnover.message);
    }
    if (formData.employeeCount && !this.validateEmployeeCount(formData.employeeCount)) {
      errors.push(this.validationRules.employeeCount.message);
    }
    if (formData.email && !this.validateEmail(formData.email)) {
      errors.push(this.validationRules.email.message);
    }
    if (formData.mobileNumber && !this.validateMobile(formData.mobileNumber)) {
      errors.push(this.validationRules.mobile.message);
    }

    return errors;
  }
}
