import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockCrmService } from '../../services/mock-crm.service';
import { Observable } from 'rxjs';

interface CrmEnquiry {
  enquiryID: string;
  leadID: string;
  leadCompany: string;
  leadContact: string;
  enquiryDate: Date;
  serviceTypeID: string;
  serviceTypeName: string;
  requirements: string;
  expectedValue: number;
  expectedDate: Date;
  status: 'OPEN' | 'QUOTED' | 'CLOSED' | 'CANCELLED';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_REQUIRED';
  assignedTo: string;
  createdBy: string;
  createdOn: Date;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

@Component({
  selector: 'app-enquiry-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Enquiry Management</h1>
            <p class="page-subtitle">Manage and track customer enquiries from leads</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-primary" (click)="createNewEnquiry()">
              <span class="material-icons">add</span>
              Create Enquiry
            </button>
          </div>
        </div>
      </div>

      <!-- Create Feature Message -->
      <div *ngIf="showCreateMessage" class="feature-message">
        <div class="message-content">
          <span class="material-icons">info</span>
          <div class="message-text">
            <strong>Create Enquiry Feature</strong>
            <p>This feature is currently being developed. For now, you can view and manage existing enquiries in the list below.</p>
          </div>
          <button class="close-btn" (click)="showCreateMessage = false">
            <span class="material-icons">close</span>
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="toolbar">
        <div class="search-box">
          <span class="material-icons">search</span>
          <input type="search" 
                 [(ngModel)]="searchQuery" 
                 placeholder="Search enquiries..."
                 (input)="onSearch()">
        </div>
        <div class="filters">
          <select [(ngModel)]="statusFilter" (change)="onFilterChange()">
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="QUOTED">Quoted</option>
            <option value="CLOSED">Closed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select [(ngModel)]="priorityFilter" (change)="onFilterChange()">
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <select [(ngModel)]="approvalFilter" (change)="onFilterChange()">
            <option value="">All Approvals</option>
            <option value="PENDING">Pending Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-icon bg-blue-500">
            <span class="material-icons">inbox</span>
          </div>
          <div class="card-content">
            <h3>{{ getTotalEnquiries() }}</h3>
            <p>Total Enquiries</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-orange-500">
            <span class="material-icons">pending</span>
          </div>
          <div class="card-content">
            <h3>{{ getOpenEnquiries() }}</h3>
            <p>Open Enquiries</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-green-500">
            <span class="material-icons">request_quote</span>
          </div>
          <div class="card-content">
            <h3>{{ getQuotedEnquiries() }}</h3>
            <p>Quoted</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-purple-500">
            <span class="material-icons">approval</span>
          </div>
          <div class="card-content">
            <h3>{{ getPendingApprovals() }}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
      </div>

      <!-- Enquiries Table -->
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Lead Company</th>
              <th>Contact</th>
              <th>Service Type</th>
              <th>Expected Value</th>
              <th>Expected Date</th>
              <th>Status</th>
              <th>Approval</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let enquiry of filteredEnquiries">
              <td>
                <a [routerLink]="['/crm/enquiries', enquiry.enquiryID]" class="link">
                  {{ enquiry.enquiryID }}
                </a>
              </td>
              <td>
                <div class="company-info">
                  <div class="company-name">{{ enquiry.leadCompany }}</div>
                  <div class="lead-id">{{ enquiry.leadID }}</div>
                </div>
              </td>
              <td>{{ enquiry.leadContact }}</td>
              <td>{{ enquiry.serviceTypeName }}</td>
              <td class="value-cell">
                <span *ngIf="enquiry.expectedValue">₹{{ enquiry.expectedValue | number:'1.0-0' }}</span>
                <span *ngIf="!enquiry.expectedValue" class="text-muted">-</span>
              </td>
              <td>{{ enquiry.expectedDate | date:'MMM d, yyyy' }}</td>
              <td>
                <span class="status-badge" [class]="'status-' + enquiry.status.toLowerCase()">
                  {{ enquiry.status }}
                </span>
              </td>
              <td>
                <span class="approval-badge" [class]="'approval-' + enquiry.approvalStatus.toLowerCase().replace('_', '-')">
                  {{ getApprovalDisplayText(enquiry.approvalStatus) }}
                </span>
              </td>
              <td>
                <span class="priority-badge" [class]="'priority-' + enquiry.priority.toLowerCase()">
                  {{ enquiry.priority }}
                </span>
              </td>
              <td>{{ enquiry.createdOn | date:'MMM d, yyyy' }}</td>
              <td class="actions-cell">
                <button class="btn-icon" 
                        (click)="viewEnquiry(enquiry.enquiryID)"
                        title="View Details">
                  <span class="material-icons">visibility</span>
                </button>
                <button class="btn-icon" 
                        (click)="editEnquiry(enquiry.enquiryID)"
                        title="Edit Enquiry">
                  <span class="material-icons">edit</span>
                </button>
                <button class="btn-icon" 
                        *ngIf="enquiry.status === 'OPEN'"
                        (click)="generateQuote(enquiry.enquiryID)"
                        title="Generate Quote">
                  <span class="material-icons">request_quote</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredEnquiries.length === 0" class="empty-state">
        <div class="empty-icon">
          <span class="material-icons">inbox</span>
        </div>
        <h3>No enquiries found</h3>
        <p>Create your first enquiry from a lead or adjust your filters</p>
        <button class="btn btn-primary" (click)="createNewEnquiry()">
          Create Enquiry
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
      background: #243C70;
      color: white;
    }

    .btn-primary:hover {
      background: #1e3258;
    }

    .feature-message {
      background: linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%);
      border: 1px solid #81d4fa;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      animation: slideIn 0.3s ease-out;
    }

