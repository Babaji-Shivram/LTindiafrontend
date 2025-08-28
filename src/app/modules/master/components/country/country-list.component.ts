import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { CountryMaster } from '../../models/country.model';

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
          <p class="text-xs text-gray-600">Manage countries and their default currencies</p>
        </div>
        <button 
          [routerLink]="'/master/countries/new'"
          style="background-color: #2c4170;" 
          class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
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
        <select [(ngModel)]="currencyFilter" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
          <option value="">All Currencies</option>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
        </select>
        <select [(ngModel)]="statusFilter" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <!-- Countries Table -->
      <div class="bg-white rounded-lg border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let country of filteredCountries" class="hover:bg-gray-50">
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-6 w-6">
                      <div class="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                        {{ country.CountryCode }}
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="text-xs font-medium text-gray-900">{{ country.CountryName }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ country.CountryCode }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ country.Currency }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        [class]="country.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ country.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  {{ country.CreatedDate | date:'dd/MM/yyyy' }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-right text-xs font-medium space-x-2">
                  <button 
                    [routerLink]="'/master/countries/' + country.lid"
                    class="text-blue-600 hover:text-blue-900">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  <button 
                    [routerLink]="'/master/countries/' + country.lid + '/edit'"
                    class="text-indigo-600 hover:text-indigo-900">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                  </button>
                  <button 
                    (click)="deleteCountry(country.lid)"
                    class="text-red-600 hover:text-red-900">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="filteredCountries.length === 0" class="text-center py-8 text-gray-500 text-xs">
            No countries found matching your criteria.
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-xs text-gray-500">Total Countries</div>
          <div class="text-lg font-semibold text-gray-900">{{ countries.length }}</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-xs text-gray-500">Active Countries</div>
          <div class="text-lg font-semibold text-green-600">{{ getActiveCount() }}</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-xs text-gray-500">Unique Currencies</div>
          <div class="text-lg font-semibold text-blue-600">{{ getUniqueCurrencies() }}</div>
        </div>
      </div>
    </div>
  `
})
export class CountryListComponent implements OnInit {
  countries: CountryMaster[] = [];
  searchTerm: string = '';
  currencyFilter: string = '';
  statusFilter: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  get filteredCountries(): CountryMaster[] {
    return this.countries.filter(country => {
      const matchesSearch = !this.searchTerm || 
        country.CountryName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        country.CountryCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        country.Currency.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCurrency = !this.currencyFilter || country.Currency === this.currencyFilter;
      const matchesStatus = !this.statusFilter || country.IsActive.toString() === this.statusFilter;
      
      return matchesSearch && matchesCurrency && matchesStatus;
    });
  }

  deleteCountry(id: number) {
    if (confirm('Are you sure you want to delete this country?')) {
      this.countryService.deleteCountry(id).subscribe(success => {
        if (success) {
          this.loadCountries();
        }
      });
    }
  }

  getActiveCount(): number {
    return this.countries.filter(c => c.IsActive).length;
  }

  getUniqueCurrencies(): number {
    const currencies = new Set(this.countries.map(c => c.Currency));
    return currencies.size;
  }
}
