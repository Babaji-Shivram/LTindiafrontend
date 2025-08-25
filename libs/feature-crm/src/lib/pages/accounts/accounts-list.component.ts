import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

interface Account {
  id: number;
  companyName: string;
  accountType: 'Shipper' | 'Consignee' | 'Freight Forwarder' | 'NVOCC' | '3PL' | 'Customs Broker';
  industry: 'Manufacturing' | 'Retail' | 'Automotive' | 'Electronics' | 'Textiles' | 'Food & Beverage' | 'Chemicals';
  primaryContact: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  annualRevenue: number;
  relationshipStatus: 'New' | 'Active' | 'Inactive' | 'VIP' | 'At Risk';
  preferredServices: string[];
  totalShipments: number;
  lastShipment: string;
  accountManager: string;
  createdDate: string;
  notes: string;
}

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule
  ],
  template: `
    <div class="p-4 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-lg font-semibold text-gray-900 mb-1">Accounts Management</h1>
          <p class="text-xs text-gray-600">Manage your shipping clients and business relationships</p>
        </div>
        <button style="background-color: #243C70;" 
                class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
          <mat-icon class="text-sm mr-1">add</mat-icon>
          Add Account
        </button>
      </div>

      <!-- Account Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">Total Accounts</p>
              <p class="text-xl font-bold text-gray-900">{{ getTotalAccounts() }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-blue-600 text-lg">business</mat-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">Active Accounts</p>
              <p class="text-xl font-bold text-gray-900">{{ getActiveAccounts() }}</p>
            </div>
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-green-600 text-lg">check_circle</mat-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">VIP Accounts</p>
              <p class="text-xl font-bold text-gray-900">{{ getVIPAccounts() }}</p>
            </div>
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-purple-600 text-lg">star</mat-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">Total Revenue</p>
              <p class="text-xl font-bold text-gray-900">\${{ getTotalRevenue() }}M</p>
            </div>
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-yellow-600 text-lg">attach_money</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-md">
            <input type="text" 
                   placeholder="Search accounts..." 
                   [(ngModel)]="searchTerm"
                   class="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
            <mat-icon class="absolute left-2.5 top-2 text-gray-400 text-sm">search</mat-icon>
          </div>
          
          <select [(ngModel)]="typeFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Types</option>
            <option value="Shipper">Shipper</option>
            <option value="Consignee">Consignee</option>
            <option value="Freight Forwarder">Freight Forwarder</option>
            <option value="NVOCC">NVOCC</option>
            <option value="3PL">3PL</option>
          </select>

          <select [(ngModel)]="statusFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Active">Active</option>
            <option value="VIP">VIP</option>
            <option value="At Risk">At Risk</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select [(ngModel)]="industryFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Industries</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Automotive">Automotive</option>
            <option value="Electronics">Electronics</option>
            <option value="Textiles">Textiles</option>
          </select>
        </div>
      </div>

      <!-- Accounts Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipments</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let account of getFilteredAccounts()" class="hover:bg-gray-50">
                <td class="px-3 py-2">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ account.companyName }}</div>
                    <div class="text-xs text-gray-500">{{ account.accountManager }}</div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <span [class]="getTypeBadge(account.accountType)">{{ account.accountType }}</span>
                </td>
                <td class="px-3 py-2">
                  <span [class]="getIndustryBadge(account.industry)">{{ account.industry }}</span>
                </td>
                <td class="px-3 py-2">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ account.primaryContact }}</div>
                    <div class="text-xs text-gray-500">{{ account.email }}</div>
                  </div>
                </td>
                <td class="px-3 py-2 text-xs text-gray-500">{{ account.country }}</td>
                <td class="px-3 py-2">
                  <span [class]="getStatusBadge(account.relationshipStatus)">{{ account.relationshipStatus }}</span>
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-900">\${{ account.annualRevenue }}K</td>
                <td class="px-3 py-2">
                  <div class="text-xs text-gray-900">{{ account.totalShipments }}</div>
                  <div class="text-xs text-gray-500">{{ account.lastShipment }}</div>
                </td>
                <td class="px-3 py-2">
                  <div class="flex items-center space-x-2">
                    <button class="p-1 rounded hover:bg-blue-50 transition-colors" 
                            style="color: #243C70;" title="Edit">
                      <mat-icon class="text-sm">edit</mat-icon>
                    </button>
                    <button class="p-1 rounded hover:bg-green-50 transition-colors text-green-600" title="New Opportunity">
                      <mat-icon class="text-sm">add_business</mat-icon>
                    </button>
                    <button [matMenuTriggerFor]="actionMenu" 
                            class="p-1 rounded hover:bg-gray-50 transition-colors text-gray-600">
                      <mat-icon class="text-sm">more_vert</mat-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Menu -->
      <mat-menu #actionMenu="matMenu">
        <button mat-menu-item>
          <mat-icon>visibility</mat-icon>
          <span>View Details</span>
        </button>
        <button mat-menu-item>
          <mat-icon>history</mat-icon>
          <span>Shipment History</span>
        </button>
        <button mat-menu-item>
          <mat-icon>email</mat-icon>
          <span>Send Email</span>
        </button>
        <button mat-menu-item>
          <mat-icon>phone</mat-icon>
          <span>Schedule Call</span>
        </button>
        <button mat-menu-item>
          <mat-icon>description</mat-icon>
          <span>Generate Report</span>
        </button>
        <button mat-menu-item>
          <mat-icon>delete</mat-icon>
          <span>Delete</span>
        </button>
      </mat-menu>
    </div>
  `
})
export class AccountsListComponent implements OnInit {
  searchTerm = '';
  typeFilter = '';
  statusFilter = '';
  industryFilter = '';

