import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MasterItem {
  name: string;
  description: string;
  route?: string;
  implemented: boolean;
  count?: number;
}

interface MasterGroup {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: MasterItem[];
}

interface Party {
  id: number;
  code: string;
  name: string;
  type: string;
  city: string;
  country: string;
  email: string;
  phone?: string;
  address?: string;
  status: string;
  createdAt?: string;
}

interface Port {
  id: number;
  code: string;
  name: string;
  country: string;
  city: string;
  type: string;
  status: string;
  createdAt?: string;
}

interface ChargeCode {
  id: number;
  code: string;
  name: string;
  type: string;
  category: string;
  currency: string;
  amount: number;
  description: string;
  defaultAmount: number;
  status: string;
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
          <h1 class="text-base font-semibold text-gray-900">Master Data</h1>
          <p class="text-xs text-gray-600">Manage core business data</p>
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
              <svg class="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
              <h3 class="text-base font-medium text-gray-900">Business Parties</h3>
              <p class="text-xs text-gray-600">Manage customers, vendors, and business partners</p>
            </div>
            <button style="background-color: #2c4170;" class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Party
            </button>
          </div>

          <!-- Search and Filters -->
          <div class="flex items-center justify-between space-x-4 mb-4">
            <div class="relative flex-1 max-w-md">
              <input type="text" 
                     placeholder="Search parties..." 
                     class="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>
            <select class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
              <option value="">All Types</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="both">Both</option>
            </select>
          </div>

          <!-- Parties Table -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    <td class="px-4 py-3 text-xs">
                      <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">{{ party.code }}</span>
                    </td>
                    <td class="px-4 py-3">
                      <div>
                        <div class="text-xs font-medium text-gray-900">{{ party.name }}</div>
                        <div class="text-xs text-gray-500">{{ party.email }}</div>
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <span [class]="getPartyTypeBadge(party.type)">{{ party.type }}</span>
                    </td>
                    <td class="px-4 py-3 text-xs text-gray-900">{{ party.city }}, {{ party.country }}</td>
                    <td class="px-4 py-3 text-xs text-gray-500">{{ party.phone }}</td>
                    <td class="px-4 py-3">
                      <span [class]="getStatusBadge(party.status)">{{ party.status }}</span>
                    </td>
                    <td class="px-4 py-3 text-xs font-medium space-x-2">
                      <button class="p-1 rounded hover:bg-blue-50 transition-colors" style="color: #2c4170;" title="Edit">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                      <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                        <span class="material-icons text-sm">visibility</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Countries Tab -->
        <div *ngIf="activeTab === 'countries'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-medium text-gray-900">Country Management</h3>
              <p class="text-xs text-gray-600">Manage countries and their default currencies</p>
            </div>
            <button 
              routerLink="/master/countries/new"
              style="background-color: #2c4170;" 
              class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Country
            </button>
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a routerLink="/master/countries" 
               class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">View All Countries</h4>
                  <p class="text-xs text-gray-600">Browse and manage country list</p>
                </div>
              </div>
            </a>

            <a routerLink="/master/countries/new" 
               class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Add New Country</h4>
                  <p class="text-xs text-gray-600">Create a new country record</p>
                </div>
              </div>
            </a>

            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-yellow-100 rounded-lg">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Country Statistics</h4>
                  <p class="text-xs text-gray-600">View reports and analytics</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Overview -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Country Master Features</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>ISO Country Codes (IN, US, GB, etc.)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Default Currency Configuration</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Active/Inactive Status Management</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Search & Filter Capabilities</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Audit Trail (Created/Modified)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Integration with Port Master</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- States Tab -->
        <div *ngIf="activeTab === 'states'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-medium text-gray-900">State Management</h3>
              <p class="text-xs text-gray-600">Manage states and provinces by country</p>
            </div>
            <button 
              routerLink="/masters/states/new"
              style="background-color: #2c4170;" 
              class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add State
            </button>
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a routerLink="/masters/states" 
               class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">View All States</h4>
                  <p class="text-xs text-gray-600">Browse and manage state list</p>
                </div>
              </div>
            </a>

            <a routerLink="/masters/states/new" 
               class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Add New State</h4>
                  <p class="text-xs text-gray-600">Create a new state record</p>
                </div>
              </div>
            </a>

            <a routerLink="/masters/countries" 
               class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-yellow-100 rounded-lg">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Manage Countries</h4>
                  <p class="text-xs text-gray-600">View and edit parent countries</p>
                </div>
              </div>
            </a>
          </div>

