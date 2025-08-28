import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyMaster } from '../../models/currency.model';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Currency Management</h1>
            <p class="text-sm text-gray-600 mt-1">Manage exchange rates and currency settings</p>
          </div>
          <button 
            routerLink="/masters/currencies/new"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Currency
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="border-b border-gray-200 px-6 py-4 bg-gray-50">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search currencies..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Status:</label>
            <select 
              [(ngModel)]="statusFilter" 
              (change)="applyFilters()"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Type:</label>
            <select 
              [(ngModel)]="typeFilter" 
              (change)="applyFilters()"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All</option>
              <option value="base">Base Currency</option>
              <option value="foreign">Foreign Currency</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="px-6 py-12 text-center">
        <div class="text-gray-500">Loading currencies...</div>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange Rate</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let currency of filteredCurrencies; trackBy: trackByCurrency" 
                class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">{{ currency.CurrencyName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {{ currency.CurrencyCode }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-gray-900">{{ currency.CurrencySymbol }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="text-sm text-gray-900">
                  <span *ngIf="currency.IsBaseCurrency" class="text-blue-600 font-medium">1.00 (Base)</span>
                  <span *ngIf="!currency.IsBaseCurrency" class="font-mono">
                    {{ currency.ExchangeRate | number:'1.4-4' }}
                  </span>
                </div>
                <div *ngIf="!currency.IsBaseCurrency" class="text-xs text-gray-500">
                  1 INR = {{ currency.ExchangeRate | number:'1.4-4' }} {{ currency.CurrencyCode }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span *ngIf="currency.IsBaseCurrency" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Base Currency
                </span>
                <span *ngIf="!currency.IsBaseCurrency" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Foreign
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span *ngIf="currency.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
                <span *ngIf="!currency.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inactive
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                  <button 
                    [routerLink]="['/masters/currencies', currency.lid]"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
                  </button>
                  <button 
                    [routerLink]="['/masters/currencies', currency.lid, 'edit']"
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Edit
                  </button>
                  <button 
                    *ngIf="!currency.IsBaseCurrency"
                    (click)="deleteCurrency(currency)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium">
                    Delete
                  </button>
                  <span *ngIf="currency.IsBaseCurrency" class="text-gray-400 text-sm">Protected</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div *ngIf="filteredCurrencies.length === 0" class="px-6 py-12 text-center">
          <div class="text-gray-500">
            <div class="text-lg font-medium mb-2">No currencies found</div>
            <div class="text-sm">{{ searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first currency' }}</div>
          </div>
        </div>
      </div>

      <!-- Footer with Summary -->
      <div *ngIf="!isLoading && currencies.length > 0" class="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <div>
            Total: {{ currencies.length }} currencies 
            ({{ getActiveCurrenciesCount() }} active, 
             {{ getInactiveCurrenciesCount() }} inactive)
          </div>
          <div *ngIf="baseCurrency" class="flex items-center gap-2">
            <span>Base Currency:</span>
            <span class="font-medium text-blue-600">{{ baseCurrency.CurrencyCode }} ({{ baseCurrency.CurrencySymbol }})</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CurrencyListComponent implements OnInit {
  currencies: CurrencyMaster[] = [];
  filteredCurrencies: CurrencyMaster[] = [];
  baseCurrency: CurrencyMaster | undefined;
  
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  isLoading = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadBaseCurrency();
  }

  loadCurrencies(): void {
    this.isLoading = true;
    this.currencyService.getCurrencies().subscribe({
      next: (currencies) => {
        this.currencies = currencies;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading currencies:', error);
        this.isLoading = false;
      }
    });
  }

  loadBaseCurrency(): void {
    this.currencyService.getBaseCurrency().subscribe({
      next: (baseCurrency) => {
        this.baseCurrency = baseCurrency;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.currencies];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(currency =>
        currency.CurrencyName.toLowerCase().includes(term) ||
        currency.CurrencyCode.toLowerCase().includes(term) ||
        currency.CurrencySymbol.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(currency => {
        if (this.statusFilter === 'active') return currency.IsActive;
        if (this.statusFilter === 'inactive') return !currency.IsActive;
        return true;
      });
    }

    // Type filter
    if (this.typeFilter) {
      filtered = filtered.filter(currency => {
        if (this.typeFilter === 'base') return currency.IsBaseCurrency;
        if (this.typeFilter === 'foreign') return !currency.IsBaseCurrency;
        return true;
      });
    }

    this.filteredCurrencies = filtered;
  }

  deleteCurrency(currency: CurrencyMaster): void {
    if (currency.IsBaseCurrency) {
      alert('Cannot delete the base currency.');
      return;
    }

    if (confirm(`Are you sure you want to delete ${currency.CurrencyName}?`)) {
      this.currencyService.deleteCurrency(currency.lid).subscribe({
        next: (success) => {
          if (success) {
            this.loadCurrencies();
          } else {
            alert('Failed to delete currency.');
          }
        },
        error: (error) => {
          console.error('Error deleting currency:', error);
          alert('Error deleting currency.');
        }
      });
    }
  }

  trackByCurrency(index: number, currency: CurrencyMaster): number {
    return currency.lid;
  }

  getActiveCurrenciesCount(): number {
    return this.currencies.filter(c => c.IsActive).length;
  }

  getInactiveCurrenciesCount(): number {
    return this.currencies.filter(c => !c.IsActive).length;
  }
}
