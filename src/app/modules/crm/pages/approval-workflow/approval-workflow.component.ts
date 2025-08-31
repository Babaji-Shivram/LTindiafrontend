import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockCrmService } from '../../services/mock-crm.service';

interface ApprovalWorkflow {
  workflowID: string;
  entityType: 'LEAD' | 'ENQUIRY' | 'QUOTE' | 'CONTRACT';
  entityID: string;
  entityNumber: string;
  entityTitle: string;
  currentStage: string;
  currentApproverID: string;
  currentApproverName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestedBy: string;
  requestedOn: Date;
  completedOn?: Date;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  remarks: string;
  approvalStages: ApprovalStage[];
}

interface ApprovalStage {
  stageID: string;
  stageName: string;
  stageOrder: number;
  approverID: string;
  approverName: string;
  approverRole: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SKIPPED';
  actionDate?: Date;
  remarks?: string;
  isCurrentStage: boolean;
}

@Component({
  selector: 'app-approval-workflow',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Approval Workflows</h1>
            <p class="page-subtitle">Manage approval processes for CRM entities</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-secondary" (click)="refreshWorkflows()">
              <span class="material-icons">refresh</span>
              Refresh
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
                 placeholder="Search workflows..."
                 (input)="onSearch()">
        </div>
        <div class="filters">
          <select [(ngModel)]="entityTypeFilter" (change)="onFilterChange()">
            <option value="">All Types</option>
            <option value="LEAD">Lead</option>
            <option value="ENQUIRY">Enquiry</option>
            <option value="QUOTE">Quote</option>
            <option value="CONTRACT">Contract</option>
          </select>
          <select [(ngModel)]="statusFilter" (change)="onFilterChange()">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select [(ngModel)]="priorityFilter" (change)="onFilterChange()">
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-icon bg-orange-500">
            <span class="material-icons">pending_actions</span>
          </div>
          <div class="card-content">
            <h3>{{ getPendingWorkflows() }}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-blue-500">
            <span class="material-icons">assignment_ind</span>
          </div>
          <div class="card-content">
            <h3>{{ getMyPendingApprovals() }}</h3>
            <p>Assigned to Me</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-green-500">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="card-content">
            <h3>{{ getApprovedWorkflows() }}</h3>
            <p>Approved Today</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-red-500">
            <span class="material-icons">cancel</span>
          </div>
          <div class="card-content">
            <h3>{{ getRejectedWorkflows() }}</h3>
            <p>Rejected Today</p>
          </div>
        </div>
      </div>

      <!-- Workflows Table -->
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Type</th>
              <th>Current Stage</th>
              <th>Current Approver</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Requested By</th>
              <th>Requested On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let workflow of filteredWorkflows">
              <td>
                <div class="entity-info">
                  <div class="entity-number">{{ workflow.entityNumber }}</div>
                  <div class="entity-title">{{ workflow.entityTitle }}</div>
                </div>
              </td>
              <td>
                <span class="entity-type-badge" [class]="'type-' + workflow.entityType.toLowerCase()">
                  {{ workflow.entityType }}
                </span>
              </td>
              <td>{{ workflow.currentStage }}</td>
              <td>
                <div class="approver-info">
                  <div class="approver-name">{{ workflow.currentApproverName }}</div>
                </div>
              </td>
              <td>
                <span class="status-badge" [class]="'status-' + workflow.status.toLowerCase()">
                  {{ workflow.status }}
                </span>
              </td>
              <td>
                <span class="priority-badge" [class]="'priority-' + workflow.priority.toLowerCase()">
                  {{ workflow.priority }}
                </span>
              </td>
              <td>{{ workflow.requestedBy }}</td>
              <td>{{ workflow.requestedOn | date:'MMM d, yyyy h:mm a' }}</td>
              <td class="actions-cell">
                <button class="btn-icon" 
                        (click)="viewWorkflow(workflow.workflowID)"
                        title="View Details">
                  <span class="material-icons">visibility</span>
                </button>
                <button class="btn-icon approve-btn" 
                        *ngIf="canApprove(workflow)"
                        (click)="approveWorkflow(workflow.workflowID)"
                        title="Approve">
                  <span class="material-icons">check</span>
                </button>
                <button class="btn-icon reject-btn" 
                        *ngIf="canApprove(workflow)"
                        (click)="rejectWorkflow(workflow.workflowID)"
                        title="Reject">
                  <span class="material-icons">close</span>
                </button>
                <button class="btn-icon" 
                        (click)="viewEntity(workflow.entityType, workflow.entityID)"
                        title="View Entity">
                  <span class="material-icons">open_in_new</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Workflow Detail Modal -->
      <div class="modal-overlay" *ngIf="selectedWorkflow" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Approval Workflow Details</h3>
            <button class="close-btn" (click)="closeModal()">
              <span class="material-icons">close</span>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="workflow-overview">
              <div class="overview-item">
                <label>Entity:</label>
                <span>{{ selectedWorkflow.entityNumber }} - {{ selectedWorkflow.entityTitle }}</span>
              </div>
              <div class="overview-item">
                <label>Type:</label>
                <span class="entity-type-badge" [class]="'type-' + selectedWorkflow.entityType.toLowerCase()">
                  {{ selectedWorkflow.entityType }}
                </span>
              </div>
              <div class="overview-item">
                <label>Status:</label>
                <span class="status-badge" [class]="'status-' + selectedWorkflow.status.toLowerCase()">
                  {{ selectedWorkflow.status }}
                </span>
              </div>
              <div class="overview-item">
                <label>Priority:</label>
                <span class="priority-badge" [class]="'priority-' + selectedWorkflow.priority.toLowerCase()">
                  {{ selectedWorkflow.priority }}
                </span>
              </div>
            </div>

            <div class="approval-stages">
              <h4>Approval Stages</h4>
              <div class="stages-timeline">
                <div *ngFor="let stage of selectedWorkflow.approvalStages" 
                     class="stage-item"
                     [class.current]="stage.isCurrentStage"
                     [class.completed]="stage.status === 'APPROVED'"
                     [class.rejected]="stage.status === 'REJECTED'">
                  <div class="stage-icon">
                    <span class="material-icons" *ngIf="stage.status === 'APPROVED'">check</span>
                    <span class="material-icons" *ngIf="stage.status === 'REJECTED'">close</span>
                    <span class="material-icons" *ngIf="stage.status === 'PENDING' && stage.isCurrentStage">radio_button_unchecked</span>
                    <span class="material-icons" *ngIf="stage.status === 'PENDING' && !stage.isCurrentStage">schedule</span>
                  </div>
                  <div class="stage-content">
                    <div class="stage-header">
                      <h5>{{ stage.stageName }}</h5>
                      <span class="stage-status" [class]="'status-' + stage.status.toLowerCase()">
                        {{ stage.status }}
                      </span>
                    </div>
                    <div class="stage-details">
                      <p><strong>Approver:</strong> {{ stage.approverName }} ({{ stage.approverRole }})</p>
                      <p *ngIf="stage.actionDate"><strong>Action Date:</strong> {{ stage.actionDate | date:'MMM d, yyyy h:mm a' }}</p>
                      <p *ngIf="stage.remarks"><strong>Remarks:</strong> {{ stage.remarks }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Approval Actions -->
            <div class="approval-actions" *ngIf="canApproveSelected()">
              <h4>Take Action</h4>
              <div class="action-form">
                <textarea [(ngModel)]="actionRemarks" 
                          placeholder="Enter remarks (optional)"
                          rows="3"></textarea>
                <div class="action-buttons">
                  <button class="btn btn-success" (click)="approveSelected()">
                    <span class="material-icons">check</span>
                    Approve
                  </button>
                  <button class="btn btn-danger" (click)="rejectSelected()">
                    <span class="material-icons">close</span>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredWorkflows.length === 0" class="empty-state">
        <div class="empty-icon">
          <span class="material-icons">approval</span>
        </div>
        <h3>No approval workflows found</h3>
        <p>All workflows are processed or adjust your filters</p>
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

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    .btn-success {
      background: #059669;
      color: white;
    }

    .btn-success:hover {
      background: #047857;
    }

    .btn-danger {
      background: #dc2626;
      color: white;
    }

    .btn-danger:hover {
      background: #b91c1c;
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

    .entity-info .entity-number {
      font-weight: 600;
      color: #3b82f6;
    }

    .entity-info .entity-title {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .approver-info .approver-name {
      font-weight: 500;
      color: #111827;
    }

    .entity-type-badge, .status-badge, .priority-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .type-lead {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .type-enquiry {
      background: #fef3c7;
      color: #d97706;
    }

    .type-quote {
      background: #e0e7ff;
      color: #6366f1;
    }

    .type-contract {
      background: #d1fae5;
      color: #065f46;
    }

    .status-pending {
      background: #fef3c7;
      color: #d97706;
    }

    .status-approved {
      background: #d1fae5;
      color: #065f46;
    }

    .status-rejected {
      background: #fee2e2;
      color: #dc2626;
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

    .approve-btn {
      color: #059669;
      border-color: #059669;
    }

    .approve-btn:hover {
      background: #d1fae5;
    }

    .reject-btn {
      color: #dc2626;
      border-color: #dc2626;
    }

    .reject-btn:hover {
      background: #fee2e2;
    }

    .btn-icon .material-icons {
      font-size: 1rem;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 0.5rem;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
      color: #111827;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      padding: 0.25rem;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .workflow-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .overview-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .overview-item label {
      font-weight: 500;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .approval-stages h4 {
      margin: 0 0 1rem 0;
      color: #111827;
    }

    .stages-timeline {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stage-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }

    .stage-item.current {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    .stage-item.completed {
      border-color: #059669;
      background: #ecfdf5;
    }

    .stage-item.rejected {
      border-color: #dc2626;
      background: #fef2f2;
    }

    .stage-icon {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      color: #6b7280;
    }

    .stage-item.current .stage-icon {
      background: #3b82f6;
      color: white;
    }

    .stage-item.completed .stage-icon {
      background: #059669;
      color: white;
    }

    .stage-item.rejected .stage-icon {
      background: #dc2626;
      color: white;
    }

    .stage-content {
      flex: 1;
    }

    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .stage-header h5 {
      margin: 0;
      color: #111827;
    }

    .stage-details p {
      margin: 0.25rem 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .approval-actions h4 {
      margin: 2rem 0 1rem 0;
      color: #111827;
    }

    .action-form textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      resize: vertical;
      margin-bottom: 1rem;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
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
      margin: 0;
    }
  `]
})
export class ApprovalWorkflowComponent implements OnInit {
  workflows: ApprovalWorkflow[] = [];
  filteredWorkflows: ApprovalWorkflow[] = [];
  selectedWorkflow: ApprovalWorkflow | null = null;
  
  searchQuery = '';
  entityTypeFilter = '';
  statusFilter = '';
  priorityFilter = '';
  
  currentUserId = 'USER-001'; // Mock current user ID
  actionRemarks = '';

  constructor(
    private crmService: MockCrmService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadWorkflows();
  }

  loadWorkflows() {
    // Mock data - replace with actual API call
    this.workflows = [
      {
        workflowID: 'WF-001',
        entityType: 'QUOTE',
        entityID: 'QUO-003',
        entityNumber: 'Q-2024-003',
        entityTitle: 'Land Transport Quote for Zen Traders',
        currentStage: 'Manager Approval',
        currentApproverID: 'USER-002',
        currentApproverName: 'Sarah Johnson',
        status: 'PENDING',
        requestedBy: 'Alex',
        requestedOn: new Date('2024-01-28T10:30:00'),
        priority: 'HIGH',
        remarks: 'High value quote requires approval',
        approvalStages: [
          {
            stageID: 'ST-1',
            stageName: 'Team Lead Approval',
            stageOrder: 1,
            approverID: 'USER-001',
            approverName: 'Mike Chen',
            approverRole: 'Team Lead',
            status: 'APPROVED',
            actionDate: new Date('2024-01-28T11:00:00'),
            remarks: 'Approved - pricing looks good',
            isCurrentStage: false
          },
          {
            stageID: 'ST-2',
            stageName: 'Manager Approval',
            stageOrder: 2,
            approverID: 'USER-002',
            approverName: 'Sarah Johnson',
            approverRole: 'Manager',
            status: 'PENDING',
            isCurrentStage: true
          }
        ]
      },
      {
        workflowID: 'WF-002',
        entityType: 'ENQUIRY',
        entityID: 'ENQ-004',
        entityNumber: 'ENQ-004',
        entityTitle: 'Ocean Freight Enquiry for Global Shipping',
        currentStage: 'Senior Manager Approval',
        currentApproverID: 'USER-003',
        currentApproverName: 'David Park',
        status: 'PENDING',
        requestedBy: 'Dana',
        requestedOn: new Date('2024-01-29T09:15:00'),
        priority: 'MEDIUM',
        remarks: 'Special pricing request needs approval',
        approvalStages: [
          {
            stageID: 'ST-1',
            stageName: 'Team Lead Approval',
            stageOrder: 1,
            approverID: 'USER-001',
            approverName: 'Mike Chen',
            approverRole: 'Team Lead',
            status: 'APPROVED',
            actionDate: new Date('2024-01-29T10:00:00'),
            remarks: 'Approved for special pricing',
            isCurrentStage: false
          },
          {
            stageID: 'ST-2',
            stageName: 'Manager Approval',
            stageOrder: 2,
            approverID: 'USER-002',
            approverName: 'Sarah Johnson',
            approverRole: 'Manager',
            status: 'APPROVED',
            actionDate: new Date('2024-01-29T14:30:00'),
            remarks: 'Approved - customer is strategic',
            isCurrentStage: false
          },
          {
            stageID: 'ST-3',
            stageName: 'Senior Manager Approval',
            stageOrder: 3,
            approverID: 'USER-003',
            approverName: 'David Park',
            approverRole: 'Senior Manager',
            status: 'PENDING',
            isCurrentStage: true
          }
        ]
      }
    ];
    
    this.filteredWorkflows = [...this.workflows];
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredWorkflows = this.workflows.filter(workflow => {
      const matchesSearch = !this.searchQuery || 
        workflow.entityNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        workflow.entityTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        workflow.currentApproverName.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesEntityType = !this.entityTypeFilter || workflow.entityType === this.entityTypeFilter;
      const matchesStatus = !this.statusFilter || workflow.status === this.statusFilter;
      const matchesPriority = !this.priorityFilter || workflow.priority === this.priorityFilter;

      return matchesSearch && matchesEntityType && matchesStatus && matchesPriority;
    });
  }

  getPendingWorkflows(): number {
    return this.workflows.filter(w => w.status === 'PENDING').length;
  }

  getMyPendingApprovals(): number {
    return this.workflows.filter(w => 
      w.status === 'PENDING' && w.currentApproverID === this.currentUserId
    ).length;
  }

  getApprovedWorkflows(): number {
    const today = new Date().toDateString();
    return this.workflows.filter(w => 
      w.status === 'APPROVED' && 
      w.completedOn && 
      w.completedOn.toDateString() === today
    ).length;
  }

  getRejectedWorkflows(): number {
    const today = new Date().toDateString();
    return this.workflows.filter(w => 
      w.status === 'REJECTED' && 
      w.completedOn && 
      w.completedOn.toDateString() === today
    ).length;
  }

  canApprove(workflow: ApprovalWorkflow): boolean {
    return workflow.status === 'PENDING' && workflow.currentApproverID === this.currentUserId;
  }

  canApproveSelected(): boolean {
    return this.selectedWorkflow ? this.canApprove(this.selectedWorkflow) : false;
  }

  viewWorkflow(workflowId: string) {
    this.selectedWorkflow = this.workflows.find(w => w.workflowID === workflowId) || null;
    this.actionRemarks = '';
  }

  closeModal() {
    this.selectedWorkflow = null;
    this.actionRemarks = '';
  }

  viewEntity(entityType: string, entityId: string) {
    const routes = {
      'LEAD': '/crm/leads',
      'ENQUIRY': '/crm/enquiries',
      'QUOTE': '/crm/quotes',
      'CONTRACT': '/crm/contracts'
    };
    
    const route = routes[entityType as keyof typeof routes];
    if (route) {
      this.router.navigate([route, entityId]);
    }
  }

  approveWorkflow(workflowId: string) {
    const workflow = this.workflows.find(w => w.workflowID === workflowId);
    if (workflow && this.canApprove(workflow)) {
      this.processApproval(workflow, 'APPROVED', '');
    }
  }

  rejectWorkflow(workflowId: string) {
    const workflow = this.workflows.find(w => w.workflowID === workflowId);
    if (workflow && this.canApprove(workflow)) {
      this.processApproval(workflow, 'REJECTED', '');
    }
  }

  approveSelected() {
    if (this.selectedWorkflow && this.canApproveSelected()) {
      this.processApproval(this.selectedWorkflow, 'APPROVED', this.actionRemarks);
      this.closeModal();
    }
  }

  rejectSelected() {
    if (this.selectedWorkflow && this.canApproveSelected()) {
      this.processApproval(this.selectedWorkflow, 'REJECTED', this.actionRemarks);
      this.closeModal();
    }
  }

  private processApproval(workflow: ApprovalWorkflow, action: 'APPROVED' | 'REJECTED', remarks: string) {
    // Update current stage
    const currentStage = workflow.approvalStages.find(s => s.isCurrentStage);
    if (currentStage) {
      currentStage.status = action;
      currentStage.actionDate = new Date();
      currentStage.remarks = remarks;
      currentStage.isCurrentStage = false;
    }

    // Check if there's a next stage
    const nextStage = workflow.approvalStages.find(s => 
      s.stageOrder > (currentStage?.stageOrder || 0) && s.status === 'PENDING'
    );

    if (action === 'APPROVED' && nextStage) {
      // Move to next stage
      nextStage.isCurrentStage = true;
      workflow.currentStage = nextStage.stageName;
      workflow.currentApproverID = nextStage.approverID;
      workflow.currentApproverName = nextStage.approverName;
    } else {
      // Final approval or rejection
      workflow.status = action;
      workflow.completedOn = new Date();
    }

    this.applyFilters();
  }

  refreshWorkflows() {
    this.loadWorkflows();
  }
}
