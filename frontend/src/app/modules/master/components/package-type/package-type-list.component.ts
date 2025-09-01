import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackageType } from '../../models/package-type.model';
import { PackageTypeService } from '../../services/package-type.service';

@Component({
  selector: 'app-package-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title text-gray-900">Package Types</h1>
          <p class="mt-2 text-sm text-gray-700">Manage cargo packaging and container types</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Package Type
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
              (input)="filterPackageTypes()"
              placeholder="Search package types..."
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
            (change)="filterPackageTypes()"
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
        Showing {{ filteredPackageTypes.length }} of {{ packageTypes.length }} package types
      </div>

      <!-- Package Types Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div *ngFor="let packageType of paginatedPackageTypes; trackBy: trackByPackageType"
             class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-150">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span class="text-xl">{{ getPackageIcon(packageType.PackageTypeCode) }}</span>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-900 truncate">
                    {{ packageType.PackageTypeName }}
                  </h3>
                  <span [ngClass]="getStatusBadgeClass(packageType.IsActive)" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    {{ packageType.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <div class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ packageType.PackageTypeCode }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="mt-4">
              <p class="text-sm text-gray-600 line-clamp-2" [title]="packageType.Description">
                {{ packageType.Description }}
              </p>
            </div>
            
            <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>ID: {{ packageType.lid }}</span>
              <span>{{ packageType.CreatedDate | date:'MMM dd, yyyy' }}</span>
            </div>
            
            <div class="mt-4 flex space-x-2">
              <button
                type="button"
                class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                title="Edit"
              >
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit
              </button>
              <button
                type="button"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                title="Delete"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredPackageTypes.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No package types found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new package type.' }}
        </p>
      </div>

      <!-- Pagination -->
      <div *ngIf="filteredPackageTypes.length > itemsPerPage" class="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 rounded-lg sm:px-6">
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
              Showing {{ getStartIndex() }} to {{ getEndIndex() }} of {{ filteredPackageTypes.length }} results
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
  `
})
export class PackageTypeListComponent implements OnInit {
  packageTypes: PackageType[] = [];
  filteredPackageTypes: PackageType[] = [];
  paginatedPackageTypes: PackageType[] = [];
  
  searchTerm: string = '';
  statusFilter: string = '';
  
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  constructor(private packageTypeService: PackageTypeService) {}

  ngOnInit(): void {
    this.loadPackageTypes();
  }

  loadPackageTypes(): void {
    this.packageTypeService.getAllPackageTypes().subscribe({
      next: (types) => {
        this.packageTypes = types;
        this.filterPackageTypes();
      },
      error: (error) => {
        console.error('Error loading package types:', error);
      }
    });
  }

  filterPackageTypes(): void {
    this.filteredPackageTypes = this.packageTypes.filter(type => {
      const matchesSearch = !this.searchTerm || 
        type.PackageTypeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        type.PackageTypeCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        type.Description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && type.IsActive) ||
        (this.statusFilter === 'inactive' && !type.IsActive);
      
      return matchesSearch && matchesStatus;
    });
    
    this.totalPages = Math.ceil(this.filteredPackageTypes.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedPackageTypes();
  }

  updatePaginatedPackageTypes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPackageTypes = this.filteredPackageTypes.slice(startIndex, endIndex);
  }

  getPackageIcon(code: string): string {
    const icons: { [key: string]: string } = {
      'CTN': '📦',
      'WCR': '📦',
      'PLB': '🛍️',
      'MDR': '🛢️',
      'PAL': '🏗️',
      'SAK': '👜',
      'SCN': '📦',
      'BLK': '⚖️',
      'ROL': '📜',
      'BND': '📦'
    };
    return icons[code] || '📦';
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  trackByPackageType(index: number, type: PackageType): number {
    return type.lid;
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPackageTypes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPackageTypes();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedPackageTypes();
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredPackageTypes.length);
  }
}
