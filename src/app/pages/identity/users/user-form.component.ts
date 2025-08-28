import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { 
  FrontendUser, 
  FrontendRole, 
  CreateUserRequest, 
  UpdateUserRequest 
} from '../../../models/database.interfaces';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ isEditMode ? 'Edit User' : 'Create New User' }}</h1>
          <p class="text-sm text-gray-600">{{ isEditMode ? 'Update user information and permissions' : 'Add a new user to the system' }}</p>
        </div>
        <button [routerLink]="['/identity/users']" class="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg">
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
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input type="text" 
                     formControlName="firstName"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter first name">
              <div *ngIf="userForm.get('firstName')?.invalid && userForm.get('firstName')?.touched" 
                   class="text-red-600 text-sm mt-1">
                First name is required
              </div>
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input type="text" 
                     formControlName="lastName"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter last name">
              <div *ngIf="userForm.get('lastName')?.invalid && userForm.get('lastName')?.touched" 
                   class="text-red-600 text-sm mt-1">
                Last name is required
              </div>
            </div>

            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Username *</label>
              <input type="text" 
                     formControlName="userName"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter username">
              <div *ngIf="userForm.get('userName')?.invalid && userForm.get('userName')?.touched" 
                   class="text-red-600 text-sm mt-1">
                Username is required
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" 
                     formControlName="email"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter email address">
              <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" 
                   class="text-red-600 text-sm mt-1">
                <span *ngIf="userForm.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email</span>
              </div>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" 
                     formControlName="phoneNumber"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter phone number">
            </div>

            <!-- Employee ID -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <input type="text" 
                     formControlName="employeeId"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter employee ID">
            </div>
          </div>
        </div>

        <!-- Professional Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Department -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select formControlName="department"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Department</option>
                <option value="IT">Information Technology</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Legal">Legal</option>
                <option value="Admin">Administration</option>
              </select>
            </div>

            <!-- Position -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input type="text" 
                     formControlName="position"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter job position">
            </div>

            <!-- Role -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select formControlName="roleId"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Role</option>
                <option *ngFor="let role of availableRoles" [value]="role.id">
                  {{ role.name }} - {{ role.description }}
                </option>
              </select>
              <div *ngIf="userForm.get('roleId')?.invalid && userForm.get('roleId')?.touched" 
                   class="text-red-600 text-sm mt-1">
                Role is required
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Password (only for new users) -->
            <div *ngIf="!isEditMode">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" 
                     formControlName="password"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter password">
              <div *ngIf="userForm.get('password')?.invalid && userForm.get('password')?.touched" 
                   class="text-red-600 text-sm mt-1">
                <span *ngIf="userForm.get('password')?.errors?.['required']">Password is required</span>
                <span *ngIf="userForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</span>
              </div>
            </div>

            <!-- Confirm Password (only for new users) -->
            <div *ngIf="!isEditMode">
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <input type="password" 
                     formControlName="confirmPassword"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Confirm password">
              <div *ngIf="userForm.get('confirmPassword')?.invalid && userForm.get('confirmPassword')?.touched" 
                   class="text-red-600 text-sm mt-1">
                Passwords do not match
              </div>
            </div>

            <!-- Account Status -->
            <div class="flex items-center space-x-6">
              <div class="flex items-center">
                <input type="checkbox" 
                       formControlName="isActive"
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label class="ml-2 text-sm text-gray-700">Account Active</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" 
                       formControlName="twoFactorEnabled"
                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label class="ml-2 text-sm text-gray-700">Enable Two-Factor Authentication</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button type="button" 
                  [routerLink]="['/identity/users']"
                  class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" 
                  [disabled]="userForm.invalid || isSubmitting"
                  style="background-color: #2c4170;"
                  class="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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

  availableRoles: FrontendRole[] = [
    { id: 1, name: 'Admin', description: 'Full system access', isActive: true, isSystemRole: true, priority: 1, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 2, name: 'Manager', description: 'Management access', isActive: true, isSystemRole: false, priority: 2, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 3, name: 'User', description: 'Standard access', isActive: true, isSystemRole: false, priority: 3, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 4, name: 'Viewer', description: 'Read-only access', isActive: true, isSystemRole: false, priority: 4, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
    return this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      employeeId: [''],
      department: [''],
      position: [''],
      roleId: ['', [Validators.required]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', this.isEditMode ? [] : [Validators.required]],
      isActive: [true],
      twoFactorEnabled: [false]
    }, { validators: this.isEditMode ? null : this.passwordMatchValidator });
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
    // TODO: Load user data from API
    console.log('Loading user data for ID:', this.userId);
    // This would typically call your API service
    // this.userService.getUserById(this.userId).subscribe(user => {
    //   this.userForm.patchValue(user);
    // });
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

  createUser(request: CreateUserRequest): void {
    console.log('Creating user:', request);
    // TODO: Call API to create user
    // this.userService.createUser(request).subscribe({
    //   next: (user) => {
    //     console.log('User created:', user);
    //     this.router.navigate(['/identity/users']);
    //   },
    //   error: (error) => {
    //     console.error('Error creating user:', error);
    //     this.isSubmitting = false;
    //   }
    // });
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      alert('User created successfully!');
    }, 2000);
  }

  updateUser(request: UpdateUserRequest): void {
    console.log('Updating user:', request);
    // TODO: Call API to update user
    // this.userService.updateUser(request).subscribe({
    //   next: (user) => {
    //     console.log('User updated:', user);
    //     this.router.navigate(['/identity/users']);
    //   },
    //   error: (error) => {
    //     console.error('Error updating user:', error);
    //     this.isSubmitting = false;
    //   }
    // });
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      alert('User updated successfully!');
    }, 2000);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }
}
