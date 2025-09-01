import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobStatus } from '../../models/job-status.model';
import { JobStatusService } from '../../services/job-status.service';

@Component({
  selector: 'app-job-status-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title text-gray-900">Job Status</h1>
          <p class="mt-2 text-sm text-gray-700">Manage job status workflow and progression stages</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Job Status
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterJobStatuses()"
              placeholder="Search job statuses..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex space-x-3">
          <select
            [(ngModel)]="statusFilter"
            (change)="filterJobStatuses()"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="button"
            (click)="sortByOrder()"
            class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
            Sort by Order
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="text-sm text-gray-700">
        Showing {{ filteredJobStatuses.length }} of {{ jobStatuses.length }} job statuses
        <span *ngIf="isSortedByOrder" class="ml-2 text-indigo-600">(sorted by workflow order)</span>
      </div>

      <!-- Job Status Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Status Details
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Code
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Color Preview
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Created Date
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let jobStatus of paginatedJobStatuses; trackBy: trackByJobStatus" 
                  class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                    {{ jobStatus.StatusOrder }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full flex items-center justify-center"
                           [style.background-color]="jobStatus.StatusColor + '20'"
                           [style.border]="'2px solid ' + jobStatus.StatusColor">
                        <span class="metric-label" [style.color]="jobStatus.StatusColor">📊</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="table-cell font-medium text-gray-900">{{ jobStatus.StatusName }}</div>
                      <div class="text-sm text-gray-500">ID: {{ jobStatus.lid }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [style.background-color]="jobStatus.StatusColor + '20'"
                        [style.color]="jobStatus.StatusColor">
                    {{ jobStatus.StatusCode }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-200"
                         [style.background-color]="jobStatus.StatusColor"
                         [title]="jobStatus.StatusColor">
                    </div>
                    <span class="text-xs text-gray-500 font-mono">{{ jobStatus.StatusColor }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="getStatusBadgeClass(jobStatus.IsActive)" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ jobStatus.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ jobStatus.CreatedDate | date:'MMM dd, yyyy' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      class="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                      title="Edit"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      (click)="toggleStatus(jobStatus)"
                      [class]="jobStatus.IsActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                      class="transition-colors duration-150"
                      [title]="jobStatus.IsActive ? 'Deactivate' : 'Activate'"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path *ngIf="jobStatus.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                        <path *ngIf="!jobStatus.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      (click)="moveUp(jobStatus)"
                      [disabled]="jobStatus.StatusOrder === 1"
                      class="text-blue-600 hover:text-blue-900 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      (click)="moveDown(jobStatus)"
                      [disabled]="jobStatus.StatusOrder === maxOrder"
                      class="text-blue-600 hover:text-blue-900 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="text-red-600 hover:text-red-900 transition-colors duration-150"
                      title="Delete"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredJobStatuses.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No job statuses found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new job status.' }}
          </p>
        </div>

        <!-- Pagination -->
        <div *ngIf="filteredJobStatuses.length > itemsPerPage" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              (click)="previousPage()"
              [disabled]="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              (click)="nextPage()"
              [disabled]="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ getStartIndex() }} to {{ getEndIndex() }} of {{ filteredJobStatuses.length }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  (click)="previousPage()"
                  [disabled]="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  *ngFor="let page of getPageNumbers()"
                  (click)="goToPage(page)"
                  [class]="page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button
                  (click)="nextPage()"
                  [disabled]="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
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
export class JobStatusListComponent implements OnInit {
  jobStatuses: JobStatus[] = [];
  filteredJobStatuses: JobStatus[] = [];
  paginatedJobStatuses: JobStatus[] = [];
  
  searchTerm: string = '';
  statusFilter: string = '';
  isSortedByOrder: boolean = false;
  maxOrder: number = 0;
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private jobStatusService: JobStatusService) {}

  ngOnInit(): void {
    this.loadJobStatuses();
  }

  loadJobStatuses(): void {
    this.jobStatusService.getAllJobStatuses().subscribe({
      next: (jobStatuses) => {
        this.jobStatuses = jobStatuses;
        this.maxOrder = Math.max(...jobStatuses.map(js => js.StatusOrder));
        this.filterJobStatuses();
      },
      error: (error) => {
        console.error('Error loading job statuses:', error);
      }
    });
  }

  filterJobStatuses(): void {
    this.filteredJobStatuses = this.jobStatuses.filter(jobStatus => {
      const matchesSearch = !this.searchTerm || 
        jobStatus.StatusName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        jobStatus.StatusCode.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && jobStatus.IsActive) ||
        (this.statusFilter === 'inactive' && !jobStatus.IsActive);
      
      return matchesSearch && matchesStatus;
    });
    
    // Apply sorting if needed
    if (this.isSortedByOrder) {
      this.filteredJobStatuses.sort((a, b) => a.StatusOrder - b.StatusOrder);
    }
    
    this.totalPages = Math.ceil(this.filteredJobStatuses.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedJobStatuses();
  }

  updatePaginatedJobStatuses(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobStatuses = this.filteredJobStatuses.slice(startIndex, endIndex);
  }

  sortByOrder(): void {
    this.isSortedByOrder = !this.isSortedByOrder;
    this.filterJobStatuses();
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  toggleStatus(jobStatus: JobStatus): void {
    this.jobStatusService.toggleJobStatusActive(jobStatus.lid).subscribe({
      next: (updatedStatus) => {
        if (updatedStatus) {
          const index = this.jobStatuses.findIndex(js => js.lid === jobStatus.lid);
          if (index !== -1) {
            this.jobStatuses[index] = updatedStatus;
            this.filterJobStatuses();
          }
        }
      },
      error: (error) => {
        console.error('Error toggling job status:', error);
      }
    });
  }

  moveUp(jobStatus: JobStatus): void {
    if (jobStatus.StatusOrder > 1) {
      const targetStatus = this.jobStatuses.find(js => js.StatusOrder === jobStatus.StatusOrder - 1);
      if (targetStatus) {
        this.swapOrders(jobStatus, targetStatus);
      }
    }
  }

  moveDown(jobStatus: JobStatus): void {
    if (jobStatus.StatusOrder < this.maxOrder) {
      const targetStatus = this.jobStatuses.find(js => js.StatusOrder === jobStatus.StatusOrder + 1);
      if (targetStatus) {
        this.swapOrders(jobStatus, targetStatus);
      }
    }
  }

  private swapOrders(status1: JobStatus, status2: JobStatus): void {
    const tempOrder = status1.StatusOrder;
    
    // Update first status
    this.jobStatusService.updateJobStatus(status1.lid, { StatusOrder: status2.StatusOrder }).subscribe();
    
    // Update second status
    this.jobStatusService.updateJobStatus(status2.lid, { StatusOrder: tempOrder }).subscribe();
    
    // Update local data
    status1.StatusOrder = status2.StatusOrder;
    status2.StatusOrder = tempOrder;
    
    this.filterJobStatuses();
  }

  trackByJobStatus(index: number, jobStatus: JobStatus): number {
    return jobStatus.lid;
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedJobStatuses();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedJobStatuses();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedJobStatuses();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, this.currentPage - halfVisible);
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredJobStatuses.length);
  }
}
