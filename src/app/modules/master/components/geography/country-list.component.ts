import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeographyService } from '../../services/geography.service';
import { Country } from '../../models/geography.model';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-base font-medium text-gray-900">Country Management</h3>
          <p class="text-xs text-gray-600">Manage countries and their details</p>
        </div>
        <button style="background-color: #2c4170;" class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add Country
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="flex items-center justify-between space-x-4 mb-4">
        <div class="relative flex-1 max-w-md">
          <input type="text" 
                 placeholder="Search countries..." 
                 [(ngModel)]="searchTerm"
                 class="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
        </div>
        <select [(ngModel)]="statusFilter" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Countries Table -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Zone</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let country of getFilteredCountries()" class="hover:bg-gray-50">
                <td class="px-4 py-3 text-xs">
                  <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">{{ country.code }}</span>
                </td>
                <td class="px-4 py-3">
                  <div class="text-xs font-medium text-gray-900">{{ country.name }}</div>
                </td>
                <td class="px-4 py-3 text-xs text-gray-900">{{ country.currency }}</td>
                <td class="px-4 py-3 text-xs text-gray-900">{{ country.timeZone }}</td>
                <td class="px-4 py-3">
                  <span [class]="getStatusBadge(country.status)">{{ country.status }}</span>
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
  `
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  searchTerm = '';
  statusFilter = '';

  constructor(private geographyService: GeographyService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.geographyService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  getFilteredCountries(): Country[] {
    return this.countries.filter(country => {
      const matchesSearch = !this.searchTerm || 
        country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || country.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  getStatusBadge(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return status === 'Active' 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }
}
