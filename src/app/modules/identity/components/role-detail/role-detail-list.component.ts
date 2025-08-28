import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BSRoleMaster } from '../../models/role-detail.model';
import { RoleDetailService } from '../../services/role-detail.service';

@Component({
  selector: 'app-role-detail-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [RoleDetailService],
  template: `
    <div class="role-detail-list-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="title-section">
            <h1 class="page-title">Role Detail Master</h1>
            <p class="page-subtitle">Manage roles and permissions</p>
          </div>
          <div class="action-section">
            <button 
              class="btn btn-primary"
              (click)="createNewRole()"
              title="Create New Role">
              <i class="icon-plus"></i>
              New Role
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-grid">
          <div class="filter-group">
            <label for="searchInput">Search Roles</label>
            <div class="search-input-wrapper">
              <input
                #searchInput
                id="searchInput"
                type="text"
                placeholder="Search by role name or remarks..."
                [(ngModel)]="searchTerm"
                (input)="onSearchChange()"
                class="form-control search-input">
              <i class="search-icon icon-search"></i>
            </div>
          </div>
          
          <div class="filter-group">
            <label for="statusFilter">Status</label>
            <select 
              id="statusFilter"
              [(ngModel)]="statusFilter"
              (change)="onFilterChange()"
              class="form-control">
              <option value="all">All Roles</option>
              <option value="active">Active</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          <div class="filter-actions">
            <button 
              class="btn btn-secondary"
              (click)="clearFilters()"
              title="Clear Filters">
              <i class="icon-refresh"></i>
              Clear
            </button>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="results-summary" *ngIf="filteredRoles.length > 0">
        <span class="results-count">
          Showing {{ filteredRoles.length }} of {{ totalRoles }} roles
        </span>
        <span class="active-filters" *ngIf="hasActiveFilters()">
          <i class="icon-filter"></i>
          Filters applied
        </span>
      </div>

      <!-- Loading State -->
      <div class="loading-container" *ngIf="loading">
        <div class="loading-spinner"></div>
        <p>Loading roles...</p>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && roles.length === 0">
        <div class="empty-content">
          <i class="empty-icon icon-users"></i>
          <h3>No Roles Found</h3>
          <p>Get started by creating your first role</p>
          <button 
            class="btn btn-primary"
            (click)="createNewRole()">
            <i class="icon-plus"></i>
            Create First Role
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div class="empty-state" *ngIf="!loading && roles.length > 0 && filteredRoles.length === 0">
        <div class="empty-content">
          <i class="empty-icon icon-search"></i>
          <h3>No Matching Roles</h3>
          <p>Try adjusting your search criteria</p>
          <button 
            class="btn btn-secondary"
            (click)="clearFilters()">
            <i class="icon-refresh"></i>
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Roles Table -->
      <div class="table-container" *ngIf="!loading && filteredRoles.length > 0">
        <table class="data-table">
          <thead>
            <tr>
              <th class="sortable" (click)="sort('lRoleId')">
                Role ID
                <i class="sort-icon" [ngClass]="getSortIcon('lRoleId')"></i>
              </th>
              <th class="sortable" (click)="sort('sName')">
                Role Name
                <i class="sort-icon" [ngClass]="getSortIcon('sName')"></i>
              </th>
              <th class="sortable" (click)="sort('sRemarks')">
                Remarks
                <i class="sort-icon" [ngClass]="getSortIcon('sRemarks')"></i>
              </th>
              <th class="sortable" (click)="sort('dEntry')">
                Created Date
                <i class="sort-icon" [ngClass]="getSortIcon('dEntry')"></i>
              </th>
              <th>Status</th>
              <th>Permissions</th>
              <th class="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              *ngFor="let role of paginatedRoles; trackBy: trackByRoleId"
              [class.deleted-row]="role.bDel"
              (click)="selectRole(role)"
              [class.selected]="selectedRole?.lRoleId === role.lRoleId">
              
              <td class="role-id">{{ role.lRoleId }}</td>
              
              <td class="role-name">
                <div class="role-info">
                  <span class="name">{{ role.sName }}</span>
                  <span class="role-type-badge" *ngIf="getRoleType(role)">
                    {{ getRoleType(role) }}
                  </span>
                </div>
              </td>
              
              <td class="remarks">
                <span class="remarks-text" [title]="role.sRemarks">
                  {{ role.sRemarks | slice:0:50 }}
                  <span *ngIf="role.sRemarks.length > 50">...</span>
                </span>
              </td>
              
              <td class="created-date">
                <div class="date-info">
                  <span class="date">{{ role.dEntry | date:'shortDate' }}</span>
                  <span class="time">{{ role.dEntry | date:'shortTime' }}</span>
                </div>
              </td>
              
              <td class="status">
                <span class="status-badge" 
                      [ngClass]="role.bDel ? 'status-deleted' : 'status-active'">
                  {{ role.bDel ? 'Deleted' : 'Active' }}
                </span>
              </td>
              
              <td class="permissions">
                <button 
                  class="btn btn-link btn-sm"
                  (click)="viewPermissions(role, $event)"
                  title="View Permissions">
                  <i class="icon-shield"></i>
                  Permissions
                </button>
              </td>
              
              <td class="actions">
                <div class="action-buttons">
                  <button 
                    class="btn btn-icon btn-primary"
                    (click)="viewRoleDetails(role, $event)"
                    title="View Details">
                    <i class="icon-eye"></i>
                  </button>
                  
                  <button 
                    class="btn btn-icon btn-secondary"
                    (click)="editRole(role, $event)"
                    title="Edit Role"
                    [disabled]="role.bDel">
                    <i class="icon-edit"></i>
                  </button>
                  
                  <button 
                    class="btn btn-icon btn-danger"
                    (click)="deleteRole(role, $event)"
                    title="Delete Role"
                    [disabled]="role.bDel">
                    <i class="icon-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-container" *ngIf="!loading && filteredRoles.length > pageSize">
        <div class="pagination-info">
          <span>
            Showing {{ (currentPage - 1) * pageSize + 1 }} to 
            {{ Math.min(currentPage * pageSize, filteredRoles.length) }} of 
            {{ filteredRoles.length }} roles
          </span>
        </div>
        
        <div class="pagination-controls">
          <button 
            class="btn btn-icon"
            (click)="goToPage(1)"
            [disabled]="currentPage === 1"
            title="First Page">
            <i class="icon-chevron-double-left"></i>
          </button>
          
          <button 
            class="btn btn-icon"
            (click)="goToPage(currentPage - 1)"
            [disabled]="currentPage === 1"
            title="Previous Page">
            <i class="icon-chevron-left"></i>
          </button>
          
          <div class="page-numbers">
            <button 
              *ngFor="let page of getPageNumbers()"
              class="btn btn-page"
              [class.active]="page === currentPage"
              (click)="goToPage(page)">
              {{ page }}
            </button>
          </div>
          
          <button 
            class="btn btn-icon"
            (click)="goToPage(currentPage + 1)"
            [disabled]="currentPage === totalPages"
            title="Next Page">
            <i class="icon-chevron-right"></i>
          </button>
          
          <button 
            class="btn btn-icon"
            (click)="goToPage(totalPages)"
            [disabled]="currentPage === totalPages"
            title="Last Page">
            <i class="icon-chevron-double-right"></i>
          </button>
        </div>
        
        <div class="page-size-selector">
          <label for="pageSize">Show:</label>
          <select 
            id="pageSize"
            [(ngModel)]="pageSize"
            (change)="onPageSizeChange()"
            class="form-control page-size-select">
            <option [value]="10">10</option>
            <option [value]="25">25</option>
            <option [value]="50">50</option>
            <option [value]="100">100</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./role-detail-list.component.css']
})
export class RoleDetailListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data
  roles: BSRoleMaster[] = [];
  filteredRoles: BSRoleMaster[] = [];
  selectedRole: BSRoleMaster | null = null;

  // Loading state
  loading = false;

  // Filters
  searchTerm = '';
  statusFilter = 'all';

  // Sorting
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  pageSize = 25;
  totalPages = 0;
  totalRoles = 0;

  constructor(
    private roleDetailService: RoleDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRoles(): void {
    this.loading = true;
    
    // Use sample data for now (replace with actual service call)
    this.roleDetailService.getSampleRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (roles) => {
          this.roles = roles;
          this.totalRoles = roles.length;
          this.applyFilters();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading roles:', error);
          this.loading = false;
        }
      });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.roles];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(role =>
        role.sName.toLowerCase().includes(term) ||
        role.sRemarks.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(role => {
        if (this.statusFilter === 'active') return !role.bDel;
        if (this.statusFilter === 'deleted') return role.bDel;
        return true;
      });
    }

    this.filteredRoles = filtered;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRoles.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
  }

  get paginatedRoles(): BSRoleMaster[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredRoles.slice(startIndex, endIndex);
  }

  sort(field: keyof BSRoleMaster): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredRoles.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Handle different data types
      if (aValue instanceof Date && bValue instanceof Date) {
        aValue = aValue.getTime();
        bValue = bValue.getTime();
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) {
      return 'icon-sort';
    }
    return this.sortDirection === 'asc' ? 'icon-sort-up' : 'icon-sort-down';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.calculatePagination();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.currentPage = 1;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.searchTerm !== '' || this.statusFilter !== 'all';
  }

  selectRole(role: BSRoleMaster): void {
    this.selectedRole = role;
    this.roleDetailService.setCurrentRole(role);
  }

  createNewRole(): void {
    this.router.navigate(['/identity/roles/new']);
  }

  viewRoleDetails(role: BSRoleMaster, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/identity/roles', role.lRoleId]);
  }

  editRole(role: BSRoleMaster, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/identity/roles', role.lRoleId, 'edit']);
  }

  viewPermissions(role: BSRoleMaster, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/identity/roles', role.lRoleId, 'permissions']);
  }

  deleteRole(role: BSRoleMaster, event: Event): void {
    event.stopPropagation();
    
    if (confirm(`Are you sure you want to delete the role "${role.sName}"?`)) {
      this.roleDetailService.deleteRole(role.lRoleId, 1) // Assuming current user ID is 1
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              // Update local data
              const index = this.roles.findIndex(r => r.lRoleId === role.lRoleId);
              if (index !== -1) {
                this.roles[index].bDel = true;
                this.applyFilters();
              }
            }
          },
          error: (error) => {
            console.error('Error deleting role:', error);
            alert('Error deleting role. Please try again.');
          }
        });
    }
  }

  getRoleType(role: BSRoleMaster): string {
    // Determine role type based on name or other criteria
    if (role.sName.toLowerCase().includes('admin')) return 'Admin';
    if (role.sName.toLowerCase().includes('manager')) return 'Manager';
    if (role.sName.toLowerCase().includes('user')) return 'User';
    return '';
  }

  trackByRoleId(index: number, role: BSRoleMaster): number {
    return role.lRoleId;
  }

  // Expose Math for template
  Math = Math;
}
