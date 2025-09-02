import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { 
  FrontendUser, 
  FrontendRole, 
  CreateUserRequest, 
  UpdateUserRequest 
} from '../../../../models/database.interfaces';
import { Customer, CustomerListResponse } from '../../../../models/customer.interfaces';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="section-header text-gray-900">
            {{ isReadOnlyMode ? 'User Details' : (isEditMode ? 'Edit User' : 'Create New User') }}
            <span *ngIf="isReadOnlyMode" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-3">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              Read-Only View
            </span>
          </h1>
          <p class="text-sm text-gray-600">
            {{ isReadOnlyMode ? 'View user information and permissions' : (isEditMode ? 'Update user information and permissions' : 'Add a new user to the system') }}
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <button [routerLink]="['/identity/users']" class="text-gray-600 hover:text-gray-800 input-text px-4 py-2 border border-gray-300 rounded font-medium">
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            Back to Users
          </button>
          <button *ngIf="isReadOnlyMode" 
                  (click)="enableEditMode()" 
                  style="background-color: #2c4170;" 
                  class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            Edit User
          </button>
        </div>
      </div>

      <!-- User Form -->
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">User Authentication</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Username -->
            <div>
              <label class="label-text text-gray-700 mb-1">Username *</label>
              <input type="text" 
                     formControlName="userName"
                     [class]="isReadOnlyMode ? 'w-full input-text px-3 py-2 border border-gray-200 rounded bg-gray-50 text-gray-700' : 'w-full input-text px-3 py-2 border border-gray-300 rounded'"
                     placeholder="Enter username">
              <div *ngIf="userForm.get('userName')?.invalid && userForm.get('userName')?.touched" 
                   class="error-text mt-1">
                Username is required
              </div>
            </div>

            <!-- User Type -->
            <div>
              <label class="label-text text-gray-700 mb-1">User Type *</label>
              <select formControlName="userType"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option *ngFor="let type of userTypes" [value]="type.value">
                  {{ type.label }}
                </option>
              </select>
              <div *ngIf="userForm.get('userType')?.invalid && userForm.get('userType')?.touched" 
                   class="error-text mt-1">
                User type is required
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="label-text text-gray-700 mb-1">Password {{ !isEditMode ? '*' : '(Optional)' }}</label>
              <input type="password" 
                     formControlName="password"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="{{ isEditMode ? 'Leave blank to keep current password' : 'Enter password' }}">
              <div *ngIf="userForm.get('password')?.invalid && userForm.get('password')?.touched" 
                   class="error-text mt-1">
                <span *ngIf="userForm.get('password')?.errors?.['required']">Password is required</span>
                <span *ngIf="userForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</span>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="label-text text-gray-700 mb-1">Confirm Password {{ !isEditMode ? '*' : '(Optional)' }}</label>
              <input type="password" 
                     formControlName="confirmPassword"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="{{ isEditMode ? 'Confirm new password if changing' : 'Confirm password' }}">
              <div *ngIf="userForm.get('confirmPassword')?.invalid && userForm.get('confirmPassword')?.touched" 
                   class="error-text mt-1">
                Passwords do not match
              </div>
            </div>

            <!-- Password Reset Required -->
            <div>
              <label class="label-text text-gray-700 mb-1">Password Reset Required</label>
              <div class="space-y-3">
                <div class="flex items-center space-x-4">
                  <label class="flex items-center">
                    <input type="radio" 
                           formControlName="passwordResetRequired"
                           [value]="true"
                           class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                    <span class="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" 
                           formControlName="passwordResetRequired"
                           [value]="false"
                           class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                    <span class="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                <div *ngIf="userForm.get('passwordResetRequired')?.value === true" class="mt-2">
                  <label class="label-text text-gray-700 mb-1">Reset after (days)</label>
                  <input type="number" 
                         formControlName="passwordResetDays"
                         class="w-24 input-text px-3 py-2 border border-gray-300 rounded"
                         placeholder="30"
                         min="1"
                         max="365">
                </div>
              </div>
            </div>

            <!-- Status -->
            <div>
              <label class="label-text text-gray-700 mb-1">Status *</label>
              <select formControlName="status"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Employee Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Employee Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Employee Name -->
            <div>
              <label class="label-text text-gray-700 mb-1">Employee Name *</label>
              <input type="text" 
                     formControlName="empName"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="Enter full name">
              <div *ngIf="userForm.get('empName')?.invalid && userForm.get('empName')?.touched" 
                   class="error-text mt-1">
                Employee name is required
              </div>
            </div>

            <!-- Employee Code -->
            <div>
              <label class="label-text text-gray-700 mb-1">Employee Code</label>
              <input type="text" 
                     formControlName="empCode"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="Enter employee code">
            </div>

            <!-- Email -->
            <div>
              <label class="label-text text-gray-700 mb-1">Email *</label>
              <input type="email" 
                     formControlName="email"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="Enter email address">
              <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" 
                   class="error-text mt-1">
                <span *ngIf="userForm.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email</span>
              </div>
            </div>

            <!-- Mobile -->
            <div>
              <label class="label-text text-gray-700 mb-1">Mobile Number *</label>
              <input type="tel" 
                     formControlName="mobile"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="Enter mobile number">
              <div *ngIf="userForm.get('mobile')?.invalid && userForm.get('mobile')?.touched" 
                   class="error-text mt-1">
                Mobile number is required
              </div>
            </div>

            <!-- Address -->
            <div class="md:col-span-2">
              <label class="label-text text-gray-700 mb-1">Address</label>
              <textarea 
                     formControlName="address"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     rows="3"
                     placeholder="Enter address"></textarea>
            </div>
          </div>
        </div>

        <!-- Professional Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Department & Role Assignment</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Department -->
            <div>
              <label class="label-text text-gray-700 mb-1">Department</label>
              <select formControlName="deptId"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option value="">Select Department</option>
                <option *ngFor="let dept of availableDepartments" [value]="dept.id">
                  {{ dept.name }}
                </option>
              </select>
            </div>

            <!-- Division -->
            <div>
              <label class="label-text text-gray-700 mb-1">Division</label>
              <select formControlName="divisionId"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option value="">Select Division</option>
                <option *ngFor="let division of availableDivisions" [value]="division.id">
                  {{ division.name }}
                </option>
              </select>
            </div>

            <!-- Role -->
            <div>
              <label class="label-text text-gray-700 mb-1">Role *</label>
              <select formControlName="roleId"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option value="">Select Role</option>
                <option *ngFor="let role of availableRoles" [value]="role.id">
                  {{ role.name }} - {{ role.description }}
                </option>
              </select>
              <div *ngIf="userForm.get('roleId')?.invalid && userForm.get('roleId')?.touched" 
                   class="error-text mt-1">
                Role is required
              </div>
            </div>

            <!-- Legacy Position Field -->
            <div>
              <label class="label-text text-gray-700 mb-1">Position/Title</label>
              <input type="text" 
                     formControlName="position"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="Enter job position">
            </div>

            <!-- Branch Locations -->
            <div class="col-span-2">
              <label class="label-text text-gray-700 mb-2">Branch Locations</label>
              <div class="space-y-3">
                <!-- Selected Branches Display -->
                <div *ngIf="selectedBranches.length > 0" class="space-y-2">
                  <div class="flex flex-wrap gap-2">
                    <span *ngFor="let branchId of selectedBranches" 
                          class="inline-flex items-center px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full border">
                      {{ getBranchDisplayName(branchId) }}
                      <button type="button" (click)="removeBranch(branchId)" 
                              [disabled]="isReadOnlyMode"
                              class="ml-2 text-purple-600 hover:text-red-600 font-bold text-lg leading-none disabled:text-gray-400 disabled:cursor-not-allowed">×</button>
                    </span>
                  </div>
                  <div class="text-xs text-gray-600">{{ selectedBranches.length }} branch(es) selected</div>
                </div>
                
                <!-- Branch Selection Controls -->
                <div class="border rounded-lg p-3 bg-gray-50">
                  <div class="flex gap-2 mb-2">
                    <select [(ngModel)]="selectedBranchId" 
                            [ngModelOptions]="{standalone: true}"
                            class="flex-1 input-text px-3 py-2 border border-gray-300 rounded text-sm"
                            [disabled]="availableBranchesForSelection.length === 0">
                      <option value="">{{ availableBranchesForSelection.length > 0 ? 'Select Branch to Add' : 'All branches selected' }}</option>
                      <option *ngFor="let branch of availableBranchesForSelection" [value]="branch.id">
                        {{ branch.name }} ({{ branch.code }}) - {{ branch.city }}
                      </option>
                    </select>
                    <button type="button" (click)="addBranch()" 
                            [disabled]="!selectedBranchId || isReadOnlyMode"
                            class="px-4 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                      Add
                    </button>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <button type="button" (click)="selectAllBranches()" 
                            [disabled]="availableBranchesForSelection.length === 0 || isReadOnlyMode"
                            class="text-sm text-purple-600 hover:text-purple-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed">
                      Select All Branches
                    </button>
                    <button type="button" (click)="clearAllBranches()" 
                            [disabled]="selectedBranches.length === 0 || isReadOnlyMode"
                            class="text-sm text-red-600 hover:text-red-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed">
                      Clear All
                    </button>
                  </div>
                </div>
                
                <div class="text-xs text-gray-500">
                  * Select multiple branches for this user. Customers will be filtered based on branch cities.
                </div>
              </div>
            </div>

            <!-- Customer -->
            <div class="col-span-2">
              <label class="label-text text-gray-700 mb-2">Customers</label>
              <div class="space-y-3">
                <!-- Selected Customers Display -->
                <div *ngIf="selectedCustomers.length > 0" class="space-y-2">
                  <div class="flex flex-wrap gap-2">
                    <span *ngFor="let customerId of selectedCustomers" 
                          class="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full border">
                      {{ getCustomerDisplayName(customerId) }}
                      <span class="ml-1 text-blue-600">({{ getCustomerCity(customerId) }})</span>
                      <button type="button" (click)="removeCustomer(customerId)" 
                              [disabled]="isReadOnlyMode"
                              class="ml-2 text-blue-600 hover:text-red-600 font-bold text-lg leading-none disabled:text-gray-400 disabled:cursor-not-allowed">×</button>
                    </span>
                  </div>
                  <div class="text-xs text-gray-600">{{ selectedCustomers.length }} customer(s) selected</div>
                </div>
                
                <!-- Customer Selection Controls -->
                <div class="border rounded-lg p-3 bg-gray-50">
                  <div class="flex gap-2 mb-2">
                    <select [(ngModel)]="selectedCustomerId" 
                            [ngModelOptions]="{standalone: true}"
                            class="flex-1 input-text px-3 py-2 border border-gray-300 rounded text-sm"
                            [disabled]="availableCustomersForSelection.length === 0">
                      <option value="">{{ getCustomerDropdownPlaceholder() }}</option>
                      <option *ngFor="let customer of availableCustomersForSelection" [value]="customer.lid">
                        {{ customer.custName }} - {{ customer.city }}
                      </option>
                    </select>
                    <button type="button" (click)="addCustomer()" 
                            [disabled]="!selectedCustomerId || isReadOnlyMode"
                            class="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                      Add
                    </button>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <button type="button" (click)="selectAllCustomers()" 
                            [disabled]="availableCustomersForSelection.length === 0 || isReadOnlyMode"
                            class="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed">
                      Select All Available Customers
                    </button>
                    <button type="button" (click)="clearAllCustomers()" 
                            [disabled]="selectedCustomers.length === 0 || isReadOnlyMode"
                            class="text-sm text-red-600 hover:text-red-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed">
                      Clear All
                    </button>
                  </div>
                </div>
                
                <div class="text-xs text-gray-500">
                  * Customers are automatically filtered based on selected branch cities: {{ getSelectedBranchCities().join(', ') || 'No branches selected' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Required Fields -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Additional Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- FA Ledger Code -->
            <div>
              <label class="label-text text-gray-700 mb-1">FA Ledger Code</label>
              <input type="text" 
                     formControlName="faLedgerCode"
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
                     placeholder="Enter FA ledger code">
            </div>

            <!-- CRM Reporting Manager -->
            <div>
              <label class="label-text text-gray-700 mb-1">CRM Reporting Manager</label>
              <select formControlName="crmReportingManager"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option value="">Select CRM Reporting Manager</option>
                <option *ngFor="let manager of availableCrmManagers" [value]="manager.id">
                  {{ manager.name }} - {{ manager.designation }}
                </option>
              </select>
            </div>

            <!-- Upload Signature Image -->
            <div>
              <label class="label-text text-gray-700 mb-1">Signature Image <span class="text-xs text-gray-500">(Image Size: 90 x 30)</span></label>
              <div class="space-y-2">
                <input type="file" 
                       (change)="onSignatureImageChange($event)"
                       accept="image/*"
                       class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <div *ngIf="signatureImagePreview" class="mt-2">
                  <img [src]="signatureImagePreview" 
                       alt="Signature preview"
                       class="h-16 w-auto border border-gray-300 rounded">
                </div>
              </div>
            </div>

            <!-- View Contract -->
            <div>
              <label class="label-text text-gray-700 mb-1">View Contract</label>
              <div class="flex items-center">
                <input type="checkbox" 
                       formControlName="viewContract"
                       class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Yes</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div *ngIf="!isReadOnlyMode" class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button type="button" 
                  [routerLink]="['/identity/users']"
                  class="input-text px-6 py-2 border border-gray-300 rounded font-medium">
            Cancel
          </button>
          <button type="submit" 
                  [disabled]="userForm.invalid || isSubmitting"
                  style="background-color: #2c4170;"
                  class="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium">
            <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User') }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    /* Read-only form styling */
    input[disabled], select[disabled], textarea[disabled] {
      background-color: #f9fafb !important;
      border-color: #e5e7eb !important;
      color: #374151 !important;
      cursor: default !important;
    }
    
    /* Multi-select disabled styling */
    .multi-select-disabled .bg-blue-100 {
      background-color: #f3f4f6 !important;
    }
    
    .multi-select-disabled .text-blue-800 {
      color: #4b5563 !important;
    }
    
    /* Button styling in read-only mode */
    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  isReadOnlyMode = false;
  isSubmitting = false;
  userId?: number;
  signatureImagePreview?: string;

  availableRoles: FrontendRole[] = [
    { id: 1, name: 'Admin', description: 'Full system access', isActive: true, isSystemRole: true, priority: 1, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 2, name: 'Manager', description: 'Management access', isActive: true, isSystemRole: false, priority: 2, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 3, name: 'User', description: 'Standard access', isActive: true, isSystemRole: false, priority: 3, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 4, name: 'Viewer', description: 'Read-only access', isActive: true, isSystemRole: false, priority: 4, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] }
  ];

  availableDepartments = [
    { id: 1, name: 'Information Technology' },
    { id: 2, name: 'Human Resources' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Operations' },
    { id: 5, name: 'Sales' },
    { id: 6, name: 'Marketing' },
    { id: 7, name: 'Legal' },
    { id: 8, name: 'Administration' }
  ];

  availableDivisions = [
    { id: 1, name: 'Corporate', departmentId: 1 },
    { id: 2, name: 'Regional', departmentId: 1 },
    { id: 3, name: 'Payroll', departmentId: 2 },
    { id: 4, name: 'Recruitment', departmentId: 2 },
    { id: 5, name: 'Accounts', departmentId: 3 },
    { id: 6, name: 'Treasury', departmentId: 3 },
    { id: 7, name: 'Logistics', departmentId: 4 },
    { id: 8, name: 'Warehouse', departmentId: 4 }
  ];

  availableBranches = [
    { id: 1, name: 'Head Office', code: 'HO', city: 'Mumbai' },
    { id: 2, name: 'Delhi Branch', code: 'DEL', city: 'Delhi' },
    { id: 3, name: 'Bangalore Branch', code: 'BLR', city: 'Bangalore' },
    { id: 4, name: 'Chennai Branch', code: 'CHN', city: 'Chennai' },
    { id: 5, name: 'Kolkata Branch', code: 'KOL', city: 'Kolkata' },
    { id: 6, name: 'Pune Branch', code: 'PUN', city: 'Pune' },
    { id: 7, name: 'Hyderabad Branch', code: 'HYD', city: 'Hyderabad' },
    { id: 8, name: 'Ahmedabad Branch', code: 'AMD', city: 'Ahmedabad' }
  ];

  availableCustomers: Customer[] = [];

  // Multi-selection properties
  selectedBranches: number[] = [];
  selectedCustomers: number[] = [];
  selectedBranchId?: number;
  selectedCustomerId?: number;
  availableBranchesForSelection: any[] = [];
  availableCustomersForSelection: Customer[] = [];

  // CRM Reporting Managers
  availableCrmManagers = [
    { id: 1, name: 'Rajesh Kumar', designation: 'Senior CRM Manager', department: 'Sales' },
    { id: 2, name: 'Priya Sharma', designation: 'CRM Team Lead', department: 'Marketing' },
    { id: 3, name: 'Amit Patel', designation: 'CRM Analyst', department: 'Customer Service' },
    { id: 4, name: 'Sneha Reddy', designation: 'CRM Coordinator', department: 'Operations' },
    { id: 5, name: 'Vikash Singh', designation: 'CRM Specialist', department: 'Business Development' }
  ];

  userTypes = [
    { value: 1, label: 'Internal Employee' },
    { value: 2, label: 'Customer' },
    { value: 3, label: 'Agent/Partner' },
    { value: -1, label: 'System Administrator' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    console.log('=== User Form Component Initializing ===');
    
    // Check if we're in edit mode from route params
    this.userId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.userId;
    
    // Check if we're in read-only mode from query params
    this.isReadOnlyMode = this.route.snapshot.queryParams['readonly'] === 'true';
    
    console.log('Edit mode:', this.isEditMode, 'Read-only mode:', this.isReadOnlyMode);
    console.log('Available branches at init:', this.availableBranches);
    
    // Load customers for dropdown
    this.loadCustomers();
    
    // Initialize multi-selection lists
    this.updateAvailableBranches();
    this.updateAvailableCustomers();
    
    // FOR TESTING: Add some sample selected branches to demonstrate functionality
    // Remove this in production
    if (!this.isEditMode) {
      console.log('Initializing test branches...');
      
      // Clear any existing selections first
      this.selectedBranches = [];
      this.selectedCustomers = [];
      
      // Wait a tick then set the branch
      setTimeout(() => {
        this.selectedBranches = [4]; // Chennai Branch for testing
        console.log('Selected branches set to:', this.selectedBranches);
        
        // Test the display function immediately
        const branchDisplay = this.getBranchDisplayName(4);
        console.log('Testing branch display for ID 4:', branchDisplay);
        
        this.updateAvailableBranches();
        this.updateAvailableCustomers();
        console.log('Available branches after update:', this.availableBranchesForSelection);
        console.log('Available customers after update:', this.availableCustomersForSelection);
        
        // Also add a test customer from Chennai (RST Tech Chennai has ID 6)
        setTimeout(() => {
          this.selectedCustomers = [6]; // RST Tech Chennai for testing
          console.log('Selected customers set to:', this.selectedCustomers);
          
          // Test the customer display function
          const customerDisplay = this.getCustomerDisplayName(6);
          console.log('Testing customer display for ID 6:', customerDisplay);
          
          this.updateAvailableCustomers();
        }, 200);
      }, 100);
    }
    
    // Update form validators based on mode
    if (this.isEditMode) {
      // In edit mode, password is not required
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
      this.loadUser();
    }
    
    // Set form read-only mode after everything is initialized
    this.setFormReadOnlyMode();
  }

  createForm(): FormGroup {
    const form = this.formBuilder.group({
      // Core User Master (BS_UserMS) - Required fields
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
      userType: [1, [Validators.required]], // Default to Internal Employee
      roleId: ['', [Validators.required]],
      status: [1, [Validators.required]], // 1=Active, 0=Inactive
      
      // User Details (BS_UserDetail) - Required fields  
      empName: ['', [Validators.required, Validators.minLength(2)]], // Employee full name
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      
      // Optional fields
      deptId: [''], // Department ID
      divisionId: [''], // Division ID
      customerId: [''], // Customer ID
      empCode: [''], // Employee code
      address: [''], // Address
      
      // Additional Fields
      passwordResetRequired: [false], // Password reset flag
      passwordResetDays: [30, [Validators.min(1), Validators.max(365)]], // Number of days for password reset
      signatureImageUrl: [''], // Upload signature image URL
      faLedgerCode: [''], // FA Ledger Code
      crmReportingManager: [''], // CRM Reporting Manager
      branchLocations: [''], // Single branch location
      viewContract: [false], // View Contract permission
      
      // Legacy fields (for backward compatibility)
      firstName: [''], // Will be derived from empName
      lastName: [''], // Will be derived from empName
      phoneNumber: [''], // Alias for mobile
      employeeId: [''], // Alias for empCode
      department: [''], // Alias for deptId
      position: [''],
      confirmPassword: ['', this.isEditMode ? [] : [Validators.required]]
    });
    
    // Add password match validator only for create mode
    if (!this.isEditMode) {
      form.setValidators((control) => {
        return this.passwordMatchValidator(control as FormGroup);
      });
    }
    
    return form;
  }

  // Helper method to check if a field has validation errors
  hasFieldError(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper method to get field error message
  getFieldErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) return `${fieldName} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['pattern']) return 'Please enter a valid format';
    if (errors['min']) return `Value must be at least ${errors['min'].min}`;
    if (errors['max']) return `Value must be at most ${errors['max'].max}`;
    
    return 'Invalid value';
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  loadUser(): void {
    if (!this.userId) return;
    
    console.log('Loading user data for ID:', this.userId);
    
    // Use getUserById to get user information for editing
    this.databaseService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log('Loaded user data:', user);
        
        // Map the user data to form values
        this.userForm.patchValue({
          userName: user.userName || '',
          email: user.email || '',
          empName: user.fullName || '',
          mobile: user.phoneNumber || '',
          empCode: user.employeeId || '',
          userType: this.mapStatusToUserType(user.status),
          roleId: user.roleId || '',
          status: user.isActive ? 1 : 0,
          deptName: user.department || '',
          position: user.position || '',
          
          // Legacy field mappings
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phoneNumber: user.phoneNumber || '',
          employeeId: user.employeeId || '',
          department: user.department || '',
          
          // Additional fields - set defaults since they may not be in API response
          address: '', // Not available in FrontendUser interface
          passwordResetRequired: false, // Don't preset this for security
          passwordResetDays: 30,
          signatureImageUrl: user.profilePicture || '',
          faLedgerCode: '', // Not available in current API response
          branchLocations: '', // Not available in current API response
          viewContract: false // Default value
        });
      },
      error: (error) => {
        console.error('Error loading user:', error);
        // Handle different error scenarios
        if (error.status === 404) {
          alert('User not found. The user may have been deleted.');
          this.router.navigate(['/identity/users']);
        } else if (error.status === 0) {
          alert('Cannot connect to server. Please check your connection.');
        } else {
          alert('Failed to load user data. Please try again.');
        }
      }
    });
  }
  
  private mapStatusToUserType(status: string | undefined): number {
    // Map status string to user type number - adjust based on your business logic
    switch(status?.toLowerCase()) {
      case 'active': return 1; // Internal Employee
      case 'inactive': return 0; // Disabled/Inactive
      default: return 1; // Default to Internal Employee
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const formValue = this.userForm.value;

      if (this.isEditMode) {
        const updateRequest: UpdateUserRequest = {
          id: this.userId!,
          ...formValue
        };
        this.updateUser(updateRequest);
      } else {
        const createRequest: CreateUserRequest = formValue;
        this.createUser(createRequest);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onSignatureImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.signatureImagePreview = e.target?.result as string;
        this.userForm.patchValue({
          signatureImageUrl: this.signatureImagePreview
        });
      };
      reader.readAsDataURL(file);

      // Upload to server
      this.uploadSignatureImage(file);
    }
  }

  private uploadSignatureImage(file: File): void {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    // For now, we'll store the base64 in the form
    // In a real implementation, you would upload to a file service
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      this.userForm.patchValue({
        signatureImageUrl: base64String
      });
      console.log('Image uploaded and stored as base64');
    };
    reader.readAsDataURL(file);
    
    // TODO: Implement actual file upload to server
    // Example implementation:
    // this.databaseService.uploadFile(formData).subscribe({
    //   next: (response) => {
    //     this.userForm.patchValue({
    //       signatureImageUrl: response.url
    //     });
    //     console.log('Image uploaded to server:', response.url);
    //   },
    //   error: (error) => {
    //     console.error('Error uploading image:', error);
    //     alert('Failed to upload image. Please try again.');
    //   }
    // });
  }

  createUser(request: CreateUserRequest): void {
    // Transform form data to backend-compatible structure
    const formValue = this.userForm.value;
    const createUserDto: CreateUserRequest = {
      // Required fields
      userName: formValue.userName,
      password: formValue.password,
      empName: formValue.empName,
      email: formValue.email,
      mobile: formValue.mobile,
      roleId: Number(formValue.roleId),
      status: Number(formValue.status),
      
      // Optional fields
      userType: formValue.userType || 1,
      deptId: formValue.deptId ? Number(formValue.deptId) : undefined,
      divisionId: formValue.divisionId ? Number(formValue.divisionId) : undefined,
      empCode: formValue.empCode || '',
      address: formValue.address || '',
      
      // Legacy compatibility fields
      firstName: formValue.empName?.split(' ')[0] || '',
      lastName: formValue.empName?.split(' ').slice(1).join(' ') || '',
      phoneNumber: formValue.mobile,
      employeeId: formValue.empCode,
      department: formValue.deptName || '',
      position: formValue.position || '',
      isActive: Number(formValue.status) === 1,
      twoFactorEnabled: false
    };

    console.log('Creating user with payload:', createUserDto);
    
    this.databaseService.createUser(createUserDto).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.isSubmitting = false;
        alert('User created successfully!');
        this.router.navigate(['/identity/users']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.isSubmitting = false;
        
        // Handle different error types
        if (error.status === 409) {
          alert('A user with this username or email already exists.');
        } else if (error.status === 400) {
          alert('Invalid user data. Please check all required fields.');
        } else if (error.status === 0) {
          alert('Cannot connect to server. Please check your connection.');
        } else {
          alert('Failed to create user. Please try again.');
        }
      }
    });
  }

  updateUser(request: UpdateUserRequest): void {
    // Transform form data to backend-compatible structure
    const formValue = this.userForm.value;
    const updateUserDto: UpdateUserRequest = {
      id: this.userId!,
      
      // Core User Master (BS_UserMS)
      userName: formValue.userName,
      userType: formValue.userType,
      roleId: formValue.roleId ? Number(formValue.roleId) : undefined,
      status: Number(formValue.status),
      
      // User Details (BS_UserDetail)
      empName: formValue.empName,
      email: formValue.email,
      mobile: formValue.mobile,
      deptId: formValue.deptId ? Number(formValue.deptId) : undefined,
      divisionId: formValue.divisionId ? Number(formValue.divisionId) : undefined,
      empCode: formValue.empCode,
      address: formValue.address,
      
      // Legacy compatibility fields
      firstName: formValue.empName?.split(' ')[0] || '',
      lastName: formValue.empName?.split(' ').slice(1).join(' ') || '',
      phoneNumber: formValue.mobile,
      employeeId: formValue.empCode,
      department: formValue.deptName,
      position: formValue.position,
      isActive: Number(formValue.status) === 1,
      twoFactorEnabled: false
    };

    console.log('Updating user with payload:', updateUserDto);
    
    this.databaseService.updateUser(updateUserDto).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.isSubmitting = false;
        alert('User updated successfully!');
        this.router.navigate(['/identity/users']);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.isSubmitting = false;
        
        // Handle different error types
        if (error.status === 404) {
          alert('User not found. The user may have been deleted.');
          this.router.navigate(['/identity/users']);
        } else if (error.status === 409) {
          alert('A user with this username or email already exists.');
        } else if (error.status === 400) {
          alert('Invalid user data. Please check all required fields.');
        } else if (error.status === 0) {
          alert('Cannot connect to server. Please check your connection.');
        } else {
          alert('Failed to update user. Please try again.');
        }
      }
    });
  }

  private loadCustomers(): void {
    // Mock customer data for now - in real implementation this would call an API
    this.availableCustomers = [
      { lid: 1, custName: 'ABC Corp Mumbai', email: 'contact@abc.com', address: '123 Business St', contactPerson: 'John Doe', mobileNo: '9876543210', contactNo: '022-12345678', website: 'www.abc.com', gstNo: 'GST123456789', panNo: 'PAN123456', city: 'Mumbai', state: 'Maharashtra', country: 'India', pincode: '400001', creditLimit: 100000, creditDays: 30, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 2, custName: 'XYZ Ltd Delhi', email: 'info@xyz.com', address: '456 Commerce Rd', contactPerson: 'Jane Smith', mobileNo: '9876543211', contactNo: '011-87654321', website: 'www.xyz.com', gstNo: 'GST987654321', panNo: 'PAN987654', city: 'Delhi', state: 'Delhi', country: 'India', pincode: '110001', creditLimit: 150000, creditDays: 45, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 3, custName: 'PQR Industries Bangalore', email: 'sales@pqr.com', address: '789 Industrial Ave', contactPerson: 'Mike Johnson', mobileNo: '9876543212', contactNo: '080-11223344', website: 'www.pqr.com', gstNo: 'GST456789123', panNo: 'PAN456789', city: 'Bangalore', state: 'Karnataka', country: 'India', pincode: '560001', creditLimit: 200000, creditDays: 60, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 4, custName: 'MNO Enterprises Mumbai', email: 'hello@mno.com', address: '321 Trade Center', contactPerson: 'Sarah Wilson', mobileNo: '9876543213', contactNo: '022-99887766', website: 'www.mno.com', gstNo: 'GST789123456', panNo: 'PAN789123', city: 'Mumbai', state: 'Maharashtra', country: 'India', pincode: '400002', creditLimit: 175000, creditDays: 30, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 5, custName: 'LMN Solutions Delhi', email: 'contact@lmn.com', address: '654 Business Plaza', contactPerson: 'David Brown', mobileNo: '9876543214', contactNo: '011-55443322', website: 'www.lmn.com', gstNo: 'GST321654987', panNo: 'PAN321654', city: 'Delhi', state: 'Delhi', country: 'India', pincode: '110002', creditLimit: 125000, creditDays: 45, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 6, custName: 'RST Tech Chennai', email: 'info@rst.com', address: '987 Tech Park', contactPerson: 'Priya Kumar', mobileNo: '9876543215', contactNo: '044-66778899', website: 'www.rst.com', gstNo: 'GST654987321', panNo: 'PAN654987', city: 'Chennai', state: 'Tamil Nadu', country: 'India', pincode: '600001', creditLimit: 180000, creditDays: 30, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 7, custName: 'UVW Industries Kolkata', email: 'sales@uvw.com', address: '456 Industrial Zone', contactPerson: 'Raj Gupta', mobileNo: '9876543216', contactNo: '033-11224455', website: 'www.uvw.com', gstNo: 'GST987321654', panNo: 'PAN987321', city: 'Kolkata', state: 'West Bengal', country: 'India', pincode: '700001', creditLimit: 160000, creditDays: 45, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 8, custName: 'GHI Corp Pune', email: 'contact@ghi.com', address: '789 Business Center', contactPerson: 'Amit Sharma', mobileNo: '9876543217', contactNo: '020-88776655', website: 'www.ghi.com', gstNo: 'GST321987654', panNo: 'PAN321987', city: 'Pune', state: 'Maharashtra', country: 'India', pincode: '411001', creditLimit: 140000, creditDays: 30, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 9, custName: 'JKL Systems Hyderabad', email: 'info@jkl.com', address: '321 IT Hub', contactPerson: 'Lakshmi Reddy', mobileNo: '9876543218', contactNo: '040-44556677', website: 'www.jkl.com', gstNo: 'GST654321987', panNo: 'PAN654321', city: 'Hyderabad', state: 'Telangana', country: 'India', pincode: '500001', creditLimit: 190000, creditDays: 60, bDel: false, lUser: 1, dEntry: new Date() },
      { lid: 10, custName: 'DEF Trading Ahmedabad', email: 'trade@def.com', address: '654 Commercial St', contactPerson: 'Neha Patel', mobileNo: '9876543219', contactNo: '079-22334455', website: 'www.def.com', gstNo: 'GST987654321', panNo: 'PAN987654', city: 'Ahmedabad', state: 'Gujarat', country: 'India', pincode: '380001', creditLimit: 170000, creditDays: 45, bDel: false, lUser: 1, dEntry: new Date() }
    ];
    
    // Update available options after loading customers
    this.updateAvailableCustomers();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  // Multi-selection methods for branches
  addBranch(): void {
    if (this.selectedBranchId && !this.selectedBranches.includes(this.selectedBranchId)) {
      this.selectedBranches.push(this.selectedBranchId);
      this.selectedBranchId = undefined;
      this.updateAvailableBranches();
      this.updateAvailableCustomers();
      this.updateFormValues();
    }
  }

  removeBranch(branchId: number): void {
    this.selectedBranches = this.selectedBranches.filter(id => id !== branchId);
    // Remove customers that are no longer valid for the remaining branches
    this.filterCustomersByBranches();
    this.updateAvailableBranches();
    this.updateAvailableCustomers();
    this.updateFormValues();
  }

  selectAllBranches(): void {
    const branchesToAdd = this.availableBranchesForSelection.map(branch => branch.id);
    this.selectedBranches.push(...branchesToAdd);
    this.updateAvailableBranches();
    this.updateAvailableCustomers();
    this.updateFormValues();
  }

  clearAllBranches(): void {
    this.selectedBranches = [];
    this.selectedCustomers = []; // Clear customers when branches are cleared
    this.updateAvailableBranches();
    this.updateAvailableCustomers();
    this.updateFormValues();
  }

  getBranchDisplayName(branchId: number): string {
    console.log('Getting branch display name for ID:', branchId);
    console.log('Available branches:', this.availableBranches);
    
    const branch = this.availableBranches.find(b => b.id === branchId);
    console.log('Found branch:', branch);
    
    if (branch) {
      return branch.name;
    }
    
    // Debug: Log the issue if branch not found
    console.error('Branch not found for ID:', branchId);
    return `Branch ID: ${branchId}`;
  }

  getBranchName(branchId: number): string {
    return this.getBranchDisplayName(branchId);
  }

  // Multi-selection methods for customers
  addCustomer(): void {
    if (this.selectedCustomerId && !this.selectedCustomers.includes(this.selectedCustomerId)) {
      this.selectedCustomers.push(this.selectedCustomerId);
      this.selectedCustomerId = undefined;
      this.updateAvailableCustomers();
      this.updateFormValues();
    }
  }

  removeCustomer(customerId: number): void {
    this.selectedCustomers = this.selectedCustomers.filter(id => id !== customerId);
    this.updateAvailableCustomers();
    this.updateFormValues();
  }

  selectAllCustomers(): void {
    const customersToAdd = this.availableCustomersForSelection.map(customer => customer.lid);
    this.selectedCustomers.push(...customersToAdd);
    this.updateAvailableCustomers();
    this.updateFormValues();
  }

  clearAllCustomers(): void {
    this.selectedCustomers = [];
    this.updateAvailableCustomers();
    this.updateFormValues();
  }

  getCustomerDisplayName(customerId: number): string {
    console.log('Getting customer display name for ID:', customerId);
    console.log('Available customers:', this.availableCustomers);
    
    const customer = this.availableCustomers.find(c => c.lid === customerId);
    console.log('Found customer:', customer);
    
    if (customer) {
      return customer.custName;
    }
    
    console.error('Customer not found for ID:', customerId);
    return `Customer ID: ${customerId}`;
  }

  getCustomerName(customerId: number): string {
    return this.getCustomerDisplayName(customerId);
  }

  getCustomerCity(customerId: number): string {
    const customer = this.availableCustomers.find(c => c.lid === customerId);
    return customer ? customer.city : '';
  }

  getCustomerDropdownPlaceholder(): string {
    if (this.selectedBranches.length === 0) {
      return 'Select branches first to see customers';
    }
    if (this.availableCustomersForSelection.length === 0) {
      return 'No customers available for selected branch cities';
    }
    return 'Select Customer to Add';
  }

  getSelectedBranchCities(): string[] {
    return this.selectedBranches.map(branchId => {
      const branch = this.availableBranches.find(b => b.id === branchId);
      return branch ? branch.city : '';
    }).filter(city => city !== '');
  }

  // Update available options
  updateAvailableBranches(): void {
    this.availableBranchesForSelection = this.availableBranches.filter(
      branch => !this.selectedBranches.includes(branch.id)
    );
  }

  updateAvailableCustomers(): void {
    // Get cities from selected branches
    const branchCities = this.selectedBranches.map(branchId => {
      const branch = this.availableBranches.find(b => b.id === branchId);
      return branch ? branch.city : '';
    }).filter(city => city !== '');

    console.log('Selected branch cities:', branchCities);
    console.log('Available customers before filtering:', this.availableCustomers.length);

    // Filter customers by branch cities and exclude already selected
    this.availableCustomersForSelection = this.availableCustomers.filter(customer => 
      branchCities.includes(customer.city) && 
      !this.selectedCustomers.includes(customer.lid)
    );

    console.log('Available customers after filtering:', this.availableCustomersForSelection.length);
  }

  private filterCustomersByBranches(): void {
    // Get cities from selected branches
    const branchCities = this.selectedBranches.map(branchId => {
      const branch = this.availableBranches.find(b => b.id === branchId);
      return branch ? branch.city : '';
    }).filter(city => city !== '');

    // Remove customers that are not in any of the branch cities
    this.selectedCustomers = this.selectedCustomers.filter(customerId => {
      const customer = this.availableCustomers.find(c => c.lid === customerId);
      return customer && branchCities.includes(customer.city);
    });
  }

  private updateFormValues(): void {
    // Update form controls with comma-separated values
    this.userForm.patchValue({
      branchLocations: this.selectedBranches.join(','),
      customerId: this.selectedCustomers.length > 0 ? this.selectedCustomers[0] : '' // Keep first customer for backward compatibility
    });
  }

  enableEditMode(): void {
    // Remove readonly query param and navigate to edit mode
    this.router.navigate(['/identity/users', this.userId, 'edit']);
  }

  private setFormReadOnlyMode(): void {
    if (this.isReadOnlyMode) {
      // Disable all form controls
      this.userForm.disable();
    } else {
      // Enable all form controls
      this.userForm.enable();
    }
  }
}
