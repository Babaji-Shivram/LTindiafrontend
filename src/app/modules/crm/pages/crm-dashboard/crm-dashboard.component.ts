import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { 
  CrmDashboardService, 
  DashboardKPI, 
  FilterOptions, 
  CustomerOnBoard, 
  VisitData, 
  TargetMonthLead, 
  VolumeSummary, 
  ContractExpiry, 
  FollowupLead 
} from '../../services/crm-dashboard.service';

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrl: './crm-dashboard.component.css',
  template: `
    <div class="page-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <div>
            <h1 class="page-title">CRM Dashboard</h1>
            <p class="text-gray-600 text-sm">Comprehensive view of customer relationships and sales pipeline</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline text-sm">
              <span class="material-icons text-sm mr-2">file_download</span>
              Export Data
            </button>
            <button class="btn btn-primary text-sm">
              <span class="material-icons text-sm mr-2">add</span>
              Quick Add Lead
            </button>
          </div>
        </div>
      </div>

      <!-- KPI Cards Section -->
      <div class="kpi-section">
        <div *ngIf="isLoading.kpis" class="loading-placeholder">
          Loading KPI data...
        </div>
        <div *ngIf="!isLoading.kpis" class="kpi-cards-grid">
          <div *ngFor="let kpi of kpiCards" class="kpi-card" [style.background]="kpi.bgColor" (click)="navigateToKPI(kpi.route)">
            <div class="kpi-content">
              <div class="kpi-icon">
                <div class="kpi-icon-emoji">{{ kpi.emoji }}</div>
              </div>
              <div class="kpi-details">
                <div class="kpi-title">{{ kpi.title }}</div>
                <div class="kpi-count">{{ kpi.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Widget - NEW -->
      <div *ngIf="getPendingApprovalsCount() > 0" class="quick-actions-section">
        <div class="quick-actions-header">
          <h3 class="section-title">⚡ Action Required</h3>
          <span class="actions-subtitle">{{ getPendingApprovalsCount() }} items need your attention</span>
        </div>
        <div class="quick-actions-grid">
          <div *ngFor="let approval of getTopPendingApprovals()" class="quick-action-card">
            <div class="action-card-content">
              <div class="action-icon">
                <span class="material-icons" [ngClass]="getApprovalIconClass(approval.type)">{{ getApprovalIcon(approval.type) }}</span>
              </div>
              <div class="action-details">
                <div class="action-title">{{ approval.title }}</div>
                <div class="action-subtitle">{{ approval.company }} • {{ approval.value | currency:'USD':'symbol':'1.0-0' }}</div>
                <div class="action-meta">{{ approval.requestedBy }} • {{ approval.daysAgo }} days ago</div>
              </div>
              <div class="action-buttons">
                <button class="btn-quick btn-approve" (click)="quickApprove(approval.id)" title="Approve">
                  <span class="material-icons">check</span>
                </button>
                <button class="btn-quick btn-reject" (click)="quickReject(approval.id)" title="Reject">
                  <span class="material-icons">close</span>
                </button>
                <button class="btn-quick btn-view" (click)="viewApprovalDetails(approval.id)" title="View Details">
                  <span class="material-icons">visibility</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="quick-actions-footer">
          <button class="btn btn-outline text-sm" (click)="navigateToApprovals()">
            View All Approvals ({{ getPendingApprovalsCount() }})
          </button>
        </div>
      </div>

      <!-- Analytics Insights Section -->
      <div class="analytics-insights">
        <div class="insights-header">
          <h3 class="section-title">Analytics Insights</h3>
          <span class="insights-subtitle">Real-time business intelligence</span>
        </div>
        <div class="insights-grid">
          <div class="insight-card">
            <div class="insight-icon revenue-icon">💰</div>
            <div class="insight-content">
              <div class="insight-value">\${{ (getTotalVolume() * 1250) | number }}</div>
              <div class="insight-label">Estimated Revenue</div>
              <div class="insight-trend positive">+18.2% vs last month</div>
            </div>
          </div>
          
          <div class="insight-card">
            <div class="insight-icon contracts-icon">📋</div>
            <div class="insight-content">
              <div class="insight-value">{{ getContractExpiryTrend().critical }}</div>
              <div class="insight-label">Critical Contracts</div>
              <div class="insight-trend critical">{{ getContractExpiryTrend().upcoming }} upcoming</div>
            </div>
          </div>
          
          <div class="insight-card">
            <div class="insight-icon followup-icon">🔔</div>
            <div class="insight-content">
              <div class="insight-value">{{ getFollowupPendingCount() }}</div>
              <div class="insight-label">Pending Follow-ups</div>
              <div class="insight-trend warning">Requires attention</div>
            </div>
          </div>
          
          <div class="insight-card">
            <div class="insight-icon growth-icon">📈</div>
            <div class="insight-content">
              <div class="insight-value">{{ getUniqueCompanies() }}</div>
              <div class="insight-label">Active Companies</div>
              <div class="insight-trend positive">{{ visitsData.length }} total visits</div>
            </div>
          </div>
          
          <div class="insight-card approval-insight" (click)="navigateToApprovals()">
            <div class="insight-icon approval-icon">⚡</div>
            <div class="insight-content">
              <div class="insight-value">{{ getPendingApprovalsCount() }}</div>
              <div class="insight-label">Pending Approvals</div>
              <div class="insight-trend {{ getPendingApprovalsCount() > 0 ? 'warning' : 'positive' }}">
                {{ getPendingApprovalsCount() > 0 ? 'Requires attention' : 'All caught up!' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="filters-grid">
          <div class="filter-group">
            <label class="filter-label">Time Period</label>
            <select [(ngModel)]="filters.month" (change)="onFilterChange()" class="filter-select">
              <option value="financial-year">Financial Year</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Company Search</label>
            <input
              type="text"
              [(ngModel)]="filters.companySearch"
              (input)="onCompanySearch()"
              placeholder="Search company name..."
              class="filter-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Sales Person</label>
            <select [(ngModel)]="filters.salesPerson" (change)="onFilterChange()" class="filter-select">
              <option value="">All Sales Persons</option>
              <option value="john-doe">John Doe</option>
              <option value="jane-smith">Jane Smith</option>
              <option value="mike-johnson">Mike Johnson</option>
              <option value="sarah-wilson">Sarah Wilson</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="main-content-grid">
        <!-- Left Column -->
        <div class="left-column">
          <!-- Customer On-Board Section -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">Customer On-Board</h3>
              <div class="section-actions">
                <button class="action-btn" (click)="exportSection('customer-onboard')">
                  <span class="material-icons text-sm">file_download</span>
                </button>
                <button class="action-btn" (click)="toggleFullView('customerOnBoard')" title="Full View Modal">
                  <span class="material-icons text-sm">open_in_full</span>
                </button>
                <button class="action-btn" (click)="toggleView('customerOnBoard')">
                  <span class="material-icons text-sm">{{ viewModes.customerOnBoard === 'chart' ? 'table_chart' : 'bar_chart' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chart View -->
            <div *ngIf="viewModes.customerOnBoard === 'chart'" class="chart-container">
              <div class="advanced-chart">
                <h4 class="chart-title">Customer On-Boarding Timeline</h4>
                <div class="timeline-chart">
                  <div class="timeline-item" *ngFor="let item of customerOnBoardData.slice(0,6)">
                    <div class="timeline-date">{{ item.onBoardDate }}</div>
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="customer-name">{{ item.customer.length > 25 ? item.customer.substring(0, 25) + '...' : item.customer }}</div>
                      <div class="created-by">By: {{ item.createdBy }}</div>
                    </div>
                  </div>
                </div>
                <div class="chart-summary">
                  <div class="summary-stat">
                    <span class="stat-value">{{ customerOnBoardData.length }}</span>
                    <span class="stat-label">Total Customers</span>
                  </div>
                  <div class="summary-stat">
                    <span class="stat-value">{{ customerOnBoardData.slice(-7).length }}</span>
                    <span class="stat-label">This Week</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Table View -->
            <div *ngIf="viewModes.customerOnBoard === 'table'" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Customer</th>
                    <th>Created By</th>
                    <th>On Board Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of customerOnBoardData">
                    <td>{{ item.sl }}</td>
                    <td>{{ item.customer }}</td>
                    <td>{{ item.createdBy }}</td>
                    <td>{{ item.onBoardDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full View Modal -->
            <div *ngIf="fullViewStates.customerOnBoard" class="full-view-modal" (click)="toggleFullView('customerOnBoard')">
              <div class="modal-content" (click)="$event.stopPropagation()">
                <div class="modal-header">
                  <h3>Customer On-Board - Full View</h3>
                  <button class="close-btn" (click)="toggleFullView('customerOnBoard')">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="full-view-table">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Customer Name</th>
                        <th>Created By</th>
                        <th>On Board Date</th>
                        <th>Status</th>
                        <th>Contact Person</th>
                        <th>Industry</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of customerOnBoardData">
                        <td>{{ item.sl }}</td>
                        <td>{{ item.customer }}</td>
                        <td>{{ item.createdBy }}</td>
                        <td>{{ item.onBoardDate }}</td>
                        <td><span class="status-active">Active</span></td>
                        <td>{{ item.createdBy }}</td>
                        <td>Shipping & Logistics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Visits Section -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">Total Visits</h3>
              <div class="section-actions">
                <button class="action-btn" (click)="exportSection('visits')">
                  <span class="material-icons text-sm">file_download</span>
                </button>
                <button class="action-btn" (click)="toggleFullView('visits')" title="Full View Modal">
                  <span class="material-icons text-sm">open_in_full</span>
                </button>
                <button class="action-btn" (click)="toggleView('visits')">
                  <span class="material-icons text-sm">{{ viewModes.visits === 'chart' ? 'table_chart' : 'bar_chart' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chart View -->
            <div *ngIf="viewModes.visits === 'chart'" class="chart-container">
              <div class="visits-chart">
                <h4 class="chart-title">Visit Categories Distribution</h4>
                <div class="visits-donut-container">
                  <div class="visits-categories">
                    <div class="category-item" *ngFor="let visit of getVisitCategories(); let i = index">
                      <div class="category-color" [style.background]="getCategoryColor(i)"></div>
                      <div class="category-info">
                        <div class="category-name">{{ visit.category }}</div>
                        <div class="category-count">{{ visit.count }} visits</div>
                      </div>
                      <div class="category-percentage">{{ visit.percentage }}%</div>
                    </div>
                  </div>
                </div>
                <div class="visits-summary">
                  <div class="summary-stat">
                    <span class="stat-value">{{ visitsData.length }}</span>
                    <span class="stat-label">Total Visits</span>
                  </div>
                  <div class="summary-stat">
                    <span class="stat-value">{{ getUniqueCompanies() }}</span>
                    <span class="stat-label">Companies</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Table View -->
            <div *ngIf="viewModes.visits === 'table'" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th style="width: 30%">Company</th>
                    <th>Visit Category</th>
                    <th style="width: 50%">Notes</th>
                    <th>Visit Date</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of visitsData">
                    <td>{{ item.sl }}</td>
                    <td>{{ item.company }}</td>
                    <td>{{ item.visitCategory }}</td>
                    <td class="notes-cell">{{ item.notes }}</td>
                    <td>{{ item.visitDate }}</td>
                    <td>{{ item.createdBy }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full View Modal -->
            <div *ngIf="fullViewStates.visits" class="full-view-modal" (click)="toggleFullView('visits')">
              <div class="modal-content large-modal" (click)="$event.stopPropagation()">
                <div class="modal-header">
                  <h3>Customer Visits - Detailed Analysis</h3>
                  <button class="close-btn" (click)="toggleFullView('visits')">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="full-view-table">
                    <thead>
                      <tr>
                        <th>Sl</th>
                        <th>Company Name</th>
                        <th>Visit Category</th>
                        <th>Visit Purpose</th>
                        <th>Detailed Notes</th>
                        <th>Visit Date</th>
                        <th>Duration</th>
                        <th>Created By</th>
                        <th>Follow-up Required</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of visitsData">
                        <td>{{ item.sl }}</td>
                        <td>{{ item.company }}</td>
                        <td>{{ item.visitCategory }}</td>
                        <td>Business Development</td>
                        <td>{{ item.notes }}</td>
                        <td>{{ item.visitDate }}</td>
                        <td>2.5 hrs</td>
                        <td>{{ item.createdBy }}</td>
                        <td><span class="status-active">Yes</span></td>
                        <td><span class="status-active">Completed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Target Month Leads Section -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">Target Month List of Leads</h3>
              <div class="section-actions">
                <button class="action-btn" (click)="exportSection('target-leads')">
                  <span class="material-icons text-sm">file_download</span>
                </button>
                <button class="action-btn" (click)="toggleFullView('targetLeads')" title="Full View Modal">
                  <span class="material-icons text-sm">open_in_full</span>
                </button>
                <button class="action-btn" (click)="toggleView('targetLeads')">
                  <span class="material-icons text-sm">{{ viewModes.targetLeads === 'chart' ? 'table_chart' : 'bar_chart' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chart View -->
            <div *ngIf="viewModes.targetLeads === 'chart'" class="chart-container">
              <div class="loading-placeholder">
                📊 Chart visualization will be implemented with Chart.js integration
              </div>
            </div>
            
            <!-- Table View -->
            <div *ngIf="viewModes.targetLeads === 'table'" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th style="width: 155px">Company Name</th>
                    <th>LeadRefNo</th>
                    <th>Lead Owner</th>
                    <th>Target Months</th>
                    <th style="width: 100px">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of targetLeadsData">
                    <td>{{ item.sl }}</td>
                    <td class="wrap-text">{{ item.companyName }}</td>
                    <td>{{ item.leadRefNo }}</td>
                    <td>{{ item.leadOwner }}</td>
                    <td>{{ item.targetMonths }}</td>
                    <td class="wrap-text">{{ item.remark }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full View Modal -->
            <div *ngIf="fullViewStates.targetLeads" class="full-view-modal" (click)="toggleFullView('targetLeads')">
              <div class="modal-content large-modal" (click)="$event.stopPropagation()">
                <div class="modal-header">
                  <h3>Target Month Leads - Complete Analysis</h3>
                  <button class="close-btn" (click)="toggleFullView('targetLeads')">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="full-view-table">
                    <thead>
                      <tr>
                        <th>Sl</th>
                        <th>Company Name</th>
                        <th>Lead Reference No</th>
                        <th>Lead Owner</th>
                        <th>Target Months</th>
                        <th>Detailed Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of targetLeadsData">
                        <td>{{ item.sl }}</td>
                        <td>{{ item.companyName }}</td>
                        <td>{{ item.leadRefNo }}</td>
                        <td>{{ item.leadOwner }}</td>
                        <td>{{ item.targetMonths }}</td>
                        <td>{{ item.remark }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <!-- Volume Summary Section -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">Customer Onboard Volume Summary</h3>
              <div class="section-actions">
                <button class="action-btn" (click)="exportSection('volume-summary')">
                  <span class="material-icons text-sm">file_download</span>
                </button>
                <button class="action-btn" (click)="toggleFullView('volumeSummary')" title="Full View Modal">
                  <span class="material-icons text-sm">open_in_full</span>
                </button>
                <button class="action-btn" (click)="toggleView('volumeSummary')">
                  <span class="material-icons text-sm">{{ viewModes.volumeSummary === 'chart' ? 'table_chart' : 'bar_chart' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chart View -->
            <div *ngIf="viewModes.volumeSummary === 'chart'" class="chart-container">
              <div class="volume-chart">
                <h4 class="chart-title">Volume Distribution by Customer</h4>
                <div class="volume-bars-container">
                  <div class="volume-bar" *ngFor="let item of volumeSummaryData.slice(0,5)">
                    <div class="customer-label">{{ item.customerName.split(' ')[0] }}</div>
                    <div class="volume-segments">
                      <div class="segment container-seg" [style.height.px]="(item.noOfContainer / 10)" title="Containers: {{ item.noOfContainer }}"></div>
                      <div class="segment lcl-seg" [style.height.px]="(item.noOfLCL * 2)" title="LCL: {{ item.noOfLCL }}"></div>
                      <div class="segment air-seg" [style.height.px]="(item.noOfAirShipment * 4)" title="Air: {{ item.noOfAirShipment }}"></div>
                    </div>
                    <div class="volume-total">{{ item.noOfJobs }}</div>
                  </div>
                </div>
                <div class="volume-legend">
                  <div class="legend-item"><span class="legend-color container-color"></span>Container</div>
                  <div class="legend-item"><span class="legend-color lcl-color"></span>LCL</div>
                  <div class="legend-item"><span class="legend-color air-color"></span>Air</div>
                </div>
                <div class="volume-analytics">
                  <div class="analytics-item">
                    <span class="analytics-value">{{ getTotalVolume() }}</span>
                    <span class="analytics-label">Total Jobs</span>
                  </div>
                  <div class="analytics-item">
                    <span class="analytics-value">{{ getTopCustomerByVolume().split(' ')[0] }}</span>
                    <span class="analytics-label">Top Customer</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Table View -->
            <div *ngIf="viewModes.volumeSummary === 'table'" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th style="width: 200px">Customer Name</th>
                    <th>Jobs</th>
                    <th>Container</th>
                    <th>LCL</th>
                    <th>Air</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of volumeSummaryData">
                    <td>{{ item.sl }}</td>
                    <td class="wrap-text">{{ item.customerName }}</td>
                    <td>{{ item.noOfJobs }}</td>
                    <td>{{ item.noOfContainer }}</td>
                    <td>{{ item.noOfLCL }}</td>
                    <td>{{ item.noOfAirShipment }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full View Modal -->
            <div *ngIf="fullViewStates.volumeSummary" class="full-view-modal" (click)="toggleFullView('volumeSummary')">
              <div class="modal-content large-modal" (click)="$event.stopPropagation()">
                <div class="modal-header">
                  <h3>Volume Summary - Full Analysis</h3>
                  <button class="close-btn" (click)="toggleFullView('volumeSummary')">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="full-view-table">
                    <thead>
                      <tr>
                        <th>Sl</th>
                        <th>Customer Name</th>
                        <th>Total Jobs</th>
                        <th>Container Shipments</th>
                        <th>LCL Shipments</th>
                        <th>Air Shipments</th>
                        <th>Revenue Impact</th>
                        <th>Growth %</th>
                        <th>Last Shipment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of volumeSummaryData">
                        <td>{{ item.sl }}</td>
                        <td>{{ item.customerName }}</td>
                        <td>{{ item.noOfJobs }}</td>
                        <td>{{ item.noOfContainer }}</td>
                        <td>{{ item.noOfLCL }}</td>
                        <td>{{ item.noOfAirShipment }}</td>
                        <td>\${{ (item.noOfJobs * 1250) | number }}</td>
                        <td class="growth-positive">+18.5%</td>
                        <td>Aug 30, 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Contract Expiry Section -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">3 months to go for Contract Expiry</h3>
              <div class="section-actions">
                <button class="action-btn" (click)="exportSection('contract-expiry')">
                  <span class="material-icons text-sm">file_download</span>
                </button>
                <button class="action-btn" (click)="toggleFullView('contractExpiry')" title="Full View Modal">
                  <span class="material-icons text-sm">open_in_full</span>
                </button>
                <button class="action-btn" (click)="toggleView('contractExpiry')">
                  <span class="material-icons text-sm">{{ viewModes.contractExpiry === 'chart' ? 'table_chart' : 'bar_chart' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chart View -->
            <div *ngIf="viewModes.contractExpiry === 'chart'" class="chart-container">
              <div class="loading-placeholder">
                📊 Chart visualization will be implemented with Chart.js integration
              </div>
            </div>
            
            <!-- Table View -->
            <div *ngIf="viewModes.contractExpiry === 'table'" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th style="width: 155px">Company Name</th>
                    <th>Lead Ref No</th>
                    <th>Lead Owner</th>
                    <th>Expiry Date</th>
                    <th style="width: 100px">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of contractExpiryData">
                    <td>{{ item.sl }}</td>
                    <td class="wrap-text">{{ item.companyName }}</td>
                    <td>{{ item.leadRefNo }}</td>
                    <td>{{ item.leadOwner }}</td>
                    <td>{{ item.expiryDate }}</td>
                    <td class="wrap-text">{{ item.remark }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full View Modal -->
            <div *ngIf="fullViewStates.contractExpiry" class="full-view-modal" (click)="toggleFullView('contractExpiry')">
              <div class="modal-content large-modal" (click)="$event.stopPropagation()">
                <div class="modal-header">
                  <h3>Contract Expiry - Full Details</h3>
                  <button class="close-btn" (click)="toggleFullView('contractExpiry')">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="full-view-table">
                    <thead>
                      <tr>
                        <th>Sl</th>
                        <th>Company Name</th>
                        <th>Lead Reference No</th>
                        <th>Lead Owner</th>
                        <th>Contract Expiry Date</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of contractExpiryData">
                        <td>{{ item.sl }}</td>
                        <td>{{ item.companyName }}</td>
                        <td>{{ item.leadRefNo }}</td>
                        <td>{{ item.leadOwner }}</td>
                        <td>{{ item.expiryDate }}</td>
                        <td>{{ item.remark }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Follow-up Leads Section -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">Leads marked for follow up date</h3>
              <div class="section-actions">
                <button class="action-btn" (click)="exportSection('followup-leads')">
                  <span class="material-icons text-sm">file_download</span>
                </button>
                <button class="action-btn" (click)="toggleFullView('followupLeads')" title="Full View Modal">
                  <span class="material-icons text-sm">open_in_full</span>
                </button>
                <button class="action-btn" (click)="toggleView('followupLeads')">
                  <span class="material-icons text-sm">{{ viewModes.followupLeads === 'chart' ? 'table_chart' : 'bar_chart' }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chart View -->
            <div *ngIf="viewModes.followupLeads === 'chart'" class="chart-container">
              <div class="loading-placeholder">
                📊 Chart visualization will be implemented with Chart.js integration
              </div>
            </div>
            
            <!-- Table View -->
            <div *ngIf="viewModes.followupLeads === 'table'" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th style="width: 155px">Company Name</th>
                    <th>Lead Ref No</th>
                    <th>Lead Owner</th>
                    <th>Followup Date</th>
                    <th>Followup By</th>
                    <th style="width: 100px">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of followupLeadsData">
                    <td>{{ item.sl }}</td>
                    <td class="wrap-text">{{ item.companyName }}</td>
                    <td>{{ item.leadRefNo }}</td>
                    <td>{{ item.leadOwner }}</td>
                    <td>{{ item.followupDate }}</td>
                    <td>{{ item.followupBy }}</td>
                    <td class="wrap-text">{{ item.remark }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Full View Modal -->
            <div *ngIf="fullViewStates.followupLeads" class="full-view-modal" (click)="toggleFullView('followupLeads')">
              <div class="modal-content large-modal" (click)="$event.stopPropagation()">
                <div class="modal-header">
                  <h3>Follow-up Leads - Complete Details</h3>
                  <button class="close-btn" (click)="toggleFullView('followupLeads')">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="full-view-table">
                    <thead>
                      <tr>
                        <th>Sl</th>
                        <th>Company Name</th>
                        <th>Lead Reference No</th>
                        <th>Lead Owner</th>
                        <th>Followup Date</th>
                        <th>Followup By</th>
                        <th>Detailed Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of followupLeadsData">
                        <td>{{ item.sl }}</td>
                        <td>{{ item.companyName }}</td>
                        <td>{{ item.leadRefNo }}</td>
                        <td>{{ item.leadOwner }}</td>
                        <td>{{ item.followupDate }}</td>
                        <td>{{ item.followupBy }}</td>
                        <td>{{ item.remark }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CrmDashboardComponent implements OnInit {
  
  // Loading states
  isLoading = {
    kpis: true,
    customerOnBoard: true,
    visits: true,
    targetLeads: true,
    volumeSummary: true,
    contractExpiry: true,
    followupLeads: true
  };

  // KPI Data
  kpiCards: DashboardKPI[] = [];

  // Filter Data
  filters: FilterOptions = {
    month: 'financial-year',
    companySearch: '',
    salesPerson: ''
  };

  // View Mode Controls
  viewModes = {
    customerOnBoard: 'table' as 'table' | 'chart',
    visits: 'table' as 'table' | 'chart',
    targetLeads: 'table' as 'table' | 'chart',
    volumeSummary: 'table' as 'table' | 'chart',
    contractExpiry: 'table' as 'table' | 'chart',
    followupLeads: 'table' as 'table' | 'chart'
  };

  // Full view modal states
  fullViewStates = {
    customerOnBoard: false,
    visits: false,
    targetLeads: false,
    volumeSummary: false,
    contractExpiry: false,
    followupLeads: false
  };

  // Data arrays
  customerOnBoardData: CustomerOnBoard[] = [];
  visitsData: VisitData[] = [];
  targetLeadsData: TargetMonthLead[] = [];
  volumeSummaryData: VolumeSummary[] = [];
  contractExpiryData: ContractExpiry[] = [];
  followupLeadsData: FollowupLead[] = [];

  // Approval data - NEW
  pendingApprovals: any[] = [
    {
      id: 'APP-001',
      type: 'QUOTE',
      title: 'High Value Quote Approval',
      company: 'Zen Traders',
      value: 620000,
      requestedBy: 'Alex Johnson',
      daysAgo: 2,
      priority: 'HIGH'
    },
    {
      id: 'APP-002', 
      type: 'DISCOUNT',
      title: 'Special Pricing Request',
      company: 'Global Shipping Ltd',
      value: 350000,
      requestedBy: 'Sarah Wilson',
      daysAgo: 1,
      priority: 'MEDIUM'
    },
    {
      id: 'APP-003',
      type: 'CONTRACT',
      title: 'Contract Terms Approval',
      company: 'Ocean Freight Co',
      value: 850000,
      requestedBy: 'Mike Chen',
      daysAgo: 3,
      priority: 'HIGH'
    }
  ];

  constructor(private dashboardService: CrmDashboardService, private router: Router) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Load KPI data
    this.dashboardService.getKPIData().subscribe(data => {
      this.kpiCards = data;
      this.isLoading.kpis = false;
    });

    // Load all dashboard sections
    this.loadCustomerOnBoard();
    this.loadVisits();
    this.loadTargetLeads();
    this.loadVolumeSummary();
    this.loadContractExpiry();
    this.loadFollowupLeads();
  }

  loadCustomerOnBoard() {
    this.isLoading.customerOnBoard = true;
    this.dashboardService.getCustomerOnBoardData(this.filters).subscribe(data => {
      this.customerOnBoardData = data;
      this.isLoading.customerOnBoard = false;
    });
  }

  loadVisits() {
    this.isLoading.visits = true;
    this.dashboardService.getVisitsData(this.filters).subscribe(data => {
      this.visitsData = data;
      this.isLoading.visits = false;
    });
  }

  loadTargetLeads() {
    this.isLoading.targetLeads = true;
    this.dashboardService.getTargetLeadsData(this.filters).subscribe(data => {
      this.targetLeadsData = data;
      this.isLoading.targetLeads = false;
    });
  }

  loadVolumeSummary() {
    this.isLoading.volumeSummary = true;
    this.dashboardService.getVolumeSummaryData(this.filters).subscribe(data => {
      this.volumeSummaryData = data;
      this.isLoading.volumeSummary = false;
    });
  }

  loadContractExpiry() {
    this.isLoading.contractExpiry = true;
    this.dashboardService.getContractExpiryData(this.filters).subscribe(data => {
      this.contractExpiryData = data;
      this.isLoading.contractExpiry = false;
    });
  }

  loadFollowupLeads() {
    this.isLoading.followupLeads = true;
    this.dashboardService.getFollowupLeadsData(this.filters).subscribe(data => {
      this.followupLeadsData = data;
      this.isLoading.followupLeads = false;
    });
  }

  navigateToKPI(route: string) {
    // Navigate to specific KPI detail page
    console.log('Navigating to:', route);
  }

  onFilterChange() {
    // Handle filter changes and refresh data
    console.log('Filters changed:', this.filters);
    this.refreshDashboard();
  }

  onCompanySearch() {
    // Handle company search with autocomplete
    console.log('Company search:', this.filters.companySearch);
    // Add debounce logic here for real implementation
    if (this.filters.companySearch.length >= 2) {
      this.refreshDashboard();
    }
  }

  toggleView(section: keyof typeof this.viewModes) {
    this.viewModes[section] = this.viewModes[section] === 'table' ? 'chart' : 'table';
    
    if (this.viewModes[section] === 'chart') {
      setTimeout(() => {
        this.initializeSectionChart(section);
      }, 100);
    }
  }

  toggleFullView(section: keyof typeof this.fullViewStates) {
    this.fullViewStates[section] = !this.fullViewStates[section];
  }

  // Analytics methods
  getTotalVolume(): number {
    return this.volumeSummaryData.reduce((total, item) => total + item.noOfJobs, 0);
  }

  getTopCustomerByVolume(): string {
    if (this.volumeSummaryData.length === 0) return 'N/A';
    const topCustomer = this.volumeSummaryData.reduce((prev, current) => 
      prev.noOfJobs > current.noOfJobs ? prev : current
    );
    return topCustomer.customerName;
  }

  getContractExpiryTrend(): { upcoming: number, critical: number } {
    const now = new Date();
    const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    let upcoming = 0;
    let critical = 0;
    
    this.contractExpiryData.forEach(contract => {
      const expiryDate = new Date(contract.expiryDate.split('/').reverse().join('-'));
      if (expiryDate <= twoWeeks) {
        critical++;
      } else if (expiryDate <= oneMonth) {
        upcoming++;
      }
    });
    
    return { upcoming, critical };
  }

  getFollowupPendingCount(): number {
    const today = new Date();
    return this.followupLeadsData.filter(lead => {
      const followupDate = new Date(lead.followupDate.split('/').reverse().join('-'));
      return followupDate <= today;
    }).length;
  }

  // Visits chart helper methods
  getVisitCategories(): { category: string, count: number, percentage: number }[] {
    const categories = this.visitsData.reduce((acc, visit) => {
      acc[visit.visitCategory] = (acc[visit.visitCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = this.visitsData.length;
    return Object.entries(categories).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / total) * 100)
    }));
  }

  getUniqueCompanies(): number {
    const uniqueCompanies = new Set(this.visitsData.map(visit => visit.company));
    return uniqueCompanies.size;
  }

  getCategoryColor(index: number): string {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[index % colors.length];
  }

  initializeSectionChart(section: string) {
    // Initialize specific chart based on section
    console.log('Initializing chart for section:', section);
  }

  exportSection(section: string) {
    // Export specific section data to Excel
    let dataToExport: any[] = [];
    let filename = '';

    switch (section) {
      case 'customer-onboard':
        dataToExport = this.customerOnBoardData;
        filename = 'customer-onboard';
        break;
      case 'visits':
        dataToExport = this.visitsData;
        filename = 'visits';
        break;
      case 'target-leads':
        dataToExport = this.targetLeadsData;
        filename = 'target-leads';
        break;
      case 'volume-summary':
        dataToExport = this.volumeSummaryData;
        filename = 'volume-summary';
        break;
      case 'contract-expiry':
        dataToExport = this.contractExpiryData;
        filename = 'contract-expiry';
        break;
      case 'followup-leads':
        dataToExport = this.followupLeadsData;
        filename = 'followup-leads';
        break;
    }

    this.dashboardService.exportToExcel(dataToExport, filename);
  }

  refreshDashboard() {
    // Refresh all dashboard data based on current filters
    console.log('Refreshing dashboard with filters:', this.filters);
    this.loadDashboardData();
  }

  // NEW APPROVAL METHODS
  getPendingApprovalsCount(): number {
    return this.pendingApprovals.length;
  }

  getTopPendingApprovals(): any[] {
    return this.pendingApprovals.slice(0, 3);
  }

  getApprovalIcon(type: string): string {
    const icons = {
      'QUOTE': 'description',
      'DISCOUNT': 'local_offer',
      'CONTRACT': 'assignment',
      'LEAD': 'person_add'
    };
    return icons[type as keyof typeof icons] || 'approval';
  }

  getApprovalIconClass(type: string): string {
    const classes = {
      'QUOTE': 'text-blue-600',
      'DISCOUNT': 'text-yellow-600', 
      'CONTRACT': 'text-green-600',
      'LEAD': 'text-purple-600'
    };
    return classes[type as keyof typeof classes] || 'text-gray-600';
  }

  quickApprove(approvalId: string): void {
    console.log('Quick approve:', approvalId);
    // Remove from pending list (in real app, call API)
    this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== approvalId);
    // Show success message
    this.showApprovalMessage('Approved successfully!', 'success');
  }

  quickReject(approvalId: string): void {
    console.log('Quick reject:', approvalId);
    // Remove from pending list (in real app, call API)
    this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== approvalId);
    // Show success message
    this.showApprovalMessage('Rejected successfully!', 'info');
  }

  viewApprovalDetails(approvalId: string): void {
    console.log('View approval details:', approvalId);
    // Navigate to approval details (you can implement this later)
    this.router.navigate(['/crm/approvals', approvalId]);
  }

  navigateToApprovals(): void {
    this.router.navigate(['/crm/approvals']);
  }

  private showApprovalMessage(message: string, type: 'success' | 'info' | 'warning'): void {
    // Simple console log for now - you can implement toast notifications later
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}
