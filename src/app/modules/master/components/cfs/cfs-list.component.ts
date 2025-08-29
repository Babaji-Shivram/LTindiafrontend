import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CFS } from '../../models/cfs.model';
import { CFSService } from '../../services/cfs.service';

@Component({
  selector: 'app-cfs-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title text-gray-900">Container Freight Stations</h1>
          <p class="mt-2 text-sm text-gray-700">Manage CFS facilities and container handling stations</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add CFS
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
              (input)="filterCFS()"
              placeholder="Search CFS facilities..."
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
            (change)="filterCFS()"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="text-sm text-gray-700">
        Showing {{ filteredCFS.length }} of {{ cfsList.length }} CFS facilities
      </div>

      <!-- CFS Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  CFS Details
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Code
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Contact
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
              <tr *ngFor="let cfs of paginatedCFS; trackBy: trackByCFS" 
                  class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-orange-800">🏭</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="table-cell font-medium text-gray-900">{{ cfs.CFSName }}</div>
                      <div class="text-sm text-gray-500">ID: {{ cfs.lid }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ cfs.CFSCode }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs">
                    <div class="font-medium">{{ getCityName(cfs.CityId) }}</div>
                    <div class="text-gray-500 truncate" [title]="cfs.CFSAddress">{{ cfs.CFSAddress }}</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    <div class="font-medium">{{ cfs.ContactPerson }}</div>
                    <div class="text-gray-500">{{ cfs.Phone }}</div>
                    <div class="text-blue-600 hover:text-blue-800">
                      <a [href]="'mailto:' + cfs.Email">{{ cfs.Email }}</a>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="getStatusBadgeClass(cfs.IsActive)" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ cfs.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ cfs.CreatedDate | date:'MMM dd, yyyy' }}
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
                      (click)="toggleStatus(cfs)"
                      [class]="cfs.IsActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                      class="transition-colors duration-150"
                      [title]="cfs.IsActive ? 'Deactivate' : 'Activate'"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path *ngIf="cfs.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                        <path *ngIf="!cfs.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                      title="View Location"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
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
        <div *ngIf="filteredCFS.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No CFS facilities found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new CFS facility.' }}
          </p>
        </div>

        <!-- Pagination -->
        <div *ngIf="filteredCFS.length > itemsPerPage" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                Showing {{ getStartIndex() }} to {{ getEndIndex() }} of {{ filteredCFS.length }} results
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
export class CFSListComponent implements OnInit {
  cfsList: CFS[] = [];
  filteredCFS: CFS[] = [];
  paginatedCFS: CFS[] = [];
  
  searchTerm: string = '';
  statusFilter: string = '';
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  // City mapping (would typically come from a city service)
  private cityMap: { [key: number]: string } = {
    1: 'Mumbai',
    2: 'Chennai',
    3: 'Kolkata',
    4: 'Visakhapatnam',
    5: 'Kandla',
    6: 'Kochi',
    7: 'Tuticorin',
    8: 'Mundra',
    9: 'Paradip',
    10: 'Mangalore'
  };

  constructor(private cfsService: CFSService) {}

  ngOnInit(): void {
    this.loadCFS();
  }

  loadCFS(): void {
    this.cfsService.getAllCFS().subscribe({
      next: (cfsList) => {
        this.cfsList = cfsList;
        this.filterCFS();
      },
      error: (error) => {
        console.error('Error loading CFS facilities:', error);
      }
    });
  }

  filterCFS(): void {
    this.filteredCFS = this.cfsList.filter(cfs => {
      const matchesSearch = !this.searchTerm || 
        cfs.CFSName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cfs.CFSCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cfs.CFSAddress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cfs.ContactPerson.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cfs.Email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && cfs.IsActive) ||
        (this.statusFilter === 'inactive' && !cfs.IsActive);
      
      return matchesSearch && matchesStatus;
    });
    
    this.totalPages = Math.ceil(this.filteredCFS.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedCFS();
  }

  updatePaginatedCFS(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCFS = this.filteredCFS.slice(startIndex, endIndex);
  }

  getCityName(cityId: number): string {
    return this.cityMap[cityId] || 'Unknown City';
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  toggleStatus(cfs: CFS): void {
    this.cfsService.toggleCFSStatus(cfs.lid).subscribe({
      next: (updatedCFS) => {
        if (updatedCFS) {
          const index = this.cfsList.findIndex(c => c.lid === cfs.lid);
          if (index !== -1) {
            this.cfsList[index] = updatedCFS;
            this.filterCFS();
          }
        }
      },
      error: (error) => {
        console.error('Error toggling CFS status:', error);
      }
    });
  }

  trackByCFS(index: number, cfs: CFS): number {
    return cfs.lid;
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCFS();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCFS();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedCFS();
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredCFS.length);
  }
}
