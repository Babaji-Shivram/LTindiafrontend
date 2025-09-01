import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';
import { StateMaster } from '../../../models/state.model';
import { CountryMaster } from '../../../models/country.model';

@Component({
  selector: 'app-state-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="page-title text-gray-900">State Management</h1>
          <p class="secondary-text text-gray-600">Manage states and provinces by country</p>
        </div>
        <button 
          [routerLink]="'/masters/states/new'"
          style="background-color: #2c4170;" 
          class="btn-text-primary px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add State
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="flex items-center justify-between space-x-4 mb-4">
        <div class="relative flex-1 max-w-md">
          <input type="text" 
                 placeholder="Search states..." 
                 [(ngModel)]="searchTerm"
                 class="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
        </div>
        <select [(ngModel)]="selectedCountryId" (change)="applyFilters()" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
          <option value="">All Countries</option>
          <option *ngFor="let country of countries" [value]="country.lid">{{country.CountryName}}</option>
        </select>
        <select [(ngModel)]="statusFilter" (change)="applyFilters()" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- States Table -->
      <div class="bg-white rounded-lg border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left table-header uppercase tracking-wider">State</th>
                <th class="px-4 py-2 text-left table-header uppercase tracking-wider">Code</th>
                <th class="px-4 py-2 text-left table-header uppercase tracking-wider">Country</th>
                <th class="px-4 py-2 text-left table-header uppercase tracking-wider">Status</th>
                <th class="px-4 py-2 text-left table-header uppercase tracking-wider">Created</th>
                <th class="px-4 py-2 text-right table-header uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let state of filteredStates" class="hover:bg-gray-50">
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-6 w-6">
                      <div class="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                        {{ state.StateCode }}
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="text-xs font-medium text-gray-900">{{ state.StateName }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ state.StateCode }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ getCountryName(state.CountryId) }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        [class]="state.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ state.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  {{ state.CreatedDate | date:'dd/MM/yyyy' }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-right text-xs font-medium space-x-2">
                  <button 
                    [routerLink]="'/masters/states/' + state.lid"
                    class="text-blue-600 hover:text-blue-900">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  <button 
                    [routerLink]="'/masters/states/' + state.lid + '/edit'"
                    class="text-indigo-600 hover:text-indigo-900">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                  </button>
                  <button 
                    (click)="deleteState(state.lid)"
                    class="text-red-600 hover:text-red-900">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="filteredStates.length === 0" class="text-center py-8 text-gray-500 text-xs">
            <div *ngIf="!searchTerm && !selectedCountryId && !statusFilter">
              <p>No states found.</p>
              <button 
                [routerLink]="'/masters/states/new'"
                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add State
              </button>
            </div>
            <div *ngIf="searchTerm || selectedCountryId || statusFilter">
              No states found matching your criteria.
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-xs text-gray-500">Total States</div>
          <div class="section-header text-gray-900">{{ states.length }}</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-xs text-gray-500">Active States</div>
          <div class="section-header text-green-600">{{ getActiveCount() }}</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-xs text-gray-500">Unique Countries</div>
          <div class="section-header text-blue-600">{{ getUniqueCountries() }}</div>
        </div>
      </div>
    </div>
  `
})
export class StateListComponent implements OnInit {
  states: StateMaster[] = [];
  filteredStates: StateMaster[] = [];
  countries: CountryMaster[] = [];
  searchTerm: string = '';
  selectedCountryId: string = '';
  statusFilter: string = '';

  constructor(
    private stateService: StateService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.loadStates();
    this.loadCountries();
  }

  loadStates(): void {
    this.stateService.getStates().subscribe(states => {
      this.states = states;
      this.applyFilters();
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  applyFilters(): void {
    this.filteredStates = this.states.filter(state => {
      const matchesSearch = !this.searchTerm || 
        state.StateName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        state.StateCode.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCountry = !this.selectedCountryId || 
        state.CountryId.toString() === this.selectedCountryId;

      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && state.IsActive) ||
        (this.statusFilter === 'inactive' && !state.IsActive);

      return matchesSearch && matchesCountry && matchesStatus;
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries.find(c => c.lid === countryId);
    return country?.CountryName || 'Unknown Country';
  }

  getActiveCount(): number {
    return this.filteredStates.filter(state => state.IsActive).length;
  }

  getInactiveCount(): number {
    return this.filteredStates.filter(state => !state.IsActive).length;
  }

  getUniqueCountries(): number {
    const countries = new Set(this.states.map(s => s.CountryId));
    return countries.size;
  }

  deleteState(id: number) {
    if (confirm('Are you sure you want to delete this state?')) {
      this.stateService.deleteState(id).subscribe(success => {
        if (success) {
          this.loadStates();
        }
      });
    }
  }
}