  accounts: Account[] = [
    {
      id: 1,
      companyName: 'Global Trade Corporation',
      accountType: 'Shipper',
      industry: 'Manufacturing',
      primaryContact: 'John Smith',
      email: 'john@globaltrade.com',
      phone: '+1-555-0123',
      address: '123 Trade Street, New York, NY 10001',
      country: 'United States',
      annualRevenue: 2500,
      relationshipStatus: 'VIP',
      preferredServices: ['Ocean Freight', 'Air Freight'],
      totalShipments: 156,
      lastShipment: '2024-01-20',
      accountManager: 'Sarah Johnson',
      createdDate: '2023-03-15',
      notes: 'Key account with regular container shipments'
    },
    {
      id: 2,
      companyName: 'Pacific Imports Ltd',
      accountType: 'Consignee',
      industry: 'Electronics',
      primaryContact: 'Maria Garcia',
      email: 'maria@pacificimports.com',
      phone: '+1-555-0124',
      address: '456 Import Ave, Los Angeles, CA 90210',
      country: 'United States',
      annualRevenue: 1800,
      relationshipStatus: 'Active',
      preferredServices: ['Air Freight', 'Customs'],
      totalShipments: 89,
      lastShipment: '2024-01-18',
      accountManager: 'Mike Chen',
      createdDate: '2023-06-20',
      notes: 'Time-sensitive electronics importer'
    },
    {
      id: 3,
      companyName: 'Euro Logistics GmbH',
      accountType: 'Freight Forwarder',
      industry: 'Automotive',
      primaryContact: 'Hans Mueller',
      email: 'hans@eurologistics.de',
      phone: '+49-123-456789',
      address: 'Logistikstraße 10, 20457 Hamburg, Germany',
      country: 'Germany',
      annualRevenue: 3200,
      relationshipStatus: 'VIP',
      preferredServices: ['Land Transport', 'Ocean Freight'],
      totalShipments: 234,
      lastShipment: '2024-01-22',
      accountManager: 'Sarah Johnson',
      createdDate: '2022-11-10',
      notes: 'Major European partner for automotive parts'
    },
    {
      id: 4,
      companyName: 'Asian Exports Inc',
      accountType: 'NVOCC',
      industry: 'Textiles',
      primaryContact: 'Li Wei',
      email: 'li@asianexports.com',
      phone: '+86-138-0013-8000',
      address: '789 Export Road, Shanghai 200001, China',
      country: 'China',
      annualRevenue: 4100,
      relationshipStatus: 'Active',
      preferredServices: ['Ocean Freight', 'Warehousing'],
      totalShipments: 312,
      lastShipment: '2024-01-19',
      accountManager: 'David Park',
      createdDate: '2023-01-05',
      notes: 'Large volume textile exporter'
    },
    {
      id: 5,
      companyName: 'Warehouse Solutions UK',
      accountType: '3PL',
      industry: 'Retail',
      primaryContact: 'Emma Thompson',
      email: 'emma@warehousesol.com',
      phone: '+44-20-7946-0958',
      address: '321 Storage Lane, London E14 5AB, UK',
      country: 'United Kingdom',
      annualRevenue: 1500,
      relationshipStatus: 'At Risk',
      preferredServices: ['Warehousing', 'Land Transport'],
      totalShipments: 67,
      lastShipment: '2023-12-15',
      accountManager: 'Mike Chen',
      createdDate: '2023-08-12',
      notes: 'Needs attention - declining shipment volume'
    },
    {
      id: 6,
      companyName: 'Food & Beverage Distributors',
      accountType: 'Shipper',
      industry: 'Food & Beverage',
      primaryContact: 'Carlos Rodriguez',
      email: 'carlos@fbdistributors.com',
      phone: '+52-55-1234-5678',
      address: 'Av. Reforma 500, Mexico City 06600, Mexico',
      country: 'Mexico',
      annualRevenue: 950,
      relationshipStatus: 'New',
      preferredServices: ['Land Transport', 'Customs'],
      totalShipments: 23,
      lastShipment: '2024-01-15',
      accountManager: 'Sarah Johnson',
      createdDate: '2024-01-01',
      notes: 'New account with potential for growth'
    }
  ];

