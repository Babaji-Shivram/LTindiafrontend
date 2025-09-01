import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadCreationService } from '../../../services/lead-creation.service';
import { ContactRole } from '../../../interfaces/lead-creation.interface';

export interface ContactRoleExtended extends ContactRole {
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-contact-roles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-roles-container">
      <!-- Header -->
      <div class="header-section">
        <div class="header-content">
          <div class="header-text">
            <h1 class="page-title">Contact Roles</h1>
            <p class="page-description">Manage contact roles for lead assignment</p>
          </div>
          <button class="btn-primary" (click)="createContactRole()">
            <span class="material-icons">add</span>
            Add Contact Role
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="search-section">
        <div class="search-bar">
          <span class="material-icons search-icon">search</span>
          <input
            type="text"
            placeholder="Search contact roles..."
            [(ngModel)]="searchTerm"
            (input)="onSearch()"
            class="search-input"
          />
        </div>
        <div class="filter-buttons">
          <button 
            class="filter-btn"
            [class.active]="statusFilter === 'all'"
            (click)="setStatusFilter('all')">
            All ({{getTotalCount()}})
          </button>
          <button 
            class="filter-btn"
            [class.active]="statusFilter === 'active'"
            (click)="setStatusFilter('active')">
            Active ({{getActiveCount()}})
          </button>
          <button 
            class="filter-btn"
            [class.active]="statusFilter === 'inactive'"
            (click)="setStatusFilter('inactive')">
            Inactive ({{getInactiveCount()}})
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let role of filteredContactRoles; trackBy: trackByRole">
              <td class="role-name">
                <div class="name-cell">
                  <span class="material-icons role-icon">person</span>
                  <span class="name-text">{{role.roleName}}</span>
                </div>
              </td>
              <td class="description-cell">
                <span [title]="role.description">
                  {{role.description || 'No description'}}
                </span>
              </td>
              <td>
                <span class="status-badge" 
                      [class.active]="role.isActive" 
                      [class.inactive]="!role.isActive">
                  {{role.isActive ? 'Active' : 'Inactive'}}
                </span>
              </td>
              <td>{{formatDate(role.createdAt)}}</td>
              <td>{{formatDate(role.updatedAt)}}</td>
              <td>
                <div class="action-buttons">
                  <button 
                    class="action-btn edit-btn" 
                    (click)="editContactRole(role)"
                    title="Edit">
                    <span class="material-icons">edit</span>
                  </button>
                  <button 
                    class="action-btn toggle-btn"
                    [class.activate]="!role.isActive"
                    [class.deactivate]="role.isActive"
                    (click)="toggleStatus(role)"
                    [title]="role.isActive ? 'Deactivate' : 'Activate'">
                    <span class="material-icons">
                      {{role.isActive ? 'toggle_on' : 'toggle_off'}}
                    </span>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    (click)="deleteContactRole(role)"
                    title="Delete">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div *ngIf="filteredContactRoles.length === 0" class="empty-state">
          <span class="material-icons empty-icon">person</span>
          <h3>No Contact Roles Found</h3>
          <p>{{getEmptyStateMessage()}}</p>
          <button class="btn-primary" (click)="createContactRole()">
            <span class="material-icons">add</span>
            Add First Contact Role
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-roles-container {
      padding: 24px;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .header-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-text {
      flex: 1;
    }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .page-description {
      color: #64748b;
      margin: 0;
      font-size: 16px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }

    .search-section {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .search-bar {
      flex: 1;
      position: relative;
      max-width: 400px;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
      font-size: 20px;
    }

    .search-input {
      width: 100%;
      padding: 12px 12px 12px 44px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .filter-buttons {
      display: flex;
      gap: 8px;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
      transition: all 0.2s ease;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .filter-btn:hover:not(.active) {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background: #f8fafc;
      padding: 16px;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }

    .data-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 14px;
    }

    .data-table tr:hover {
      background-color: #f8fafc;
    }

    .role-name .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .role-icon {
      color: #8b5cf6;
      background: #f3f4f6;
      padding: 6px;
      border-radius: 6px;
      font-size: 18px;
    }

    .name-text {
      font-weight: 600;
      color: #1e293b;
    }

    .description-cell {
      max-width: 300px;
    }

    .description-cell span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge.active {
      background: #dcfce7;
      color: #166534;
    }

    .status-badge.inactive {
      background: #fef2f2;
      color: #dc2626;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 6px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-btn .material-icons {
      font-size: 16px;
    }

    .edit-btn:hover {
      background: #eff6ff;
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .toggle-btn.activate:hover {
      background: #dcfce7;
      border-color: #22c55e;
      color: #22c55e;
    }

    .toggle-btn.deactivate:hover {
      background: #fef3c7;
      border-color: #f59e0b;
      color: #f59e0b;
    }

    .delete-btn:hover {
      background: #fef2f2;
      border-color: #ef4444;
      color: #ef4444;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
    }

    .empty-icon {
      font-size: 64px;
      color: #cbd5e1;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #475569;
      font-size: 20px;
      font-weight: 600;
    }

    .empty-state p {
      margin: 0 0 24px 0;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .contact-roles-container {
        padding: 16px;
      }

      .header-content {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .search-section {
        flex-direction: column;
        gap: 16px;
      }

      .search-bar {
        max-width: none;
      }

      .filter-buttons {
        justify-content: center;
      }

      .data-table {
        font-size: 12px;
      }

      .data-table th,
      .data-table td {
        padding: 12px 8px;
      }

      .action-buttons {
        flex-direction: column;
        gap: 4px;
      }
    }
  `]
})
export class ContactRolesListComponent implements OnInit {
  contactRoles: ContactRoleExtended[] = [];
  filteredContactRoles: ContactRoleExtended[] = [];
  searchTerm: string = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';

  constructor(
    private router: Router,
    private leadCreationService: LeadCreationService
  ) {}

  ngOnInit() {
    this.loadContactRoles();
  }

  loadContactRoles() {
    this.leadCreationService.getContactRoles().subscribe({
      next: (roles) => {
        // Transform to extended interface
        this.contactRoles = roles.map(role => ({
          ...role,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading contact roles:', error);
      }
    });
  }

  onSearch() {
    this.applyFilters();
  }

  setStatusFilter(filter: 'all' | 'active' | 'inactive') {
    this.statusFilter = filter;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.contactRoles];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(role =>
        role.roleName.toLowerCase().includes(searchLower) ||
        (role.description && role.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (this.statusFilter === 'active') {
      filtered = filtered.filter(role => role.isActive);
    } else if (this.statusFilter === 'inactive') {
      filtered = filtered.filter(role => !role.isActive);
    }

    this.filteredContactRoles = filtered;
  }

  createContactRole() {
    // Navigate to create form
    this.router.navigate(['/crm/masters/contact-roles/create']);
  }

  editContactRole(role: ContactRoleExtended) {
    // Navigate to edit form
    this.router.navigate(['/crm/masters/contact-roles/edit', role.roleId]);
  }

  toggleStatus(role: ContactRoleExtended) {
    const action = role.isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} "${role.roleName}"?`)) {
      // Update status
      role.isActive = !role.isActive;
      role.updatedAt = new Date();
      console.log(`${action} contact role:`, role);
    }
  }

  deleteContactRole(role: ContactRoleExtended) {
    if (confirm(`Are you sure you want to delete "${role.roleName}"? This action cannot be undone.`)) {
      // Delete role
      this.contactRoles = this.contactRoles.filter(r => r.roleId !== role.roleId);
      this.applyFilters();
      console.log('Delete contact role:', role);
    }
  }

  trackByRole(index: number, role: ContactRoleExtended): number {
    return role.roleId;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTotalCount(): number {
    return this.contactRoles.length;
  }

  getActiveCount(): number {
    return this.contactRoles.filter(r => r.isActive).length;
  }

  getInactiveCount(): number {
    return this.contactRoles.filter(r => !r.isActive).length;
  }

  getEmptyStateMessage(): string {
    if (this.searchTerm.trim()) {
      return `No contact roles match "${this.searchTerm}". Try adjusting your search terms.`;
    }
    
    if (this.statusFilter === 'active') {
      return 'No active contact roles found. Create one to get started.';
    }
    
    if (this.statusFilter === 'inactive') {
      return 'No inactive contact roles found.';
    }
    
    return 'Start by creating your first contact role to categorize lead contacts.';
  }
}
