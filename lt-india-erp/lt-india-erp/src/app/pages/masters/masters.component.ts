import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Party {
  id: number;
  code: string;
  name: string;
  type: 'Customer' | 'Vendor' | 'Both';
  city: string;
  country: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

interface Port {
  id: number;
  code: string;
  name: string;
  country: string;
  type: 'Seaport' | 'Airport' | 'Land Port';
  status: 'Active' | 'Inactive';
  createdAt: string;
}

interface ChargeCode {
  id: number;
  code: string;
  name: string;
  category: 'Shipping' | 'Handling' | 'Documentation' | 'Insurance' | 'Other';
  description: string;
  defaultAmount: number;
  currency: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">Master Data</h1>
          <p class="text-sm text-gray-600">Manage core business data</p>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button 
              *ngFor="let tab of tabs"
              (click)="activeTab = tab.id"
              [class]="getTabClasses(tab.id)">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path [attr.d]="tab.icon"></path>
              </svg>
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Parties Tab -->
        <div *ngIf="activeTab === 'parties'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Business Parties</h3>
              <p class="text-sm text-gray-600">Manage customers, vendors, and business partners</p>
            </div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Party
            </button>
          </div>

          <!-- Search and Filters -->
          <div class="flex items-center space-x-4 mb-4">
            <div class="relative flex-1 max-w-md">
              <input type="text" 
                     placeholder="Search parties..." 
                     class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
            <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option value="">All Types</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="both">Both</option>
            </select>
          </div>

          <!-- Parties Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let party of parties" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm">
                    <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{{ party.code }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ party.name }}</div>
                      <div class="text-sm text-gray-500">{{ party.email }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span [class]="getPartyTypeBadge(party.type)">{{ party.type }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ party.city }}, {{ party.country }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{{ party.phone }}</td>
                  <td class="px-4 py-3">
                    <span [class]="getStatusBadge(party.status)">{{ party.status }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Ports Tab -->
        <div *ngIf="activeTab === 'ports'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Port Management</h3>
              <p class="text-sm text-gray-600">Configure shipping ports and logistics hubs</p>
            </div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Port
            </button>
          </div>

          <!-- Ports Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Port Name</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let port of ports" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm">
                    <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{{ port.code }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ port.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ port.country }}</td>
                  <td class="px-4 py-3">
                    <span [class]="getPortTypeBadge(port.type)">{{ port.type }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span [class]="getStatusBadge(port.status)">{{ port.status }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Charge Codes Tab -->
        <div *ngIf="activeTab === 'charges'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Charge Codes</h3>
              <p class="text-sm text-gray-600">Manage billing codes and charge structures</p>
            </div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Charge Code
            </button>
          </div>

          <!-- Charge Codes Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Amount</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let charge of chargeCodes" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm">
                    <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{{ charge.code }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ charge.name }}</div>
                      <div class="text-sm text-gray-500">{{ charge.description }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span [class]="getChargeCategoryBadge(charge.category)">{{ charge.category }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ charge.currency }} {{ charge.defaultAmount | number:'1.2-2' }}</td>
                  <td class="px-4 py-3">
                    <span [class]="getStatusBadge(charge.status)">{{ charge.status }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tab-button {
      @apply flex items-center px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200;
    }
    
    .tab-button.active {
      @apply text-blue-600 border-blue-600;
    }
  `]
})
export class MastersComponent {
  activeTab = 'parties';

  tabs = [
    {
      id: 'parties',
      label: 'Parties',
      icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
    },
    {
      id: 'ports',
      label: 'Ports',
      icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
    },
    {
      id: 'charges',
      label: 'Charge Codes',
      icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
    }
  ];

  parties: Party[] = [
    {
      id: 1,
      code: 'ABC001',
      name: 'ABC Exports Ltd.',
      type: 'Customer',
      city: 'Mumbai',
      country: 'India',
      email: 'contact@abcexports.com',
      phone: '+91 98765 43210',
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      code: 'XYZ002',
      name: 'XYZ Imports Pvt. Ltd.',
      type: 'Vendor',
      city: 'Chennai',
      country: 'India',
      email: 'info@xyzimports.com',
      phone: '+91 87654 32109',
      status: 'Active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      code: 'DEF003',
      name: 'DEF Trading Co.',
      type: 'Both',
      city: 'Delhi',
      country: 'India',
      email: 'sales@deftrading.com',
      phone: '+91 76543 21098',
      status: 'Inactive',
      createdAt: '2024-02-01'
    }
  ];

  ports: Port[] = [
    {
      id: 1,
      code: 'INMAA',
      name: 'Chennai Port',
      country: 'India',
      type: 'Seaport',
      status: 'Active',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      code: 'INNSA',
      name: 'Mumbai Port',
      country: 'India',
      type: 'Seaport',
      status: 'Active',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      code: 'INDEL',
      name: 'Indira Gandhi International Airport',
      country: 'India',
      type: 'Airport',
      status: 'Active',
      createdAt: '2024-01-15'
    }
  ];

  chargeCodes: ChargeCode[] = [
    {
      id: 1,
      code: 'FREIGHT',
      name: 'Ocean Freight',
      category: 'Shipping',
      description: 'Basic ocean freight charges',
      defaultAmount: 1500.00,
      currency: 'USD',
      status: 'Active'
    },
    {
      id: 2,
      code: 'THC',
      name: 'Terminal Handling Charges',
      category: 'Handling',
      description: 'Port terminal handling fees',
      defaultAmount: 250.00,
      currency: 'USD',
      status: 'Active'
    },
    {
      id: 3,
      code: 'DOC',
      name: 'Documentation Fee',
      category: 'Documentation',
      description: 'Document processing charges',
      defaultAmount: 75.00,
      currency: 'USD',
      status: 'Active'
    }
  ];

  getTabClasses(tabId: string): string {
    return tabId === this.activeTab ? 'tab-button active' : 'tab-button';
  }

  getPartyTypeBadge(type: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (type) {
      case 'Customer':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Vendor':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Both':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getPortTypeBadge(type: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (type) {
      case 'Seaport':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Airport':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Land Port':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getChargeCategoryBadge(category: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (category) {
      case 'Shipping':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Handling':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Documentation':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Insurance':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadge(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return status === 'Active' 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }
}