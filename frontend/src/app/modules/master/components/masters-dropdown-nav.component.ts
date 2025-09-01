import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-masters-dropdown-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white shadow-sm border-b border-gray-200">
      <!-- Main Navigation Bar -->
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <!-- Masters Logo/Title -->
            <h1 class="page-title text-gray-900">Master Data</h1>
            
            <!-- Category Navigation -->
            <nav class="flex space-x-1">
              <div
                *ngFor="let category of categories"
                class="relative"
                (mouseenter)="setHoveredCategory(category.id)"
                (mouseleave)="setHoveredCategory(null)">
                
                <button
                  class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  [class.text-blue-600]="hoveredCategory === category.id"
                  [class.bg-gray-50]="hoveredCategory === category.id">
                  <span class="mr-2">{{ category.icon }}</span>
                  <span>{{ category.name }}</span>
                  <span class="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
                    {{ getAvailableCount(category) }}
                  </span>
                  <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                  *ngIf="hoveredCategory === category.id"
                  class="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  @slideIn>
                  
                  <!-- Dropdown Header -->
                  <div class="px-4 py-3 border-b border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 flex items-center">
                      <span class="mr-2">{{ category.icon }}</span>
                      {{ category.name }} Masters
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">{{ category.description }}</p>
                  </div>

                  <!-- Master Items Grid -->
                  <div class="p-3">
                    <div class="grid grid-cols-2 gap-2">
                      <button
                        *ngFor="let item of category.items"
                        (click)="navigateToMaster(item)"
                        class="flex items-start p-3 text-left rounded-lg hover:bg-gray-50 transition-colors group"
                        [class.opacity-50]="item.status === 'coming-soon'"
                        [disabled]="item.status === 'coming-soon'">
                        
                        <div class="flex-shrink-0 mr-3">
                          <span class="text-lg">{{ item.icon }}</span>
                        </div>
                        
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                              {{ item.name }}
                            </p>
                            <span
                              *ngIf="item.status === 'coming-soon'"
                              class="text-xs text-orange-500 font-medium">
                              Soon
                            </span>
                          </div>
                          <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                            {{ item.description }}
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Dropdown Footer -->
                  <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                    <button class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      View All {{ category.name }} Masters →
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center space-x-3">
            <!-- Search -->
            <div class="relative">
              <input
                type="text"
                placeholder="Search masters..."
                class="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                </svg>
              </div>
            </div>

            <!-- Quick Add -->
            <div class="relative">
              <button
                (click)="toggleQuickAdd()"
                class="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                </svg>
                Quick Add
              </button>

              <!-- Quick Add Dropdown -->
              <div
                *ngIf="showQuickAdd"
                class="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div class="p-3">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Add Master</h4>
                  <div class="space-y-2">
                    <button
                      *ngFor="let quickItem of getQuickAddItems()"
                      (click)="quickAddMaster(quickItem)"
                      class="w-full flex items-center p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                      <span class="mr-3">{{ quickItem.icon }}</span>
                      <span>{{ quickItem.name }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Breadcrumb/Status Bar -->
      <div class="px-6 py-2 bg-gray-50 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <span>{{ getTotalMasters() }} Total Masters</span>
            <span>•</span>
            <span>{{ getAvailableMasters() }} Available</span>
            <span>•</span>
            <span>{{ getComingSoonMasters() }} Coming Soon</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <button class="text-sm text-gray-600 hover:text-gray-900">Import Data</button>
            <button class="text-sm text-gray-600 hover:text-gray-900">Export Data</button>
            <button class="text-sm text-gray-600 hover:text-gray-900">Settings</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="p-6">
      <div *ngIf="!selectedMaster" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Master Data Management</h3>
          <p class="mt-2 text-gray-600">Select a master data type from the navigation above to get started with managing your organizational data.</p>
          
          <!-- Quick Stats Cards -->
          <div class="grid grid-cols-3 gap-4 mt-8">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="page-title text-blue-600">{{ getAvailableMasters() }}</div>
              <div class="text-sm text-blue-800">Available Masters</div>
            </div>
            <div class="bg-orange-50 rounded-lg p-4">
              <div class="page-title text-orange-600">{{ getComingSoonMasters() }}</div>
              <div class="text-sm text-orange-800">Coming Soon</div>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
              <div class="page-title text-green-600">5</div>
              <div class="text-sm text-green-800">Categories</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Master Content -->
      <div *ngIf="selectedMaster" class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="page-title text-gray-900 mb-4 flex items-center">
          <span class="mr-3">{{ selectedMaster.icon }}</span>
          {{ selectedMaster.name }} Management
        </h2>
        <p class="text-gray-600 mb-6">{{ selectedMaster.description }}</p>
        
        <!-- Master-specific content would go here -->
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-gray-600">This is where the {{ selectedMaster.name }} management interface would be displayed.</p>
        </div>
      </div>
    </div>
  `,
  animations: [
    // Animation would be defined here for smooth dropdown transitions
  ]
})
export class MastersDropdownNavComponent {
  hoveredCategory: string | null = null;
  showQuickAdd = false;
  selectedMaster: any = null;

  categories = [
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
      description: 'Manage geographical locations and organizational branches',
      items: [
        { id: 'country', name: 'Country', icon: '🏴', status: 'available', description: 'Manage countries and their regional configurations' },
        { id: 'state', name: 'State', icon: '🗺️', status: 'available', description: 'Manage states and provinces within countries' },
        { id: 'city', name: 'City', icon: '🏙️', status: 'available', description: 'Manage cities and municipal areas' },
        { id: 'port', name: 'Port', icon: '⚓', status: 'available', description: 'Manage seaports and airports for logistics' },
        { id: 'branch', name: 'Branch', icon: '🏢', status: 'available', description: 'Manage organizational branches and offices' },
        { id: 'cfs', name: 'CFS', icon: '📦', status: 'coming-soon', description: 'Container Freight Station management' }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: '💱',
      description: 'Financial configurations and currency management',
      items: [
        { id: 'currency', name: 'Currency', icon: '💰', status: 'available', description: 'Manage currencies and exchange rates' },
        { id: 'inco-terms', name: 'Inco Terms', icon: '📋', status: 'coming-soon', description: 'International Commercial Terms management' },
        { id: 'expense', name: 'Expense', icon: '💸', status: 'coming-soon', description: 'Expense categories and types' }
      ]
    },
    {
      id: 'organizational',
      name: 'Organizational',
      icon: '🏢',
      description: 'Organizational structure and hierarchies',
      items: [
        { id: 'department', name: 'Department', icon: '🏛️', status: 'available', description: 'Organizational departments and units' },
        { id: 'division', name: 'Division', icon: '📊', status: 'coming-soon', description: 'Business divisions and segments' }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      icon: '📂',
      description: 'Business process configurations',
      items: [
        { id: 'customer-sector', name: 'Customer Sector', icon: '👥', status: 'coming-soon', description: 'Customer industry sectors and categories' },
        { id: 'document', name: 'Document', icon: '📄', status: 'coming-soon', description: 'Document types and templates' },
        { id: 'scheme-type', name: 'Scheme Type', icon: '🎯', status: 'coming-soon', description: 'Business scheme types and categories' }
      ]
    },
    {
      id: 'operational',
      name: 'Operational',
      icon: '📦',
      description: 'Operational configurations and logistics',
      items: [
        { id: 'warehouse', name: 'Warehouse', icon: '🏭', status: 'coming-soon', description: 'Warehouse locations and configurations' },
        { id: 'package-type', name: 'Package Type', icon: '📋', status: 'coming-soon', description: 'Packaging types and specifications' },
        { id: 'vehicle', name: 'Vehicle', icon: '🚛', status: 'coming-soon', description: 'Vehicle types and fleet management' },
        { id: 'job-type', name: 'Job Type', icon: '⚙️', status: 'coming-soon', description: 'Job categories and classifications' },
        { id: 'job-status', name: 'Job Status', icon: '📈', status: 'coming-soon', description: 'Job status definitions and workflows' },
        { id: 'field', name: 'Field', icon: '🔧', status: 'coming-soon', description: 'Custom field definitions and types' },
        { id: 'uom', name: 'UOM', icon: '📏', status: 'coming-soon', description: 'Unit of Measures and conversions' }
      ]
    }
  ];

  constructor(private router: Router) {}

  setHoveredCategory(categoryId: string | null): void {
    this.hoveredCategory = categoryId;
  }

  toggleQuickAdd(): void {
    this.showQuickAdd = !this.showQuickAdd;
  }

  navigateToMaster(master: any): void {
    if (master.status === 'available') {
      this.selectedMaster = master;
      this.hoveredCategory = null;
      // Navigate to specific master route
      // this.router.navigate(['/masters', master.id]);
    }
  }

  quickAddMaster(master: any): void {
    this.showQuickAdd = false;
    // Handle quick add functionality
    console.log('Quick add:', master);
  }

  getAvailableCount(category: any): number {
    return category.items.filter((item: any) => item.status === 'available').length;
  }

  getQuickAddItems(): any[] {
    const allItems = this.categories.flatMap(cat => cat.items);
    return allItems.filter(item => item.status === 'available').slice(0, 5);
  }

  getTotalMasters(): number {
    return this.categories.reduce((total, cat) => total + cat.items.length, 0);
  }

  getAvailableMasters(): number {
    return this.categories.reduce((total, cat) => 
      total + cat.items.filter(item => item.status === 'available').length, 0
    );
  }

  getComingSoonMasters(): number {
    return this.categories.reduce((total, cat) => 
      total + cat.items.filter(item => item.status === 'coming-soon').length, 0
    );
  }
}
