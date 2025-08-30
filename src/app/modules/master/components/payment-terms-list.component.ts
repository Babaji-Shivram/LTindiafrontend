import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentTermService } from '../services/payment-term.service';
import { PaymentTerm } from '../models/payment-term.model';

@Component({
  selector: 'app-payment-terms-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="page-title text-gray-900 mb-2">Payment Terms</h1>
        <p class="text-gray-600">Manage payment terms and conditions</p>
      </div>

      <!-- Add Button -->
      <div class="mb-6">
        <button
          (click)="addPaymentTerm()"
          class="bg-[#2c4170] btn-text-primary px-4 py-2 rounded-lg hover:bg-[#1e2d4f] transition-colors duration-200 inline-flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Payment Term
        </button>
      </div>

      <!-- Payment Terms Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div class="grid grid-cols-6 gap-4 text-left">
            <div class="table-header uppercase tracking-wider">Code</div>
            <div class="table-header uppercase tracking-wider">Name</div>
            <div class="table-header uppercase tracking-wider">Type</div>
            <div class="table-header uppercase tracking-wider">Days</div>
            <div class="table-header uppercase tracking-wider">Status</div>
            <div class="table-header uppercase tracking-wider">Actions</div>
          </div>
        </div>

        <!-- Table Body -->
        <div class="divide-y divide-gray-200">
          <div 
            *ngFor="let paymentTerm of paymentTerms" 
            class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div class="grid grid-cols-6 gap-4 items-center">
              <!-- Code -->
              <div class="table-cell font-medium text-gray-900">
                {{ paymentTerm.code }}
              </div>
              
              <!-- Name -->
              <div>
                <div class="table-cell font-medium text-gray-900">{{ paymentTerm.name }}</div>
                <div class="text-xs text-gray-500">{{ paymentTerm.description }}</div>
              </div>
              
              <!-- Type -->
              <div class="text-sm text-gray-700">
                {{ paymentTerm.type }}
              </div>
              
              <!-- Days -->
              <div class="text-sm text-gray-700">
                <div>Net: {{ paymentTerm.daysNet }} days</div>
                <div *ngIf="paymentTerm.discountDays" class="text-xs text-gray-500">
                  Discount: {{ paymentTerm.discountPercentage }}% in {{ paymentTerm.discountDays }} days
                </div>
              </div>
              
              <!-- Status -->
              <div>
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  [class]="paymentTerm.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'"
                >
                  {{ paymentTerm.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
              
              <!-- Actions -->
              <div class="flex items-center gap-2">
                <button
                  (click)="viewPaymentTerm(paymentTerm.id)"
                  class="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors duration-200"
                  title="View"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button
                  (click)="editPaymentTerm(paymentTerm.id)"
                  class="p-1 rounded transition-colors duration-200 hover:opacity-75"
                  style="color: #2c4170;"
                  title="Edit"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  (click)="deletePaymentTerm(paymentTerm.id)"
                  class="text-red-600 hover:text-red-700 p-1 rounded transition-colors duration-200"
                  title="Delete"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="paymentTerms.length === 0" class="px-6 py-12 text-center">
          <div class="text-gray-500 mb-4">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-1">No payment terms found</h3>
          <p class="text-sm text-gray-500 mb-4">Get started by creating your first payment term.</p>
          <button
            (click)="addPaymentTerm()"
            class="bg-[#2c4170] btn-text-primary px-4 py-2 rounded-lg hover:bg-[#1e2d4f] transition-colors duration-200"
          >
            Add Payment Term
          </button>
        </div>
      </div>
    </div>
  `
})
export class PaymentTermsListComponent implements OnInit {
  paymentTerms: PaymentTerm[] = [];

  constructor(
    private paymentTermService: PaymentTermService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPaymentTerms();
  }

  loadPaymentTerms(): void {
    this.paymentTermService.getAllPaymentTerms().subscribe(
      paymentTerms => this.paymentTerms = paymentTerms
    );
  }

  addPaymentTerm(): void {
    this.router.navigate(['/masters/payment-terms/new']);
  }

  editPaymentTerm(id: number): void {
    this.router.navigate(['/masters/payment-terms', id, 'edit']);
  }

  viewPaymentTerm(id: number): void {
    console.log('View payment term:', id);
    // Navigate to payment term details or show modal
  }

  deletePaymentTerm(id: number): void {
    if (confirm('Are you sure you want to delete this payment term?')) {
      this.paymentTermService.deletePaymentTerm(id).subscribe(
        success => {
          if (success) {
            this.loadPaymentTerms();
          }
        }
      );
    }
  }
}