          <!-- Features Overview -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">State Master Features</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>State Codes (TN, CA, NY, etc.)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Country Relationship Mapping</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Active/Inactive Status Management</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Filter by Country</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Audit Trail (Created/Modified)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Integration with Port Master</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cities Tab -->
        <div *ngIf="activeTab === 'cities'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-medium text-gray-900">City Management</h3>
              <p class="text-xs text-gray-600">Manage cities by state and country</p>
            </div>
            <button 
              routerLink="/masters/cities/new"
              style="background-color: #2c4170;" 
              class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add City
            </button>
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a routerLink="/masters/cities" 
               class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 012-2h2a2 2 0 012 2v12"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">View All Cities</h4>
                  <p class="text-xs text-gray-600">Browse and manage city list</p>
                </div>
              </div>
            </a>

            <a routerLink="/masters/cities/new" 
               class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Add New City</h4>
                  <p class="text-xs text-gray-600">Create a new city record</p>
                </div>
              </div>
            </a>

            <a routerLink="/masters/states" 
               class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-yellow-100 rounded-lg">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Manage States</h4>
                  <p class="text-xs text-gray-600">View and edit parent states</p>
                </div>
              </div>
            </a>
          </div>

          <!-- Features Overview -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">City Master Features</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>City Codes (CHN, NYC, LON, etc.)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>State & Country Relationship</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Cascading Dropdown Selection</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Multi-level Filtering</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Audit Trail (Created/Modified)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Integration with Port Master</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Currencies Tab -->
        <div *ngIf="activeTab === 'currencies'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-medium text-gray-900">Currency Management</h3>
              <p class="text-xs text-gray-600">Manage exchange rates and multi-currency support</p>
            </div>
            <button 
              routerLink="/masters/currencies/new"
              style="background-color: #2c4170;" 
              class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Currency
            </button>
          </div>

          <!-- Quick Actions -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12s-1.536.219-2.121.659c-1.172.879-1.172 2.303 0 3.182l.879.659z"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-blue-900">
                    <a routerLink="/masters/currencies" class="hover:underline">View All Currencies</a>
                  </p>
                  <p class="text-xs text-blue-700">Manage exchange rates</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-900">Base Currency</p>
                  <p class="text-xs text-green-700">INR (Indian Rupee)</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-purple-900">Active Currencies</p>
                  <p class="text-xs text-purple-700">8 currencies enabled</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Overview -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Currency Management Features</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-700">Multi-currency Support</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-700">Real-time Exchange Rates</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-700">Base Currency Management</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-700">Currency Conversion Utilities</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-700">Audit Trail (Created/Modified)</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs text-gray-700">Transaction Processing Support</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Departments Tab -->
        <div *ngIf="activeTab === 'departments'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-medium text-gray-900">Department Management</h3>
              <p class="text-xs text-gray-600">Manage organizational departments and hierarchies</p>
            </div>
            <button 
              routerLink="/masters/departments/new"
              style="background-color: #2c4170;" 
              class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Department
            </button>
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a routerLink="/masters/departments" 
               class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">View All Departments</h4>
                  <p class="text-xs text-gray-600">Browse and manage department list</p>
                </div>
              </div>
            </a>

            <a routerLink="/masters/departments/new" 
               class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Add New Department</h4>
                  <p class="text-xs text-gray-600">Create a new department record</p>
                </div>
              </div>
            </a>

            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-yellow-100 rounded-lg">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Department Statistics</h4>
                  <p class="text-xs text-gray-600">View reports and analytics</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Overview -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Department Master Features</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Department Codes (IT, HR, FIN, etc.)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Department Head Assignment</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Active/Inactive Status Management</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Organizational Hierarchy</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Audit Trail (Created/Modified)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Integration with Employee Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div *ngIf="activeTab === 'users'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-medium text-gray-900">User Management</h3>
              <p class="text-xs text-gray-600">Manage system users and their access permissions</p>
            </div>
            <button 
              routerLink="/identity/users/new"
              style="background-color: #2c4170;" 
              class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add User
            </button>
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a routerLink="/identity/users" 
               class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">View All Users</h4>
                  <p class="text-xs text-gray-600">Browse and manage user accounts</p>
                </div>
              </div>
            </a>

            <a routerLink="/identity/users/new" 
               class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Add New User</h4>
                  <p class="text-xs text-gray-600">Create a new user account</p>
                </div>
              </div>
            </a>

