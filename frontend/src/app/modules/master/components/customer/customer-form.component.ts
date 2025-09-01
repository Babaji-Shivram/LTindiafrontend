import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title text-gray-900">
            {{ isEditMode ? 'Edit' : 'Add' }} Customer
          </h1>
          <p class="text-base text-gray-600">
            {{ isEditMode ? 'Update customer information' : 'Create a new customer record' }}
          </p>
        </div>
        <button 
          routerLink="/masters/customers"
          class="text-gray-600 hover:text-gray-800">
          ← Back to Customers
        </button>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
          <!-- Basic Information -->
          <div class="mb-8">
            <h3 class="section-header text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Customer Name -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  formControlName="custName"
                  placeholder="Enter customer name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('custName')?.invalid && customerForm.get('custName')?.touched">
                <div *ngIf="customerForm.get('custName')?.invalid && customerForm.get('custName')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  Customer name is required
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="Enter email address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('email')?.invalid && customerForm.get('email')?.touched">
                <div *ngIf="customerForm.get('email')?.invalid && customerForm.get('email')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  <span *ngIf="customerForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="customerForm.get('email')?.errors?.['email']">Invalid email format</span>
                </div>
              </div>

              <!-- Website -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  formControlName="website"
                  placeholder="Enter website URL"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="mb-8">
            <h3 class="section-header text-gray-900 mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Contact Person -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  formControlName="contactPerson"
                  placeholder="Enter contact person name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('contactPerson')?.invalid && customerForm.get('contactPerson')?.touched">
                <div *ngIf="customerForm.get('contactPerson')?.invalid && customerForm.get('contactPerson')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  Contact person is required
                </div>
              </div>

              <!-- Mobile Number -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  formControlName="mobileNo"
                  placeholder="Enter mobile number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('mobileNo')?.invalid && customerForm.get('mobileNo')?.touched">
                <div *ngIf="customerForm.get('mobileNo')?.invalid && customerForm.get('mobileNo')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  Mobile number is required
                </div>
              </div>

              <!-- Contact Number -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Landline Number
                </label>
                <input
                  type="tel"
                  formControlName="contactNo"
                  placeholder="Enter landline number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="mb-8">
            <h3 class="section-header text-gray-900 mb-4">Address Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Address -->
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  formControlName="address"
                  rows="3"
                  placeholder="Enter complete address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent resize-none"
                  [class.border-red-500]="customerForm.get('address')?.invalid && customerForm.get('address')?.touched">
                </textarea>
                <div *ngIf="customerForm.get('address')?.invalid && customerForm.get('address')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  Address is required
                </div>
              </div>

              <!-- City -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  formControlName="city"
                  placeholder="Enter city"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('city')?.invalid && customerForm.get('city')?.touched">
                <div *ngIf="customerForm.get('city')?.invalid && customerForm.get('city')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  City is required
                </div>
              </div>

              <!-- State -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  formControlName="state"
                  placeholder="Enter state"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('state')?.invalid && customerForm.get('state')?.touched">
                <div *ngIf="customerForm.get('state')?.invalid && customerForm.get('state')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  State is required
                </div>
              </div>

              <!-- Country -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  formControlName="country"
                  placeholder="Enter country"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('country')?.invalid && customerForm.get('country')?.touched">
                <div *ngIf="customerForm.get('country')?.invalid && customerForm.get('country')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  Country is required
                </div>
              </div>

              <!-- PIN Code -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  formControlName="pincode"
                  placeholder="Enter PIN code"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                  [class.border-red-500]="customerForm.get('pincode')?.invalid && customerForm.get('pincode')?.touched">
                <div *ngIf="customerForm.get('pincode')?.invalid && customerForm.get('pincode')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  PIN code is required
                </div>
              </div>
            </div>
          </div>

          <!-- Business Information -->
          <div class="mb-8">
            <h3 class="section-header text-gray-900 mb-4">Business Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- GST Number -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  formControlName="gstNo"
                  placeholder="Enter GST number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              </div>

              <!-- PAN Number -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  PAN Number
                </label>
                <input
                  type="text"
                  formControlName="panNo"
                  placeholder="Enter PAN number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              </div>

              <!-- Credit Limit -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Credit Limit (₹)
                </label>
                <input
                  type="number"
                  formControlName="creditLimit"
                  placeholder="Enter credit limit"
                  min="0"
                  step="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              </div>

              <!-- Credit Days -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Credit Days
                </label>
                <input
                  type="number"
                  formControlName="creditDays"
                  placeholder="Enter credit days"
                  min="0"
                  step="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              routerLink="/masters/customers"
              class="px-6 py-2 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="customerForm.invalid || saving"
              class="px-6 py-2 bg-[#2c4170] text-white rounded-md text-base font-medium hover:bg-[#1e2d4f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span *ngIf="saving">Saving...</span>
              <span *ngIf="!saving">{{ isEditMode ? 'Update' : 'Create' }} Customer</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Loading Overlay -->
      <div *ngIf="loading" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="flex items-center space-x-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2c4170]"></div>
            <span>Loading customer...</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      custName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contactPerson: ['', [Validators.required, Validators.minLength(2)]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      contactNo: [''],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      website: [''],
      gstNo: [''],
      panNo: [''],
      creditLimit: [0, [Validators.min(0)]],
      creditDays: [0, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.customerId = +params['id'];
        this.loadCustomer();
      }
    });
  }

  loadCustomer(): void {
    if (!this.customerId) return;

    this.loading = true;
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        if (customer) {
          this.customerForm.patchValue({
            custName: customer.custName,
            email: customer.email,
            contactPerson: customer.contactPerson,
            mobileNo: customer.mobileNo,
            contactNo: customer.contactNo,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            country: customer.country,
            pincode: customer.pincode,
            website: customer.website,
            gstNo: customer.gstNo,
            panNo: customer.panNo,
            creditLimit: customer.creditLimit,
            creditDays: customer.creditDays
          });
        } else {
          this.router.navigate(['/masters/customers']);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.router.navigate(['/masters/customers']);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.saving = true;
      const formValue = this.customerForm.value;

      const customerData: Omit<Customer, 'lid' | 'dEntry' | 'lUser' | 'bDel'> = {
        custName: formValue.custName,
        email: formValue.email,
        contactPerson: formValue.contactPerson,
        mobileNo: formValue.mobileNo,
        contactNo: formValue.contactNo || '',
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        country: formValue.country,
        pincode: formValue.pincode,
        website: formValue.website || '',
        gstNo: formValue.gstNo || '',
        panNo: formValue.panNo || '',
        creditLimit: +formValue.creditLimit,
        creditDays: +formValue.creditDays
      };

      const operation = this.isEditMode
        ? this.customerService.updateCustomer(this.customerId!, customerData)
        : this.customerService.createCustomer(customerData);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/masters/customers']);
        },
        error: (error) => {
          console.error('Error saving customer:', error);
          this.saving = false;
        }
      });
    }
  }
}
