import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { 
  CrmEnquiry, 
  CreateEnquiryRequest, 
  EnquiryFilterOptions, 
  EnquiryListResponse,
  EnquiryStatusUpdate 
} from '../interfaces/enquiry.interface';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private baseUrl = '/api/crm/enquiries'; // Will be configured properly later
  private enquiriesSubject = new BehaviorSubject<CrmEnquiry[]>([]);
  public enquiries$ = this.enquiriesSubject.asObservable();

  // Mock data for development
  private mockEnquiries: CrmEnquiry[] = [
    {
      enquiryID: 'ENQ-001',
      leadID: 'L-1001',
      enquiryNumber: 'ENQ/2025/001',
      enquiryDate: new Date('2025-08-25'),
      serviceTypeID: 'ST-001',
      serviceTypeName: 'Ocean Freight',
      requirements: 'FCL container shipment from Mumbai to Dubai',
      expectedValue: 150000,
      expectedDate: new Date('2025-09-15'),
      priorityLevel: 'HIGH',
      status: 'OPEN',
      approvalStatus: 'NOT_REQUIRED',
      assignedTo: 'Alex Thompson',
      createdBy: 'System',
      createdOn: new Date('2025-08-25'),
      lastUpdated: new Date('2025-08-25'),
      serviceDetails: [
        {
          serviceDetailID: 'SD-001',
          enquiryID: 'ENQ-001',
          serviceID: 'SRV-001',
          serviceName: 'Container Shipping',
          locationID: 'LOC-001',
          locationName: 'Mumbai Port',
          quantity: 2,
          unitType: 'FCL',
          estimatedCost: 75000,
          description: '40ft container shipping',
          priority: 'HIGH',
          timeline: '10-12 days'
        }
      ]
    },
    {
      enquiryID: 'ENQ-002',
      leadID: 'L-1002',
      enquiryNumber: 'ENQ/2025/002',
      enquiryDate: new Date('2025-08-26'),
      serviceTypeID: 'ST-002',
      serviceTypeName: 'Air Freight',
      requirements: 'Urgent pharmaceutical shipment',
      expectedValue: 85000,
      expectedDate: new Date('2025-09-05'),
      priorityLevel: 'HIGH',
      status: 'QUOTED',
      approvalStatus: 'APPROVED',
      assignedTo: 'Dana Wilson',
      createdBy: 'System',
      createdOn: new Date('2025-08-26'),
      lastUpdated: new Date('2025-08-28'),
      serviceDetails: []
    }
  ];

  constructor(private http: HttpClient) {
    this.enquiriesSubject.next(this.mockEnquiries);
  }

  // Get all enquiries with filtering
  getEnquiries(filters?: EnquiryFilterOptions, page: number = 1, pageSize: number = 20): Observable<EnquiryListResponse> {
    // For now, return mock data
    const filteredEnquiries = this.filterEnquiries(this.mockEnquiries, filters);
    const totalCount = filteredEnquiries.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredEnquiries.slice(startIndex, endIndex);

    return of({
      enquiries: pageData,
      totalCount,
      pageSize,
      currentPage: page,
      hasNextPage: endIndex < totalCount,
      hasPreviousPage: page > 1
    });

    // Real API call would be:
    // let params = new HttpParams()
    //   .set('page', page.toString())
    //   .set('pageSize', pageSize.toString());
    
    // if (filters) {
    //   Object.keys(filters).forEach(key => {
    //     const value = filters[key as keyof EnquiryFilterOptions];
    //     if (value !== undefined && value !== null) {
    //       params = params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
    //     }
    //   });
    // }
    
    // return this.http.get<EnquiryListResponse>(this.baseUrl, { params });
  }

  // Get enquiry by ID
  getEnquiryById(enquiryID: string): Observable<CrmEnquiry> {
    const enquiry = this.mockEnquiries.find(e => e.enquiryID === enquiryID);
    return of(enquiry!);
    
    // Real API call:
    // return this.http.get<CrmEnquiry>(`${this.baseUrl}/${enquiryID}`);
  }

  // Get enquiries by lead ID
  getEnquiriesByLead(leadID: string): Observable<CrmEnquiry[]> {
    const enquiries = this.mockEnquiries.filter(e => e.leadID === leadID);
    return of(enquiries);
    
    // Real API call:
    // return this.http.get<CrmEnquiry[]>(`${this.baseUrl}/by-lead/${leadID}`);
  }

  // Create new enquiry
  createEnquiry(request: CreateEnquiryRequest): Observable<CrmEnquiry> {
    const newEnquiry: CrmEnquiry = {
      enquiryID: 'ENQ-' + Date.now(),
      leadID: request.leadID,
      enquiryNumber: `ENQ/2025/${Date.now().toString().slice(-3)}`,
      enquiryDate: new Date(),
      serviceTypeID: request.serviceTypeID,
      serviceTypeName: 'Ocean Freight', // Would be fetched from service
      requirements: request.requirements,
      expectedValue: request.expectedValue,
      expectedDate: new Date(request.expectedDate),
      priorityLevel: request.priorityLevel,
      status: 'OPEN',
      approvalStatus: 'NOT_REQUIRED',
      assignedTo: request.assignedTo || 'Unassigned',
      createdBy: 'Current User',
      createdOn: new Date(),
      lastUpdated: new Date(),
      serviceDetails: []
    };

    this.mockEnquiries.unshift(newEnquiry);
    this.enquiriesSubject.next(this.mockEnquiries);
    return of(newEnquiry);
    
    // Real API call:
    // return this.http.post<CrmEnquiry>(this.baseUrl, request);
  }

  // Update enquiry status
  updateEnquiryStatus(update: EnquiryStatusUpdate): Observable<CrmEnquiry> {
    const enquiryIndex = this.mockEnquiries.findIndex(e => e.enquiryID === update.enquiryID);
    if (enquiryIndex !== -1) {
      this.mockEnquiries[enquiryIndex].status = update.newStatus as any;
      this.mockEnquiries[enquiryIndex].lastUpdated = new Date();
      this.enquiriesSubject.next(this.mockEnquiries);
      return of(this.mockEnquiries[enquiryIndex]);
    }
    throw new Error('Enquiry not found');
    
    // Real API call:
    // return this.http.patch<CrmEnquiry>(`${this.baseUrl}/${update.enquiryID}/status`, update);
  }

  // Submit enquiry for approval
  submitForApproval(enquiryID: string, remarks?: string): Observable<boolean> {
    const enquiryIndex = this.mockEnquiries.findIndex(e => e.enquiryID === enquiryID);
    if (enquiryIndex !== -1) {
      this.mockEnquiries[enquiryIndex].approvalStatus = 'PENDING';
      this.mockEnquiries[enquiryIndex].lastUpdated = new Date();
      this.enquiriesSubject.next(this.mockEnquiries);
      return of(true);
    }
    return of(false);
    
    // Real API call:
    // return this.http.post<boolean>(`${this.baseUrl}/${enquiryID}/submit-approval`, { remarks });
  }

  // Delete enquiry
  deleteEnquiry(enquiryID: string): Observable<boolean> {
    const enquiryIndex = this.mockEnquiries.findIndex(e => e.enquiryID === enquiryID);
    if (enquiryIndex !== -1) {
      this.mockEnquiries.splice(enquiryIndex, 1);
      this.enquiriesSubject.next(this.mockEnquiries);
      return of(true);
    }
    return of(false);
    
    // Real API call:
    // return this.http.delete<boolean>(`${this.baseUrl}/${enquiryID}`);
  }

  // Private helper methods
  private filterEnquiries(enquiries: CrmEnquiry[], filters?: EnquiryFilterOptions): CrmEnquiry[] {
    if (!filters) return enquiries;

    return enquiries.filter(enquiry => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(enquiry.status)) return false;
      }

      // Priority filter
      if (filters.priorityLevel && filters.priorityLevel.length > 0) {
        if (!filters.priorityLevel.includes(enquiry.priorityLevel)) return false;
      }

      // Service type filter
      if (filters.serviceType && filters.serviceType.length > 0) {
        if (!filters.serviceType.includes(enquiry.serviceTypeID)) return false;
      }

      // Assigned to filter
      if (filters.assignedTo && filters.assignedTo.length > 0) {
        if (!filters.assignedTo.includes(enquiry.assignedTo)) return false;
      }

      // Date range filter
      if (filters.dateFrom && enquiry.enquiryDate < filters.dateFrom) return false;
      if (filters.dateTo && enquiry.enquiryDate > filters.dateTo) return false;

      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const searchFields = [
          enquiry.enquiryNumber,
          enquiry.requirements,
          enquiry.serviceTypeName,
          enquiry.assignedTo
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchTerm)) return false;
      }

      return true;
    });
  }
}
