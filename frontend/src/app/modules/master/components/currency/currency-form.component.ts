import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyMaster } from '../../models/currency.model';

@Component({
  selector: 'app-currency-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="page-title text-gray-900">
              {{ isEditMode ? 'Edit Currency' : 'Add New Currency' }}
            </h1>
            <p class="secondary-text text-gray-600 mt-1">
              {{ isEditMode ? 'Update currency information and exchange rate' : 'Create a new currency for multi-currency transactions' }}
            </p>
          </div>
          <button 
            type="button"
            (click)="goBack()"
            class="text-gray-600 hover:text-gray-800 px-3 py-1.5 text-sm font-medium">
            ← Back to List
          </button>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="currencyForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Currency Name -->
          <div>
            <label for="currencyName" class="component-header text-gray-700 mb-2">
              Currency Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currencyName"
              formControlName="CurrencyName"
              placeholder="e.g., US Dollar"
              class="w-full secondary-text px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              [class.border-red-300]="currencyForm.get('CurrencyName')?.invalid && currencyForm.get('CurrencyName')?.touched">
            <div *ngIf="currencyForm.get('CurrencyName')?.invalid && currencyForm.get('CurrencyName')?.touched" 
                 class="mt-1 text-sm text-red-600">
              Currency name is required
            </div>
          </div>

          <!-- Currency Code -->
          <div>
            <label for="currencyCode" class="label-text text-gray-700 mb-2">
              Currency Code <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currencyCode"
              formControlName="CurrencyCode"
              placeholder="e.g., USD"
              maxlength="3"
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono uppercase"
              [class.border-red-300]="currencyForm.get('CurrencyCode')?.invalid && currencyForm.get('CurrencyCode')?.touched">
            <div *ngIf="currencyForm.get('CurrencyCode')?.invalid && currencyForm.get('CurrencyCode')?.touched" 
                 class="mt-1 text-sm text-red-600">
              <span *ngIf="currencyForm.get('CurrencyCode')?.errors?.['required']">Currency code is required</span>
              <span *ngIf="currencyForm.get('CurrencyCode')?.errors?.['minlength'] || currencyForm.get('CurrencyCode')?.errors?.['maxlength']">Currency code must be exactly 3 characters</span>
            </div>
          </div>

          <!-- Currency Symbol -->
          <div>
            <label for="currencySymbol" class="label-text text-gray-700 mb-2">
              Currency Symbol <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currencySymbol"
              formControlName="CurrencySymbol"
              placeholder="e.g., $"
              maxlength="5"
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              [class.border-red-300]="currencyForm.get('CurrencySymbol')?.invalid && currencyForm.get('CurrencySymbol')?.touched">
            <div *ngIf="currencyForm.get('CurrencySymbol')?.invalid && currencyForm.get('CurrencySymbol')?.touched" 
                 class="mt-1 text-sm text-red-600">
              Currency symbol is required
            </div>
          </div>

          <!-- Exchange Rate -->
          <div>
            <label for="exchangeRate" class="label-text text-gray-700 mb-2">
              Exchange Rate 
              <span *ngIf="!currencyForm.get('IsBaseCurrency')?.value" class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="number"
                id="exchangeRate"
                formControlName="ExchangeRate"
                [placeholder]="currencyForm.get('IsBaseCurrency')?.value ? '1.0000 (Base Currency)' : 'e.g., 0.012'"
                step="0.0001"
                min="0"
                [readonly]="currencyForm.get('IsBaseCurrency')?.value"
                class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-right"
                [class.border-red-300]="currencyForm.get('ExchangeRate')?.invalid && currencyForm.get('ExchangeRate')?.touched"
                [class.bg-gray-50]="currencyForm.get('IsBaseCurrency')?.value">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">1 INR =</span>
              </div>
            </div>
            <div *ngIf="currencyForm.get('ExchangeRate')?.invalid && currencyForm.get('ExchangeRate')?.touched" 
                 class="mt-1 text-sm text-red-600">
              <span *ngIf="currencyForm.get('ExchangeRate')?.errors?.['required']">Exchange rate is required for foreign currencies</span>
              <span *ngIf="currencyForm.get('ExchangeRate')?.errors?.['min']">Exchange rate must be greater than 0</span>
            </div>
            <p *ngIf="!currencyForm.get('IsBaseCurrency')?.value" class="mt-1 text-xs text-gray-500">
              Enter the rate as: 1 INR = X {{ currencyForm.get('CurrencyCode')?.value || 'Currency' }}
            </p>
          </div>
        </div>

        <!-- Currency Type and Status -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Base Currency -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Currency Type</label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  formControlName="IsBaseCurrency"
                  (change)="onBaseCurrencyChange()"
                  style="accent-color: #2c4170;"
                  class="h-4 w-4 border-gray-300 rounded">
                <span class="ml-2 component-header text-gray-700">Set as Base Currency</span>
              </label>
              <div *ngIf="currencyForm.get('IsBaseCurrency')?.value" 
                   style="background-color: #e8f0ff; color: #2c4170;"
                   class="secondary-text p-2 rounded">
                ⚠️ Setting this as base currency will remove base status from all other currencies.
              </div>
            </div>
          </div>

          <!-- Status -->
          <div>
            <label class="block component-header text-gray-700 mb-3">Status</label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  formControlName="IsActive"
                  style="accent-color: #2c4170;"
                  class="h-4 w-4 border-gray-300 rounded">
                <span class="ml-2 component-header text-gray-700">Active</span>
              </label>
              <p class="text-xs text-gray-500">
                Only active currencies can be used in transactions
              </p>
            </div>
          </div>
        </div>

        <!-- Currency Preview -->
        <div *ngIf="currencyForm.valid" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="text-sm font-medium text-gray-900 mb-3">Currency Preview</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Display:</span>
              <span class="ml-2 font-medium">{{ currencyForm.get('CurrencySymbol')?.value }}100.00</span>
            </div>
            <div>
              <span class="text-gray-600">Full Name:</span>
              <span class="ml-2 font-medium">{{ currencyForm.get('CurrencyName')?.value }} ({{ currencyForm.get('CurrencyCode')?.value }})</span>
            </div>
            <div *ngIf="!currencyForm.get('IsBaseCurrency')?.value && currencyForm.get('ExchangeRate')?.value">
              <span class="text-gray-600">Conversion:</span>
              <span class="ml-2 font-medium">₹{{ getConversionAmount() }} = {{ currencyForm.get('CurrencySymbol')?.value }}100.00</span>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="border-t border-gray-200 pt-6">
          <div class="flex items-center justify-end space-x-3">
            <button
              type="button"
              (click)="goBack()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="currencyForm.invalid || isSubmitting"
              style="background-color: #2c4170;"
              class="px-4 py-2 component-header font-medium text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-400 disabled:cursor-not-allowed">
              <span *ngIf="isSubmitting">{{ isEditMode ? 'Updating...' : 'Creating...' }}</span>
              <span *ngIf="!isSubmitting">{{ isEditMode ? 'Update Currency' : 'Create Currency' }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class CurrencyFormComponent implements OnInit {
  currencyForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  currencyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currencyForm = this.createForm();
  }

  ngOnInit(): void {
    this.currencyId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.currencyId;

    if (this.isEditMode) {
      this.loadCurrency();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      CurrencyName: ['', [Validators.required]],
      CurrencyCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      CurrencySymbol: ['', [Validators.required]],
      ExchangeRate: [null, [Validators.min(0.0001)]],
      IsBaseCurrency: [false],
      IsActive: [true]
    });
  }

  loadCurrency(): void {
    if (this.currencyId) {
      this.currencyService.getCurrencyById(this.currencyId).subscribe({
        next: (currency) => {
          if (currency) {
            this.currencyForm.patchValue({
              CurrencyName: currency.CurrencyName,
              CurrencyCode: currency.CurrencyCode,
              CurrencySymbol: currency.CurrencySymbol,
              ExchangeRate: currency.ExchangeRate,
              IsBaseCurrency: currency.IsBaseCurrency,
              IsActive: currency.IsActive
            });
            this.updateExchangeRateValidation();
          }
        },
        error: (error) => {
          console.error('Error loading currency:', error);
          alert('Currency not found');
          this.goBack();
        }
      });
    }
  }

  onBaseCurrencyChange(): void {
    this.updateExchangeRateValidation();
  }

  updateExchangeRateValidation(): void {
    const isBaseCurrency = this.currencyForm.get('IsBaseCurrency')?.value;
    const exchangeRateControl = this.currencyForm.get('ExchangeRate');

    if (isBaseCurrency) {
      exchangeRateControl?.setValue(1.0);
      exchangeRateControl?.setValidators([]);
    } else {
      exchangeRateControl?.setValidators([Validators.required, Validators.min(0.0001)]);
    }
    
    exchangeRateControl?.updateValueAndValidity();
  }

  getConversionAmount(): string {
    const exchangeRate = this.currencyForm.get('ExchangeRate')?.value;
    if (exchangeRate) {
      return (100 / exchangeRate).toFixed(2);
    }
    return '0.00';
  }

  onSubmit(): void {
    if (this.currencyForm.valid) {
      this.isSubmitting = true;
      const formValue = this.currencyForm.value;

      // Ensure exchange rate is set correctly for base currency
      if (formValue.IsBaseCurrency) {
        formValue.ExchangeRate = 1.0;
      }

      const operation = this.isEditMode
        ? this.currencyService.updateCurrency(this.currencyId!, formValue)
        : this.currencyService.createCurrency(formValue);

      operation.subscribe({
        next: (result) => {
          if (result) {
            this.goBack();
          } else {
            alert('Operation failed');
            this.isSubmitting = false;
          }
        },
        error: (error) => {
          console.error('Error saving currency:', error);
          alert('Error saving currency');
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/masters/currencies']);
  }
}
