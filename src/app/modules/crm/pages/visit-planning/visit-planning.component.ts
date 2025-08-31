import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockCrmService } from '../../services/mock-crm.service';

interface CrmVisit {
  visitID: string;
  leadID: string;
  leadCompany: string;
  leadContact: string;
  visitType: 'PLANNED' | 'FOLLOW_UP' | 'PRESENTATION' | 'NEGOTIATION' | 'CLOSURE';
  plannedDate: Date;
  plannedTime: string;
  actualDate?: Date;
  actualTime?: string;
  duration: number; // in minutes
  purpose: string;
  location: string;
  address: string;
  assignedTo: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes: string;
  outcome?: string;
  nextAction?: string;
  createdBy: string;
  createdOn: Date;
  contactPerson: string;
  contactPhone: string;
}

@Component({
  selector: 'app-visit-planning',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Visit Planning</h1>
            <p class="page-subtitle">Plan and track customer visits</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-secondary" (click)="exportVisits()">
              <span class="material-icons">calendar_today</span>
              Calendar View
            </button>
            <button class="btn btn-primary" (click)="createNewVisit()">
              <span class="material-icons">add</span>
              Plan Visit
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
                 placeholder="Search visits..."
                 (input)="onSearch()">
        </div>
        <div class="filters">
          <select [(ngModel)]="statusFilter" (change)="onFilterChange()">
            <option value="">All Status</option>
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="RESCHEDULED">Rescheduled</option>
          </select>
          <select [(ngModel)]="typeFilter" (change)="onFilterChange()">
            <option value="">All Types</option>
            <option value="PLANNED">Initial Visit</option>
            <option value="FOLLOW_UP">Follow-up</option>
            <option value="PRESENTATION">Presentation</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="CLOSURE">Closure</option>
          </select>
          <select [(ngModel)]="assignedFilter" (change)="onFilterChange()">
            <option value="">All Assignees</option>
            <option value="Alex">Alex</option>
            <option value="Dana">Dana</option>
            <option value="Mike Chen">Mike Chen</option>
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
            <span class="material-icons">event</span>
          </div>
          <div class="card-content">
            <h3>{{ getTotalVisits() }}</h3>
            <p>Total Visits</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-orange-500">
            <span class="material-icons">schedule</span>
          </div>
          <div class="card-content">
            <h3>{{ getTodayVisits() }}</h3>
            <p>Today's Visits</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-green-500">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="card-content">
            <h3>{{ getCompletedVisits() }}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon bg-purple-500">
            <span class="material-icons">trending_up</span>
          </div>
          <div class="card-content">
            <h3>{{ getUpcomingVisits() }}</h3>
            <p>Upcoming</p>
          </div>
        </div>
      </div>

      <!-- View Toggle -->
      <div class="view-toggle">
        <button class="toggle-btn" 
                [class.active]="viewMode === 'list'"
                (click)="setViewMode('list')">
          <span class="material-icons">view_list</span>
          List View
        </button>
        <button class="toggle-btn" 
                [class.active]="viewMode === 'calendar'"
                (click)="setViewMode('calendar')">
          <span class="material-icons">calendar_view_month</span>
          Calendar View
        </button>
      </div>

      <!-- List View -->
      <div *ngIf="viewMode === 'list'" class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Visit Details</th>
              <th>Company</th>
              <th>Type</th>
              <th>Planned Date/Time</th>
              <th>Location</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let visit of filteredVisits">
              <td>
                <div class="visit-info">
                  <div class="visit-id">{{ visit.visitID }}</div>
                  <div class="visit-purpose">{{ visit.purpose }}</div>
                </div>
              </td>
              <td>
                <div class="company-info">
                  <div class="company-name">{{ visit.leadCompany }}</div>
                  <div class="contact-info">
                    <span>{{ visit.leadContact }}</span>
                    <span class="contact-phone">{{ visit.contactPhone }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="type-badge" [class]="'type-' + visit.visitType.toLowerCase().replace('_', '-')">
                  {{ getVisitTypeDisplay(visit.visitType) }}
                </span>
              </td>
              <td>
                <div class="datetime-info">
                  <div class="date">{{ visit.plannedDate | date:'MMM d, yyyy' }}</div>
                  <div class="time">{{ visit.plannedTime }}</div>
                  <div class="duration">({{ visit.duration }} min)</div>
                </div>
              </td>
              <td>
                <div class="location-info">
                  <div class="location-name">{{ visit.location }}</div>
                  <div class="address">{{ visit.address }}</div>
                </div>
              </td>
              <td>{{ visit.assignedTo }}</td>
              <td>
                <span class="status-badge" [class]="'status-' + visit.status.toLowerCase().replace('_', '-')">
                  {{ getStatusDisplay(visit.status) }}
                </span>
              </td>
              <td>
                <span class="priority-badge" [class]="'priority-' + visit.priority.toLowerCase()">
                  {{ visit.priority }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="btn-icon" 
                        (click)="viewVisit(visit.visitID)"
                        title="View Details">
                  <span class="material-icons">visibility</span>
                </button>
                <button class="btn-icon" 
                        (click)="editVisit(visit.visitID)"
                        *ngIf="visit.status === 'PLANNED'"
                        title="Edit Visit">
                  <span class="material-icons">edit</span>
                </button>
                <button class="btn-icon" 
                        (click)="startVisit(visit.visitID)"
                        *ngIf="visit.status === 'PLANNED' && isToday(visit.plannedDate)"
                        title="Start Visit">
                  <span class="material-icons">play_arrow</span>
                </button>
                <button class="btn-icon" 
                        (click)="completeVisit(visit.visitID)"
                        *ngIf="visit.status === 'IN_PROGRESS'"
                        title="Complete Visit">
                  <span class="material-icons">check</span>
                </button>
                <button class="btn-icon" 
                        (click)="rescheduleVisit(visit.visitID)"
                        *ngIf="visit.status === 'PLANNED'"
                        title="Reschedule">
                  <span class="material-icons">schedule</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Calendar View -->
      <div *ngIf="viewMode === 'calendar'" class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" (click)="previousWeek()">
            <span class="material-icons">chevron_left</span>
          </button>
          <h3>{{ getWeekDisplay() }}</h3>
          <button class="nav-btn" (click)="nextWeek()">
            <span class="material-icons">chevron_right</span>
          </button>
        </div>
        
        <div class="calendar-grid">
          <div class="day-header" *ngFor="let day of weekDays">
            <div class="day-name">{{ day.name }}</div>
            <div class="day-date">{{ day.date | date:'MMM d' }}</div>
          </div>
          
          <div class="day-column" *ngFor="let day of weekDays">
            <div class="time-slots">
              <div class="visit-item" 
                   *ngFor="let visit of getVisitsForDay(day.date)"
                   [class]="'visit-' + visit.status.toLowerCase().replace('_', '-')"
                   (click)="viewVisit(visit.visitID)">
                <div class="visit-time">{{ visit.plannedTime }}</div>
                <div class="visit-company">{{ visit.leadCompany }}</div>
                <div class="visit-type">{{ getVisitTypeDisplay(visit.visitType) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredVisits.length === 0" class="empty-state">
        <div class="empty-icon">
          <span class="material-icons">event</span>
        </div>
        <h3>No visits found</h3>
        <p>Plan your first visit or adjust your filters</p>
        <button class="btn btn-primary" (click)="createNewVisit()">
          Plan Visit
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
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #1e2e4f 0%, #162238 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(44, 65, 112, 0.2);
    }

    .btn-secondary {
      background: white;
      color: #2c4170;
      border: 1px solid #2c4170;
    }

    .btn-secondary:hover {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(44, 65, 112, 0.2);
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
      flex-wrap: wrap;
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

    .bg-blue-500 {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
    }

    .bg-orange-500 {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    .bg-green-500 {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
    }

    .bg-purple-500 {
      background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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

    .view-toggle {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.2s;
    }

    .toggle-btn.active {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border-color: #2c4170;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(44, 65, 112, 0.2);
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
      vertical-align: top;
    }

    .table tr:hover {
      background: #f9fafb;
    }

    .visit-info .visit-id {
      font-weight: 600;
      color: #2c4170;
    }

    .visit-info .visit-purpose {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .company-info .company-name {
      font-weight: 500;
      color: #111827;
    }

    .contact-info {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .contact-phone {
      display: block;
    }

    .datetime-info .date {
      font-weight: 500;
      color: #111827;
    }

    .datetime-info .time {
      color: #6b7280;
      font-size: 0.75rem;
    }

    .datetime-info .duration {
      color: #9ca3af;
      font-size: 0.75rem;
    }

    .location-info .location-name {
      font-weight: 500;
      color: #111827;
    }

    .location-info .address {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .type-badge, .status-badge, .priority-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .type-planned, .type-follow-up {
      background: #e1f2ff;
      color: #2c4170;
    }

    .type-presentation {
      background: #e0e7ff;
      color: #6366f1;
    }

    .type-negotiation {
      background: #fef3c7;
      color: #d97706;
    }

    .type-closure {
      background: #d1fae5;
      color: #065f46;
    }

    .status-planned {
      background: #f3f4f6;
      color: #6b7280;
    }

    .status-in-progress {
      background: #e1f2ff;
      color: #2c4170;
    }

    .status-completed {
      background: #d1fae5;
      color: #065f46;
    }

    .status-cancelled {
      background: #fee2e2;
      color: #dc2626;
    }

    .status-rescheduled {
      background: #fef3c7;
      color: #d97706;
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
      background: white;
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
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      border-color: #2c4170;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(44, 65, 112, 0.2);
    }

    .btn-icon .material-icons {
      font-size: 1rem;
    }

    .calendar-container {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      padding: 1.5rem;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .calendar-header h3 {
      margin: 0;
      color: #111827;
    }

    .nav-btn {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      padding: 0.5rem;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.2s;
    }

    .nav-btn:hover {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border-color: #2c4170;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(44, 65, 112, 0.2);
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #e5e7eb;
      border-radius: 0.375rem;
      overflow: hidden;
    }

    .day-header {
      background: #f9fafb;
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
    }

    .day-name {
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .day-date {
      color: #6b7280;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .day-column {
      background: white;
      min-height: 200px;
      padding: 0.5rem;
    }

    .visit-item {
      background: #f3f4f6;
      border-radius: 0.25rem;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      border-left: 3px solid #6b7280;
    }

    .visit-planned {
      border-left-color: #6b7280;
      background: #f3f4f6;
    }

    .visit-in-progress {
      border-left-color: #2c4170;
      background: #e1f2ff;
    }

    .visit-completed {
      border-left-color: #059669;
      background: #ecfdf5;
    }

    .visit-time {
      font-weight: 600;
      font-size: 0.75rem;
      color: #111827;
    }

    .visit-company {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0.25rem 0;
    }

    .visit-type {
      font-size: 0.625rem;
      color: #9ca3af;
      text-transform: uppercase;
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
export class VisitPlanningComponent implements OnInit {
  visits: CrmVisit[] = [];
  filteredVisits: CrmVisit[] = [];
  
  searchQuery = '';
  statusFilter = '';
  typeFilter = '';
  assignedFilter = '';
  dateFilter = '';
  
  viewMode: 'list' | 'calendar' = 'list';
  currentWeekStart = new Date();
  weekDays: { name: string; date: Date }[] = [];

  constructor(
    private crmService: MockCrmService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadVisits();
    this.initializeWeek();
  }

  loadVisits() {
    // Mock data - replace with actual API call
    this.visits = [
      {
        visitID: 'VST-001',
        leadID: 'L-1001',
        leadCompany: 'Acme Exports',
        leadContact: 'Priya N',
        visitType: 'PLANNED',
        plannedDate: new Date('2024-02-01'),
        plannedTime: '10:00 AM',
        duration: 90,
        purpose: 'Initial meeting to discuss shipping requirements',
        location: 'Client Office',
        address: 'Plot 123, Industrial Area, Mumbai',
        assignedTo: 'Alex',
        status: 'PLANNED',
        priority: 'HIGH',
        notes: 'Prepare presentation on ocean freight services',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-25'),
        contactPerson: 'Priya N',
        contactPhone: '+91-98765-43210'
      },
      {
        visitID: 'VST-002',
        leadID: 'L-1002',
        leadCompany: 'Marina Logistics',
        leadContact: 'Ravi K',
        visitType: 'FOLLOW_UP',
        plannedDate: new Date('2024-02-02'),
        plannedTime: '2:00 PM',
        duration: 60,
        purpose: 'Follow-up on quote discussion',
        location: 'Our Office',
        address: 'LT India ERP Office, Delhi',
        assignedTo: 'Dana',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        notes: 'Discuss pricing and timeline',
        outcome: 'Quote accepted, moving to contract phase',
        nextAction: 'Prepare contract documents',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-28'),
        contactPerson: 'Ravi K',
        contactPhone: '+91-98765-12345'
      },
      {
        visitID: 'VST-003',
        leadID: 'L-1003',
        leadCompany: 'Zen Traders',
        leadContact: 'Ishita S',
        visitType: 'PRESENTATION',
        plannedDate: new Date(),
        plannedTime: '11:00 AM',
        duration: 120,
        purpose: 'Service capability presentation',
        location: 'Client Office',
        address: 'Corporate Tower, Bangalore',
        assignedTo: 'Alex',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        notes: 'Bring logistics portfolio and case studies',
        createdBy: 'Admin',
        createdOn: new Date('2024-01-30'),
        contactPerson: 'Ishita S',
        contactPhone: '+91-99887-66554'
      }
    ];
    
    this.filteredVisits = [...this.visits];
  }

  initializeWeek() {
    // Set to start of current week (Monday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    this.currentWeekStart = new Date(today);
    this.currentWeekStart.setDate(today.getDate() + mondayOffset);
    
    this.generateWeekDays();
  }

  generateWeekDays() {
    this.weekDays = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeekStart);
      date.setDate(this.currentWeekStart.getDate() + i);
      this.weekDays.push({
        name: dayNames[i],
        date: date
      });
    }
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredVisits = this.visits.filter(visit => {
      const matchesSearch = !this.searchQuery || 
        visit.leadCompany.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        visit.purpose.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        visit.visitID.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = !this.statusFilter || visit.status === this.statusFilter;
      const matchesType = !this.typeFilter || visit.visitType === this.typeFilter;
      const matchesAssigned = !this.assignedFilter || visit.assignedTo === this.assignedFilter;
      
      let matchesDate = true;
      if (this.dateFilter) {
        const filterDate = new Date(this.dateFilter);
        const visitDate = new Date(visit.plannedDate);
        matchesDate = visitDate.toDateString() === filterDate.toDateString();
      }

      return matchesSearch && matchesStatus && matchesType && matchesAssigned && matchesDate;
    });
  }

  getTotalVisits(): number {
    return this.visits.length;
  }

  getTodayVisits(): number {
    const today = new Date().toDateString();
    return this.visits.filter(v => v.plannedDate.toDateString() === today).length;
  }

  getCompletedVisits(): number {
    return this.visits.filter(v => v.status === 'COMPLETED').length;
  }

  getUpcomingVisits(): number {
    const today = new Date();
    return this.visits.filter(v => 
      v.status === 'PLANNED' && v.plannedDate >= today
    ).length;
  }

  getVisitTypeDisplay(type: string): string {
    const displays = {
      'PLANNED': 'Initial Visit',
      'FOLLOW_UP': 'Follow-up',
      'PRESENTATION': 'Presentation',
      'NEGOTIATION': 'Negotiation',
      'CLOSURE': 'Closure'
    };
    return displays[type as keyof typeof displays] || type;
  }

  getStatusDisplay(status: string): string {
    const displays = {
      'PLANNED': 'Planned',
      'IN_PROGRESS': 'In Progress',
      'COMPLETED': 'Completed',
      'CANCELLED': 'Cancelled',
      'RESCHEDULED': 'Rescheduled'
    };
    return displays[status as keyof typeof displays] || status;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  setViewMode(mode: 'list' | 'calendar') {
    this.viewMode = mode;
  }

  getWeekDisplay(): string {
    const endDate = new Date(this.currentWeekStart);
    endDate.setDate(this.currentWeekStart.getDate() + 6);
    
    return `${this.currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }

  previousWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.generateWeekDays();
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.generateWeekDays();
  }

  getVisitsForDay(date: Date): CrmVisit[] {
    return this.filteredVisits.filter(visit => 
      visit.plannedDate.toDateString() === date.toDateString()
    );
  }

  createNewVisit() {
    this.router.navigate(['/crm/visits/new']);
  }

  viewVisit(visitId: string) {
    this.router.navigate(['/crm/visits', visitId]);
  }

  editVisit(visitId: string) {
    this.router.navigate(['/crm/visits', visitId, 'edit']);
  }

  startVisit(visitId: string) {
    const visit = this.visits.find(v => v.visitID === visitId);
    if (visit) {
      visit.status = 'IN_PROGRESS';
      visit.actualDate = new Date();
      visit.actualTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      this.applyFilters();
    }
  }

  completeVisit(visitId: string) {
    this.router.navigate(['/crm/visits', visitId, 'complete']);
  }

  rescheduleVisit(visitId: string) {
    this.router.navigate(['/crm/visits', visitId, 'reschedule']);
  }

  exportVisits() {
    // Implement export functionality
    console.log('Exporting visits');
  }
}
