import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CountryMaster } from '../../models/country.model';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <button (click)="goBack()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h3 class="component-header text-gray-900">
              {{ isEditMode ? 'Edit Country' : 'Add New Country' }}
            </h3>
            <p class="text-xs text-gray-600">
              {{ isEditMode ? 'Update country information and settings' : 'Enter country details and default currency' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <form (ngSubmit)="onSubmit()" #countryForm="ngForm" class="space-y-6">
          
          <!-- Basic Information Section -->
          <div>
            <h4 class="form-section-header text-gray-900 mb-4 border-b border-gray-200 pb-2">Basic Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Country Name -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Country Name *</label>
                <input
                  type="text"
                  [(ngModel)]="country.CountryName"
                  name="CountryName"
                  required
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
                  placeholder="Enter country name (e.g., India, United States)">
              </div>

              <!-- Country Code -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Country Code *</label>
                <input
                  type="text"
                  [(ngModel)]="country.CountryCode"
                  name="CountryCode"
                  required
                  maxlength="3"
                  pattern="[A-Z]{2,3}"
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs uppercase"
                  placeholder="Enter ISO code (e.g., IN, US, GB)">
                <p class="text-xs text-gray-500 mt-1">ISO 2-3 letter country code</p>
              </div>

              <!-- Currency -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Default Currency *</label>
                <select
                  [(ngModel)]="country.Currency"
                  name="Currency"
                  required
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
                  <option value="">Select Currency</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="CNY">CNY - Chinese Yuan</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="KWD">KWD - Kuwaiti Dinar</option>
                  <option value="QAR">QAR - Qatari Riyal</option>
                  <option value="OMR">OMR - Omani Rial</option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Status *</label>
                <select
                  [(ngModel)]="country.IsActive"
                  name="IsActive"
                  required
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
                  <option value="">Select Status</option>
                  <option [value]="true">Active</option>
                  <option [value]="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div *ngIf="country.CountryName || country.CountryCode || country.Currency" class="border-t border-gray-200 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Preview</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                  <span class="text-xs font-medium text-gray-700">{{ country.CountryCode || '?' }}</span>
                </div>
                <div>
                  <div class="table-cell font-medium text-gray-900">{{ country.CountryName || 'Country Name' }}</div>
                  <div class="flex items-center space-x-2 mt-1">
                    <span *ngIf="country.Currency" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ country.Currency }}
                    </span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          [class]="country.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ country.IsActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              (click)="goBack()"
              class="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!countryForm.form.valid || isSubmitting"
              style="background-color: #2c4170;"
              class="px-4 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg *ngIf="isSubmitting" class="w-3 h-3 inline mr-1 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
              </svg>
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Country' : 'Create Country') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CountryFormComponent implements OnInit {
  country: Partial<CountryMaster> = {
    CountryName: '',
    CountryCode: '',
    Currency: '',
    IsActive: true
  };

  isEditMode = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.loadCountry(Number(id));
    }
  }

  loadCountry(id: number) {
    this.countryService.getCountryById(id).subscribe(country => {
      if (country) {
        this.country = { ...country };
      }
    });
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;

    if (this.isEditMode && this.country.lid) {
      this.countryService.updateCountry(this.country.lid, this.country).subscribe({
        next: (result) => {
          if (result) {
            this.router.navigate(['/masters/countries', result.lid]);
          }
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.countryService.createCountry(this.country).subscribe({
        next: (result) => {
          this.router.navigate(['/masters/countries', result.lid]);
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack() {
    if (this.isEditMode && this.country.lid) {
      this.router.navigate(['/masters/countries', this.country.lid]);
    } else {
      this.router.navigate(['/masters/countries']);
    }
  }
}
