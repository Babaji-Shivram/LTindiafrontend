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
          <h1 class="section-header text-gray-900">{{ isEditMode ? 'Edit User' : 'Create New User' }}</h1>
          <p class="text-sm text-gray-600">{{ isEditMode ? 'Update user information and permissions' : 'Add a new user to the system' }}</p>
        </div>
        <button [routerLink]="['/identity/users']" class="text-gray-600 hover:text-gray-800 input-text px-4 py-2 border border-gray-300 rounded font-medium">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          Back to Users
        </button>
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
                     class="w-full input-text px-3 py-2 border border-gray-300 rounded"
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
            <div>
              <label class="label-text text-gray-700 mb-1">Branch Locations</label>
              <select formControlName="branchLocations"
                      class="w-full input-text px-3 py-2 border border-gray-300 rounded">
                <option value="">Select Branch</option>
                <option *ngFor="let branch of availableBranches" [value]="branch.id">
                  {{ branch.name }} ({{ branch.code }})
                </option>
              </select>
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
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
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
  `
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
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
    // Check if we're in edit mode from route params
    this.userId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.userId;
    
    // Update form validators based on mode
    if (this.isEditMode) {
      // In edit mode, password is not required
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
      this.loadUser();
    }
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
      empCode: [''], // Employee code
      address: [''], // Address
      
      // Additional Fields
      passwordResetRequired: [false], // Password reset flag
      passwordResetDays: [30, [Validators.min(1), Validators.max(365)]], // Number of days for password reset
      signatureImageUrl: [''], // Upload signature image URL
      faLedgerCode: [''], // FA Ledger Code
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

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }
}
