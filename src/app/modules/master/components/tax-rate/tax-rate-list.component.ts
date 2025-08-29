import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface TaxRate {
  id: number;
  name: string;
  code: string;
  rate: number;
  type: 'GST' | 'VAT' | 'Service Tax' | 'Customs' | 'Other';
  description: string;
  category: 'Standard' | 'Reduced' | 'Zero' | 'Exempt';
  applicableFrom: Date;
  applicableTo?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-tax-rate-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="page-title">Tax Rate Management</h1>
          <p class="secondary-text">Configure tax rates for different transaction types</p>
        </div>
        <button 
          [routerLink]="'/masters/tax-rate/new'"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all ">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add Tax Rate
        </button>
      </div>

      <!-- Search and Filter Bar -->
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex-1 max-w-lg">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (input)="applyFilters()"
                placeholder="Search by name, code, or type..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <select
              [(ngModel)]="typeFilter"
              (change)="applyFilters()"
              class="input-text border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="GST">GST</option>
              <option value="VAT">VAT</option>
              <option value="Service Tax">Service Tax</option>
              <option value="Customs">Customs</option>
              <option value="Other">Other</option>
            </select>
            <select
              [(ngModel)]="categoryFilter"
              (change)="applyFilters()"
              class="input-text border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Standard">Standard</option>
              <option value="Reduced">Reduced</option>
              <option value="Zero">Zero</option>
              <option value="Exempt">Exempt</option>
            </select>
            <select
              [(ngModel)]="statusFilter"
              (change)="applyFilters()"
              class="input-text border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="text-sm text-gray-600">
        Showing {{ paginatedTaxRates.length }} of {{ filteredTaxRates.length }} tax rates
      </div>

      <!-- Tax Rates Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Tax Details</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Rate</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Type & Category</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Validity Period</th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right table-header uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let taxRate of paginatedTaxRates" class="hover:bg-gray-50 cursor-pointer" (click)="viewTaxRate(taxRate)">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                         [ngClass]="getTypeColorClass(taxRate.type)">
                      {{ getTypeIcon(taxRate.type) }}
                    </div>
                    <div class="ml-4">
                      <div class="table-cell font-medium text-gray-900">{{ taxRate.name }}</div>
                      <div class="text-sm text-gray-500">{{ taxRate.code }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="section-header text-gray-900">{{ taxRate.rate }}%</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ taxRate.type }}</div>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [ngClass]="getCategoryColorClass(taxRate.category)">
                    {{ taxRate.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>From: {{ taxRate.applicableFrom | date:'mediumDate' }}</div>
                  <div *ngIf="taxRate.applicableTo" class="text-gray-500">
                    To: {{ taxRate.applicableTo | date:'mediumDate' }}
                  </div>
                  <div *ngIf="!taxRate.applicableTo" class="text-green-600">
                    Ongoing
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [ngClass]="taxRate.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ taxRate.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      (click)="editTaxRate(taxRate, $event)"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      (click)="toggleStatus(taxRate, $event)"
                      [ngClass]="taxRate.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                    >
                      {{ taxRate.isActive ? 'Deactivate' : 'Activate' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="paginatedTaxRates.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No tax rates found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new tax rate.</p>
        <div class="mt-6">
          <button 
            [routerLink]="'/masters/tax-rate/new'"
            style="background-color: #2c4170;"
            class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all "
          >
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            Add Tax Rate
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="totalPages > 1" class="flex items-center justify-between mt-6">
        <div class="text-sm text-gray-700">
          Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, filteredTaxRates.length) }} of {{ filteredTaxRates.length }} results
        </div>
        <div class="flex items-center space-x-2">
          <button
            (click)="goToPage(currentPage - 1)"
            [disabled]="currentPage === 1"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            (click)="goToPage(currentPage + 1)"
            [disabled]="currentPage === totalPages"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `
})
export class TaxRateListComponent implements OnInit {
  Math = Math;
  
  taxRates: TaxRate[] = [];
  filteredTaxRates: TaxRate[] = [];
  paginatedTaxRates: TaxRate[] = [];
  
  searchTerm = '';
  typeFilter = 'all';
  categoryFilter = 'all';
  statusFilter = 'all';
  
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTaxRates();
  }

  loadTaxRates() {
    // Mock data - replace with actual service call
    this.taxRates = [
      {
        id: 1,
        name: 'Standard GST',
        code: 'GST-18',
        rate: 18,
        type: 'GST',
        description: 'Standard Goods and Services Tax',
        category: 'Standard',
        applicableFrom: new Date('2024-01-01'),
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-12-20')
      },
      {
        id: 2,
        name: 'Reduced GST',
        code: 'GST-5',
        rate: 5,
        type: 'GST',
        description: 'Reduced rate for essential goods',
        category: 'Reduced',
        applicableFrom: new Date('2024-01-01'),
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-12-18')
      },
      {
        id: 3,
        name: 'Service Tax',
        code: 'ST-15',
        rate: 15,
        type: 'Service Tax',
        description: 'Tax on services',
        category: 'Standard',
        applicableFrom: new Date('2024-01-01'),
        applicableTo: new Date('2024-06-30'),
        isActive: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-06-30')
      }
    ];
    
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTaxRates = this.taxRates.filter(taxRate => {
      const matchesSearch = !this.searchTerm || 
        taxRate.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        taxRate.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        taxRate.type.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = this.typeFilter === 'all' || taxRate.type === this.typeFilter;
      const matchesCategory = this.categoryFilter === 'all' || taxRate.category === this.categoryFilter;
      
      const matchesStatus = this.statusFilter === 'all' || 
        (this.statusFilter === 'active' && taxRate.isActive) ||
        (this.statusFilter === 'inactive' && !taxRate.isActive);
      
      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
    
    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredTaxRates.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTaxRates = this.filteredTaxRates.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }

  getTypeIcon(type: string): string {
    const icons = {
      'GST': '📊',
      'VAT': '💹',
      'Service Tax': '⚙️',
      'Customs': '🚢',
      'Other': '📋'
    };
    return icons[type as keyof typeof icons] || '📋';
  }

  getTypeColorClass(type: string): string {
    const classes = {
      'GST': 'bg-blue-100 text-blue-600',
      'VAT': 'bg-green-100 text-green-600',
      'Service Tax': 'bg-purple-100 text-purple-600',
      'Customs': 'bg-orange-100 text-orange-600',
      'Other': 'bg-gray-100 text-gray-600'
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-600';
  }

  getCategoryColorClass(category: string): string {
    const classes = {
      'Standard': 'bg-blue-100 text-blue-800',
      'Reduced': 'bg-green-100 text-green-800',
      'Zero': 'bg-yellow-100 text-yellow-800',
      'Exempt': 'bg-gray-100 text-gray-800'
    };
    return classes[category as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  viewTaxRate(taxRate: TaxRate) {
    console.log('View tax rate:', taxRate);
  }

  editTaxRate(taxRate: TaxRate, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/masters/tax-rate', taxRate.id, 'edit']);
  }

  toggleStatus(taxRate: TaxRate, event: Event) {
    event.stopPropagation();
    taxRate.isActive = !taxRate.isActive;
    taxRate.updatedAt = new Date();
  }
}
