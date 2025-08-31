import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { 
  CrmQuote, 
  CreateQuoteRequest, 
  QuoteFilterOptions, 
  QuoteListResponse,
  SendQuoteRequest,
  QuoteApprovalRequest 
} from '../interfaces/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private baseUrl = '/api/crm/quotes'; // Will be configured properly later
  private quotesSubject = new BehaviorSubject<CrmQuote[]>([]);
  public quotes$ = this.quotesSubject.asObservable();

  // Mock data for development
  private mockQuotes: CrmQuote[] = [
    {
      quoteID: 'QUO-001',
      enquiryID: 'ENQ-001',
      quoteNumber: 'QUO/2025/001',
      quoteDate: new Date('2025-08-27'),
      validityDate: new Date('2025-09-27'),
      totalAmount: 150000,
      taxAmount: 27000,
      discountAmount: 5000,
      finalAmount: 172000,
      currency: 'INR',
      status: 'SENT',
      approvalRequired: true,
      approvalStatus: 'APPROVED',
      sentToCustomer: true,
      sentDate: new Date('2025-08-28'),
      createdBy: 'Alex Thompson',
      createdOn: new Date('2025-08-27'),
      lastUpdated: new Date('2025-08-28'),
      quoteItems: [
        {
          quoteItemID: 'QI-001',
          quoteID: 'QUO-001',
          serviceID: 'SRV-001',
          serviceName: 'Ocean Freight - FCL',
          description: '40ft container shipping Mumbai to Dubai',
          quantity: 2,
          unitPrice: 75000,
          totalPrice: 150000,
          taxRate: 18,
          taxAmount: 27000,
          discountPercentage: 3.33,
          discountAmount: 5000,
          finalAmount: 172000,
          itemOrder: 1
        }
      ],
      revisions: []
    },
    {
      quoteID: 'QUO-002',
      enquiryID: 'ENQ-002',
      quoteNumber: 'QUO/2025/002',
      quoteDate: new Date('2025-08-28'),
      validityDate: new Date('2025-09-28'),
      totalAmount: 85000,
      taxAmount: 15300,
      discountAmount: 0,
      finalAmount: 100300,
      currency: 'INR',
      status: 'DRAFT',
      approvalRequired: false,
      approvalStatus: 'NOT_REQUIRED',
      sentToCustomer: false,
      createdBy: 'Dana Wilson',
      createdOn: new Date('2025-08-28'),
      lastUpdated: new Date('2025-08-28'),
      quoteItems: [],
      revisions: []
    }
  ];

  constructor(private http: HttpClient) {
    this.quotesSubject.next(this.mockQuotes);
  }

  // Get all quotes with filtering
  getQuotes(filters?: QuoteFilterOptions, page: number = 1, pageSize: number = 20): Observable<QuoteListResponse> {
    const filteredQuotes = this.filterQuotes(this.mockQuotes, filters);
    const totalCount = filteredQuotes.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredQuotes.slice(startIndex, endIndex);

    return of({
      quotes: pageData,
      totalCount,
      pageSize,
      currentPage: page,
      hasNextPage: endIndex < totalCount,
      hasPreviousPage: page > 1
    });
  }

  // Get quote by ID
  getQuoteById(quoteID: string): Observable<CrmQuote> {
    const quote = this.mockQuotes.find(q => q.quoteID === quoteID);
    return of(quote!);
  }

  // Get quotes by enquiry ID
  getQuotesByEnquiry(enquiryID: string): Observable<CrmQuote[]> {
    const quotes = this.mockQuotes.filter(q => q.enquiryID === enquiryID);
    return of(quotes);
  }

  // Create new quote
  createQuote(request: CreateQuoteRequest): Observable<CrmQuote> {
    const totalAmount = request.quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxAmount = request.quoteItems.reduce((sum, item) => sum + item.taxAmount, 0);
    const discountAmount = request.discountAmount || 0;
    const finalAmount = totalAmount + taxAmount - discountAmount;

    const newQuote: CrmQuote = {
      quoteID: 'QUO-' + Date.now(),
      quoteNumber: `QUO/2025/${Date.now().toString().slice(-3)}`,
      quoteDate: new Date(),
      validityDate: new Date(Date.now() + (request.validityDays * 24 * 60 * 60 * 1000)),
      totalAmount,
      taxAmount,
      discountAmount,
      finalAmount,
      currency: request.currency,
      status: 'DRAFT',
      approvalRequired: request.requiresApproval || false,
      approvalStatus: request.requiresApproval ? 'PENDING' : 'NOT_REQUIRED',
      sentToCustomer: false,
      createdBy: 'Current User',
      createdOn: new Date(),
      lastUpdated: new Date(),
      enquiryID: request.enquiryID,
      quoteItems: request.quoteItems.map((item, index) => ({
        ...item,
        quoteItemID: `QI-${Date.now()}-${index}`,
        quoteID: 'QUO-' + Date.now()
      })),
      revisions: []
    };

    this.mockQuotes.unshift(newQuote);
    this.quotesSubject.next(this.mockQuotes);
    return of(newQuote);
  }

  // Send quote to customer
  sendQuote(request: SendQuoteRequest): Observable<boolean> {
    const quoteIndex = this.mockQuotes.findIndex(q => q.quoteID === request.quoteID);
    if (quoteIndex !== -1) {
      this.mockQuotes[quoteIndex].status = 'SENT';
      this.mockQuotes[quoteIndex].sentToCustomer = true;
      this.mockQuotes[quoteIndex].sentDate = new Date();
      this.mockQuotes[quoteIndex].lastUpdated = new Date();
      this.quotesSubject.next(this.mockQuotes);
      return of(true);
    }
    return of(false);
  }

  // Update quote status
  updateQuoteStatus(quoteID: string, newStatus: string, remarks?: string): Observable<CrmQuote> {
    const quoteIndex = this.mockQuotes.findIndex(q => q.quoteID === quoteID);
    if (quoteIndex !== -1) {
      this.mockQuotes[quoteIndex].status = newStatus as any;
      this.mockQuotes[quoteIndex].lastUpdated = new Date();
      if (newStatus === 'ACCEPTED') {
        this.mockQuotes[quoteIndex].customerResponse = 'Quote accepted';
        this.mockQuotes[quoteIndex].responseDate = new Date();
      } else if (newStatus === 'REJECTED') {
        this.mockQuotes[quoteIndex].customerResponse = remarks || 'Quote rejected';
        this.mockQuotes[quoteIndex].responseDate = new Date();
      }
      this.quotesSubject.next(this.mockQuotes);
      return of(this.mockQuotes[quoteIndex]);
    }
    throw new Error('Quote not found');
  }

  // Submit quote for approval
  submitForApproval(request: QuoteApprovalRequest): Observable<boolean> {
    const quoteIndex = this.mockQuotes.findIndex(q => q.quoteID === request.quoteID);
    if (quoteIndex !== -1) {
      if (request.action === 'APPROVE') {
        this.mockQuotes[quoteIndex].approvalStatus = 'APPROVED';
      } else if (request.action === 'REJECT') {
        this.mockQuotes[quoteIndex].approvalStatus = 'REJECTED';
      }
      this.mockQuotes[quoteIndex].lastUpdated = new Date();
      this.quotesSubject.next(this.mockQuotes);
      return of(true);
    }
    return of(false);
  }

  // Delete quote
  deleteQuote(quoteID: string): Observable<boolean> {
    const quoteIndex = this.mockQuotes.findIndex(q => q.quoteID === quoteID);
    if (quoteIndex !== -1) {
      this.mockQuotes.splice(quoteIndex, 1);
      this.quotesSubject.next(this.mockQuotes);
      return of(true);
    }
    return of(false);
  }

  // Generate quote PDF
  generateQuotePDF(quoteID: string): Observable<Blob> {
    // Mock PDF generation
    const pdfContent = `Quote PDF for ${quoteID}`;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    return of(blob);
  }

  // Private helper methods
  private filterQuotes(quotes: CrmQuote[], filters?: QuoteFilterOptions): CrmQuote[] {
    if (!filters) return quotes;

    return quotes.filter(quote => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(quote.status)) return false;
      }

      // Approval status filter
      if (filters.approvalStatus && filters.approvalStatus.length > 0) {
        if (!filters.approvalStatus.includes(quote.approvalStatus)) return false;
      }

      // Date range filter
      if (filters.dateFrom && quote.quoteDate < filters.dateFrom) return false;
      if (filters.dateTo && quote.quoteDate > filters.dateTo) return false;

      // Amount range filter
      if (filters.amountFrom && quote.finalAmount < filters.amountFrom) return false;
      if (filters.amountTo && quote.finalAmount > filters.amountTo) return false;

      // Customer name filter (would need to join with enquiry/lead data)
      if (filters.customerName) {
        // This would be implemented with proper join in real API
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const searchFields = [
          quote.quoteNumber,
          quote.createdBy,
          quote.finalAmount.toString()
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchTerm)) return false;
      }

      return true;
    });
  }
}
