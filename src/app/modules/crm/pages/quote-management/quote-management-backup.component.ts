import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockCrmService } from '../../services/mock-crm.service';

interface CrmQuote {
  quoteID: string;
  enquiryID: string;
  leadID: string;
  leadCompany: string;
  leadContact: string;
  quoteNumber: string;
  quoteDate: Date;
  validityDate: Date;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  approvalRequired: boolean;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_REQUIRED';
  serviceType: string;
  terms: string;
  notes: string;
  createdBy: string;
  createdOn: Date;
  sentDate?: Date;
  responseDate?: Date;
}

@Component({
  selector: 'app-quote-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Quote Form (shown when creating/editing) -->
    <div class="page" *ngIf="isCreating || isEditing">
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">{{ isCreating ? 'Create New Quote' : 'Edit Quote' }}</h1>
            <p class="page-subtitle">{{ isCreating ? 'Create a new quotation' : 'Modify quote details' }}</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-secondary" (click)="cancelQuoteForm()">
              <span class="material-icons">close</span>
              Cancel
            </button>
            <button class="btn btn-primary" (click)="saveQuote()">
              <span class="material-icons">save</span>
              {{ isCreating ? 'Create Quote' : 'Update Quote' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Quote Form -->
      <div class="form-container">
        <div class="form-section">
          <h3>Quote Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Quote Number</label>
              <input type="text" [(ngModel)]="newQuote.quoteNumber" readonly class="form-control">
            </div>
            <div class="form-group">
              <label>Quote Date</label>
              <input type="date" [(ngModel)]="newQuote.quoteDate" class="form-control">
            </div>
            <div class="form-group">
              <label>Valid Until</label>
              <input type="date" [(ngModel)]="newQuote.validityDate" class="form-control">
            </div>
            <div class="form-group">
              <label>Total Amount</label>
              <input type="number" [(ngModel)]="newQuote.totalAmount" placeholder="0.00" class="form-control">
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Lead Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Company Name</label>
              <input type="text" [(ngModel)]="newQuote.leadCompany" placeholder="Enter company name" class="form-control">
            </div>
            <div class="form-group">
              <label>Contact Person</label>
              <input type="text" [(ngModel)]="newQuote.leadContact" placeholder="Enter contact name" class="form-control">
            </div>
            <div class="form-group">
              <label>Service Type</label>
              <select [(ngModel)]="newQuote.serviceType" class="form-control">
                <option value="">Select service type</option>
                <option value="Ocean Freight">Ocean Freight</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Land Transport">Land Transport</option>
                <option value="Warehousing">Warehousing</option>
                <option value="Customs Clearance">Customs Clearance</option>
              </select>
            </div>
            <div class="form-group">
              <label>Enquiry ID</label>
              <input type="text" [(ngModel)]="newQuote.enquiryID" placeholder="ENQ-001" class="form-control">
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Additional Details</h3>
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Terms & Conditions</label>
              <textarea [(ngModel)]="newQuote.terms" rows="3" placeholder="Enter terms and conditions" class="form-control"></textarea>
            </div>
            <div class="form-group full-width">
              <label>Notes</label>
              <textarea [(ngModel)]="newQuote.notes" rows="3" placeholder="Additional notes" class="form-control"></textarea>
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="newQuote.approvalRequired">
                Requires Approval
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quote List (shown by default) -->
    <div class="page" *ngIf="!isCreating && !isEditing">
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Quote Management</h1>
            <p class="page-subtitle">Manage quotations and track responses</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-secondary" (click)="exportQuotes()">
              <span class="material-icons">download</span>
              Export
            </button>
            <button class="btn btn-primary" (click)="createNewQuote()">
              <span class="material-icons">add</span>
              New Quote
            </button>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="toolbar">
        <div class="search-box">
          <span class="material-icons">search</span>
          <input type="search" 
                 [(ngModel)]="searchQuery" 
                 placeholder="Search quotes..."
                 (input)="onSearch()">
        </div>
        <div class="filters">
          <select [(ngModel)]="statusFilter" (change)="onFilterChange()">
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
          </select>
          <select [(ngModel)]="approvalFilter" (change)="onFilterChange()">
            <option value="">All Approvals</option>
            <option value="PENDING">Pending Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input type="date" 
                 [(ngModel)]="dateFilter" 
                 (change)="onFilterChange()"
                 class="date-filter">
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-icon bg-blue-500">
            <span class="material-icons">request_quote</span>
          </div>
          <div class="card-content">
            <h3>{{ getTotalQuotes() }}</h3>
            <p>Total Quotes</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-orange-500">
            <span class="material-icons">send</span>
          </div>
          <div class="card-content">
            <h3>{{ getSentQuotes() }}</h3>
            <p>Sent Quotes</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-green-500">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="card-content">
            <h3>{{ getAcceptedQuotes() }}</h3>
            <p>Accepted</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-purple-500">
            <span class="material-icons">trending_up</span>
          </div>
          <div class="card-content">
            <h3>₹{{ getTotalQuoteValue() | number:'1.0-0' }}</h3>
            <p>Total Value</p>
          </div>
        </div>
      </div>

      <!-- Quotes Table -->
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Quote Number</th>
              <th>Enquiry</th>
              <th>Company</th>
              <th>Service Type</th>
              <th>Quote Amount</th>
              <th>Quote Date</th>
              <th>Valid Until</th>
              <th>Status</th>
              <th>Approval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let quote of filteredQuotes">
              <td>
                <a [routerLink]="['/crm/quotes', quote.quoteID]" class="link">
                  {{ quote.quoteNumber }}
                </a>
              </td>
              <td>
                <a [routerLink]="['/crm/enquiries', quote.enquiryID]" class="link-secondary">
                  {{ quote.enquiryID }}
                </a>
              </td>
              <td>
                <div class="company-info">
                  <div class="company-name">{{ quote.leadCompany }}</div>
                  <div class="contact-name">{{ quote.leadContact }}</div>
                </div>
              </td>
              <td>{{ quote.serviceType }}</td>
              <td class="value-cell">
                ₹{{ quote.totalAmount | number:'1.0-0' }}
              </td>
              <td>{{ quote.quoteDate | date:'MMM d, yyyy' }}</td>
              <td>
                <span [class]="getValidityClass(quote.validityDate)">
                  {{ quote.validityDate | date:'MMM d, yyyy' }}
                </span>
              </td>
              <td>
                <span class="status-badge" [class]="'status-' + quote.status.toLowerCase()">
                  {{ quote.status }}
                </span>
              </td>
              <td>
                <span class="approval-badge" [class]="'approval-' + quote.approvalStatus.toLowerCase().replace('_', '-')"
                      *ngIf="quote.approvalRequired">
                  {{ getApprovalDisplayText(quote.approvalStatus) }}
                </span>
                <span class="approval-badge approval-not-required" *ngIf="!quote.approvalRequired">
                  Not Required
                </span>
              </td>
              <td class="actions-cell">
                <button class="btn-icon" 
                        (click)="viewQuote(quote.quoteID)"
                        title="View Quote">
                  <span class="material-icons">visibility</span>
                </button>
                <button class="btn-icon" 
                        (click)="editQuote(quote.quoteID)"
                        *ngIf="quote.status === 'DRAFT'"
                        title="Edit Quote">
                  <span class="material-icons">edit</span>
                </button>
                <button class="btn-icon" 
                        (click)="sendQuote(quote.quoteID)"
                        *ngIf="quote.status === 'DRAFT' && quote.approvalStatus === 'APPROVED'"
                        title="Send Quote">
                  <span class="material-icons">send</span>
                </button>
                <button class="btn-icon" 
                        (click)="downloadQuote(quote.quoteID)"
                        title="Download PDF">
                  <span class="material-icons">download</span>
                </button>
                <button class="btn-icon" 
                        (click)="createContract(quote.quoteID)"
                        *ngIf="quote.status === 'ACCEPTED'"
                        title="Create Contract">
                  <span class="material-icons">assignment</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredQuotes.length === 0" class="empty-state">
        <div class="empty-icon">
          <span class="material-icons">request_quote</span>
        </div>
        <h3>No quotes found</h3>
        <p>Create your first quote from an enquiry or adjust your filters</p>
        <button class="btn btn-primary" (click)="createNewQuote()">
          Create Quote
        </button>
      </div>
    </div>
  `,
  styles: [`
    .page {
      padding: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
    }

    .page-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }

    .page-subtitle {
      color: #6b7280;
      margin: 0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    /* Form Styles */
    .form-container {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      overflow: hidden;
    }

    .form-section {
      padding: 2rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .form-section:last-child {
      border-bottom: none;
    }

    .form-section h3 {
      margin: 0 0 1.5rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group label {
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .form-control {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-control[readonly] {
      background: #f9fafb;
      color: #6b7280;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      margin: 0;
    }

    .toolbar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 400px;
    }

    .search-box .material-icons {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 1.25rem;
    }

    .search-box input {
      width: 100%;
      padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }

    .filters {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .filters select, .date-filter {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      background: white;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .summary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .card-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .card-content h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #111827;
    }

    .card-content p {
      color: #6b7280;
      margin: 0;
      font-size: 0.875rem;
    }

    .table-container {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th {
      background: #f9fafb;
      padding: 0.75rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.875rem;
    }

    .table td {
      padding: 0.75rem;
      border-bottom: 1px solid #f3f4f6;
      font-size: 0.875rem;
    }

    .table tr:hover {
      background: #f9fafb;
    }

    .link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 600;
    }

    .link:hover {
      text-decoration: underline;
    }

    .link-secondary {
      color: #6b7280;
      text-decoration: none;
      font-size: 0.75rem;
    }

    .link-secondary:hover {
      color: #3b82f6;
      text-decoration: underline;
    }

    .company-info .company-name {
      font-weight: 500;
      color: #111827;
    }

    .company-info .contact-name {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .value-cell {
      font-weight: 600;
      color: #059669;
    }

    .validity-expiring {
      color: #dc2626;
      font-weight: 500;
    }

    .validity-expired {
      color: #dc2626;
      font-weight: 500;
      text-decoration: line-through;
    }

    .status-badge, .approval-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-draft {
      background: #f3f4f6;
      color: #6b7280;
    }

    .status-sent {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .status-accepted {
      background: #d1fae5;
      color: #065f46;
    }

    .status-rejected {
      background: #fee2e2;
      color: #dc2626;
    }

    .status-expired {
      background: #fef3c7;
      color: #d97706;
    }

    .approval-pending {
      background: #fef3c7;
      color: #d97706;
    }

    .approval-approved {
      background: #d1fae5;
      color: #065f46;
    }

    .approval-rejected {
      background: #fee2e2;
      color: #dc2626;
    }

    .approval-not-required {
      background: #f3f4f6;
      color: #6b7280;
    }

    .actions-cell {
      white-space: nowrap;
    }

    .btn-icon {
      background: none;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      padding: 0.25rem;
      margin: 0 0.125rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn-icon:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .btn-icon .material-icons {
      font-size: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }

    .empty-icon {
      width: 4rem;
      height: 4rem;
      background: #f3f4f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .empty-icon .material-icons {
      font-size: 2rem;
      color: #9ca3af;
    }

    .empty-state h3 {
      margin: 0 0 0.5rem 0;
      color: #111827;
    }

    .empty-state p {
      color: #6b7280;
      margin: 0 0 1.5rem 0;
    }
  `]
})
export class QuoteManagementComponent implements OnInit {
  quotes: CrmQuote[] = [];
  filteredQuotes: CrmQuote[] = [];
  
  searchQuery = '';
  statusFilter = '';
  approvalFilter = '';
  dateFilter = '';
  
  // Form mode properties
  isCreating = false;
  isEditing = false;
  currentQuoteId: string | null = null;
  
  // New quote form model
  newQuote: Partial<CrmQuote> = {};

  constructor(
    private crmService: MockCrmService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check if we're in create/edit mode based on route
    this.route.url.subscribe(segments => {
      const path = segments.map(s => s.path).join('/');
      this.isCreating = path === 'new';
      this.isEditing = path.includes('edit');
      
      if (this.isCreating) {
        this.initializeNewQuote();
      } else if (this.isEditing) {
        this.currentQuoteId = this.route.snapshot.params['id'];
        this.loadQuoteForEdit();
      }
    });
    
    this.loadQuotes();
  }

  loadQuotes() {
    // Mock data - replace with actual API call
    this.quotes = [
      {
        quoteID: 'QUO-001',
        enquiryID: 'ENQ-001',
        leadID: 'L-1001',
        leadCompany: 'Acme Exports',
        leadContact: 'Priya N',
        quoteNumber: 'Q-2024-001',
        quoteDate: new Date('2024-01-20'),
        validityDate: new Date('2024-02-20'),
        totalAmount: 250000,
        status: 'SENT',
        approvalRequired: true,
        approvalStatus: 'APPROVED',
        serviceType: 'Ocean Freight',
        terms: 'Standard shipping terms apply',
        notes: 'Urgent delivery required',
        createdBy: 'Alex',
        createdOn: new Date('2024-01-20'),
        sentDate: new Date('2024-01-21')
      },
      {
        quoteID: 'QUO-002',
        enquiryID: 'ENQ-002',
        leadID: 'L-1002',
        leadCompany: 'Marina Logistics',
        leadContact: 'Ravi K',
        quoteNumber: 'Q-2024-002',
        quoteDate: new Date('2024-01-25'),
        validityDate: new Date('2024-02-25'),
        totalAmount: 180000,
        status: 'ACCEPTED',
        approvalRequired: false,
        approvalStatus: 'NOT_REQUIRED',
        serviceType: 'Air Freight',
        terms: 'Express delivery terms',
        notes: 'Electronics cargo - handle with care',
        createdBy: 'Dana',
        createdOn: new Date('2024-01-25'),
        sentDate: new Date('2024-01-26'),
        responseDate: new Date('2024-01-28')
      },
      {
        quoteID: 'QUO-003',
        enquiryID: 'ENQ-003',
        leadID: 'L-1003',
        leadCompany: 'Zen Traders',
        leadContact: 'Ishita S',
        quoteNumber: 'Q-2024-003',
        quoteDate: new Date('2024-01-28'),
        validityDate: new Date('2024-02-28'),
        totalAmount: 620000,
        status: 'DRAFT',
        approvalRequired: true,
        approvalStatus: 'PENDING',
        serviceType: 'Land Transport',
        terms: 'Cross-border transport terms',
        notes: 'Multiple delivery points',
        createdBy: 'Alex',
        createdOn: new Date('2024-01-28')
      }
    ];
    
    this.filteredQuotes = [...this.quotes];
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredQuotes = this.quotes.filter(quote => {
      const matchesSearch = !this.searchQuery || 
        quote.leadCompany.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        quote.quoteNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        quote.enquiryID.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = !this.statusFilter || quote.status === this.statusFilter;
      const matchesApproval = !this.approvalFilter || quote.approvalStatus === this.approvalFilter;
      
      let matchesDate = true;
      if (this.dateFilter) {
        const filterDate = new Date(this.dateFilter);
        const quoteDate = new Date(quote.quoteDate);
        matchesDate = quoteDate.toDateString() === filterDate.toDateString();
      }

      return matchesSearch && matchesStatus && matchesApproval && matchesDate;
    });
  }

  getTotalQuotes(): number {
    return this.quotes.length;
  }

  getSentQuotes(): number {
    return this.quotes.filter(q => q.status === 'SENT').length;
  }

  getAcceptedQuotes(): number {
    return this.quotes.filter(q => q.status === 'ACCEPTED').length;
  }

  getTotalQuoteValue(): number {
    return this.quotes.reduce((total, quote) => total + quote.totalAmount, 0);
  }

  getValidityClass(validityDate: Date): string {
    const today = new Date();
    const validity = new Date(validityDate);
    const daysUntilExpiry = Math.ceil((validity.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'validity-expired';
    if (daysUntilExpiry <= 7) return 'validity-expiring';
    return '';
  }

  getApprovalDisplayText(status: string): string {
    switch (status) {
      case 'NOT_REQUIRED': return 'Not Required';
      case 'PENDING': return 'Pending';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  }

  createNewQuote() {
    this.router.navigate(['/crm/quotes/new']);
  }

  viewQuote(quoteId: string) {
    this.router.navigate(['/crm/quotes', quoteId]);
  }

  editQuote(quoteId: string) {
    this.router.navigate(['/crm/quotes', quoteId, 'edit']);
  }

  sendQuote(quoteId: string) {
    // Implement send quote functionality
    console.log('Sending quote:', quoteId);
    // Update quote status to SENT
    const quote = this.quotes.find(q => q.quoteID === quoteId);
    if (quote) {
      quote.status = 'SENT';
      quote.sentDate = new Date();
      this.applyFilters();
    }
  }

  downloadQuote(quoteId: string) {
    // Implement download PDF functionality
    console.log('Downloading quote:', quoteId);
  }

  createContract(quoteId: string) {
    this.router.navigate(['/crm/contracts/new'], { queryParams: { quoteId } });
  }

  exportQuotes() {
    // Implement export functionality
    console.log('Exporting quotes');
  }
  
  initializeNewQuote() {
    this.newQuote = {
      quoteID: '',
      enquiryID: '',
      leadID: '',
      leadCompany: '',
      leadContact: '',
      quoteNumber: this.generateQuoteNumber(),
      quoteDate: new Date(),
      validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      totalAmount: 0,
      status: 'DRAFT',
      approvalRequired: false,
      approvalStatus: 'NOT_REQUIRED',
      serviceType: '',
      terms: '',
      notes: '',
      createdBy: 'Current User', // Replace with actual user
      createdOn: new Date()
    };
  }
  
  loadQuoteForEdit() {
    if (this.currentQuoteId) {
      const quote = this.quotes.find(q => q.quoteID === this.currentQuoteId);
      if (quote) {
        this.newQuote = { ...quote };
      }
    }
  }
  
  generateQuoteNumber(): string {
    const year = new Date().getFullYear();
    const nextNumber = this.quotes.length + 1;
    return `Q-${year}-${nextNumber.toString().padStart(3, '0')}`;
  }
  
  saveQuote() {
    if (this.isCreating) {
      // Add new quote
      const quote: CrmQuote = {
        ...this.newQuote as CrmQuote,
        quoteID: `QUO-${this.quotes.length + 1}`.padStart(7, '0')
      };
      this.quotes.push(quote);
      console.log('Quote created:', quote);
    } else if (this.isEditing && this.currentQuoteId) {
      // Update existing quote
      const index = this.quotes.findIndex(q => q.quoteID === this.currentQuoteId);
      if (index !== -1) {
        this.quotes[index] = { ...this.newQuote as CrmQuote };
        console.log('Quote updated:', this.quotes[index]);
      }
    }
    
    this.applyFilters();
    this.goBackToList();
  }
  
  cancelQuoteForm() {
    this.goBackToList();
  }
  
  goBackToList() {
    this.router.navigate(['/crm/quotes']);
  }
}
