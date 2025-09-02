import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../../../services/database.service';
import { FrontendUser } from '../../../../models/database.interfaces';
import { User, UserWithDetails, UserType } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">Users</h1>
          <p class="secondary-text">Manage user accounts and permissions</p>
        </div>
        <button 
          (click)="addUser()"
          [disabled]="isLoading"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          {{ isLoading ? 'Loading...' : 'Add User' }}
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
                placeholder="Search users..." 
                class="input-text w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500">
              <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
            <select 
              formControlName="role"
              class="form-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32 disabled:bg-gray-100 disabled:text-gray-500">
              <option value="">All Roles</option>
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">User</option>
              <option value="4">Viewer</option>
            </select>
            <select 
              formControlName="status"
              class="form-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32 disabled:bg-gray-100 disabled:text-gray-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select 
              formControlName="department"
              class="form-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32 disabled:bg-gray-100 disabled:text-gray-500">
              <option value="">All Departments</option>
              <option *ngFor="let dept of availableDepartments" [value]="dept.id">{{ dept.name }}</option>
            </select>
            <select 
              formControlName="userType"
              class="form-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32 disabled:bg-gray-100 disabled:text-gray-500">
              <option value="">All User Types</option>
              <option value="1">Internal</option>
              <option value="2">Customer</option>
              <option value="3">Agent</option>
              <option value="-1">Admin</option>
            </select>
          </div>
        </form>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex items-center justify-center py-12">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="mt-4 text-sm text-gray-600">Loading all users from database...</p>
            <p class="text-xs text-gray-500">This may take a moment for large datasets</p>
          </div>
        </div>

        <!-- Table Content -->
        <div *ngIf="!isLoading" class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">Employee ID</th>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">User</th>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">Contact</th>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">Department</th>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">Role</th>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">Status</th>
                <th class="table-header px-6 py-3 text-left uppercase tracking-wider">User Type</th>
                <th class="table-header px-6 py-3 text-right uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let user of paginatedUsers; trackBy: trackByUser" 
                  class="hover:bg-gray-50 transition-colors"
                  [class.bg-red-50]="user.status === 'Inactive'">
                <!-- Employee ID -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <button 
                    (click)="viewUser(user.id!)"
                    class="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline cursor-pointer">
                    {{ getEmployeeCode(user) }}
                  </button>
                  <div class="text-xs text-gray-500" *ngIf="user.is_hod">
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      HOD
                    </span>
                  </div>
                </td>
                
                <!-- User Info -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div [class]="getAvatarClass(user.first_name || user.emp_name || 'User')" class="w-10 h-10 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">{{ getInitials(user.emp_name || user.first_name || 'User', user.last_name || '') }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900">{{ getUserDisplayName(user) }}</div>
                        <span *ngIf="user.is_hod" class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          HOD
                        </span>
                      </div>
                      <div class="text-sm text-gray-500">{{ getUserName(user) }}</div>
                    </div>
                  </div>
                </td>
                
                <!-- Contact Details -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                  <div class="text-sm text-gray-500">{{ getMobileNumber(user) }}</div>
                  <div class="text-xs text-gray-400" *ngIf="getAddress(user)" [title]="getAddress(user)">
                    {{ getShortAddress(getAddress(user)) }}
                  </div>
                </td>
                
                <!-- Department -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ getDepartmentName(getDepartmentId(user)) }}</div>
                  <div class="text-sm text-gray-500" *ngIf="getDivisionId(user)">{{ getDivisionName(getDivisionId(user)) }}</div>
                </td>
                
                <!-- Role -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="getRoleBadgeClass(user.role_id || 0)">
                    {{ getRoleName(user.role_id || 0) }}
                  </span>
                </td>
                
                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="getStatusBadgeClass(user.status)">
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                
                <!-- User Type -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="getUserTypeBadgeClass(user.user_type)">
                    {{ getUserTypeText(user.user_type) }}
                  </span>
                </td>
                
                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      (click)="editUser(user.id!)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" 
                      title="Edit">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="toggleUserStatus(user)"
                      [class]="getToggleStatusClass(user.status)"
                      class="p-1 rounded transition-colors" 
                      [title]="getToggleStatusTitle(user.status)">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path *ngIf="isUserActive(user.status)" fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707a1 1 0 01-1.414 1.414L15 11.914V5a2 2 0 00-2-2h-2a3 3 0 00-6 0H3a2 2 0 00-2 2v10a2 2 0 002 2h8a1 1 0 100-2H3V5z" clip-rule="evenodd"/>
                        <path *ngIf="!isUserActive(user.status)" fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <button 
                      (click)="viewUser(user.id!)"
                      class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" 
                      title="View">
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

          <!-- Empty State -->
          <div *ngIf="!isLoading && filteredUsers.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ users.length === 0 ? 'Get started by adding your first user.' : 'Try adjusting your search criteria.' }}
            </p>
            <div class="mt-6" *ngIf="users.length === 0">
              <button
                (click)="addUser()"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Add User
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div *ngIf="!isLoading && filteredUsers.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                (click)="changePage(currentPage - 1)"
                [disabled]="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                Previous
              </button>
              <button
                (click)="changePage(currentPage + 1)"
                [disabled]="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, filteredUsers.length) }} of {{ filteredUsers.length }} results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    (click)="changePage(currentPage - 1)"
                    [disabled]="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                    Previous
                  </button>
                  <button
                    *ngFor="let page of getPageNumbers()"
                    (click)="changePage(page)"
                    [class]="page === currentPage 
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'">
                    {{ page }}
                  </button>
                  <button
                    (click)="changePage(currentPage + 1)"
                    [disabled]="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  searchForm: FormGroup;
  isLoading = false;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(
    private databaseService: DatabaseService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      role: [''],
      status: [''],
      department: [''],
      userType: ['']
    });
  }

  private router = inject(Router);

  ngOnInit(): void {
    this.loadUsers();
    this.setupSearch();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.disableSearchForm();
    this.databaseService.getAllUsers().subscribe({
      next: (response) => {
        // Map FrontendUser to User format for template compatibility
        this.users = (response.users || []).map(user => this.mapFrontendUserToUser(user));
        this.applyFilters();
        console.log('All users loaded from API:', this.users.length);
        this.isLoading = false;
        this.enableSearchForm();
      },
      error: (error) => {
        console.error('Error loading users from API:', error);
        // Set empty users array on error
        this.users = [];
        this.applyFilters();
        this.isLoading = false;
        this.enableSearchForm();
      }
    });
  }

  private disableSearchForm(): void {
    this.searchForm.get('search')?.disable();
    this.searchForm.get('role')?.disable();
    this.searchForm.get('status')?.disable();
    this.searchForm.get('department')?.disable();
    this.searchForm.get('userType')?.disable();
  }

  private enableSearchForm(): void {
    this.searchForm.get('search')?.enable();
    this.searchForm.get('role')?.enable();
    this.searchForm.get('status')?.enable();
    this.searchForm.get('department')?.enable();
    this.searchForm.get('userType')?.enable();
  }

  mapFrontendUserToUser(frontendUser: FrontendUser): any {
    return {
      id: frontendUser.id,
      userName: frontendUser.userName,
      emp_name: frontendUser.fullName,
      empName: frontendUser.fullName,
      empCode: frontendUser.employeeId || `EMP${frontendUser.id.toString().padStart(3, '0')}`,
      first_name: frontendUser.firstName,
      last_name: frontendUser.lastName,
      email: frontendUser.email,
      mobile: frontendUser.phoneNumber || '',
      phone: frontendUser.phoneNumber || '',
      employee_code: frontendUser.employeeId || `EMP${frontendUser.id.toString().padStart(3, '0')}`,
      department_id: frontendUser.department ? 1 : 0, // Default mapping
      deptId: frontendUser.department ? 1 : 0,
      division_id: 1, // Default value
      divisionId: 1, // Default value
      role_id: frontendUser.roleId,
      status: frontendUser.status,
      user_type: 1, // Default to Internal Employee
      userType: 1,
      address: '', // Not available in FrontendUser
      is_hod: false, // Default value
      created_at: frontendUser.createdDate,
      last_login: frontendUser.lastLoginDate
    };
  }

  setupSearch(): void {
    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { search, role, status, department, userType } = this.searchForm.value;
    
    let filtered = [...this.users];

    // Text search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((user: any) =>
        (user.emp_name || user.first_name + ' ' + user.last_name).toLowerCase().includes(searchLower) ||
        (user.userName || '').toLowerCase().includes(searchLower) ||
        (user.empCode || user.employee_code || '').toLowerCase().includes(searchLower) ||
        (user.email || '').toLowerCase().includes(searchLower) ||
        (user.mobile || user.phone || '').toLowerCase().includes(searchLower)
      );
    }

    // Role filter
    if (role) {
      filtered = filtered.filter(user => user.role_id === +role);
    }

    // Status filter
    if (status) {
      if (status === 'active') {
        filtered = filtered.filter((user: any) => 
          user.status === 'Active' || user.status === 1
        );
      } else if (status === 'inactive') {
        filtered = filtered.filter((user: any) => 
          user.status === 'Inactive' || user.status === 0
        );
      }
    }

    // Department filter
    if (department) {
      filtered = filtered.filter((user: any) => 
        (user.deptId || user.department_id) === +department
      );
    }

    // User Type filter
    if (userType) {
      filtered = filtered.filter(user => 
        user.user_type === +userType
      );
    }

    this.filteredUsers = filtered;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  addUser(): void {
    this.router.navigate(['/identity/users/new']);
  }

  editUser(userId: number): void {
    this.router.navigate(['/identity/users', userId, 'edit']);
  }

  viewUser(userId: number): void {
    this.router.navigate(['/identity/users', userId]);
  }

  toggleUserStatus(user: User): void {
    const action = user.status === 'Inactive' ? 'restore' : 'deactivate';
    const confirmMessage = user.status === 'Inactive'
      ? `Are you sure you want to restore ${user.first_name} ${user.last_name}?`
      : `Are you sure you want to deactivate ${user.first_name} ${user.last_name}?`;

    if (confirm(confirmMessage)) {
      if (user.status === 'Inactive') {
        // this.userService.restoreUser(user.id!).subscribe({
        //   next: (success: any) => {
        //     if (success) {
        //       this.loadUsers();
        //     } else {
        //       alert('Failed to restore user.');
        //     }
        //   },
        //   error: (error: any) => {
        //     console.error('Error restoring user:', error);
        //     alert('Error restoring user.');
        //   }
        // });
        console.log('Restore user functionality temporarily disabled');
      } else {
        // this.userService.deleteUser(user.id!).subscribe({
        //   next: (success: any) => {
        //     if (success) {
        //       this.loadUsers();
        //     } else {
        //       alert('Failed to deactivate user.');
        //     }
        //   },
        //   error: (error: any) => {
        //     console.error('Error deactivating user:', error);
        //     alert('Error deactivating user.');
        //   }
        // });
        console.log('Delete user functionality temporarily disabled');
      }
    }
  }

  trackByUser(index: number, user: User): number {
    return user.id || index;
  }

  getInitials(firstName: string, lastName: string): string {
    const fullName = `${firstName} ${lastName}`;
    return fullName.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getAvatarClass(firstName: string): string {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-gray-500'
    ];
    const index = firstName.charCodeAt(0) % colors.length;
    return colors[index];
  }

  getRoleName(roleId: number): string {
    const roles: { [key: number]: string } = {
      1: 'Admin',
      2: 'Manager',
      3: 'User',
      4: 'Viewer'
    };
    return roles[roleId] || `Role ${roleId}`;
  }

  getRoleBadgeClass(roleId: number): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (roleId) {
      case 1: // Admin
        return `${baseClasses} bg-red-100 text-red-800`;
      case 2: // Manager
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 3: // User
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 4: // Viewer
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadgeClass(status: string | undefined): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return status === 'Active' 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }

  getLastLoginText(userId: number): string {
    // Mock last login data - in real app, this would come from user activity service
    const mockLogins: { [key: number]: string } = {
      1: '2 hours ago',
      2: '1 day ago', 
      3: '1 week ago',
      4: '3 hours ago',
      5: '5 hours ago',
      6: 'Never'
    };
    return mockLogins[userId] || 'Unknown';
  }

  // Helper methods for CRM-compatible user data access
  getUserDisplayName(user: User): string {
    return (user as any).empName || user.emp_name || `${user.first_name} ${user.last_name}`.trim();
  }

  getUserName(user: User): string {
    return (user as any).userName || 'N/A';
  }

  getEmployeeCode(user: User): string {
    return (user as any).empCode || user.employee_code || 'N/A';
  }

  getMobileNumber(user: User): string {
    return (user as any).mobile || user.phone || 'N/A';
  }

  getAddress(user: User): string {
    return (user as any).address || '';
  }

  getShortAddress(address: string): string {
    if (!address) return '';
    // Truncate address to first 30 characters and add ellipsis if longer
    return address.length > 30 ? address.substring(0, 30) + '...' : address;
  }

  getDepartmentId(user: User): number | undefined {
    return (user as any).deptId || user.department_id;
  }

  getDivisionId(user: User): number | undefined {
    return (user as any).divisionId || user.division_id;
  }

  // CRM-specific helper methods
  getDepartmentName(deptId: number | undefined): string {
    if (!deptId) return 'N/A';
    const dept = this.availableDepartments.find(d => d.id === deptId);
    return dept?.name || `Dept ${deptId}`;
  }

  getDivisionName(divisionId: number | undefined): string {
    if (!divisionId) return '';
    const division = this.availableDivisions.find(d => d.id === divisionId);
    return division?.name || `Division ${divisionId}`;
  }

  getUserTypeText(userType: number | undefined): string {
    const types: { [key: number]: string } = {
      1: 'Internal',
      2: 'Customer', 
      3: 'Agent',
      [-1]: 'Admin'
    };
    return types[userType || 1] || 'Unknown';
  }

  getUserTypeBadgeClass(userType: number | undefined): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (userType) {
      case -1: // Admin
        return `${baseClasses} bg-red-100 text-red-800`;
      case 1: // Internal
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 2: // Customer
        return `${baseClasses} bg-green-100 text-green-800`;
      case 3: // Agent
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusText(status: string | number | undefined): string {
    if (typeof status === 'number') {
      return status === 1 ? 'Active' : 'Inactive';
    }
    return status || 'Unknown';
  }

  isUserActive(status: string | number | undefined): boolean {
    if (typeof status === 'number') {
      return status === 1;
    }
    return status === 'Active';
  }

  getToggleStatusClass(status: string | number | undefined): string {
    return this.isUserActive(status) 
      ? 'text-red-600 hover:text-red-900 hover:bg-red-50'
      : 'text-green-600 hover:text-green-900 hover:bg-green-50';
  }

  getToggleStatusTitle(status: string | number | undefined): string {
    return this.isUserActive(status) ? 'Deactivate' : 'Restore';
  }

  // Available data for dropdowns (same as in form component)
  availableDepartments = [
    { id: 1, name: 'Information Technology' },
    { id: 2, name: 'Human Resources' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Operations' },
    { id: 5, name: 'Sales' },
    { id: 6, name: 'Marketing' },
    { id: 7, name: 'Legal' },
    { id: 8, name: 'Administration' }
  ];

  availableDivisions = [
    { id: 1, name: 'Corporate', departmentId: 1 },
    { id: 2, name: 'Regional', departmentId: 1 },
    { id: 3, name: 'Payroll', departmentId: 2 },
    { id: 4, name: 'Recruitment', departmentId: 2 },
    { id: 5, name: 'Accounts', departmentId: 3 },
    { id: 6, name: 'Treasury', departmentId: 3 },
    { id: 7, name: 'Logistics', departmentId: 4 },
    { id: 8, name: 'Warehouse', departmentId: 4 }
  ];

  // Utility for template
  Math = Math;
}