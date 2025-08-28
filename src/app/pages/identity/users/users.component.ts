import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../modules/master/services/user.service';
import { User, UserWithDetails, UserType } from '../../../modules/master/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold text-gray-900">Users</h1>
          <p class="text-sm text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button 
          (click)="addUser()"
          style="background-color: #2c4170;" 
          class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add User
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
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
            <select 
              formControlName="role"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-32">
              <option value="">All Roles</option>
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">User</option>
              <option value="4">Viewer</option>
            </select>
            <select 
              formControlName="status"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-32">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select 
              formControlName="department"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-32">
              <option value="">All Departments</option>
              <option value="1">IT</option>
              <option value="2">HR</option>
              <option value="3">Finance</option>
              <option value="4">Operations</option>
              <option value="5">Sales</option>
            </select>
          </div>
        </form>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let user of paginatedUsers; trackBy: trackByUser" 
                  class="hover:bg-gray-50 transition-colors"
                  [class.bg-red-50]="user.bDel">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div [class]="getAvatarClass(user.sName)" class="w-10 h-10 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">{{ getInitials(user.sName) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900">{{ user.sName }}</div>
                        <span *ngIf="user.hod === 'Y'" class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          HOD
                        </span>
                      </div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                      <div class="text-xs text-gray-400">{{ user.empCode }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="getRoleBadgeClass(user.lRoleId)">
                    {{ getRoleName(user.lRoleId) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="getStatusBadgeClass(user.bDel)">
                    {{ user.bDel ? 'Inactive' : 'Active' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ getLastLoginText(user.lId) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      (click)="editUser(user.lId)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" 
                      title="Edit">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="toggleUserStatus(user)"
                      [class]="user.bDel ? 'text-green-600 hover:text-green-900 hover:bg-green-50' : 'text-red-600 hover:text-red-900 hover:bg-red-50'"
                      class="p-1 rounded transition-colors" 
                      [title]="user.bDel ? 'Restore' : 'Deactivate'">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path *ngIf="!user.bDel" fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707a1 1 0 01-1.414 1.414L15 11.914V5a2 2 0 00-2-2h-2a3 3 0 00-6 0H3a2 2 0 00-2 2v10a2 2 0 002 2h8a1 1 0 100-2H3V5z" clip-rule="evenodd"/>
                        <path *ngIf="user.bDel" fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <button 
                      (click)="viewUser(user.lId)"
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
          <div *ngIf="filteredUsers.length === 0" class="text-center py-12">
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
        <div *ngIf="filteredUsers.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
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
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      role: [''],
      status: [''],
      department: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.setupSearch();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: UserWithDetails[]) => {
        this.users = users;
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
      }
    });
  }

  setupSearch(): void {
    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { search, role, status, department } = this.searchForm.value;
    
    let filtered = [...this.users];

    // Text search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(user =>
        user.sName.toLowerCase().includes(searchLower) ||
        user.empCode.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Role filter
    if (role) {
      filtered = filtered.filter(user => user.lRoleId === +role);
    }

    // Status filter
    if (status) {
      if (status === 'active') {
        filtered = filtered.filter(user => !user.bDel);
      } else if (status === 'inactive') {
        filtered = filtered.filter(user => user.bDel);
      }
    }

    // Department filter
    if (department) {
      filtered = filtered.filter(user => user.deptId === +department);
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
    const action = user.bDel ? 'restore' : 'deactivate';
    const confirmMessage = user.bDel 
      ? `Are you sure you want to restore ${user.sName}?`
      : `Are you sure you want to deactivate ${user.sName}?`;

    if (confirm(confirmMessage)) {
      if (user.bDel) {
        this.userService.restoreUser(user.lId).subscribe({
          next: (success) => {
            if (success) {
              this.loadUsers();
            } else {
              alert('Failed to restore user.');
            }
          },
          error: (error) => {
            console.error('Error restoring user:', error);
            alert('Error restoring user.');
          }
        });
      } else {
        this.userService.deleteUser(user.lId).subscribe({
          next: (success) => {
            if (success) {
              this.loadUsers();
            } else {
              alert('Failed to deactivate user.');
            }
          },
          error: (error) => {
            console.error('Error deactivating user:', error);
            alert('Error deactivating user.');
          }
        });
      }
    }
  }

  trackByUser(index: number, user: User): number {
    return user.lId;
  }

  getInitials(name: string): string {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getAvatarClass(name: string): string {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-gray-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
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

  getStatusBadgeClass(isDeleted: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return isDeleted 
      ? `${baseClasses} bg-red-100 text-red-800`
      : `${baseClasses} bg-green-100 text-green-800`;
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

  // Utility for template
  Math = Math;
}