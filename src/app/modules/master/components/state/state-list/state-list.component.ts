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
    <div class="container mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">State Management</h1>
          <p class="text-gray-600 mt-2">Manage states and provinces by country</p>
        </div>
        <a 
          routerLink="/master/states/new" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add New State
        </a>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search States</label>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search by state name or code..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>

          <!-- Country Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Country</label>
            <select
              [(ngModel)]="selectedCountryId"
              (change)="applyFilters()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Countries</option>
              <option *ngFor="let country of countries" [value]="country.lid">
                {{country.CountryName}}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              [(ngModel)]="statusFilter"
              (change)="applyFilters()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mb-6">
        <div class="flex justify-between items-center">
          <p class="text-gray-600">
            Showing {{filteredStates.length}} of {{states.length}} states
          </p>
          <div class="flex gap-4 text-sm">
            <span class="text-green-600">●{{getActiveCount()}} Active</span>
            <span class="text-red-600">●{{getInactiveCount()}} Inactive</span>
          </div>
        </div>
      </div>

      <!-- States Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          *ngFor="let state of filteredStates" 
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
          
          <!-- State Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-800">{{state.StateName}}</h3>
              <p class="text-gray-600 font-mono text-sm">{{state.StateCode}}</p>
            </div>
            <span 
              [class]="state.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              class="px-2 py-1 text-xs font-semibold rounded-full">
              {{state.IsActive ? 'Active' : 'Inactive'}}
            </span>
          </div>

          <!-- Country Info -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-500 mb-1">Country</label>
            <p class="text-gray-800">{{getCountryName(state.CountryId)}}</p>
          </div>

          <!-- Meta Information -->
          <div class="border-t pt-4 space-y-2">
            <div class="text-xs text-gray-500">
              <p>Created: {{state.CreatedDate | date:'short'}}</p>
              <p *ngIf="state.ModifiedDate">
                Modified: {{state.ModifiedDate | date:'short'}}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex gap-2">
            <a 
              [routerLink]="['/master/states', state.lid]"
              class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium">
              View Details
            </a>
            <a 
              [routerLink]="['/master/states', state.lid, 'edit']"
              class="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium">
              Edit
            </a>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredStates.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 012-2h2a2 2 0 012 2v12"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No states found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{searchTerm || selectedCountryId || statusFilter ? 'Try adjusting your filters' : 'Get started by creating a new state'}}
        </p>
        <div class="mt-6" *ngIf="!searchTerm && !selectedCountryId && !statusFilter">
          <a 
            routerLink="/master/states/new"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add New State
          </a>
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
}
