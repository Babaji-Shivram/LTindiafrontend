import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyMaster } from '../../models/currency.model';

@Component({
  selector: 'app-currency-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Currency Details</h1>
            <p class="text-sm text-gray-600 mt-1">View currency information and exchange rate details</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              [routerLink]="['/masters/currencies', currency?.lid, 'edit']"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Edit Currency
            </button>
            <button 
              type="button"
              (click)="goBack()"
              class="text-gray-600 hover:text-gray-800 px-3 py-1.5 text-sm font-medium">
              ← Back to List
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="px-6 py-12 text-center">
        <div class="text-gray-500">Loading currency details...</div>
      </div>

      <!-- Currency Not Found -->
      <div *ngIf="!isLoading && !currency" class="px-6 py-12 text-center">
        <div class="text-gray-500">
          <div class="text-lg font-medium mb-2">Currency not found</div>
          <div class="text-sm">The currency you're looking for doesn't exist or has been removed.</div>
        </div>
      </div>

      <!-- Currency Details -->
      <div *ngIf="!isLoading && currency" class="p-6">
        <!-- Currency Header -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-blue-600">{{ currency.CurrencySymbol }}</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ currency.CurrencyName }}</h2>
              <div class="flex items-center space-x-4 mt-1">
                <span class="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{{ currency.CurrencyCode }}</span>
                <span *ngIf="currency.IsBaseCurrency" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Base Currency
                </span>
                <span *ngIf="!currency.IsBaseCurrency" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Foreign Currency
                </span>
                <span *ngIf="currency.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
                <span *ngIf="!currency.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inactive
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Currency Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Currency Name:</span>
                <span class="text-sm text-gray-900">{{ currency.CurrencyName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Currency Code:</span>
                <span class="text-sm font-mono text-gray-900">{{ currency.CurrencyCode }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Currency Symbol:</span>
                <span class="text-sm text-gray-900">{{ currency.CurrencySymbol }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-600">Status:</span>
                <span class="text-sm text-gray-900">{{ currency.IsActive ? 'Active' : 'Inactive' }}</span>
              </div>
            </div>
          </div>

          <!-- Exchange Rate Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Exchange Rate</h3>
            <div class="space-y-3">
              <div *ngIf="currency.IsBaseCurrency">
                <div class="text-center py-4">
                  <div class="text-3xl font-bold text-blue-600 mb-2">1.0000</div>
                  <div class="text-sm text-gray-600">Base Currency Rate</div>
                  <div class="text-xs text-gray-500 mt-1">All other currencies are calculated relative to this</div>
                </div>
              </div>
              <div *ngIf="!currency.IsBaseCurrency">
                <div class="text-center py-2">
                  <div class="text-2xl font-bold text-gray-900 mb-2">{{ currency.ExchangeRate | number:'1.4-4' }}</div>
                  <div class="text-sm text-gray-600">1 INR = {{ currency.ExchangeRate | number:'1.4-4' }} {{ currency.CurrencyCode }}</div>
                </div>
                <div class="border-t border-gray-200 pt-3 mt-3">
                  <div class="text-sm text-gray-600 text-center">
                    Reverse Rate: 1 {{ currency.CurrencyCode }} = {{ (1 / currency.ExchangeRate!) | number:'1.4-4' }} INR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sample Conversions -->
        <div *ngIf="!currency.IsBaseCurrency && currency.ExchangeRate" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-medium text-blue-900 mb-4">Sample Conversions</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-lg font-semibold text-blue-800">₹{{ 100 | number:'1.2-2' }}</div>
              <div class="text-sm text-blue-600">=</div>
              <div class="text-lg font-semibold text-blue-800">{{ currency.CurrencySymbol }}{{ (100 * currency.ExchangeRate) | number:'1.2-2' }}</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-blue-800">₹{{ 1000 | number:'1.2-2' }}</div>
              <div class="text-sm text-blue-600">=</div>
              <div class="text-lg font-semibold text-blue-800">{{ currency.CurrencySymbol }}{{ (1000 * currency.ExchangeRate) | number:'1.2-2' }}</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-blue-800">₹{{ 10000 | number:'1.2-2' }}</div>
              <div class="text-sm text-blue-600">=</div>
              <div class="text-lg font-semibold text-blue-800">{{ currency.CurrencySymbol }}{{ (10000 * currency.ExchangeRate) | number:'1.2-2' }}</div>
            </div>
          </div>
        </div>

        <!-- Audit Information -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Audit Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="text-sm font-medium text-gray-600 mb-1">Created</div>
              <div class="text-sm text-gray-900">{{ currency.CreatedDate | date:'medium' }}</div>
              <div class="text-xs text-gray-500">by User ID: {{ currency.CreatedBy }}</div>
            </div>
            <div *ngIf="currency.ModifiedDate">
              <div class="text-sm font-medium text-gray-600 mb-1">Last Modified</div>
              <div class="text-sm text-gray-900">{{ currency.ModifiedDate | date:'medium' }}</div>
              <div class="text-xs text-gray-500">by User ID: {{ currency.ModifiedBy }}</div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="border-t border-gray-200 pt-6 mt-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button 
                [routerLink]="['/masters/currencies', currency.lid, 'edit']"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Edit Currency
              </button>
              <button 
                *ngIf="!currency.IsBaseCurrency"
                (click)="deleteCurrency()"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Delete Currency
              </button>
            </div>
            <button 
              routerLink="/masters/currencies"
              class="text-gray-600 hover:text-gray-800 text-sm font-medium">
              Back to Currency List
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CurrencyDetailsComponent implements OnInit {
  currency: CurrencyMaster | null = null;
  isLoading = false;

  constructor(
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCurrency(id);
    }
  }

  loadCurrency(id: number): void {
    this.isLoading = true;
    this.currencyService.getCurrencyById(id).subscribe({
      next: (currency) => {
        this.currency = currency || null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading currency:', error);
        this.isLoading = false;
      }
    });
  }

  deleteCurrency(): void {
    if (!this.currency) return;

    if (this.currency.IsBaseCurrency) {
      alert('Cannot delete the base currency.');
      return;
    }

    if (confirm(`Are you sure you want to delete ${this.currency.CurrencyName}? This action cannot be undone.`)) {
      this.currencyService.deleteCurrency(this.currency.lid).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/masters/currencies']);
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

  goBack(): void {
    this.router.navigate(['/masters/currencies']);
  }
}
