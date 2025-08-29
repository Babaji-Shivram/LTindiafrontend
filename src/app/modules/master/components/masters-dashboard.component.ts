import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface MasterItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  count?: number;
  status: 'available' | 'coming-soon';
}

interface MasterCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  items: MasterItem[];
  expanded: boolean;
}

@Component({
  selector: 'app-masters-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="page-title text-gray-900 mb-2">Master Data Management</h1>
        <p class="text-gray-600">Manage all your organizational master data in one place</p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-white rounded-lg p-4 shadow-sm border">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active Masters</p>
                <p class="page-title text-gray-900">{{ getActiveMastersCount() }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg p-4 shadow-sm border">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Categories</p>
                <p class="page-title text-gray-900">{{ masterCategories.length }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg p-4 shadow-sm border">
            <div class="flex items-center">
              <div class="p-2 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Coming Soon</p>
                <p class="page-title text-gray-900">{{ getComingSoonCount() }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg p-4 shadow-sm border">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Records</p>
                <p class="page-title text-gray-900">1,247</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
            </div>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search masters...">
          </div>
        </div>
        
        <div class="flex gap-2">
          <button
            (click)="toggleAllCategories(true)"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Expand All
          </button>
          <button
            (click)="toggleAllCategories(false)"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Collapse All
          </button>
        </div>
      </div>

      <!-- Master Categories -->
      <div class="space-y-6">
        <div
          *ngFor="let category of filteredCategories; trackBy: trackByCategory"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200"
          [class.ring-2]="category.expanded"
          [class.ring-blue-500]="category.expanded">
          
          <!-- Category Header -->
          <div
            (click)="toggleCategory(category)"
            class="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
            [style.background]="'linear-gradient(135deg, ' + category.color + '10 0%, ' + category.color + '05 100%)'">
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div
                  class="p-3 rounded-lg"
                  [style.background-color]="category.color + '20'">
                  <span class="text-2xl">{{ category.icon }}</span>
                </div>
                
                <div>
                  <h3 class="section-header text-gray-900">{{ category.name }}</h3>
                  <p class="text-sm text-gray-600">{{ category.description }}</p>
                  <div class="flex items-center mt-1 space-x-4">
                    <span class="text-xs text-gray-500">
                      {{ getAvailableItemsCount(category) }} available
                    </span>
                    <span class="text-xs text-gray-500" *ngIf="getComingSoonItemsCount(category) > 0">
                      {{ getComingSoonItemsCount(category) }} coming soon
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="text-right">
                  <div class="page-title text-gray-900">{{ category.items.length }}</div>
                  <div class="text-xs text-gray-500">Masters</div>
                </div>
                
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  [class.rotate-180]="category.expanded"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Category Items -->
          <div
            *ngIf="category.expanded"
            class="px-6 pb-6 border-t border-gray-100 bg-gray-50">
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <div
                *ngFor="let item of getFilteredItems(category); trackBy: trackByItem"
                (click)="navigateToMaster(item)"
                class="group bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                [class.opacity-60]="item.status === 'coming-soon'"
                [class.cursor-not-allowed]="item.status === 'coming-soon'">
                
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <span class="text-lg mr-2">{{ item.icon }}</span>
                      <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {{ item.name }}
                      </h4>
                      <span
                        *ngIf="item.status === 'coming-soon'"
                        class="ml-2 px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        Soon
                      </span>
                    </div>
                    
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ item.description }}</p>
                    
                    <div class="flex items-center justify-between">
                      <span
                        *ngIf="item.count !== undefined"
                        class="text-xs text-gray-500">
                        {{ item.count }} records
                      </span>
                      
                      <div
                        *ngIf="item.status === 'available'"
                        class="flex items-center text-xs text-blue-600 group-hover:text-blue-700">
                        <span>Manage</span>
                        <svg class="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div
              *ngIf="getFilteredItems(category).length === 0"
              class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No masters found</h3>
              <p class="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Footer -->
      <div class="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900">Bulk Import</h4>
              <p class="text-sm text-gray-600">Import multiple master records</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900">Export Data</h4>
              <p class="text-sm text-gray-600">Download master data reports</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900">System Settings</h4>
              <p class="text-sm text-gray-600">Configure master data rules</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class MastersDashboardComponent {
  searchTerm = '';
  filteredCategories: MasterCategory[] = [];

  masterCategories: MasterCategory[] = [
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
      color: '#10B981',
      description: 'Manage geographical locations and regional data',
      expanded: false,
      items: [
        {
          id: 'country',
          name: 'Country',
          description: 'Manage countries and their regional configurations',
          icon: '🏴',
          route: '/masters/geography/countries',
          count: 195,
          status: 'available'
        },
        {
          id: 'state',
          name: 'State',
          description: 'Manage states and provinces within countries',
          icon: '🗺️',
          route: '/masters/geography/states',
          count: 1247,
          status: 'available'
        },
        {
          id: 'city',
          name: 'City',
          description: 'Manage cities and municipal areas',
          icon: '🏙️',
          route: '/masters/geography/cities',
          count: 5432,
          status: 'available'
        },
        {
          id: 'port',
          name: 'Port',
          description: 'Manage seaports and airports for logistics',
          icon: '⚓',
          route: '/masters/geography/ports',
          count: 89,
          status: 'available'
        },
        {
          id: 'branch',
          name: 'Branch',
          description: 'Manage organizational branches and offices',
          icon: '🏢',
          route: '/masters/geography/branches',
          count: 24,
          status: 'available'
        },
        {
          id: 'cfs',
          name: 'CFS',
          description: 'Container Freight Station management',
          icon: '📦',
          route: '/masters/geography/cfs',
          status: 'coming-soon'
        }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: '💱',
      color: '#F59E0B',
      description: 'Financial master data and configurations',
      expanded: false,
      items: [
        {
          id: 'currency',
          name: 'Currency',
          description: 'Manage currencies and exchange rates',
          icon: '💰',
          route: '/masters/finance/currencies',
          count: 156,
          status: 'available'
        },
        {
          id: 'inco-terms',
          name: 'Inco Terms',
          description: 'International Commercial Terms management',
          icon: '📋',
          route: '/masters/finance/inco-terms',
          status: 'coming-soon'
        },
        {
          id: 'expense',
          name: 'Expense',
          description: 'Expense categories and types',
          icon: '💸',
          route: '/masters/finance/expenses',
          status: 'coming-soon'
        }
      ]
    },
    {
      id: 'organizational',
      name: 'Organizational',
      icon: '🏢',
      color: '#3B82F6',
      description: 'Organizational structure and hierarchy',
      expanded: false,
      items: [
        {
          id: 'department',
          name: 'Department',
          description: 'Organizational departments and units',
          icon: '🏛️',
          route: '/masters/departments',
          count: 15,
          status: 'available'
        },
        {
          id: 'division',
          name: 'Division',
          description: 'Business divisions and segments',
          icon: '🏛️',
          route: '/masters/divisions',
          count: 5,
          status: 'available'
        },
        {
          id: 'designation',
          name: 'Designation',
          description: 'Job roles and organizational positions',
          icon: '👔',
          route: '/masters/designations',
          count: 10,
          status: 'available'
        }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      icon: '📂',
      color: '#8B5CF6',
      description: 'Business process and document management',
      expanded: false,
      items: [
        {
          id: 'customer-sector',
          name: 'Customer Sector',
          description: 'Customer industry sectors and categories',
          icon: '👥',
          route: '/masters/business/customer-sectors',
          status: 'coming-soon'
        },
        {
          id: 'document',
          name: 'Document',
          description: 'Document types and templates',
          icon: '📄',
          route: '/masters/business/documents',
          status: 'coming-soon'
        },
        {
          id: 'scheme-type',
          name: 'Scheme Type',
          description: 'Business scheme types and categories',
          icon: '🎯',
          route: '/masters/business/scheme-types',
          status: 'coming-soon'
        }
      ]
    },
    {
      id: 'operational',
      name: 'Operational',
      icon: '📦',
      color: '#EF4444',
      description: 'Operations and logistics management',
      expanded: false,
      items: [
        {
          id: 'warehouse',
          name: 'Warehouse',
          description: 'Warehouse locations and configurations',
          icon: '🏭',
          route: '/masters/operational/warehouses',
          status: 'coming-soon'
        },
        {
          id: 'package-type',
          name: 'Package Type',
          description: 'Packaging types and specifications',
          icon: '📋',
          route: '/masters/operational/package-types',
          status: 'coming-soon'
        },
        {
          id: 'vehicle',
          name: 'Vehicle',
          description: 'Vehicle types and fleet management',
          icon: '🚛',
          route: '/masters/operational/vehicles',
          status: 'coming-soon'
        },
        {
          id: 'job-type',
          name: 'Job Type',
          description: 'Job categories and classifications',
          icon: '⚙️',
          route: '/masters/operational/job-types',
          status: 'coming-soon'
        },
        {
          id: 'job-status',
          name: 'Job Status',
          description: 'Job status definitions and workflows',
          icon: '📈',
          route: '/masters/operational/job-status',
          status: 'coming-soon'
        },
        {
          id: 'field',
          name: 'Field',
          description: 'Custom field definitions and types',
          icon: '🔧',
          route: '/masters/operational/fields',
          status: 'coming-soon'
        },
        {
          id: 'uom',
          name: 'UOM',
          description: 'Unit of Measures and conversions',
          icon: '📏',
          route: '/masters/operational/uom',
          status: 'coming-soon'
        }
      ]
    }
  ];

  constructor(private router: Router) {
    this.filteredCategories = [...this.masterCategories];
  }

  toggleCategory(category: MasterCategory): void {
    category.expanded = !category.expanded;
  }

  toggleAllCategories(expand: boolean): void {
    this.filteredCategories.forEach(category => {
      category.expanded = expand;
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCategories = [...this.masterCategories];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredCategories = this.masterCategories
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
        )
      }))
      .filter(category => 
        category.name.toLowerCase().includes(searchLower) ||
        category.description.toLowerCase().includes(searchLower) ||
        category.items.length > 0
      );
  }

  navigateToMaster(item: MasterItem): void {
    if (item.status === 'available') {
      this.router.navigate([item.route]);
    }
  }

  getFilteredItems(category: MasterCategory): MasterItem[] {
    return category.items;
  }

  getActiveMastersCount(): number {
    return this.masterCategories
      .flatMap(cat => cat.items)
      .filter(item => item.status === 'available').length;
  }

  getComingSoonCount(): number {
    return this.masterCategories
      .flatMap(cat => cat.items)
      .filter(item => item.status === 'coming-soon').length;
  }

  getAvailableItemsCount(category: MasterCategory): number {
    return category.items.filter(item => item.status === 'available').length;
  }

  getComingSoonItemsCount(category: MasterCategory): number {
    return category.items.filter(item => item.status === 'coming-soon').length;
  }

  trackByCategory(index: number, category: MasterCategory): string {
    return category.id;
  }

  trackByItem(index: number, item: MasterItem): string {
    return item.id;
  }
}
