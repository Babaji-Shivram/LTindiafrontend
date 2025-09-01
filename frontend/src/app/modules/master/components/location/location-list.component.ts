import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Location {
  id: number;
  name: string;
  code: string;
  type: 'warehouse' | 'office' | 'facility' | 'other';
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-medium text-gray-900">Location Management</h3>
          <p class="text-sm text-gray-600">Manage warehouses, offices, and facilities</p>
        </div>
        <button 
          [routerLink]="'/masters/location/new'"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all ">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add Location
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
                placeholder="Search by name, code, or address..."
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
              <option value="warehouse">Warehouse</option>
              <option value="office">Office</option>
              <option value="facility">Facility</option>
              <option value="other">Other</option>
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
        Showing {{ paginatedLocations.length }} of {{ filteredLocations.length }} locations
      </div>

      <!-- Location Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          *ngFor="let location of paginatedLocations"
          class="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
          (click)="viewLocation(location)"
        >
          <div class="p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg" 
                     [ngClass]="getTypeColorClass(location.type)">
                  {{ getTypeIcon(location.type) }}
                </div>
                <div>
                  <h4 class="table-cell font-medium text-gray-900">{{ location.name }}</h4>
                  <p class="text-xs text-gray-500">{{ location.code }}</p>
                </div>
              </div>
              <span 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                [ngClass]="location.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ location.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center text-xs text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="truncate">{{ location.address }}</span>
              </div>
              <div class="flex items-center text-xs text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                <span>{{ getTypeLabel(location.type) }}</span>
              </div>
              <div class="flex items-center text-xs text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span>{{ location.city }}, {{ location.state }}</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">
                Updated {{ location.updatedAt | date:'short' }}
              </span>
              <div class="flex items-center space-x-2">
                <button
                  (click)="editLocation(location, $event)"
                  class="text-blue-600 hover:text-blue-800 text-xs font-medium"
                >
                  Edit
                </button>
                <button
                  (click)="toggleStatus(location, $event)"
                  class="metric-label"
                  [ngClass]="location.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                >
                  {{ location.isActive ? 'Deactivate' : 'Activate' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="paginatedLocations.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No locations found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new location.</p>
        <div class="mt-6">
          <button 
            [routerLink]="'/masters/location/new'"
            style="background-color: #2c4170;"
            class="btn-text-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all "
          >
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            Add Location
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="totalPages > 1" class="flex items-center justify-between mt-6">
        <div class="text-sm text-gray-700">
          Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, filteredLocations.length) }} of {{ filteredLocations.length }} results
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
export class LocationListComponent implements OnInit {
  Math = Math;
  
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  paginatedLocations: Location[] = [];
  
  searchTerm = '';
  typeFilter = 'all';
  statusFilter = 'all';
  
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    // Mock data - replace with actual service call
    this.locations = [
      {
        id: 1,
        name: 'Mumbai Warehouse',
        code: 'MUM-WH-001',
        type: 'warehouse',
        address: 'Plot No. 123, MIDC Industrial Area',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400051',
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-12-20')
      },
      {
        id: 2,
        name: 'Delhi Head Office',
        code: 'DEL-OFF-001',
        type: 'office',
        address: 'Connaught Place, Central Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        pincode: '110001',
        isActive: true,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-12-18')
      },
      {
        id: 3,
        name: 'Chennai Port Facility',
        code: 'CHN-FAC-001',
        type: 'facility',
        address: 'Chennai Port Trust, North Quay',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        pincode: '600001',
        isActive: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-12-15')
      }
    ];
    
    this.applyFilters();
  }

  applyFilters() {
    this.filteredLocations = this.locations.filter(location => {
      const matchesSearch = !this.searchTerm || 
        location.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        location.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = this.typeFilter === 'all' || location.type === this.typeFilter;
      
      const matchesStatus = this.statusFilter === 'all' || 
        (this.statusFilter === 'active' && location.isActive) ||
        (this.statusFilter === 'inactive' && !location.isActive);
      
      return matchesSearch && matchesType && matchesStatus;
    });
    
    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredLocations.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLocations = this.filteredLocations.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }

  getTypeIcon(type: string): string {
    const icons = {
      warehouse: '🏭',
      office: '🏢',
      facility: '🏗️',
      other: '📍'
    };
    return icons[type as keyof typeof icons] || '📍';
  }

  getTypeLabel(type: string): string {
    const labels = {
      warehouse: 'Warehouse',
      office: 'Office',
      facility: 'Facility',
      other: 'Other'
    };
    return labels[type as keyof typeof labels] || 'Other';
  }

  getTypeColorClass(type: string): string {
    const classes = {
      warehouse: 'bg-blue-100 text-blue-600',
      office: 'bg-green-100 text-green-600',
      facility: 'bg-purple-100 text-purple-600',
      other: 'bg-gray-100 text-gray-600'
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-600';
  }

  viewLocation(location: Location) {
    // Navigate to location details
    console.log('View location:', location);
  }

  editLocation(location: Location, event: Event) {
    event.stopPropagation();
    console.log('Edit location:', location);
  }

  toggleStatus(location: Location, event: Event) {
    event.stopPropagation();
    location.isActive = !location.isActive;
    location.updatedAt = new Date();
  }
}
