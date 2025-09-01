import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="page-title text-gray-900">Vehicles</h1>
          <p class="mt-2 secondary-text text-gray-700">Manage fleet vehicles and driver information</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent component-header font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Vehicle
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterVehicles()"
              placeholder="Search vehicles..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 component-header"
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
            [(ngModel)]="typeFilter"
            (change)="filterVehicles()"
            class="block w-full pl-3 pr-10 py-2 component-header border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">All Types</option>
            <option value="Truck">Truck</option>
            <option value="Container">Container</option>
            <option value="Trailer">Trailer</option>
            <option value="Van">Van</option>
            <option value="Pickup">Pickup</option>
          </select>
          <select
            [(ngModel)]="statusFilter"
            (change)="filterVehicles()"
            class="block w-full pl-3 pr-10 py-2 component-header border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="secondary-text text-gray-700">
        Showing {{ filteredVehicles.length }} of {{ vehicles.length }} vehicles
      </div>

      <!-- Vehicles Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Vehicle Details
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Capacity
                </th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Driver Info
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
              <tr *ngFor="let vehicle of paginatedVehicles; trackBy: trackByVehicle" 
                  class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span class="component-header font-medium text-indigo-800">{{ getVehicleIcon(vehicle.VehicleType) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="table-cell font-medium text-gray-900">{{ vehicle.VehicleNumber }}</div>
                      <div class="component-header text-gray-500">ID: {{ vehicle.lid }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="getTypeBadgeClass(vehicle.VehicleType)" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full component-header font-medium">
                    {{ vehicle.VehicleType }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap component-header text-gray-900">
                  {{ vehicle.Capacity }} MT
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="component-header text-gray-900">{{ vehicle.DriverName }}</div>
                  <div class="component-header text-gray-500">{{ vehicle.DriverMobile }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="getStatusBadgeClass(vehicle.IsActive)" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full component-header font-medium">
                    {{ vehicle.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap component-header text-gray-500">
                  {{ vehicle.CreatedDate | date:'MMM dd, yyyy' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium">
                  <div class="flex items-center space-x-2">
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
                      class="text-red-600 hover:text-red-900 transition-colors duration-150"
                      title="Delete"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredVehicles.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 9l4-4-4-4m0 8h6.5a2.5 2.5 0 000-5H13"/>
          </svg>
          <h3 class="mt-2 component-header font-medium text-gray-900">No vehicles found</h3>
          <p class="mt-1 component-header text-gray-500">
            {{ searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding a new vehicle to your fleet.' }}
          </p>
        </div>

        <!-- Pagination -->
        <div *ngIf="filteredVehicles.length > itemsPerPage" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                Showing {{ getStartIndex() }} to {{ getEndIndex() }} of {{ filteredVehicles.length }} results
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
    </div>
  `
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  paginatedVehicles: Vehicle[] = [];
  
  searchTerm: string = '';
  typeFilter: string = '';
  statusFilter: string = '';
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.filterVehicles();
      },
      error: (error) => {
        console.error('Error loading vehicles:', error);
      }
    });
  }

  filterVehicles(): void {
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      const matchesSearch = !this.searchTerm || 
        vehicle.VehicleNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.DriverName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.VehicleType.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.typeFilter || vehicle.VehicleType === this.typeFilter;
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && vehicle.IsActive) ||
        (this.statusFilter === 'inactive' && !vehicle.IsActive);
      
      return matchesSearch && matchesType && matchesStatus;
    });
    
    this.totalPages = Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedVehicles();
  }

  updatePaginatedVehicles(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVehicles = this.filteredVehicles.slice(startIndex, endIndex);
  }

  getVehicleIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'Truck': '🚛',
      'Container': '🚢',
      'Trailer': '🚚',
      'Van': '🚐',
      'Pickup': '🛻'
    };
    return icons[type] || '🚛';
  }

  getTypeBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'Truck': 'bg-blue-100 text-blue-800',
      'Container': 'bg-green-100 text-green-800',
      'Trailer': 'bg-purple-100 text-purple-800',
      'Van': 'bg-yellow-100 text-yellow-800',
      'Pickup': 'bg-orange-100 text-orange-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  trackByVehicle(index: number, vehicle: Vehicle): number {
    return vehicle.lid;
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedVehicles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedVehicles();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedVehicles();
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredVehicles.length);
  }
}
