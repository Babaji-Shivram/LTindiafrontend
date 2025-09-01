import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PortService } from '../../services/port.service';
import { Port } from '../../models/port.model';

@Component({
  selector: 'app-port-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="page-title text-gray-900">Port Management</h3>
          <p class="secondary-text text-gray-600">Configure shipping ports and logistics hubs</p>
        </div>
        <button 
          [routerLink]="'/masters/ports/new'"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add Port
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="flex items-center justify-between space-x-4 mb-4">
        <div class="relative flex-1 max-w-md">
          <input type="text" 
                 placeholder="Search ports..." 
                 [(ngModel)]="searchTerm"
                 class="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
        </div>
        <select [(ngModel)]="typeFilter" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption min-w-32">
          <option value="">All Types</option>
          <option value="Sea">Sea Port</option>
          <option value="Air">Air Port</option>
          <option value="Land">Land Port</option>
        </select>
        <select [(ngModel)]="statusFilter" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption min-w-32">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <!-- Ports Table -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left table-header uppercase tracking-wider">Code</th>
                <th class="px-4 py-3 text-left table-header uppercase tracking-wider">Port Name</th>
                <th class="px-4 py-3 text-left table-header uppercase tracking-wider">Type</th>
                <th class="px-4 py-3 text-left table-header uppercase tracking-wider">Location</th>
                <th class="px-4 py-3 text-left table-header uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left table-header uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let port of getFilteredPorts()" class="hover:bg-gray-50">
                <td class="px-4 py-3 caption">
                  <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded caption">{{ port.PortCode }}</span>
                </td>
                <td class="px-4 py-3">
                  <div class="caption font-medium text-gray-900">{{ port.PortName }}</div>
                </td>
                <td class="px-4 py-3">
                  <span [class]="getPortTypeBadge(port.PortType)">{{ port.PortType }}</span>
                </td>
                <td class="px-4 py-3 caption text-gray-900">{{ getCityName(port.CityId) }}, {{ getStateName(port.StateId) }}, {{ getCountryName(port.CountryId) }}</td>
                <td class="px-4 py-3">
                  <span [class]="getStatusBadge(port.IsActive)">{{ port.IsActive ? 'Active' : 'Inactive' }}</span>
                </td>
                <td class="px-4 py-3 caption font-medium space-x-2">
                  <button 
                    [routerLink]="'/masters/ports/' + port.lid + '/edit'"
                    class="p-1 rounded hover:bg-blue-50 transition-colors" 
                    style="color: #2c4170;" 
                    title="Edit">
                    <span class="material-icons secondary-text">edit</span>
                  </button>
                  <button 
                    class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" 
                    title="Delete">
                    <span class="material-icons secondary-text">delete</span>
                  </button>
                  <button 
                    [routerLink]="'/masters/ports/' + port.lid"
                    class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" 
                    title="View">
                    <span class="material-icons secondary-text">visibility</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PortListComponent implements OnInit {
  ports: Port[] = [];
  searchTerm = '';
  typeFilter = '';
  statusFilter = '';

  constructor(private portService: PortService) {}

  ngOnInit() {
    this.loadPorts();
  }

  loadPorts() {
    this.portService.getAllPorts().subscribe(ports => {
      this.ports = ports;
    });
  }

  getFilteredPorts(): Port[] {
    return this.ports.filter(port => {
      const matchesSearch = !this.searchTerm || 
        port.PortName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        port.PortCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.getCityName(port.CityId).toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.typeFilter || port.PortType === this.typeFilter;
              const matchesStatus = !this.statusFilter || port.IsActive.toString() === this.statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }

  getPortTypeBadge(type: string): string {
    const baseClasses = 'inline-flex px-2 py-1 caption font-semibold rounded-full';
    switch (type) {
      case 'Sea':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Air':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Land':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadge(isActive: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 caption font-semibold rounded-full';
    return isActive 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }

  // Helper methods to get names from IDs
  getCityName(cityId: number): string {
    return this.portService.getCityName(cityId);
  }

  getStateName(stateId: number): string {
    return this.portService.getStateName(stateId);
  }

  getCountryName(countryId: number): string {
    return this.portService.getCountryName(countryId);
  }
}
