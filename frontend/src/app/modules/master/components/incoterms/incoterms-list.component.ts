import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IncoTerms } from '../../models/incoterms.model';
import { IncoTermsService } from '../../services/incoterms.service';

@Component({
  selector: 'app-incoterms-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title text-gray-900">International Commercial Terms</h1>
          <p class="mt-2 text-sm text-gray-700">Manage Incoterms for international trade and shipping</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Incoterm
          </button>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            *ngFor="let tab of categoryTabs"
            (click)="activeCategory = tab.key; filterIncoTerms()"
            [class]="getTabClass(tab.key)"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-150"
          >
            <span class="flex items-center space-x-2">
              <span>{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
              <span class="bg-gray-100 text-gray-900 ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium">
                {{ getCategoryCount(tab.key) }}
              </span>
            </span>
          </button>
        </nav>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterIncoTerms()"
              placeholder="Search Incoterms by code, name, or description..."
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
            (change)="filterIncoTerms()"
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
        Showing {{ filteredIncoTerms.length }} of {{ incoTermsList.length }} Incoterms
      </div>

      <!-- Incoterms Cards/Table -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3" *ngIf="!isTableView">
        <div
          *ngFor="let incoTerm of paginatedIncoTerms; trackBy: trackByIncoTerm"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-150"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-bold text-blue-800">{{ incoTerm.IncoTermCode }}</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ incoTerm.IncoTermCode }}</h3>
                  <p class="text-sm text-gray-500">{{ incoTerm.IncoTermName }}</p>
                </div>
              </div>
              <span [ngClass]="getStatusBadgeClass(incoTerm.IsActive)" 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ incoTerm.IsActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <div class="mt-4">
              <p class="text-sm text-gray-600 line-clamp-3">{{ incoTerm.Description }}</p>
            </div>

            <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>Created: {{ incoTerm.CreatedDate | date:'MMM dd, yyyy' }}</span>
              <span>ID: {{ incoTerm.lid }}</span>
            </div>

            <div class="mt-6 flex items-center space-x-3">
              <button
                type="button"
                class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Details
              </button>
              <button
                type="button"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit
              </button>
              <button
                type="button"
                (click)="toggleStatus(incoTerm)"
                [class]="incoTerm.IsActive ? 'text-red-700 bg-red-100 hover:bg-red-200' : 'text-green-700 bg-green-100 hover:bg-green-200'"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                [title]="incoTerm.IsActive ? 'Deactivate' : 'Activate'"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path *ngIf="incoTerm.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                  <path *ngIf="!incoTerm.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md" *ngIf="isTableView">
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 class="table-cell font-medium text-gray-900">Incoterms List</h3>
          <button
            (click)="isTableView = !isTableView"
            class="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Switch to Cards
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Code & Name
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Category
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
              <tr *ngFor="let incoTerm of paginatedIncoTerms; trackBy: trackByIncoTerm" 
                  class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-sm font-bold text-blue-800">{{ incoTerm.IncoTermCode }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="table-cell font-medium text-gray-900">{{ incoTerm.IncoTermCode }}</div>
                      <div class="text-sm text-gray-500">{{ incoTerm.IncoTermName }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs">
                    <div class="truncate" [title]="incoTerm.Description">{{ incoTerm.Description }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="getCategoryBadgeClass(incoTerm.IncoTermCode)" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ getIncoTermCategory(incoTerm.IncoTermCode) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="getStatusBadgeClass(incoTerm.IsActive)" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ incoTerm.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ incoTerm.CreatedDate | date:'MMM dd, yyyy' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      class="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                      title="View Details"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
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
                      (click)="toggleStatus(incoTerm)"
                      [class]="incoTerm.IsActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                      class="transition-colors duration-150"
                      [title]="incoTerm.IsActive ? 'Deactivate' : 'Activate'"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path *ngIf="incoTerm.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                        <path *ngIf="!incoTerm.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredIncoTerms.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No Incoterms found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new Incoterm.' }}
          </p>
        </div>

        <!-- Pagination -->
        <div *ngIf="filteredIncoTerms.length > itemsPerPage" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                Showing {{ getStartIndex() }} to {{ getEndIndex() }} of {{ filteredIncoTerms.length }} results
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

      <!-- View Toggle (for card view) -->
      <div class="flex justify-center" *ngIf="!isTableView">
        <button
          (click)="isTableView = !isTableView"
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Switch to Table View
        </button>
      </div>
    </div>
  `
})
export class IncoTermsListComponent implements OnInit {
  incoTermsList: IncoTerms[] = [];
  filteredIncoTerms: IncoTerms[] = [];
  paginatedIncoTerms: IncoTerms[] = [];
  
  searchTerm: string = '';
  statusFilter: string = '';
  activeCategory: string = 'all';
  isTableView: boolean = false;
  
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  categoryTabs = [
    { key: 'all', label: 'All Terms', icon: '🌐' },
    { key: 'sea', label: 'Sea/Waterway', icon: '🚢' },
    { key: 'any', label: 'Any Transport', icon: '🚛' },
    { key: 'deprecated', label: 'Deprecated', icon: '⚠️' }
  ];

  constructor(private incoTermsService: IncoTermsService) {}

  ngOnInit(): void {
    this.loadIncoTerms();
  }

  loadIncoTerms(): void {
    this.incoTermsService.getAllIncoTerms().subscribe({
      next: (incoTerms) => {
        this.incoTermsList = incoTerms;
        this.filterIncoTerms();
      },
      error: (error) => {
        console.error('Error loading Incoterms:', error);
      }
    });
  }

  filterIncoTerms(): void {
    let filtered = [...this.incoTermsList];

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(term =>
        term.IncoTermCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        term.IncoTermName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        term.Description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (this.statusFilter) {
      filtered = filtered.filter(term => 
        this.statusFilter === 'active' ? term.IsActive : !term.IsActive
      );
    }

    // Filter by category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(term => {
        const category = this.getIncoTermCategory(term.IncoTermCode).toLowerCase();
        return this.activeCategory === category || 
               (this.activeCategory === 'deprecated' && !term.IsActive);
      });
    }

    this.filteredIncoTerms = filtered;
    this.totalPages = Math.ceil(this.filteredIncoTerms.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedIncoTerms();
  }

  updatePaginatedIncoTerms(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedIncoTerms = this.filteredIncoTerms.slice(startIndex, endIndex);
  }

  getIncoTermCategory(code: string): string {
    const seaWaterway = ['FOB', 'CIF', 'CFR', 'FAS'];
    const anyTransport = ['EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
    
    if (seaWaterway.includes(code)) return 'Sea';
    if (anyTransport.includes(code)) return 'Any';
    return 'Other';
  }

  getCategoryBadgeClass(code: string): string {
    const category = this.getIncoTermCategory(code);
    switch (category) {
      case 'Sea': return 'bg-blue-100 text-blue-800';
      case 'Any': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  getTabClass(categoryKey: string): string {
    const baseClass = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
    const activeClass = 'border-indigo-500 text-indigo-600';
    
    return this.activeCategory === categoryKey ? activeClass : baseClass;
  }

  getCategoryCount(categoryKey: string): number {
    if (categoryKey === 'all') return this.incoTermsList.length;
    
    return this.incoTermsList.filter(term => {
      if (categoryKey === 'deprecated') return !term.IsActive;
      
      const category = this.getIncoTermCategory(term.IncoTermCode).toLowerCase();
      return categoryKey === category;
    }).length;
  }

  toggleStatus(incoTerm: IncoTerms): void {
    this.incoTermsService.toggleIncoTermStatus(incoTerm.lid).subscribe({
      next: (updatedIncoTerm) => {
        if (updatedIncoTerm) {
          const index = this.incoTermsList.findIndex(t => t.lid === incoTerm.lid);
          if (index !== -1) {
            this.incoTermsList[index] = updatedIncoTerm;
            this.filterIncoTerms();
          }
        }
      },
      error: (error) => {
        console.error('Error toggling Incoterm status:', error);
      }
    });
  }

  trackByIncoTerm(index: number, incoTerm: IncoTerms): number {
    return incoTerm.lid;
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedIncoTerms();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedIncoTerms();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedIncoTerms();
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredIncoTerms.length);
  }
}
