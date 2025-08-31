import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface ApprovalItem {
  id: string;
  type: 'QUOTE' | 'CONTRACT' | 'DISCOUNT' | 'LEAD';
  entityNumber: string;
  entityTitle: string;
  company: string;
  value: number;
  requestedBy: string;
  requestedOn: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  currentApprover: string;
  daysAgo: number;
}

interface WorkflowItem {
  id: string;
  entityType: 'QUOTE' | 'CONTRACT' | 'LEAD' | 'ENQUIRY';
  entityNumber: string;
  entityTitle: string;
  company: string;
  currentStage: string;
  currentApprover: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdDate: Date;
  stages: WorkflowStage[];
}

interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  status: 'COMPLETED' | 'CURRENT' | 'PENDING';
  approver: string;
  approvedDate?: Date;
  remarks?: string;
}

@Component({
  selector: 'app-process-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="process-page">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <div>
            <h1 class="page-title">Process Management</h1>
            <p class="page-subtitle">Unified approval workflows and process tracking</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline" (click)="refreshData()">
              <span class="material-icons">refresh</span>
              Refresh
            </button>
            <button class="btn btn-primary" (click)="createNewRequest()">
              <span class="material-icons">add</span>
              New Request
            </button>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="stats-grid">
        <div class="stat-card pending">
          <div class="stat-icon">⏳</div>
          <div class="stat-content">
            <div class="stat-value">{{ getPendingCount() }}</div>
            <div class="stat-label">Pending Approvals</div>
          </div>
        </div>
        <div class="stat-card my-tasks">
          <div class="stat-icon">👤</div>
          <div class="stat-content">
            <div class="stat-value">{{ getMyTasksCount() }}</div>
            <div class="stat-label">Assigned to Me</div>
          </div>
        </div>
        <div class="stat-card approved">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-value">{{ getApprovedTodayCount() }}</div>
            <div class="stat-label">Approved Today</div>
          </div>
        </div>
        <div class="stat-card in-progress">
          <div class="stat-icon">🔄</div>
          <div class="stat-content">
            <div class="stat-value">{{ getInProgressCount() }}</div>
            <div class="stat-label">In Progress</div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'my-tasks'"
          (click)="switchTab('my-tasks')">
          <span class="material-icons">assignment_ind</span>
          My Tasks ({{ getMyTasksCount() }})
        </button>
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'all-approvals'"
          (click)="switchTab('all-approvals')">
          <span class="material-icons">list</span>
          All Approvals ({{ getPendingCount() }})
        </button>
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'workflow-tracking'"
          (click)="switchTab('workflow-tracking')">
          <span class="material-icons">timeline</span>
          Process Tracking ({{ getInProgressCount() }})
        </button>
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'analytics'"
          (click)="switchTab('analytics')">
          <span class="material-icons">analytics</span>
          Analytics
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-grid">
          <div class="filter-group">
            <label>Search</label>
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="applyFilters()"
              placeholder="Search by company, number, or title..."
              class="filter-input">
          </div>
          <div class="filter-group">
            <label>Type</label>
            <select [(ngModel)]="typeFilter" (change)="applyFilters()" class="filter-select">
              <option value="">All Types</option>
              <option value="QUOTE">Quotes</option>
              <option value="CONTRACT">Contracts</option>
              <option value="LEAD">Leads</option>
              <option value="DISCOUNT">Discounts</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Priority</label>
            <select [(ngModel)]="priorityFilter" (change)="applyFilters()" class="filter-select">
              <option value="">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select [(ngModel)]="statusFilter" (change)="applyFilters()" class="filter-select">
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        
        <!-- My Tasks Tab -->
        <div *ngIf="activeTab === 'my-tasks'" class="tab-panel">
          <div class="panel-header">
            <h3>Items Requiring Your Action</h3>
            <span class="item-count">{{ getFilteredMyTasks().length }} items</span>
          </div>
          
          <div class="tasks-grid">
            <div *ngFor="let task of getFilteredMyTasks()" class="task-card">
              <div class="task-header">
                <div class="task-type" [class]="'type-' + task.type.toLowerCase()">
                  {{ task.type }}
                </div>
                <div class="task-priority" [class]="'priority-' + task.priority.toLowerCase()">
                  {{ task.priority }}
                </div>
              </div>
              
              <div class="task-content">
                <div class="task-title">{{ task.entityTitle }}</div>
                <div class="task-company">{{ task.company }}</div>
                <div class="task-value">{{ task.value | currency:'USD':'symbol':'1.0-0' }}</div>
                <div class="task-meta">
                  <span>{{ task.entityNumber }}</span> • 
                  <span>{{ task.requestedBy }}</span> • 
                  <span>{{ task.daysAgo }} days ago</span>
                </div>
              </div>
              
              <div class="task-actions">
                <button class="btn-action approve" (click)="approveTask(task.id)">
                  <span class="material-icons">check</span>
                  Approve
                </button>
                <button class="btn-action reject" (click)="rejectTask(task.id)">
                  <span class="material-icons">close</span>
                  Reject
                </button>
                <button class="btn-action view" (click)="viewTaskDetails(task.id)">
                  <span class="material-icons">visibility</span>
                  Details
                </button>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div *ngIf="getFilteredMyTasks().length === 0" class="empty-state">
            <div class="empty-icon">🎉</div>
            <h3>All caught up!</h3>
            <p>No pending approvals assigned to you.</p>
          </div>
        </div>

        <!-- All Approvals Tab -->
        <div *ngIf="activeTab === 'all-approvals'" class="tab-panel">
          <div class="panel-header">
            <h3>All Approval Requests</h3>
            <span class="item-count">{{ getFilteredApprovals().length }} items</span>
          </div>
          
          <div class="approvals-table">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Entity</th>
                  <th>Company</th>
                  <th>Value</th>
                  <th>Requested By</th>
                  <th>Current Approver</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let approval of getFilteredApprovals()">
                  <td>
                    <span class="type-badge" [class]="'type-' + approval.type.toLowerCase()">
                      {{ approval.type }}
                    </span>
                  </td>
                  <td>
                    <div class="entity-info">
                      <div class="entity-number">{{ approval.entityNumber }}</div>
                      <div class="entity-title">{{ approval.entityTitle }}</div>
                    </div>
                  </td>
                  <td>{{ approval.company }}</td>
                  <td>{{ approval.value | currency:'USD':'symbol':'1.0-0' }}</td>
                  <td>{{ approval.requestedBy }}</td>
                  <td>{{ approval.currentApprover }}</td>
                  <td>
                    <span class="status-badge" [class]="'status-' + approval.status.toLowerCase()">
                      {{ approval.status }}
                    </span>
                  </td>
                  <td>
                    <span class="priority-badge" [class]="'priority-' + approval.priority.toLowerCase()">
                      {{ approval.priority }}
                    </span>
                  </td>
                  <td>{{ approval.daysAgo }}d</td>
                  <td>
                    <div class="table-actions">
                      <button class="btn-icon" (click)="viewApprovalDetails(approval.id)" title="View Details">
                        <span class="material-icons">visibility</span>
                      </button>
                      <button *ngIf="canApprove(approval)" class="btn-icon approve" (click)="approveTask(approval.id)" title="Approve">
                        <span class="material-icons">check</span>
                      </button>
                      <button *ngIf="canApprove(approval)" class="btn-icon reject" (click)="rejectTask(approval.id)" title="Reject">
                        <span class="material-icons">close</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Workflow Tracking Tab -->
        <div *ngIf="activeTab === 'workflow-tracking'" class="tab-panel">
          <div class="panel-header">
            <h3>Process Flow Tracking</h3>
            <span class="item-count">{{ getFilteredWorkflows().length }} processes</span>
          </div>
          
          <div class="workflows-list">
            <div *ngFor="let workflow of getFilteredWorkflows()" class="workflow-card">
              <div class="workflow-header">
                <div class="workflow-info">
                  <div class="workflow-title">{{ workflow.entityTitle }}</div>
                  <div class="workflow-meta">
                    {{ workflow.entityNumber }} • {{ workflow.company }}
                  </div>
                </div>
                <div class="workflow-status">
                  <span class="status-badge" [class]="'status-' + workflow.status.toLowerCase()">
                    {{ workflow.status }}
                  </span>
                </div>
              </div>
              
              <div class="workflow-stages">
                <div *ngFor="let stage of workflow.stages" 
                     class="stage-item" 
                     [class]="'stage-' + stage.status.toLowerCase()">
                  <div class="stage-icon">
                    <span class="material-icons" *ngIf="stage.status === 'COMPLETED'">check_circle</span>
                    <span class="material-icons" *ngIf="stage.status === 'CURRENT'">radio_button_checked</span>
                    <span class="material-icons" *ngIf="stage.status === 'PENDING'">radio_button_unchecked</span>
                  </div>
                  <div class="stage-content">
                    <div class="stage-name">{{ stage.name }}</div>
                    <div class="stage-approver">{{ stage.approver }}</div>
                    <div *ngIf="stage.approvedDate" class="stage-date">
                      {{ stage.approvedDate | date:'MMM d, yyyy' }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="workflow-actions">
                <button class="btn-outline-sm" (click)="viewWorkflowDetails(workflow.id)">
                  <span class="material-icons">timeline</span>
                  View Timeline
                </button>
                <button *ngIf="workflow.currentApprover === currentUser" class="btn-primary-sm" (click)="takeAction(workflow.id)">
                  <span class="material-icons">assignment_turned_in</span>
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Tab -->
        <div *ngIf="activeTab === 'analytics'" class="tab-panel">
          <div class="panel-header">
            <h3>Process Analytics</h3>
            <span class="item-count">Performance insights</span>
          </div>
          
          <div class="analytics-grid">
            <div class="analytics-card">
              <h4>Approval Performance</h4>
              <div class="analytics-chart">
                <div class="chart-placeholder">
                  📊 Average approval time: 2.3 days
                </div>
              </div>
            </div>
            
            <div class="analytics-card">
              <h4>Process Bottlenecks</h4>
              <div class="bottleneck-list">
                <div class="bottleneck-item">
                  <span class="bottleneck-stage">Manager Approval</span>
                  <span class="bottleneck-time">3.2 days avg</span>
                </div>
                <div class="bottleneck-item">
                  <span class="bottleneck-stage">Finance Review</span>
                  <span class="bottleneck-time">1.8 days avg</span>
                </div>
              </div>
            </div>
            
            <div class="analytics-card">
              <h4>Approval Rate</h4>
              <div class="approval-rate">
                <div class="rate-value">94.2%</div>
                <div class="rate-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Modal -->
      <div *ngIf="showActionModal" class="modal-overlay" (click)="closeActionModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ actionModalTitle }}</h3>
            <button class="btn-close" (click)="closeActionModal()">
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="action-form">
              <label>Remarks (Optional)</label>
              <textarea 
                [(ngModel)]="actionRemarks" 
                placeholder="Enter your comments..."
                rows="3"
                class="form-textarea"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeActionModal()">Cancel</button>
            <button class="btn" [class]="actionModalType === 'approve' ? 'btn-success' : 'btn-danger'" 
                    (click)="confirmAction()">
              {{ actionModalType === 'approve' ? 'Approve' : 'Reject' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .process-page {
      padding: 24px;
      background: #f9fafb;
      min-height: 100vh;
    }

    /* Header */
    .page-header {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
    }

    .page-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #2c4170;
      margin: 0 0 4px 0;
    }

    .page-subtitle {
      color: #6b7280;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #e5e7eb;
    }

    .stat-card.pending { border-left-color: #f59e0b; }
    .stat-card.my-tasks { border-left-color: #3b82f6; }
    .stat-card.approved { border-left-color: #10b981; }
    .stat-card.in-progress { border-left-color: #8b5cf6; }

    .stat-icon {
      font-size: 24px;
      width: 40px;
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      line-height: 1;
    }

    .stat-label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    /* Tabs */
    .tab-navigation {
      background: white;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      gap: 4px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
      color: #6b7280;
    }

    .tab-btn:hover {
      background: #f3f4f6;
      color: #374151;
    }

    .tab-btn.active {
      background: #2c4170;
      color: white;
    }

    /* Filters */
    .filters-section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .filters-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 16px;
    }

    .filter-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 4px;
      font-size: 0.875rem;
    }

    .filter-input, .filter-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    /* Tab Content */
    .tab-content {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .tab-panel {
      padding: 24px;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .panel-header h3 {
      margin: 0;
      color: #111827;
    }

    .item-count {
      color: #6b7280;
      font-size: 0.875rem;
    }

    /* Task Cards */
    .tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 16px;
    }

    .task-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.2s ease;
    }

    .task-card:hover {
      border-color: #2c4170;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(44, 65, 112, 0.1);
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .task-type {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .type-quote { background: #dbeafe; color: #1d4ed8; }
    .type-contract { background: #d1fae5; color: #065f46; }
    .type-discount { background: #fef3c7; color: #d97706; }
    .type-lead { background: #e0e7ff; color: #6366f1; }

    .task-priority {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-high { background: #fee2e2; color: #dc2626; }
    .priority-medium { background: #fef3c7; color: #d97706; }
    .priority-low { background: #d1fae5; color: #065f46; }

    .task-title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 4px;
    }

    .task-company {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 4px;
    }

    .task-value {
      font-weight: 600;
      color: #059669;
      margin-bottom: 8px;
    }

    .task-meta {
      color: #9ca3af;
      font-size: 0.75rem;
      margin-bottom: 16px;
    }

    .task-actions {
      display: flex;
      gap: 8px;
    }

    .btn-action {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: 1px solid;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .btn-action.approve {
      border: 1px solid #d1fae5;
      color: #047857;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    }

    .btn-action.approve:hover {
      background: linear-gradient(135deg, #047857 0%, #065f46 100%);
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(4, 120, 87, 0.2);
    }

    .btn-action.reject {
      border: 1px solid #fee2e2;
      color: #b91c1c;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    }

    .btn-action.reject:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(185, 28, 28, 0.2);
    }

    .btn-action.view {
      border: 1px solid #dbeafe;
      color: #1d4ed8;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    }

    .btn-action.view:hover {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(44, 65, 112, 0.2);
    }

    /* Data Table */
    .approvals-table {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background: #f9fafb;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.875rem;
    }

    .data-table td {
      padding: 12px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 0.875rem;
    }

    .data-table tr:hover {
      background: #f9fafb;
    }

    .entity-info .entity-number {
      font-weight: 600;
      color: #2c4170;
    }

    .entity-info .entity-title {
      color: #6b7280;
      font-size: 0.75rem;
    }

    .type-badge, .status-badge, .priority-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-pending { background: #fef3c7; color: #d97706; }
    .status-approved { background: #d1fae5; color: #065f46; }
    .status-rejected { background: #fee2e2; color: #dc2626; }
    .status-in_progress { background: #e0e7ff; color: #6366f1; }

    .table-actions {
      display: flex;
      gap: 4px;
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-icon:hover {
      background: #f3f4f6;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .btn-icon.approve {
      color: #047857;
      border-color: #d1fae5;
    }

    .btn-icon.approve:hover {
      background: linear-gradient(135deg, #047857 0%, #065f46 100%);
      color: white;
      border-color: #047857;
    }

    .btn-icon.reject {
      color: #b91c1c;
      border-color: #fee2e2;
    }

    .btn-icon.reject:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
      color: white;
      border-color: #b91c1c;
    }

    /* Workflow Cards */
    .workflows-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .workflow-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
    }

    .workflow-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .workflow-title {
      font-weight: 600;
      color: #111827;
    }

    .workflow-meta {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .workflow-stages {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .stage-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 120px;
      text-align: center;
    }

    .stage-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .stage-completed .stage-icon {
      background: #d1fae5;
      color: #059669;
    }

    .stage-current .stage-icon {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
    }

    .stage-pending .stage-icon {
      background: #f3f4f6;
      color: #9ca3af;
    }

    .stage-name {
      font-weight: 500;
      font-size: 0.75rem;
      color: #111827;
    }

    .stage-approver {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .stage-date {
      font-size: 0.625rem;
      color: #9ca3af;
    }

    .workflow-actions {
      display: flex;
      gap: 8px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid transparent;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #1e2e4f 0%, #162238 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(44, 65, 112, 0.2);
    }

    .btn-outline {
      border: 1px solid #2c4170;
      color: #2c4170;
      background: white;
    }

    .btn-outline:hover {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
    }

    .btn-success {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: white;
      border: none;
    }

    .btn-success:hover {
      background: linear-gradient(135deg, #047857 0%, #065f46 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(5, 150, 105, 0.2);
    }

    .btn-danger {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      border: none;
    }

    .btn-danger:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(220, 38, 38, 0.2);
    }

    .btn-outline-sm, .btn-primary-sm {
      padding: 6px 12px;
      font-size: 0.75rem;
    }

    .btn-outline-sm {
      border: 1px solid #2c4170;
      color: #2c4170;
      background: white;
    }

    .btn-outline-sm:hover {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
    }

    .btn-primary-sm {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border: none;
    }

    .btn-primary-sm:hover {
      background: linear-gradient(135deg, #1e2e4f 0%, #162238 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(44, 65, 112, 0.2);
    }

    /* Analytics */
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .analytics-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
    }

    .analytics-card h4 {
      margin: 0 0 16px 0;
      color: #111827;
    }

    .chart-placeholder {
      text-align: center;
      padding: 40px;
      background: #f9fafb;
      border-radius: 6px;
      color: #6b7280;
    }

    .bottleneck-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bottleneck-item {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
    }

    .approval-rate {
      text-align: center;
    }

    .rate-value {
      font-size: 3rem;
      font-weight: 700;
      color: #059669;
      line-height: 1;
    }

    .rate-label {
      color: #6b7280;
      margin-top: 8px;
    }

    /* Modal */
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
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
    }

    .btn-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
    }

    .modal-body {
      padding: 20px;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 20px;
      border-top: 1px solid #e5e7eb;
    }

    .action-form label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
      color: #374151;
    }

    .form-textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      resize: vertical;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #6b7280;
    }

    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #111827;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .process-page {
        padding: 16px;
      }

      .header-content {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }

      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }

      .filters-grid {
        grid-template-columns: 1fr;
      }

      .tasks-grid {
        grid-template-columns: 1fr;
      }

      .tab-navigation {
        flex-direction: column;
      }

      .workflow-stages {
        flex-direction: column;
        align-items: flex-start;
      }

      .stage-item {
        flex-direction: row;
        align-items: center;
        text-align: left;
        gap: 12px;
      }
    }
  `]
})
export class ProcessManagementComponent implements OnInit {
  activeTab: 'my-tasks' | 'all-approvals' | 'workflow-tracking' | 'analytics' = 'my-tasks';
  
  // Filters
  searchTerm = '';
  typeFilter = '';
  priorityFilter = '';
  statusFilter = '';
  
  // Current user (mock)
  currentUser = 'Sarah Johnson';
  
  // Modal state
  showActionModal = false;
  actionModalTitle = '';
  actionModalType: 'approve' | 'reject' = 'approve';
  actionRemarks = '';
  selectedItemId = '';

  // Mock data
  approvals: ApprovalItem[] = [
    {
      id: 'APP-001',
      type: 'QUOTE',
      entityNumber: 'Q-2024-003',
      entityTitle: 'Land Transport Quote for Zen Traders',
      company: 'Zen Traders',
      value: 620000,
      requestedBy: 'Alex Johnson',
      requestedOn: new Date('2024-01-28'),
      status: 'PENDING',
      priority: 'HIGH',
      currentApprover: 'Sarah Johnson',
      daysAgo: 2
    },
    {
      id: 'APP-002',
      type: 'DISCOUNT',
      entityNumber: 'D-2024-001',
      entityTitle: 'Special Pricing Request',
      company: 'Global Shipping Ltd',
      value: 350000,
      requestedBy: 'Mike Chen',
      requestedOn: new Date('2024-01-29'),
      status: 'PENDING',
      priority: 'MEDIUM',
      currentApprover: 'David Park',
      daysAgo: 1
    },
    {
      id: 'APP-003',
      type: 'CONTRACT',
      entityNumber: 'C-2024-001',
      entityTitle: 'Ocean Freight Contract Terms',
      company: 'Ocean Freight Co',
      value: 850000,
      requestedBy: 'Sarah Wilson',
      requestedOn: new Date('2024-01-27'),
      status: 'PENDING',
      priority: 'HIGH',
      currentApprover: 'Sarah Johnson',
      daysAgo: 3
    }
  ];

  workflows: WorkflowItem[] = [
    {
      id: 'WF-001',
      entityType: 'QUOTE',
      entityNumber: 'Q-2024-003',
      entityTitle: 'Land Transport Quote for Zen Traders',
      company: 'Zen Traders',
      currentStage: 'Manager Approval',
      currentApprover: 'Sarah Johnson',
      status: 'PENDING',
      priority: 'HIGH',
      createdDate: new Date('2024-01-28'),
      stages: [
        {
          id: 'ST-1',
          name: 'Team Lead',
          order: 1,
          status: 'COMPLETED',
          approver: 'Mike Chen',
          approvedDate: new Date('2024-01-28'),
          remarks: 'Approved - pricing looks good'
        },
        {
          id: 'ST-2',
          name: 'Manager Approval',
          order: 2,
          status: 'CURRENT',
          approver: 'Sarah Johnson'
        },
        {
          id: 'ST-3',
          name: 'Director Sign-off',
          order: 3,
          status: 'PENDING',
          approver: 'David Park'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize with sample data
  }

  // Tab Management
  switchTab(tab: 'my-tasks' | 'all-approvals' | 'workflow-tracking' | 'analytics') {
    this.activeTab = tab;
  }

  // Filter Methods
  applyFilters() {
    // Filters will be applied in the getter methods
  }

  getFilteredMyTasks(): ApprovalItem[] {
    return this.approvals.filter(approval => {
      const matchesCurrentUser = approval.currentApprover === this.currentUser;
      const matchesSearch = !this.searchTerm || 
        approval.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        approval.entityNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        approval.entityTitle.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.typeFilter || approval.type === this.typeFilter;
      const matchesPriority = !this.priorityFilter || approval.priority === this.priorityFilter;
      const matchesStatus = !this.statusFilter || approval.status === this.statusFilter;
      
      return matchesCurrentUser && matchesSearch && matchesType && matchesPriority && matchesStatus;
    });
  }

  getFilteredApprovals(): ApprovalItem[] {
    return this.approvals.filter(approval => {
      const matchesSearch = !this.searchTerm || 
        approval.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        approval.entityNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        approval.entityTitle.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.typeFilter || approval.type === this.typeFilter;
      const matchesPriority = !this.priorityFilter || approval.priority === this.priorityFilter;
      const matchesStatus = !this.statusFilter || approval.status === this.statusFilter;
      
      return matchesSearch && matchesType && matchesPriority && matchesStatus;
    });
  }

  getFilteredWorkflows(): WorkflowItem[] {
    return this.workflows.filter(workflow => {
      const matchesSearch = !this.searchTerm || 
        workflow.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        workflow.entityNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        workflow.entityTitle.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.typeFilter || workflow.entityType === this.typeFilter;
      const matchesPriority = !this.priorityFilter || workflow.priority === this.priorityFilter;
      const matchesStatus = !this.statusFilter || workflow.status === this.statusFilter;
      
      return matchesSearch && matchesType && matchesPriority && matchesStatus;
    });
  }

  // Stats Methods
  getPendingCount(): number {
    return this.approvals.filter(a => a.status === 'PENDING').length;
  }

  getMyTasksCount(): number {
    return this.approvals.filter(a => a.currentApprover === this.currentUser && a.status === 'PENDING').length;
  }

  getApprovedTodayCount(): number {
    const today = new Date().toDateString();
    return this.approvals.filter(a => 
      a.status === 'APPROVED' && 
      a.requestedOn.toDateString() === today
    ).length;
  }

  getInProgressCount(): number {
    return this.workflows.filter(w => w.status === 'PENDING' || w.status === 'IN_PROGRESS').length;
  }

  // Action Methods
  canApprove(approval: ApprovalItem): boolean {
    return approval.currentApprover === this.currentUser && approval.status === 'PENDING';
  }

  approveTask(id: string) {
    this.selectedItemId = id;
    this.actionModalType = 'approve';
    this.actionModalTitle = 'Approve Request';
    this.showActionModal = true;
  }

  rejectTask(id: string) {
    this.selectedItemId = id;
    this.actionModalType = 'reject';
    this.actionModalTitle = 'Reject Request';
    this.showActionModal = true;
  }

  confirmAction() {
    const approval = this.approvals.find(a => a.id === this.selectedItemId);
    if (approval) {
      approval.status = this.actionModalType === 'approve' ? 'APPROVED' : 'REJECTED';
      console.log(`${this.actionModalType}d:`, approval.entityTitle, 'Remarks:', this.actionRemarks);
    }
    this.closeActionModal();
  }

  closeActionModal() {
    this.showActionModal = false;
    this.actionRemarks = '';
    this.selectedItemId = '';
  }

  viewTaskDetails(id: string) {
    console.log('View task details:', id);
    // Navigate to details page
  }

  viewApprovalDetails(id: string) {
    console.log('View approval details:', id);
    // Navigate to details page
  }

  viewWorkflowDetails(id: string) {
    console.log('View workflow details:', id);
    // Navigate to workflow timeline
  }

  takeAction(id: string) {
    const workflow = this.workflows.find(w => w.id === id);
    if (workflow) {
      // Find current stage and take action
      console.log('Take action on workflow:', workflow.entityTitle);
    }
  }

  refreshData() {
    console.log('Refreshing data...');
    // Reload data from services
  }

  createNewRequest() {
    console.log('Create new request');
    // Navigate to request creation
  }
}
