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
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">Roles</h1>
          <p class="secondary-text">Manage roles and permissions</p>
        </div>
        <button 
          (click)="createNewRole()"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          New Role
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-md">
            <input 
              type="text" 
              [(ngModel)]="searchTerm"
              (input)="onSearchChange()"
              placeholder="Search roles..." 
              class="w-full input-text px-4 py-2 pl-10 border border-gray-300 rounded">
            <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
          </div>
          <select 
            [(ngModel)]="statusFilter"
            (change)="onFilterChange()"
            class="input-text px-3 py-2 border border-gray-300 rounded min-w-32">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
          <button 
            (click)="clearFilters()"
            class="input-text px-3 py-2 border border-gray-300 rounded">
            <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            Clear
          </button>
        </div>
      </div>

      <!-- Roles Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider cursor-pointer" (click)="sort('lRoleId')">
                  Role ID
                  <svg *ngIf="sortField === 'lRoleId'" class="w-3 h-3 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path *ngIf="sortDirection === 'asc'" d="M5 10l5-5 5 5H5z"/>
                    <path *ngIf="sortDirection === 'desc'" d="M15 10l-5 5-5-5h10z"/>
                  </svg>
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider cursor-pointer" (click)="sort('sName')">
                  Role Name
                  <svg *ngIf="sortField === 'sName'" class="w-3 h-3 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path *ngIf="sortDirection === 'asc'" d="M5 10l5-5 5 5H5z"/>
                    <path *ngIf="sortDirection === 'desc'" d="M15 10l-5 5-5-5h10z"/>
                  </svg>
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider cursor-pointer" (click)="sort('sRemarks')">
                  Remarks
                  <svg *ngIf="sortField === 'sRemarks'" class="w-3 h-3 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path *ngIf="sortDirection === 'asc'" d="M5 10l5-5 5 5H5z"/>
                    <path *ngIf="sortDirection === 'desc'" d="M15 10l-5 5-5-5h10z"/>
                  </svg>
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider cursor-pointer" (click)="sort('dEntry')">
                  Created Date
                  <svg *ngIf="sortField === 'dEntry'" class="w-3 h-3 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path *ngIf="sortDirection === 'asc'" d="M5 10l5-5 5 5H5z"/>
                    <path *ngIf="sortDirection === 'desc'" d="M15 10l-5 5-5-5h10z"/>
                  </svg>
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right table-header uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let role of paginatedRoles; trackBy: trackByRoleId"
                  class="hover:bg-gray-50 transition-colors"
                  [class.bg-red-50]="role.bDel"
                  (click)="selectRole(role)"
                  [class.bg-blue-50]="selectedRole?.lRoleId === role.lRoleId">
                
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="metric-label text-blue-600">{{ role.lRoleId }}</span>
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div [class]="getRoleAvatarClass(role)" class="w-10 h-10 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">{{ getRoleInitials(role.sName) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="table-cell font-medium text-gray-900">{{ role.sName }}</div>
                      <div class="text-xs text-gray-500" *ngIf="getRoleType(role)">{{ getRoleType(role) }}</div>
                    </div>
                  </div>
                </td>
                
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate" [title]="role.sRemarks">
                    {{ role.sRemarks }}
                  </div>
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ role.dEntry | date:'shortDate' }}</div>
                  <div class="text-xs text-gray-500">{{ role.dEntry | date:'shortTime' }}</div>
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [class]="role.bDel ? 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800' : 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'">
                    {{ role.bDel ? 'Deleted' : 'Active' }}
                  </span>
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      (click)="viewRoleDetails(role, $event)"
                      class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" 
                      title="View">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    
                    <button 
                      (click)="editRole(role, $event)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" 
                      title="Edit Role"
                      [disabled]="role.bDel">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </button>
                    
                    <button 
                      (click)="viewPermissions(role, $event)"
                      class="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-colors" 
                      title="Permissions">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    
                    <button 
                      (click)="deleteRole(role, $event)"
                      class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" 
                      title="Delete Role"
                      [disabled]="role.bDel">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707a1 1 0 01-1.414 1.414L15 11.914V5a2 2 0 00-2-2h-2a3 3 0 00-6 0H3a2 2 0 00-2 2v10a2 2 0 002 2h8a1 1 0 100-2H3V5z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Empty State -->
          <div *ngIf="!loading && roles.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating your first role.</p>
            <div class="mt-6">
              <button
                (click)="createNewRole()"
                style="background-color: #2c4170;"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:opacity-90">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                Create First Role
              </button>
            </div>
          </div>

          <!-- No Results State -->
          <div *ngIf="!loading && roles.length > 0 && filteredRoles.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No matching roles</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
            <div class="mt-6">
              <button
                (click)="clearFilters()"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                </svg>
                Clear Filters
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div *ngIf="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-sm text-gray-500">Loading roles...</p>
          </div>
        </div>

        <!-- Pagination -->
        <div *ngIf="!loading && filteredRoles.length > pageSize" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                (click)="goToPage(currentPage - 1)"
                [disabled]="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                Previous
              </button>
              <button
                (click)="goToPage(currentPage + 1)"
                [disabled]="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
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
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    (click)="goToPage(1)"
                    [disabled]="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  <button
                    (click)="goToPage(currentPage - 1)"
                    [disabled]="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>

                  <button 
                    *ngFor="let page of getPageNumbers()"
                    (click)="goToPage(page)"
                    [class]="page === currentPage ? 'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600' : 'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'">
                    {{ page }}
                  </button>

                  <button
                    (click)="goToPage(currentPage + 1)"
                    [disabled]="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  <button
                    (click)="goToPage(totalPages)"
                    [disabled]="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
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
    </div>
  `,
  styleUrls: []
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

      if ((aValue ?? '') < (bValue ?? '')) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if ((aValue ?? '') > (bValue ?? '')) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
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
    console.log('Navigating to create new role');
    this.router.navigate(['/identity/roles/new'])
      .then(success => {
        console.log('Navigation to new role successful:', success);
      })
      .catch(error => {
        console.error('Navigation to new role failed:', error);
      });
  }

  viewRoleDetails(role: BSRoleMaster, event: Event): void {
    event.stopPropagation();
    console.log('Navigating to role details:', role.lRoleId);
    this.router.navigate(['/identity/roles', role.lRoleId])
      .then(success => {
        console.log('Navigation to role details successful:', success);
      })
      .catch(error => {
        console.error('Navigation to role details failed:', error);
      });
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

  getRoleInitials(roleName: string): string {
    if (!roleName) return 'R';
    
    const words = roleName.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words.map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
  }

  getRoleAvatarClass(role: BSRoleMaster): string {
    const baseClasses = 'w-10 h-10 rounded-full flex items-center justify-center';
    const roleName = role.sName.toLowerCase();
    
    // Assign colors based on role type or name
    if (roleName.includes('admin') || roleName.includes('administrator')) {
      return `${baseClasses} bg-red-500`; // Red for admin roles
    } else if (roleName.includes('manager') || roleName.includes('supervisor')) {
      return `${baseClasses} bg-blue-500`; // Blue for manager roles
    } else if (roleName.includes('user') || roleName.includes('employee')) {
      return `${baseClasses} bg-green-500`; // Green for user roles
    } else if (roleName.includes('guest') || roleName.includes('visitor')) {
      return `${baseClasses} bg-gray-500`; // Gray for guest roles
    } else if (roleName.includes('developer') || roleName.includes('technical')) {
      return `${baseClasses} bg-purple-500`; // Purple for technical roles
    } else if (roleName.includes('analyst') || roleName.includes('finance')) {
      return `${baseClasses} bg-indigo-500`; // Indigo for analyst roles
    } else if (roleName.includes('sales') || roleName.includes('marketing')) {
      return `${baseClasses} bg-orange-500`; // Orange for sales roles
    } else if (roleName.includes('support') || roleName.includes('help')) {
      return `${baseClasses} bg-teal-500`; // Teal for support roles
    } else {
      // Default color based on first letter for consistency
      const firstChar = role.sName.charAt(0).toLowerCase();
      const colorIndex = firstChar.charCodeAt(0) % 8;
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-gray-500'];
      return `${baseClasses} ${colors[colorIndex]}`;
    }
  }

  trackByRoleId(index: number, role: BSRoleMaster): number {
    return role.lRoleId;
  }

  // Expose Math for template
  Math = Math;
}
