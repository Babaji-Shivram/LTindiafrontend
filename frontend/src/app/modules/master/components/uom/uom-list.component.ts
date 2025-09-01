import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UOM } from '../../models/uom.model';
import { UOMService } from '../../services/uom.service';

@Component({
  selector: 'app-uom-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title text-gray-900">Units of Measure</h1>
          <p class="mt-2 text-sm text-gray-700">Manage measurement units for logistics and inventory operations</p>
        </div>
        <div class="mt-4 sm:mt-0 flex space-x-3">
          <button
            type="button"
            (click)="showConverter = !showConverter"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
            Unit Converter
          </button>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add UOM
          </button>
        </div>
      </div>

      <!-- Unit Converter -->
      <div *ngIf="showConverter" class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="text-lg font-medium text-blue-900 mb-4">Unit Converter</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label class="block text-sm font-medium text-blue-700">From Unit</label>
            <select [(ngModel)]="converterFrom" class="mt-1 block w-full border border-blue-300 rounded-md px-3 py-2 text-sm">
              <option value="">Select Unit</option>
              <option *ngFor="let uom of activeUOMs" [value]="uom.UOMCode">{{ uom.UOMCode }} - {{ uom.UOMName }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-blue-700">To Unit</label>
            <select [(ngModel)]="converterTo" class="mt-1 block w-full border border-blue-300 rounded-md px-3 py-2 text-sm">
              <option value="">Select Unit</option>
              <option *ngFor="let uom of activeUOMs" [value]="uom.UOMCode">{{ uom.UOMCode }} - {{ uom.UOMName }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-blue-700">Value</label>
            <input type="number" [(ngModel)]="converterValue" (input)="convertUnits()" 
                   class="mt-1 block w-full border border-blue-300 rounded-md px-3 py-2 text-sm" placeholder="0">
          </div>
          <div>
            <label class="block text-sm font-medium text-blue-700">Result</label>
            <div class="mt-1 block w-full bg-blue-100 border border-blue-300 rounded-md px-3 py-2 text-sm font-medium text-blue-900">
              {{ converterResult || 'N/A' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 overflow-x-auto">
          <button
            *ngFor="let tab of categoryTabs"
            (click)="activeCategory = tab.key; filterUOMs()"
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
              (input)="filterUOMs()"
              placeholder="Search UOMs by name, code, or type..."
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
            (change)="filterUOMs()"
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
        Showing {{ filteredUOMs.length }} of {{ uomList.length }} UOMs
      </div>

      <!-- UOM Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          *ngFor="let uom of paginatedUOMs; trackBy: trackByUOM"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-150"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div [ngClass]="getTypeIconClass(uom.UOMType)" 
                       class="h-10 w-10 rounded-full flex items-center justify-center">
                    <span class="text-sm font-bold text-white">{{ getTypeIcon(uom.UOMType) }}</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ uom.UOMCode }}</h3>
                  <p class="text-sm text-gray-500">{{ uom.UOMName }}</p>
                </div>
              </div>
              <span [ngClass]="getStatusBadgeClass(uom.IsActive)" 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ uom.IsActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <div class="mt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Type:</span>
                <span [ngClass]="getTypeBadgeClass(uom.UOMType)" 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ uom.UOMType }}
                </span>
              </div>
              <div *ngIf="uom.ConversionFactor" class="flex justify-between text-sm">
                <span class="text-gray-500">Factor:</span>
                <span class="font-medium text-gray-900">{{ uom.ConversionFactor }}</span>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>Created: {{ uom.CreatedDate | date:'MMM dd, yyyy' }}</span>
              <span>ID: {{ uom.lid }}</span>
            </div>

            <div class="mt-6 flex items-center space-x-2">
              <button
                type="button"
                class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit
              </button>
              <button
                type="button"
                (click)="toggleStatus(uom)"
                [class]="uom.IsActive ? 'text-red-700 bg-red-100 hover:bg-red-200' : 'text-green-700 bg-green-100 hover:bg-green-200'"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                [title]="uom.IsActive ? 'Deactivate' : 'Activate'"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path *ngIf="uom.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                  <path *ngIf="!uom.IsActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredUOMs.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No UOMs found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new unit of measure.' }}
        </p>
      </div>

      <!-- Pagination -->
      <div *ngIf="filteredUOMs.length > itemsPerPage" class="flex items-center justify-between border-t border-gray-200 pt-6">
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
              Showing {{ getStartIndex() }} to {{ getEndIndex() }} of {{ filteredUOMs.length }} results
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
export class UOMListComponent implements OnInit {
  uomList: UOM[] = [];
  filteredUOMs: UOM[] = [];
  paginatedUOMs: UOM[] = [];
  activeUOMs: UOM[] = [];
  
  searchTerm: string = '';
  statusFilter: string = '';
  activeCategory: string = 'all';
  
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  // Unit Converter
  showConverter: boolean = false;
  converterFrom: string = '';
  converterTo: string = '';
  converterValue: number = 0;
  converterResult: string = '';

  categoryTabs = [
    { key: 'all', label: 'All Units', icon: '📏' },
    { key: 'weight', label: 'Weight', icon: '⚖️' },
    { key: 'volume', label: 'Volume', icon: '🗂️' },
    { key: 'length', label: 'Length', icon: '📐' },
    { key: 'quantity', label: 'Quantity', icon: '🔢' },
    { key: 'container', label: 'Container', icon: '📦' },
    { key: 'area', label: 'Area', icon: '⬜' },
    { key: 'packaging', label: 'Packaging', icon: '📋' }
  ];

  constructor(private uomService: UOMService) {}

  ngOnInit(): void {
    this.loadUOMs();
  }

  loadUOMs(): void {
    this.uomService.getAllUOMs().subscribe({
      next: (uoms) => {
        this.uomList = uoms;
        this.activeUOMs = uoms.filter(uom => uom.IsActive);
        this.filterUOMs();
      },
      error: (error) => {
        console.error('Error loading UOMs:', error);
      }
    });
  }

  filterUOMs(): void {
    let filtered = [...this.uomList];

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(uom =>
        uom.UOMName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        uom.UOMCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        uom.UOMType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (this.statusFilter) {
      filtered = filtered.filter(uom => 
        this.statusFilter === 'active' ? uom.IsActive : !uom.IsActive
      );
    }

    // Filter by category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(uom => 
        uom.UOMType.toLowerCase() === this.activeCategory.toLowerCase()
      );
    }

    this.filteredUOMs = filtered;
    this.totalPages = Math.ceil(this.filteredUOMs.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedUOMs();
  }

  updatePaginatedUOMs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUOMs = this.filteredUOMs.slice(startIndex, endIndex);
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'Weight': '⚖️',
      'Volume': '🗂️',
      'Length': '📐',
      'Quantity': '🔢',
      'Container': '📦',
      'Area': '⬜',
      'Packaging': '📋'
    };
    return icons[type] || '📏';
  }

  getTypeIconClass(type: string): string {
    const classes: { [key: string]: string } = {
      'Weight': 'bg-purple-500',
      'Volume': 'bg-blue-500',
      'Length': 'bg-green-500',
      'Quantity': 'bg-orange-500',
      'Container': 'bg-red-500',
      'Area': 'bg-teal-500',
      'Packaging': 'bg-indigo-500'
    };
    return classes[type] || 'bg-gray-500';
  }

  getTypeBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'Weight': 'bg-purple-100 text-purple-800',
      'Volume': 'bg-blue-100 text-blue-800',
      'Length': 'bg-green-100 text-green-800',
      'Quantity': 'bg-orange-100 text-orange-800',
      'Container': 'bg-red-100 text-red-800',
      'Area': 'bg-teal-100 text-teal-800',
      'Packaging': 'bg-indigo-100 text-indigo-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
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
    if (categoryKey === 'all') return this.uomList.length;
    
    return this.uomList.filter(uom => 
      uom.UOMType.toLowerCase() === categoryKey.toLowerCase()
    ).length;
  }

  convertUnits(): void {
    if (!this.converterFrom || !this.converterTo || !this.converterValue) {
      this.converterResult = '';
      return;
    }

    this.uomService.convertUnits(this.converterFrom, this.converterTo, this.converterValue).subscribe({
      next: (result) => {
        if (result !== null) {
          this.converterResult = `${result.toFixed(4)} ${this.converterTo}`;
        } else {
          this.converterResult = 'Cannot convert (different types)';
        }
      },
      error: () => {
        this.converterResult = 'Conversion error';
      }
    });
  }

  toggleStatus(uom: UOM): void {
    this.uomService.toggleUOMStatus(uom.lid).subscribe({
      next: (updatedUOM) => {
        if (updatedUOM) {
          const index = this.uomList.findIndex(u => u.lid === uom.lid);
          if (index !== -1) {
            this.uomList[index] = updatedUOM;
            this.activeUOMs = this.uomList.filter(u => u.IsActive);
            this.filterUOMs();
          }
        }
      },
      error: (error) => {
        console.error('Error toggling UOM status:', error);
      }
    });
  }

  trackByUOM(index: number, uom: UOM): number {
    return uom.lid;
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUOMs();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUOMs();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedUOMs();
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredUOMs.length);
  }
}
