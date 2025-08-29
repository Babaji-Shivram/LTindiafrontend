import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
import { StateService } from '../../../services/state.service';
import { CityMaster } from '../../../models/city.model';
import { CountryMaster } from '../../../models/country.model';
import { StateMaster } from '../../../models/state.model';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="page-title text-gray-800">City Management</h1>
          <p class="text-gray-600 mt-2">Manage cities by state and country</p>
        </div>
        <a 
          routerLink="/masters/cities/new" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add New City
        </a>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 class="section-header text-gray-800 mb-4">Filters</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div>
            <label class="label-text text-gray-700 mb-2">Search Cities</label>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search by city name or code..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>

          <!-- Country Filter -->
          <div>
            <label class="label-text text-gray-700 mb-2">Filter by Country</label>
            <select
              [(ngModel)]="selectedCountryId"
              (change)="onCountryChange()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Countries</option>
              <option *ngFor="let country of countries" [value]="country.lid">
                {{country.CountryName}}
              </option>
            </select>
          </div>

          <!-- State Filter -->
          <div>
            <label class="label-text text-gray-700 mb-2">Filter by State</label>
            <select
              [(ngModel)]="selectedStateId"
              (change)="applyFilters()"
              [disabled]="!selectedCountryId"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="">{{selectedCountryId ? 'All States' : 'Select Country First'}}</option>
              <option *ngFor="let state of filteredStates" [value]="state.lid">
                {{state.StateName}}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="label-text text-gray-700 mb-2">Status</label>
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
            Showing {{filteredCities.length}} of {{cities.length}} cities
          </p>
          <div class="flex gap-4 text-sm">
            <span class="text-green-600">●{{getActiveCount()}} Active</span>
            <span class="text-red-600">●{{getInactiveCount()}} Inactive</span>
          </div>
        </div>
      </div>

      <!-- Cities Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          *ngFor="let city of filteredCities" 
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
          
          <!-- City Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="page-title text-gray-800">{{city.CityName}}</h3>
              <p class="text-gray-600 font-mono text-sm">{{city.CityCode}}</p>
            </div>
            <span 
              [class]="city.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              class="px-2 py-1 text-xs font-semibold rounded-full">
              {{city.IsActive ? 'Active' : 'Inactive'}}
            </span>
          </div>

          <!-- Location Info -->
          <div class="mb-4 space-y-2">
            <div>
              <label class="label-text text-gray-500 mb-1">State</label>
              <p class="text-gray-800">{{getStateName(city.StateId)}}</p>
            </div>
            <div>
              <label class="label-text text-gray-500 mb-1">Country</label>
              <p class="text-gray-800">{{getCountryName(city.CountryId)}}</p>
            </div>
          </div>

          <!-- Meta Information -->
          <div class="border-t pt-4 space-y-2">
            <div class="text-xs text-gray-500">
              <p>Created: {{city.CreatedDate | date:'short'}}</p>
              <p *ngIf="city.ModifiedDate">
                Modified: {{city.ModifiedDate | date:'short'}}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex gap-2">
            <a 
              [routerLink]="['/masters/cities', city.lid]"
              class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium">
              View Details
            </a>
            <a 
              [routerLink]="['/masters/cities', city.lid, 'edit']"
              class="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium">
              Edit
            </a>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredCities.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 012-2h2a2 2 0 012 2v12"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No cities found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{searchTerm || selectedCountryId || selectedStateId || statusFilter ? 'Try adjusting your filters' : 'Get started by creating a new city'}}
        </p>
        <div class="mt-6" *ngIf="!searchTerm && !selectedCountryId && !selectedStateId && !statusFilter">
          <a 
            routerLink="/masters/cities/new"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add New City
          </a>
        </div>
      </div>
    </div>
  `
})
export class CityListComponent implements OnInit {
  cities: CityMaster[] = [];
  filteredCities: CityMaster[] = [];
  countries: CountryMaster[] = [];
  states: StateMaster[] = [];
  filteredStates: StateMaster[] = [];
  
  searchTerm: string = '';
  selectedCountryId: string = '';
  selectedStateId: string = '';
  statusFilter: string = '';

  constructor(
    private cityService: CityService,
    private countryService: CountryService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.loadCities();
    this.loadCountries();
    this.loadStates();
  }

  loadCities(): void {
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
      this.applyFilters();
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  loadStates(): void {
    this.stateService.getStates().subscribe(states => {
      this.states = states;
    });
  }

  onCountryChange(): void {
    this.selectedStateId = '';
    if (this.selectedCountryId) {
      this.filteredStates = this.states.filter(s => s.CountryId.toString() === this.selectedCountryId);
    } else {
      this.filteredStates = [];
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCities = this.cities.filter(city => {
      const matchesSearch = !this.searchTerm || 
        city.CityName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        city.CityCode.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCountry = !this.selectedCountryId || 
        city.CountryId.toString() === this.selectedCountryId;

      const matchesState = !this.selectedStateId || 
        city.StateId.toString() === this.selectedStateId;

      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && city.IsActive) ||
        (this.statusFilter === 'inactive' && !city.IsActive);

      return matchesSearch && matchesCountry && matchesState && matchesStatus;
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries.find(c => c.lid === countryId);
    return country?.CountryName || 'Unknown Country';
  }

  getStateName(stateId: number): string {
    const state = this.states.find(s => s.lid === stateId);
    return state?.StateName || 'Unknown State';
  }

  getActiveCount(): number {
    return this.filteredCities.filter(city => city.IsActive).length;
  }

  getInactiveCount(): number {
    return this.filteredCities.filter(city => !city.IsActive).length;
  }
}