    .message-content {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .message-content .material-icons {
      color: #0277bd;
      font-size: 1.25rem;
      margin-top: 0.125rem;
    }

    .message-text {
      flex: 1;
    }

    .message-text strong {
      color: #243C70;
      font-size: 0.875rem;
      display: block;
      margin-bottom: 0.25rem;
    }

    .message-text p {
      color: #546e7a;
      font-size: 0.8rem;
      margin: 0;
      line-height: 1.4;
    }

    .close-btn {
      background: none;
      border: none;
      padding: 0.25rem;
      border-radius: 0.25rem;
      cursor: pointer;
      color: #78909c;
      transition: all 0.2s ease;
    }

    .close-btn:hover {
      background: rgba(96, 125, 139, 0.1);
      color: #455a64;
    }

    .close-btn .material-icons {
      font-size: 1rem;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .toolbar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;
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
    }

    .filters select {
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
      font-weight: 500;
    }

    .link:hover {
      text-decoration: underline;
    }

    .company-info .company-name {
      font-weight: 500;
      color: #111827;
    }

    .company-info .lead-id {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .value-cell {
      font-weight: 500;
      color: #059669;
    }

    .text-muted {
      color: #9ca3af;
    }

    .status-badge, .approval-badge, .priority-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-open {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .status-quoted {
      background: #fef3c7;
      color: #d97706;
    }

    .status-closed {
      background: #d1fae5;
      color: #065f46;
    }

    .status-cancelled {
      background: #fee2e2;
      color: #dc2626;
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

    .priority-high {
      background: #fee2e2;
      color: #dc2626;
    }

    .priority-medium {
      background: #fef3c7;
      color: #d97706;
    }

    .priority-low {
      background: #d1fae5;
      color: #065f46;
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
export class EnquiryManagementComponent implements OnInit {
  enquiries: CrmEnquiry[] = [];
  filteredEnquiries: CrmEnquiry[] = [];
  
  searchQuery = '';
  statusFilter = '';
  priorityFilter = '';
  approvalFilter = '';
  showCreateMessage = false;

  constructor(
    private crmService: MockCrmService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEnquiries();
  }

  loadEnquiries() {
    // Mock data - replace with actual API call
    this.enquiries = [
      {
        enquiryID: 'ENQ-001',
        leadID: 'L-1001',
        leadCompany: 'Acme Exports',
        leadContact: 'Priya N',
        enquiryDate: new Date('2024-01-15'),
        serviceTypeID: 'ST-001',
        serviceTypeName: 'Ocean Freight',
        requirements: 'Container shipment from Mumbai to Dubai',
        expectedValue: 250000,
        expectedDate: new Date('2024-02-15'),
        status: 'OPEN',
        approvalStatus: 'NOT_REQUIRED',
        assignedTo: 'Alex',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-15'),
        priority: 'HIGH'
      },
      {
        enquiryID: 'ENQ-002',
        leadID: 'L-1002',
        leadCompany: 'Marina Logistics',
        leadContact: 'Ravi K',
        enquiryDate: new Date('2024-01-18'),
        serviceTypeID: 'ST-002',
        serviceTypeName: 'Air Freight',
        requirements: 'Urgent electronics shipment',
        expectedValue: 180000,
        expectedDate: new Date('2024-02-01'),
        status: 'QUOTED',
        approvalStatus: 'APPROVED',
        assignedTo: 'Dana',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-18'),
        priority: 'HIGH'
      },
      {
        enquiryID: 'ENQ-003',
        leadID: 'L-1003',
        leadCompany: 'Zen Traders',
        leadContact: 'Ishita S',
        enquiryDate: new Date('2024-01-22'),
        serviceTypeID: 'ST-003',
        serviceTypeName: 'Land Transport',
        requirements: 'Cross-border trucking services',
        expectedValue: 620000,
        expectedDate: new Date('2024-03-01'),
        status: 'OPEN',
        approvalStatus: 'PENDING',
        assignedTo: 'Alex',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-22'),
        priority: 'MEDIUM'
      }
    ];
    
    this.filteredEnquiries = [...this.enquiries];
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEnquiries = this.enquiries.filter(enquiry => {
      const matchesSearch = !this.searchQuery || 
        enquiry.leadCompany.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        enquiry.leadContact.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        enquiry.enquiryID.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = !this.statusFilter || enquiry.status === this.statusFilter;
      const matchesPriority = !this.priorityFilter || enquiry.priority === this.priorityFilter;
      const matchesApproval = !this.approvalFilter || enquiry.approvalStatus === this.approvalFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesApproval;
    });
  }

  getTotalEnquiries(): number {
    return this.enquiries.length;
  }

  getOpenEnquiries(): number {
    return this.enquiries.filter(e => e.status === 'OPEN').length;
  }

  getQuotedEnquiries(): number {
    return this.enquiries.filter(e => e.status === 'QUOTED').length;
  }

  getPendingApprovals(): number {
    return this.enquiries.filter(e => e.approvalStatus === 'PENDING').length;
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

  createNewEnquiry() {
    // Show inline message instead of alert
    this.showCreateMessage = true;
    // Auto-hide message after 3 seconds
    setTimeout(() => {
      this.showCreateMessage = false;
    }, 3000);
  }

  viewEnquiry(enquiryId: string) {
    this.router.navigate(['/crm/enquiries', enquiryId]);
  }

  editEnquiry(enquiryId: string) {
    this.router.navigate(['/crm/enquiries', enquiryId, 'edit']);
  }

  generateQuote(enquiryId: string) {
    this.router.navigate(['/crm/quotes/new'], { queryParams: { enquiryId } });
  }
}
