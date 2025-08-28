import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DepartmentService } from '../../services/department.service';
import { User, UserDetail, UserType, UserWithDetails } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ isEditMode ? 'Edit User' : 'Add New User' }}
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              {{ isEditMode ? 'Update user information and details' : 'Create a new system user with access permissions' }}
            </p>
          </div>
          <button 
            type="button"
            (click)="goBack()"
            class="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm font-medium">
            Back to List
          </button>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="p-6">
        <div class="space-y-8">
          <!-- Basic User Information -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- User Name -->
              <div>
                <label for="sName" class="block text-sm font-medium text-gray-700 mb-2">
                  User Name *
                </label>
                <input
                  id="sName"
                  type="text"
                  formControlName="sName"
                  placeholder="Enter user name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('sName')">
                <div *ngIf="isFieldInvalid('sName')" class="mt-1 text-sm text-red-600">
                  User name is required
                </div>
              </div>

              <!-- Employee Code -->
              <div>
                <label for="empCode" class="block text-sm font-medium text-gray-700 mb-2">
                  Employee Code *
                </label>
                <input
                  id="empCode"
                  type="text"
                  formControlName="empCode"
                  placeholder="Enter employee code"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('empCode')">
                <div *ngIf="isFieldInvalid('empCode')" class="mt-1 text-sm text-red-600">
                  <div *ngIf="userForm.get('empCode')?.errors?.['required']">
                    Employee code is required
                  </div>
                  <div *ngIf="userForm.get('empCode')?.errors?.['duplicateEmpCode']">
                    This employee code is already in use
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  placeholder="Enter email address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('email')">
                <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-600">
                  <div *ngIf="userForm.get('email')?.errors?.['required']">
                    Email is required
                  </div>
                  <div *ngIf="userForm.get('email')?.errors?.['email']">
                    Please enter a valid email address
                  </div>
                  <div *ngIf="userForm.get('email')?.errors?.['duplicateEmail']">
                    This email is already in use
                  </div>
                </div>
              </div>

              <!-- Contact Number -->
              <div>
                <label for="contactNo" class="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  id="contactNo"
                  type="tel"
                  formControlName="contactNo"
                  placeholder="Enter contact number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('contactNo')">
                <div *ngIf="isFieldInvalid('contactNo')" class="mt-1 text-sm text-red-600">
                  Contact number is required
                </div>
              </div>

              <!-- User Type -->
              <div>
                <label for="lType" class="block text-sm font-medium text-gray-700 mb-2">
                  User Type *
                </label>
                <select
                  id="lType"
                  formControlName="lType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('lType')">
                  <option value="">Select user type</option>
                  <option [value]="userTypes.INTERNAL">Internal User</option>
                  <option [value]="userTypes.OTHER">Other User</option>
                </select>
                <div *ngIf="isFieldInvalid('lType')" class="mt-1 text-sm text-red-600">
                  User type is required
                </div>
              </div>

              <!-- Head of Department -->
              <div>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    formControlName="hod"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <span class="ml-2 text-sm font-medium text-gray-700">Head of Department (HOD)</span>
                </label>
                <p class="text-xs text-gray-500 mt-1">
                  Check if this user is a department head
                </p>
              </div>
            </div>
          </div>

          <!-- Organizational Information -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4">Organizational Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Department -->
              <div>
                <label for="deptId" class="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  id="deptId"
                  formControlName="deptId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('deptId')">
                  <option value="">Select department</option>
                  <option value="1">Information Technology</option>
                  <option value="2">Human Resources</option>
                  <option value="3">Finance</option>
                  <option value="4">Operations</option>
                  <option value="5">Sales & Marketing</option>
                </select>
                <div *ngIf="isFieldInvalid('deptId')" class="mt-1 text-sm text-red-600">
                  Department is required
                </div>
              </div>

              <!-- Role -->
              <div>
                <label for="lRoleId" class="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  id="lRoleId"
                  formControlName="lRoleId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('lRoleId')">
                  <option value="">Select role</option>
                  <option value="1">Admin</option>
                  <option value="2">Manager</option>
                  <option value="3">User</option>
                  <option value="4">Viewer</option>
                </select>
                <div *ngIf="isFieldInvalid('lRoleId')" class="mt-1 text-sm text-red-600">
                  Role is required
                </div>
              </div>

              <!-- Designation -->
              <div>
                <label for="designId" class="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <select
                  id="designId"
                  formControlName="designId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('designId')">
                  <option value="">Select designation</option>
                  <option value="1">Manager</option>
                  <option value="2">Senior Executive</option>
                  <option value="3">Executive</option>
                  <option value="4">Assistant</option>
                </select>
                <div *ngIf="isFieldInvalid('designId')" class="mt-1 text-sm text-red-600">
                  Designation is required
                </div>
              </div>

              <!-- Branch -->
              <div>
                <label for="branchId" class="block text-sm font-medium text-gray-700 mb-2">
                  Branch *
                </label>
                <select
                  id="branchId"
                  formControlName="branchId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('branchId')">
                  <option value="">Select branch</option>
                  <option value="1">Mumbai Branch</option>
                  <option value="2">Delhi Branch</option>
                  <option value="3">Chennai Branch</option>
                  <option value="4">Bangalore Branch</option>
                </select>
                <div *ngIf="isFieldInvalid('branchId')" class="mt-1 text-sm text-red-600">
                  Branch is required
                </div>
              </div>

              <!-- Division -->
              <div>
                <label for="divId" class="block text-sm font-medium text-gray-700 mb-2">
                  Division ID
                </label>
                <input
                  id="divId"
                  type="text"
                  formControlName="divId"
                  placeholder="Enter division ID"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
            </div>
          </div>

          <!-- User Details -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4">Additional Details</h2>
            <div class="grid grid-cols-1 gap-6">
              <!-- Employee Name -->
              <div>
                <label for="empName" class="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name
                </label>
                <input
                  id="empName"
                  type="text"
                  formControlName="empName"
                  placeholder="Enter employee name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>

              <!-- Mobile Number -->
              <div>
                <label for="mobile" class="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  formControlName="mobile"
                  placeholder="Enter mobile number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>

              <!-- Address -->
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  formControlName="address"
                  rows="3"
                  placeholder="Enter address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            (click)="goBack()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="userForm.invalid || isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors">
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
  userId: number | undefined = undefined;
  userTypes = UserType;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.isEditMode = true;
        this.loadUser();
      }
    });

    // Add validators for unique fields
    this.userForm.get('empCode')?.valueChanges.subscribe(value => {
      if (value) {
        this.checkEmpCodeUniqueness(value);
      }
    });

    this.userForm.get('email')?.valueChanges.subscribe(value => {
      if (value) {
        this.checkEmailUniqueness(value);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      // User fields
      sName: ['', [Validators.required]],
      lType: ['', [Validators.required]],
      lRoleId: ['', [Validators.required]],
      deptId: ['', [Validators.required]],
      designId: ['', [Validators.required]],
      divId: [''],
      branchId: ['', [Validators.required]],
      hod: [false],
      empCode: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required]],
      
      // User detail fields
      empName: [''],
      mobile: [''],
      address: ['']
    });
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          if (user) {
            this.userForm.patchValue({
              sName: user.sName,
              lType: user.lType,
              lRoleId: user.lRoleId,
              deptId: user.deptId,
              designId: user.designId,
              divId: user.divId,
              branchId: user.branchId,
              hod: user.hod === 'Y',
              empCode: user.empCode,
              email: user.email,
              contactNo: user.contactNo,
              empName: user.userDetail?.empName || '',
              mobile: user.userDetail?.mobile || '',
              address: user.userDetail?.address || ''
            });
          }
        },
        error: (error) => {
          console.error('Error loading user:', error);
          alert('Error loading user data.');
          this.goBack();
        }
      });
    }
  }

  checkEmpCodeUniqueness(empCode: string): void {
    if (empCode && empCode.length >= 2) {
      this.userService.isEmpCodeUnique(empCode, this.userId).subscribe({
        next: (isUnique) => {
          const empCodeControl = this.userForm.get('empCode');
          if (!isUnique) {
            empCodeControl?.setErrors({ ...empCodeControl.errors, duplicateEmpCode: true });
          } else {
            if (empCodeControl?.errors) {
              delete empCodeControl.errors['duplicateEmpCode'];
              if (Object.keys(empCodeControl.errors).length === 0) {
                empCodeControl.setErrors(null);
              }
            }
          }
        }
      });
    }
  }

  checkEmailUniqueness(email: string): void {
    if (email && email.includes('@')) {
      this.userService.isEmailUnique(email, this.userId).subscribe({
        next: (isUnique) => {
          const emailControl = this.userForm.get('email');
          if (!isUnique) {
            emailControl?.setErrors({ ...emailControl.errors, duplicateEmail: true });
          } else {
            if (emailControl?.errors) {
              delete emailControl.errors['duplicateEmail'];
              if (Object.keys(emailControl.errors).length === 0) {
                emailControl.setErrors(null);
              }
            }
          }
        }
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = this.userForm.value;
      
      const userData: Partial<User> = {
        sName: formData.sName.trim(),
        lType: +formData.lType,
        lRoleId: +formData.lRoleId,
        deptId: +formData.deptId,
        designId: +formData.designId,
        divId: formData.divId?.trim() || '',
        branchId: +formData.branchId,
        hod: formData.hod ? 'Y' : 'N',
        empCode: formData.empCode.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase(),
        contactNo: formData.contactNo.trim()
      };

      const userDetail: Partial<UserDetail> = {
        empName: formData.empName?.trim() || formData.sName.trim(),
        email: formData.email.trim().toLowerCase(),
        deptId: +formData.deptId,
        divisionId: 1, // Default value, should be from form
        empCode: formData.empCode.trim().toUpperCase(),
        mobile: formData.mobile?.trim() || formData.contactNo.trim(),
        address: formData.address?.trim() || '',
        userRole: +formData.lRoleId,
        lUser: 1 // Current user ID, should be from auth service
      };

      const operation = this.isEditMode
        ? this.userService.updateUser(this.userId!, userData, userDetail)
        : this.userService.createUser(userData, userDetail);

      operation.subscribe({
        next: (result) => {
          if (result) {
            this.router.navigate(['/masters/users']);
          } else {
            alert('Failed to save user.');
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error saving user:', error);
          alert('Error saving user.');
          this.isSubmitting = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  goBack(): void {
    this.router.navigate(['/masters/users']);
  }
}
