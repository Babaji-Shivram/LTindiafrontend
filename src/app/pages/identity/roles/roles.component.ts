import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="section-header text-gray-900">Roles</h1>
          <p class="text-sm text-gray-600">Manage user roles and permissions</p>
        </div>
        <button 
          (click)="addRole()"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all ">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add Role
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow border border-gray-200 p-4">
        <form [formGroup]="searchForm" class="flex items-center justify-between">
          <div class="flex items-center space-x-4 flex-1">
            <div class="relative flex-1 max-w-md">
              <input 
                type="text" 
                formControlName="search"
                placeholder="Search roles..." 
                class="w-full input-text px-4 py-2 pl-10 border border-gray-300 rounded">
              <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
            <select 
              formControlName="status"
              class="input-text px-3 py-2 border border-gray-300 rounded min-w-32">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select 
              formControlName="permissions"
              class="input-text px-3 py-2 border border-gray-300 rounded min-w-40">
              <option value="">All Permissions</option>
              <option value="user.manage">User Management</option>
              <option value="role.manage">Role Management</option>
              <option value="system.config">System Config</option>
              <option value="reports.view">Reports</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">{{ filteredRoles.length }} role(s)</span>
          </div>
        </form>
      </div>

      <!-- Roles Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Users</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Permissions</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Created</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let role of paginatedRoles; trackBy: trackByRole" 
                  class="hover:bg-gray-50 transition-colors"
                  [class.bg-red-50]="role.status === 'Inactive'">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div [class]="getRoleIconClass(role.name)" class="w-10 h-10 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="ml-4">
                      <div class="flex items-center">
                        <div class="table-cell font-medium text-gray-900">{{ role.name }}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate" [title]="role.description">
                    {{ role.description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ role.userCount }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span *ngFor="let permission of role.permissions.slice(0, 2)" 
                          class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {{ permission }}
                    </span>
                    <span *ngIf="role.permissions.length > 2" 
                          class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                      +{{ role.permissions.length - 2 }} more
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="getStatusBadgeClass(role.status)">
                    {{ role.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ role.createdAt }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium">
                  <div class="flex items-center space-x-2">
                    <button 
                      (click)="editRole(role.id!)"
                      class="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 p-1 rounded transition-colors" 
                      title="Edit">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="toggleRoleStatus(role)"
                      [class]="role.status === 'Inactive' ? 'text-green-600 hover:text-green-900 hover:bg-green-50' : 'text-red-600 hover:text-red-900 hover:bg-red-50'"
                      class="p-1 rounded transition-colors" 
                      [title]="role.status === 'Inactive' ? 'Activate' : 'Deactivate'">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path *ngIf="role.status === 'Active'" fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707a1 1 0 01-1.414 1.414L15 11.914V5a2 2 0 00-2-2h-2a3 3 0 00-6 0H3a2 2 0 00-2 2v10a2 2 0 002 2h8a1 1 0 100-2H3V5z" clip-rule="evenodd"/>
                        <path *ngIf="role.status === 'Inactive'" fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <button 
                      (click)="viewRole(role.id!)"
                      class="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-1 rounded transition-colors" 
                      title="View Details">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              (click)="previousPage()"
              [disabled]="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button 
              (click)="nextPage()"
              [disabled]="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, filteredRoles.length) }} of {{ filteredRoles.length }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button 
                  (click)="previousPage()"
                  [disabled]="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
                <button 
                  *ngFor="let page of getPageNumbers()" 
                  (click)="goToPage(page)"
                  [class]="page === currentPage ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  {{ page }}
                </button>
                <button 
                  (click)="nextPage()"
                  [disabled]="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RolesComponent implements OnInit {
  searchForm: FormGroup;
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  paginatedRoles: Role[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  Math = Math;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      status: [''],
      permissions: ['']
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    this.setupFormSubscriptions();
  }

  setupFormSubscriptions(): void {
    this.searchForm.valueChanges.subscribe(() => {
      this.filterRoles();
    });
  }

  loadRoles(): void {
    // Mock roles data - in real app, this would come from a service
    this.roles = [
      {
        id: 1,
        name: 'Admin',
        description: 'Full system access with all administrative privileges',
        permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'role.manage', 'system.config'],
        userCount: 2,
        status: 'Active',
        createdAt: 'Jan 15, 2024',
        updatedAt: 'Jan 15, 2024'
      },
      {
        id: 2,
        name: 'Manager',
        description: 'Management level access with team oversight capabilities',
        permissions: ['user.read', 'user.update', 'reports.view', 'team.manage'],
        userCount: 5,
        status: 'Active',
        createdAt: 'Jan 20, 2024',
        updatedAt: 'Jan 20, 2024'
      },
      {
        id: 3,
        name: 'User',
        description: 'Standard user access with basic system functionality',
        permissions: ['profile.read', 'profile.update', 'data.read'],
        userCount: 15,
        status: 'Active',
        createdAt: 'Feb 1, 2024',
        updatedAt: 'Feb 1, 2024'
      },
      {
        id: 4,
        name: 'Viewer',
        description: 'Read-only access for viewing system information',
        permissions: ['data.read', 'reports.view'],
        userCount: 8,
        status: 'Inactive',
        createdAt: 'Feb 10, 2024',
        updatedAt: 'Feb 10, 2024'
      },
      {
        id: 5,
        name: 'Sales',
        description: 'Sales team access with customer and order management',
        permissions: ['customer.read', 'customer.update', 'order.create', 'order.read'],
        userCount: 12,
        status: 'Active',
        createdAt: 'Mar 1, 2024',
        updatedAt: 'Mar 1, 2024'
      }
    ];
    this.filterRoles();
  }

  filterRoles(): void {
    const { search, status, permissions } = this.searchForm.value;
    let filtered = [...this.roles];

    // Text search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchLower) ||
        role.description.toLowerCase().includes(searchLower) ||
        role.permissions.some(permission => permission.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (status) {
      if (status === 'active') {
        filtered = filtered.filter(role => role.status === 'Active');
      } else if (status === 'inactive') {
        filtered = filtered.filter(role => role.status === 'Inactive');
      }
    }

    // Permissions filter
    if (permissions) {
      filtered = filtered.filter(role => 
        role.permissions.some(permission => permission.includes(permissions))
      );
    }

    this.filteredRoles = filtered;
    this.totalPages = Math.ceil(this.filteredRoles.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedRoles();
  }

  updatePaginatedRoles(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRoles = this.filteredRoles.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRoles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRoles();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedRoles();
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, this.currentPage - halfMaxPages);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  addRole(): void {
    this.router.navigate(['/identity/roles/new']);
  }

  editRole(roleId: number): void {
    this.router.navigate(['/identity/roles', roleId, 'edit']);
  }

  viewRole(roleId: number): void {
    this.router.navigate(['/identity/roles', roleId]);
  }

  toggleRoleStatus(role: Role): void {
    const action = role.status === 'Inactive' ? 'activate' : 'deactivate';
    const confirmMessage = role.status === 'Inactive'
      ? `Are you sure you want to activate ${role.name}?`
      : `Are you sure you want to deactivate ${role.name}?`;

    if (confirm(confirmMessage)) {
      // Mock toggle - in real app, this would call a service
      role.status = role.status === 'Active' ? 'Inactive' : 'Active';
      role.updatedAt = new Date().toLocaleDateString();
      this.filterRoles();
    }
  }

  trackByRole(index: number, role: Role): number {
    return role.id || index;
  }

  getRoleIconClass(roleName: string): string {
    const baseClasses = 'w-8 h-8 rounded-lg flex items-center justify-center';
    switch (roleName.toLowerCase()) {
      case 'admin':
        return `${baseClasses} bg-red-500`;
      case 'manager':
        return `${baseClasses} bg-yellow-500`;
      case 'user':
        return `${baseClasses} bg-blue-500`;
      case 'viewer':
        return `${baseClasses} bg-gray-500`;
      case 'sales':
        return `${baseClasses} bg-green-500`;
      default:
        return `${baseClasses} bg-gray-500`;
    }
  }

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return status === 'Active' 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }
}
