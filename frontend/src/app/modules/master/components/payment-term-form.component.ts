import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentTermService } from '../services/payment-term.service';
import { PaymentTerm } from '../models/payment-term.model';

@Component({
  selector: 'app-payment-term-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="component-header text-[#2c4170]">{{ isEditMode ? 'Edit Payment Term' : 'Add New Payment Term' }}</h1>
          <p class="text-xs text-gray-600 mt-1">{{ isEditMode ? 'Update payment term information' : 'Create a new payment term configuration' }}</p>
        </div>
        <button 
          (click)="onCancel()"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]">
          <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to List
        </button>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <form (ngSubmit)="onSubmit()" #paymentTermForm="ngForm" class="p-6 space-y-6">
          
          <!-- Basic Information -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Name -->
              <div>
                <label for="name" class="block text-xs font-medium text-gray-700 mb-1">Payment Term Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  [(ngModel)]="paymentTerm.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter payment term name"
                >
              </div>

              <!-- Code -->
              <div>
                <label for="code" class="block text-xs font-medium text-gray-700 mb-1">Payment Term Code *</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  [(ngModel)]="paymentTerm.code"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter payment term code"
                >
              </div>

              <!-- Type -->
              <div>
                <label for="type" class="block text-xs font-medium text-gray-700 mb-1">Payment Type *</label>
                <select
                  id="type"
                  name="type"
                  [(ngModel)]="paymentTerm.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                >
                  <option value="">Select payment type</option>
                  <option value="Net">Net</option>
                  <option value="EOM">End of Month</option>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Advance">Advance</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <!-- Days Net -->
              <div>
                <label for="daysNet" class="block text-xs font-medium text-gray-700 mb-1">Net Days *</label>
                <input
                  type="number"
                  id="daysNet"
                  name="daysNet"
                  [(ngModel)]="paymentTerm.daysNet"
                  required
                  min="0"
                  max="365"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter net days"
                >
              </div>
            </div>
          </div>

          <!-- Discount Information -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Discount Information (Optional)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Discount Days -->
              <div>
                <label for="discountDays" class="block text-xs font-medium text-gray-700 mb-1">Discount Days</label>
                <input
                  type="number"
                  id="discountDays"
                  name="discountDays"
                  [(ngModel)]="paymentTerm.discountDays"
                  min="0"
                  max="365"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter discount days"
                >
              </div>

              <!-- Discount Percentage -->
              <div>
                <label for="discountPercentage" class="block text-xs font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  [(ngModel)]="paymentTerm.discountPercentage"
                  min="0"
                  max="100"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter discount percentage"
                >
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Additional Information</h3>
            
            <!-- Description -->
            <div class="mb-4">
              <label for="description" class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                [(ngModel)]="paymentTerm.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170] resize-none"
                placeholder="Enter payment term description"
              ></textarea>
            </div>

            <!-- Active Status -->
            <div class="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                [(ngModel)]="paymentTerm.isActive"
                class="h-4 w-4 text-[#2c4170] focus:ring-[#2c4170] border-gray-300 rounded"
              >
              <label for="isActive" class="ml-2 text-xs font-medium text-gray-700">
                Active Payment Term
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              (click)="onCancel()"
              class="px-4 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!paymentTermForm.form.valid"
              class="px-4 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-[#2c4170] hover:bg-[#1e2d4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ isEditMode ? 'Update Payment Term' : 'Create Payment Term' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class PaymentTermFormComponent implements OnInit {
  paymentTerm: Partial<PaymentTerm> = {
    name: '',
    code: '',
    description: '',
    daysNet: 0,
    discountDays: 0,
    discountPercentage: 0,
    type: 'Net',
    isActive: true,
    createdBy: 1
  };

  isEditMode = false;
  paymentTermId?: number;

  constructor(
    private paymentTermService: PaymentTermService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.paymentTermId = +params['id'];
        this.loadPaymentTerm();
      }
    });
  }

  loadPaymentTerm(): void {
    if (this.paymentTermId) {
      this.paymentTermService.getPaymentTermById(this.paymentTermId).subscribe(
        paymentTerm => {
          if (paymentTerm) {
            this.paymentTerm = paymentTerm;
          }
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.paymentTermId) {
      this.paymentTermService.updatePaymentTerm(this.paymentTermId, this.paymentTerm).subscribe(
        () => {
          this.router.navigate(['/masters/payment-terms']);
        }
      );
    } else {
      this.paymentTermService.createPaymentTerm(this.paymentTerm as Omit<PaymentTerm, 'id' | 'createdAt' | 'updatedAt'>).subscribe(
        () => {
          this.router.navigate(['/masters/payment-terms']);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/masters/payment-terms']);
  }
}
