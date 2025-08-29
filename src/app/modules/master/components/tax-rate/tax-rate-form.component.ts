import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface TaxRate {
  id: number;
  name: string;
  code: string;
  rate: number;
  type: 'GST' | 'VAT' | 'Service Tax' | 'Customs' | 'Other';
  description: string;
  category: 'Standard' | 'Reduced' | 'Zero' | 'Exempt';
  applicableFrom: Date;
  applicableTo?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-tax-rate-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="page-title">{{ isEditMode ? 'Edit Tax Rate' : 'Add New Tax Rate' }}</h1>
          <p class="secondary-text">{{ isEditMode ? 'Update tax rate information' : 'Create a new tax rate configuration' }}</p>
        </div>
        <button 
          [routerLink]="'/masters/tax-rate'"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]">
          <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to List
        </button>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <form (ngSubmit)="onSubmit()" #taxRateForm="ngForm" class="p-6 space-y-6">
          
          <!-- Basic Information -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label for="name" class="block text-xs font-medium text-gray-700 mb-1">Tax Rate Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  [(ngModel)]="taxRate.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter tax rate name">
              </div>

              <div>
                <label for="code" class="block text-xs font-medium text-gray-700 mb-1">Tax Code *</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  [(ngModel)]="taxRate.code"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter tax code">
              </div>

              <div>
                <label for="type" class="block text-xs font-medium text-gray-700 mb-1">Tax Type *</label>
                <select
                  id="type"
                  name="type"
                  [(ngModel)]="taxRate.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]">
                  <option value="">Select tax type</option>
                  <option value="GST">GST</option>
                  <option value="VAT">VAT</option>
                  <option value="Service Tax">Service Tax</option>
                  <option value="Customs">Customs</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label for="category" class="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                <select
                  id="category"
                  name="category"
                  [(ngModel)]="taxRate.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]">
                  <option value="">Select category</option>
                  <option value="Standard">Standard</option>
                  <option value="Reduced">Reduced</option>
                  <option value="Zero">Zero</option>
                  <option value="Exempt">Exempt</option>
                </select>
              </div>

              <div>
                <label for="rate" class="block text-xs font-medium text-gray-700 mb-1">Tax Rate (%) *</label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  [(ngModel)]="taxRate.rate"
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter tax rate percentage">
              </div>

              <div>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    [(ngModel)]="taxRate.isActive"
                    class="h-4 w-4 text-[#2c4170] focus:ring-[#2c4170] border-gray-300 rounded">
                  <span class="ml-2 text-xs text-gray-700">Active</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Validity Period -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Validity Period</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label for="applicableFrom" class="block text-xs font-medium text-gray-700 mb-1">Applicable From *</label>
                <input
                  type="date"
                  id="applicableFrom"
                  name="applicableFrom"
                  [(ngModel)]="applicableFromStr"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]">
              </div>

              <div>
                <label for="applicableTo" class="block text-xs font-medium text-gray-700 mb-1">Applicable To</label>
                <input
                  type="date"
                  id="applicableTo"
                  name="applicableTo"
                  [(ngModel)]="applicableToStr"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]">
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Description</h3>
            <div>
              <label for="description" class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                [(ngModel)]="taxRate.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                placeholder="Enter tax rate description"></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              [routerLink]="'/masters/tax-rate'"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!taxRateForm.form.valid"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-[#2c4170] hover:bg-[#1e2d4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170] disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isEditMode ? 'Update Tax Rate' : 'Create Tax Rate' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class TaxRateFormComponent implements OnInit {
  taxRate: Partial<TaxRate> = {
    name: '',
    code: '',
    rate: 0,
    type: undefined,
    description: '',
    category: undefined,
    isActive: true
  };

  applicableFromStr = '';
  applicableToStr = '';
  isEditMode = false;
  taxRateId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.taxRateId = parseInt(id, 10);
      this.loadTaxRate();
    } else {
      // Set default applicable from date to today
      this.applicableFromStr = new Date().toISOString().split('T')[0];
    }
  }

  loadTaxRate() {
    // TODO: Load tax rate data from service
    // For now, use mock data
    const mockTaxRate: TaxRate = {
      id: this.taxRateId!,
      name: 'GST 18%',
      code: 'GST18',
      rate: 18,
      type: 'GST',
      description: 'Standard GST rate for most goods and services',
      category: 'Standard',
      applicableFrom: new Date('2024-01-01'),
      applicableTo: undefined,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.taxRate = mockTaxRate;
    this.applicableFromStr = mockTaxRate.applicableFrom.toISOString().split('T')[0];
    if (mockTaxRate.applicableTo) {
      this.applicableToStr = mockTaxRate.applicableTo.toISOString().split('T')[0];
    }
  }

  onSubmit() {
    if (!this.taxRate.name || !this.taxRate.code || !this.taxRate.type || !this.taxRate.category) {
      return;
    }

    // Convert date strings to Date objects
    this.taxRate.applicableFrom = new Date(this.applicableFromStr);
    if (this.applicableToStr) {
      this.taxRate.applicableTo = new Date(this.applicableToStr);
    }

    // TODO: Save tax rate data using service
    console.log('Saving tax rate:', this.taxRate);

    // Navigate back to list
    this.router.navigate(['/masters/tax-rate']);
  }
}
