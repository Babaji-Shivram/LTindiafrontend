import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { 
  CRMCompanyMaster, 
  BSCustomerMaster, 
  CRMCompanyCreateRequest,
  CompanyAutoComplete,
  CompanyConversionRequest,
  CompanyFilterOptions,
  CompanyMasterResponse
} from '../interfaces/company-master.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyMasterService {
  private companies$ = new BehaviorSubject<CRMCompanyMaster[]>([]);
  private customers$ = new BehaviorSubject<BSCustomerMaster[]>([]);

  constructor() {
    this.initializeMockData();
  }

  /**
   * Initialize mock data for development
   */
  private initializeMockData(): void {
    const mockCompanies: CRMCompanyMaster[] = [
      {
        lid: 1,
        sName: 'Tata Consultancy Services',
        email: 'contact@tcs.com',
        mobileNo: '+91-9876543210',
        contactNo: '+91-22-67781111',
        addressLine1: 'TCS House, Raveline Street',
        addressLine2: 'Fort',
        addressLine3: 'Mumbai - 400001',
        website: 'https://www.tcs.com',
        description: 'Leading IT services and consulting company',
        contactPerson: 'Rajesh Kumar',
        officeLocation: 'Mumbai',
        lUser: 1,
        dEntry: new Date('2024-01-15'),
        bDel: false
      },
      {
        lid: 2,
        sName: 'Infosys Limited',
        email: 'info@infosys.com',
        mobileNo: '+91-9876543211',
        contactNo: '+91-80-28520261',
        addressLine1: 'Electronics City',
        addressLine2: 'Hosur Road',
        addressLine3: 'Bangalore - 560100',
        website: 'https://www.infosys.com',
        description: 'Global leader in next-generation digital services',
        contactPerson: 'Priya Sharma',
        officeLocation: 'Bangalore',
        lUser: 1,
        dEntry: new Date('2024-02-10'),
        bDel: false
      },
      {
        lid: 3,
        sName: 'Wipro Technologies',
        email: 'contact@wipro.com',
        mobileNo: '+91-9876543212',
        contactNo: '+91-80-28440011',
        addressLine1: 'Doddakannelli',
        addressLine2: 'Sarjapur Road',
        addressLine3: 'Bangalore - 560035',
        website: 'https://www.wipro.com',
        description: 'Leading technology services and consulting company',
        contactPerson: 'Amit Patel',
        officeLocation: 'Bangalore',
        lUser: 1,
        dEntry: new Date('2024-03-05'),
        bDel: false
      },
      {
        lid: 4,
        sName: 'Reliance Industries',
        email: 'corporate@ril.com',
        mobileNo: '+91-9876543213',
        contactNo: '+91-22-30001000',
        addressLine1: '3rd Floor, Maker Chambers IV',
        addressLine2: '222, Nariman Point',
        addressLine3: 'Mumbai - 400021',
        website: 'https://www.ril.com',
        description: 'Fortune Global 500 company and largest private sector corporation in India',
        contactPerson: 'Sunita Verma',
        officeLocation: 'Mumbai',
        lUser: 1,
        dEntry: new Date('2024-04-12'),
        bDel: false
      },
      {
        lid: 5,
        sName: 'HDFC Bank',
        email: 'corporate@hdfcbank.com',
        mobileNo: '+91-9876543214',
        contactNo: '+91-22-26520018',
        addressLine1: 'HDFC Bank House',
        addressLine2: 'Senapati Bapat Marg',
        addressLine3: 'Lower Parel, Mumbai - 400013',
        website: 'https://www.hdfcbank.com',
        description: 'Leading private sector bank in India',
        contactPerson: 'Vikram Singh',
        officeLocation: 'Mumbai',
        lUser: 1,
        dEntry: new Date('2024-05-20'),
        bDel: false
      }
    ];

    const mockCustomers: BSCustomerMaster[] = [
      {
        lid: 1,
        custName: 'Tata Consultancy Services',
        email: 'billing@tcs.com',
        address: 'TCS House, Raveline Street, Fort, Mumbai - 400001',
        contactPerson: 'Rajesh Kumar',
        mobileNo: '+91-9876543210',
        contactNo: '+91-22-67781111',
        website: 'https://www.tcs.com',
        gstNo: '27AAACT2727Q1ZZ',
        panNo: 'AAACT2727Q',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400001',
        creditLimit: 5000000,
        creditDays: 30,
        bDel: false,
        lUser: 1,
        dEntry: new Date('2024-06-01')
      }
    ];

    this.companies$.next(mockCompanies);
    this.customers$.next(mockCustomers);
  }

  /**
   * Get all CRM companies with pagination and filtering
   */
  getCompanies(filter?: CompanyFilterOptions, page: number = 1, pageSize: number = 10): Observable<CompanyMasterResponse> {
    return this.companies$.pipe(
      map(companies => {
        let filteredCompanies = companies.filter(c => !c.bDel);

        // Apply filters
        if (filter) {
          if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            filteredCompanies = filteredCompanies.filter(c => 
              c.sName.toLowerCase().includes(term) ||
              c.email.toLowerCase().includes(term) ||
              c.contactPerson.toLowerCase().includes(term)
            );
          }
          if (filter.isActive !== undefined) {
            filteredCompanies = filteredCompanies.filter(c => !c.bDel === filter.isActive);
          }
        }

        // Pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);
        const totalCount = filteredCompanies.length;

        return {
          companies: paginatedCompanies,
          totalCount,
          pageSize,
          currentPage: page,
          hasNextPage: endIndex < totalCount,
          hasPreviousPage: page > 1
        };
      }),
      delay(500) // Simulate API delay
    );
  }

  /**
   * Search companies for auto-complete
   */
  searchCompanies(searchTerm: string): Observable<CompanyAutoComplete[]> {
    return this.companies$.pipe(
      map(companies => 
        companies
          .filter(c => !c.bDel && c.sName.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 10) // Limit to 10 results
          .map(c => ({
            lid: c.lid,
            sName: c.sName,
            email: c.email,
            contactPerson: c.contactPerson,
            addressLine1: c.addressLine1
          }))
      ),
      delay(300)
    );
  }

  /**
   * Get company by ID
   */
  getCompanyById(id: number): Observable<CRMCompanyMaster | null> {
    return this.companies$.pipe(
      map(companies => companies.find(c => c.lid === id && !c.bDel) || null),
      delay(200)
    );
  }

  /**
   * Create new company
   */
  createCompany(company: CRMCompanyCreateRequest): Observable<CRMCompanyMaster> {
    const currentCompanies = this.companies$.value;
    const newId = Math.max(...currentCompanies.map(c => c.lid)) + 1;

    const newCompany: CRMCompanyMaster = {
      lid: newId,
      sName: company.sName,
      email: company.email,
      mobileNo: company.mobileNo,
      contactNo: company.contactNo || '',
      addressLine1: company.addressLine1,
      addressLine2: company.addressLine2,
      addressLine3: company.addressLine3,
      website: company.website,
      description: company.description,
      contactPerson: company.contactPerson,
      officeLocation: company.officeLocation,
      lUser: 1, // TODO: Get from auth service
      dEntry: new Date(),
      bDel: false
    };

    this.companies$.next([...currentCompanies, newCompany]);
    return of(newCompany).pipe(delay(500));
  }

  /**
   * Update company
   */
  updateCompany(id: number, company: Partial<CRMCompanyCreateRequest>): Observable<CRMCompanyMaster> {
    const currentCompanies = this.companies$.value;
    const index = currentCompanies.findIndex(c => c.lid === id);

    if (index === -1) {
      throw new Error('Company not found');
    }

    const updatedCompany = {
      ...currentCompanies[index],
      ...company
    };

    currentCompanies[index] = updatedCompany;
    this.companies$.next([...currentCompanies]);

    return of(updatedCompany).pipe(delay(500));
  }

  /**
   * Delete company (soft delete)
   */
  deleteCompany(id: number): Observable<boolean> {
    const currentCompanies = this.companies$.value;
    const index = currentCompanies.findIndex(c => c.lid === id);

    if (index === -1) {
      return of(false);
    }

    currentCompanies[index].bDel = true;
    this.companies$.next([...currentCompanies]);

    return of(true).pipe(delay(300));
  }

  /**
   * Convert CRM company to customer
   */
  convertToCustomer(conversionData: CompanyConversionRequest): Observable<BSCustomerMaster> {
    return this.getCompanyById(conversionData.crmCompanyId).pipe(
      map(company => {
        if (!company) {
          throw new Error('Company not found');
        }

        const currentCustomers = this.customers$.value;
        const newCustomerId = Math.max(0, ...currentCustomers.map(c => c.lid)) + 1;

        const newCustomer: BSCustomerMaster = {
          lid: newCustomerId,
          custName: company.sName,
          email: company.email,
          address: `${company.addressLine1}${company.addressLine2 ? ', ' + company.addressLine2 : ''}${company.addressLine3 ? ', ' + company.addressLine3 : ''}`,
          contactPerson: company.contactPerson,
          mobileNo: company.mobileNo,
          contactNo: company.contactNo,
          website: company.website,
          gstNo: conversionData.gstNo,
          panNo: conversionData.panNo,
          city: conversionData.city,
          state: conversionData.state,
          country: conversionData.country,
          pincode: conversionData.pincode,
          creditLimit: conversionData.creditLimit,
          creditDays: conversionData.creditDays,
          bDel: false,
          lUser: 1, // TODO: Get from auth service
          dEntry: new Date()
        };

        this.customers$.next([...currentCustomers, newCustomer]);
        return newCustomer;
      }),
      delay(500)
    );
  }

  /**
   * Get customers
   */
  getCustomers(): Observable<BSCustomerMaster[]> {
    return this.customers$.pipe(
      map(customers => customers.filter(c => !c.bDel))
    );
  }

  /**
   * Get customer by ID
   */
  getCustomerById(id: number): Observable<BSCustomerMaster | null> {
    return this.customers$.pipe(
      map(customers => customers.find(c => c.lid === id && !c.bDel) || null)
    );
  }

  /**
   * Get customer name by ID (for dropdowns)
   */
  getCustomerNameById(id: number): Observable<string> {
    return this.getCustomerById(id).pipe(
      map(customer => customer?.custName || 'Unknown Customer')
    );
  }
}
