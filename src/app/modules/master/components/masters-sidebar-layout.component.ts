import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-masters-sidebar-layout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <div class="w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
        <!-- Sidebar Header -->
        <div class="p-6 border-b border-gray-200">
          <h2 class="section-header text-gray-900">Master Data</h2>
          <p class="text-sm text-gray-600 mt-1">Manage organizational data</p>
        </div>

        <!-- Search -->
        <div class="p-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search masters..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Navigation Categories -->
        <nav class="px-4 pb-4">
          <div *ngFor="let category of categories" class="mb-2">
            <!-- Category Header -->
            <button
              (click)="toggleCategory(category.id)"
              class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <div class="flex items-center">
                <span class="mr-3">{{ category.icon }}</span>
                <span>{{ category.name }}</span>
                <span class="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
                  {{ category.items.length }}
                </span>
              </div>
              <svg
                class="w-4 h-4 transition-transform"
                [class.rotate-180]="expandedCategories.has(category.id)"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </button>

            <!-- Category Items -->
            <div 
              *ngIf="expandedCategories.has(category.id)"
              class="ml-6 mt-1 space-y-1">
              <button
                *ngFor="let item of category.items"
                (click)="selectMaster(item)"
                class="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                [class.bg-blue-100]="selectedMaster?.id === item.id"
                [class.text-blue-700]="selectedMaster?.id === item.id"
                [class.opacity-50]="item.status === 'coming-soon'"
                [disabled]="item.status === 'coming-soon'">
                <div class="flex items-center">
                  <span class="mr-2">{{ item.icon }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <span 
                  *ngIf="item.status === 'coming-soon'"
                  class="text-xs text-orange-500 font-medium">
                  Soon
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Content Header -->
        <div class="bg-white border-b border-gray-200 px-6 py-4">
          <div *ngIf="selectedMaster; else selectPrompt">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="page-title text-gray-900 flex items-center">
                  <span class="mr-3">{{ selectedMaster.icon }}</span>
                  {{ selectedMaster.name }}
                </h1>
                <p class="text-gray-600 mt-1">{{ selectedMaster.description }}</p>
              </div>
              <div class="flex space-x-3">
                <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                  Add New
                </button>
                <button class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                  Import
                </button>
                <button class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>
          </div>

          <ng-template #selectPrompt>
            <div class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">Select a Master</h3>
              <p class="mt-1 text-sm text-gray-500">Choose a master data type from the sidebar to get started.</p>
            </div>
          </ng-template>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6" *ngIf="selectedMaster">
          <!-- Master Data Content would go here -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ selectedMaster.name }} Management</h3>
            <p class="text-gray-600">This is where the {{ selectedMaster.name }} management interface would be displayed.</p>
            
            <!-- Sample table structure -->
            <div class="mt-6 overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Code</th>
                    <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sample Record</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SR001</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap table-cell font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900">Edit</a>
                      <a href="#" class="ml-4 text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MastersSidebarLayoutComponent {
  expandedCategories = new Set<string>(['geography']); // Geography expanded by default
  selectedMaster: any = null;

  categories = [
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
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
      items: [
        { id: 'department', name: 'Department', icon: '🏛️', status: 'available', description: 'Organizational departments and units' },
        { id: 'division', name: 'Division', icon: '📊', status: 'coming-soon', description: 'Business divisions and segments' }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      icon: '📂',
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

  toggleCategory(categoryId: string): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
  }

  selectMaster(master: any): void {
    if (master.status === 'available') {
      this.selectedMaster = master;
    }
  }
}