  ngOnInit() {}

  getTotalAccounts(): number {
    return this.accounts.length;
  }

  getActiveAccounts(): number {
    return this.accounts.filter(acc => acc.relationshipStatus === 'Active' || acc.relationshipStatus === 'VIP').length;
  }

  getVIPAccounts(): number {
    return this.accounts.filter(acc => acc.relationshipStatus === 'VIP').length;
  }

  getTotalRevenue(): number {
    return Math.round(this.accounts.reduce((sum, acc) => sum + acc.annualRevenue, 0) / 1000);
  }

  getFilteredAccounts(): Account[] {
    return this.accounts.filter(account => {
      const matchesSearch = !this.searchTerm || 
        account.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        account.primaryContact.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.typeFilter || account.accountType === this.typeFilter;
      const matchesStatus = !this.statusFilter || account.relationshipStatus === this.statusFilter;
      const matchesIndustry = !this.industryFilter || account.industry === this.industryFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesIndustry;
    });
  }

  getTypeBadge(type: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (type) {
      case 'Shipper': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Consignee': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Freight Forwarder': return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'NVOCC': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case '3PL': return `${baseClasses} bg-indigo-100 text-indigo-800`;
      case 'Customs Broker': return `${baseClasses} bg-pink-100 text-pink-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getIndustryBadge(industry: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (industry) {
      case 'Manufacturing': return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'Retail': return `${baseClasses} bg-pink-100 text-pink-800`;
      case 'Automotive': return `${baseClasses} bg-red-100 text-red-800`;
      case 'Electronics': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Textiles': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Food & Beverage': return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Chemicals': return `${baseClasses} bg-purple-100 text-purple-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadge(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'New': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Active': return `${baseClasses} bg-green-100 text-green-800`;
      case 'VIP': return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'At Risk': return `${baseClasses} bg-red-100 text-red-800`;
      case 'Inactive': return `${baseClasses} bg-gray-100 text-gray-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}