            <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">User Roles & Permissions</h4>
                  <p class="text-xs text-gray-600">Manage access control</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Overview -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">User Management Features</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Employee Code Management</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Department Assignment</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Role-Based Access Control</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>HOD (Head of Department) Management</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>User Type Classification (Internal/Other)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Email & Contact Management</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Branch & Division Assignment</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Soft Delete with Restore Capability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ports Tab -->
        <div *ngIf="activeTab === 'ports'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-xs font-medium text-gray-900">Port Management</h3>
              <p class="text-xs text-gray-600">Configure shipping ports and logistics hubs</p>
            </div>
            <button style="background-color: #2c4170;" class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Port
            </button>
          </div>

          <!-- Ports Table -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    <td class="px-4 py-3 text-xs">
                      <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs">{{ port.code }}</span>
                    </td>
                    <td class="px-4 py-3 text-xs font-medium text-gray-900">{{ port.name }}</td>
                    <td class="px-4 py-3 text-xs text-gray-900">{{ port.country }}</td>
                    <td class="px-4 py-3">
                      <span [class]="getPortTypeBadge(port.type)">{{ port.type }}</span>
                    </td>
                    <td class="px-4 py-3">
                      <span [class]="getStatusBadge(port.status)">{{ port.status }}</span>
                    </td>
                    <td class="px-4 py-3 text-xs font-medium space-x-2">
                      <button class="p-1 rounded hover:bg-blue-50 transition-colors" style="color: #2c4170;" title="Edit">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                      <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                        <span class="material-icons text-sm">visibility</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Charge Codes Tab -->
        <div *ngIf="activeTab === 'charges'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-xs font-medium text-gray-900">Charge Codes</h3>
              <p class="text-xs text-gray-600">Manage billing codes and charge structures</p>
            </div>
            <button style="background-color: #2c4170;" class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
              <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Charge Code
            </button>
          </div>

          <!-- Charge Codes Table -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    <td class="px-4 py-3 text-xs">
                      <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs">{{ charge.code }}</span>
                    </td>
                    <td class="px-4 py-3">
                      <div>
                        <div class="text-xs font-medium text-gray-900">{{ charge.name }}</div>
                        <div class="text-xs text-gray-500">{{ charge.description }}</div>
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <span [class]="getChargeCategoryBadge(charge.category)">{{ charge.category }}</span>
                    </td>
                    <td class="px-4 py-3 text-xs text-gray-900">{{ charge.currency }} {{ charge.defaultAmount | number:'1.2-2' }}</td>
                    <td class="px-4 py-3">
                      <span [class]="getStatusBadge(charge.status)">{{ charge.status }}</span>
                    </td>
                    <td class="px-4 py-3 text-xs font-medium space-x-2">
                      <button class="p-1 rounded hover:bg-blue-50 transition-colors" style="color: #2c4170;" title="Edit">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                      <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                        <span class="material-icons text-sm">visibility</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tab-button {
      @apply flex items-center px-4 py-3 text-xs font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200;
    }
    
    .tab-button.active {
      @apply border-2;
      color: #2c4170;
      border-color: #2c4170;
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
      id: 'countries',
      label: 'Countries',
      icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z'
    },
    {
      id: 'states',
      label: 'States',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3'
    },
    {
      id: 'cities',
      label: 'Cities',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 012-2h2a2 2 0 012 2v12'
    },
    {
      id: 'currencies',
      label: 'Currencies',
      icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12s-1.536.219-2.121.659c-1.172.879-1.172 2.303 0 3.182l.879.659z'
    },
    {
      id: 'departments',
      label: 'Departments',
      icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
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
      city: 'Chennai',
      type: 'Seaport',
      status: 'Active',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      code: 'INNSA',
      name: 'Mumbai Port',
      country: 'India',
      city: 'Mumbai',
      type: 'Seaport',
      status: 'Active',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      code: 'INDEL',
      name: 'Indira Gandhi International Airport',
      country: 'India',
      city: 'Delhi',
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
      type: 'Fixed',
      category: 'Shipping',
      description: 'Basic ocean freight charges',
      defaultAmount: 1500.00,
      amount: 1500.00,
      currency: 'USD',
      status: 'Active'
    },
    {
      id: 2,
      code: 'THC',
      name: 'Terminal Handling Charges',
      type: 'Variable',
      category: 'Handling',
      description: 'Port terminal handling fees',
      defaultAmount: 250.00,
      amount: 250.00,
      currency: 'USD',
      status: 'Active'
    },
    {
      id: 3,
      code: 'DOC',
      name: 'Documentation Fee',
      type: 'Fixed',
      category: 'Documentation',
      description: 'Document processing charges',
      defaultAmount: 75.00,
      amount: 75.00,
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
    const baseClasses = 'inline-flex px-2 py-1 text-sm font-semibold rounded-full';
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