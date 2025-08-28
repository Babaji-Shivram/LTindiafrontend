import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { DepartmentMaster } from '../../models/department.model';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ isEditMode ? 'Edit Department' : 'Add New Department' }}
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              {{ isEditMode ? 'Update department information' : 'Create a new department for your organization' }}
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
      <form [formGroup]="departmentForm" (ngSubmit)="onSubmit()" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Department Name -->
          <div class="md:col-span-2">
            <label for="departmentName" class="block text-sm font-medium text-gray-700 mb-2">
              Department Name *
            </label>
            <input
              id="departmentName"
              type="text"
              formControlName="DepartmentName"
              placeholder="Enter department name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              [class.border-red-500]="isFieldInvalid('DepartmentName')">
            <div *ngIf="isFieldInvalid('DepartmentName')" class="mt-1 text-sm text-red-600">
              <div *ngIf="departmentForm.get('DepartmentName')?.errors?.['required']">
                Department name is required
              </div>
              <div *ngIf="departmentForm.get('DepartmentName')?.errors?.['minlength']">
                Department name must be at least 2 characters
              </div>
            </div>
          </div>

          <!-- Department Code -->
          <div>
            <label for="departmentCode" class="block text-sm font-medium text-gray-700 mb-2">
              Department Code *
            </label>
            <input
              id="departmentCode"
              type="text"
              formControlName="DepartmentCode"
              placeholder="Enter department code (e.g., IT, HR)"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              [class.border-red-500]="isFieldInvalid('DepartmentCode')">
            <div *ngIf="isFieldInvalid('DepartmentCode')" class="mt-1 text-sm text-red-600">
              <div *ngIf="departmentForm.get('DepartmentCode')?.errors?.['required']">
                Department code is required
              </div>
              <div *ngIf="departmentForm.get('DepartmentCode')?.errors?.['minlength']">
                Department code must be at least 2 characters
              </div>
              <div *ngIf="departmentForm.get('DepartmentCode')?.errors?.['duplicateCode']">
                This department code is already in use
              </div>
            </div>
          </div>

          <!-- Department Head -->
          <div>
            <label for="departmentHead" class="block text-sm font-medium text-gray-700 mb-2">
              Department Head *
            </label>
            <input
              id="departmentHead"
              type="text"
              formControlName="DepartmentHead"
              placeholder="Enter department head name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              [class.border-red-500]="isFieldInvalid('DepartmentHead')">
            <div *ngIf="isFieldInvalid('DepartmentHead')" class="mt-1 text-sm text-red-600">
              <div *ngIf="departmentForm.get('DepartmentHead')?.errors?.['required']">
                Department head is required
              </div>
              <div *ngIf="departmentForm.get('DepartmentHead')?.errors?.['minlength']">
                Department head name must be at least 2 characters
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              formControlName="Description"
              rows="3"
              placeholder="Enter department description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              [class.border-red-500]="isFieldInvalid('Description')"></textarea>
            <div *ngIf="isFieldInvalid('Description')" class="mt-1 text-sm text-red-600">
              <div *ngIf="departmentForm.get('Description')?.errors?.['maxlength']">
                Description cannot exceed 500 characters
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="md:col-span-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                formControlName="IsActive"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <span class="ml-2 text-sm font-medium text-gray-700">Active</span>
            </label>
            <p class="text-xs text-gray-500 mt-1">
              Inactive departments will not be available for selection in other modules
            </p>
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
            [disabled]="departmentForm.invalid || isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors">
            {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Department' : 'Create Department') }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  departmentId: number | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.departmentForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.departmentId = +params['id'];
        this.isEditMode = true;
        this.loadDepartment();
      }
    });

    // Add custom validator for duplicate department code
    this.departmentForm.get('DepartmentCode')?.valueChanges.subscribe(value => {
      if (value) {
        this.checkDepartmentCodeUniqueness(value);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      DepartmentName: ['', [Validators.required, Validators.minLength(2)]],
      DepartmentCode: ['', [Validators.required, Validators.minLength(2)]],
      DepartmentHead: ['', [Validators.required, Validators.minLength(2)]],
      Description: ['', [Validators.maxLength(500)]],
      IsActive: [true]
    });
  }

  loadDepartment(): void {
    if (this.departmentId) {
      this.departmentService.getDepartmentById(this.departmentId).subscribe({
        next: (department) => {
          if (department) {
            this.departmentForm.patchValue({
              DepartmentName: department.DepartmentName,
              DepartmentCode: department.DepartmentCode,
              DepartmentHead: department.DepartmentHead,
              Description: department.Description,
              IsActive: department.IsActive
            });
          }
        },
        error: (error) => {
          console.error('Error loading department:', error);
          alert('Error loading department data.');
          this.goBack();
        }
      });
    }
  }

  checkDepartmentCodeUniqueness(code: string): void {
    if (code && code.length >= 2) {
      this.departmentService.isDepartmentCodeUnique(code, this.departmentId).subscribe({
        next: (isUnique) => {
          const codeControl = this.departmentForm.get('DepartmentCode');
          if (!isUnique) {
            codeControl?.setErrors({ ...codeControl.errors, duplicateCode: true });
          } else {
            // Remove duplicate error while preserving other errors
            if (codeControl?.errors) {
              delete codeControl.errors['duplicateCode'];
              if (Object.keys(codeControl.errors).length === 0) {
                codeControl.setErrors(null);
              }
            }
          }
        }
      });
    }
  }

  onSubmit(): void {
    if (this.departmentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = this.departmentForm.value;
      const departmentData: Partial<DepartmentMaster> = {
        DepartmentName: formData.DepartmentName.trim(),
        DepartmentCode: formData.DepartmentCode.trim().toUpperCase(),
        DepartmentHead: formData.DepartmentHead.trim(),
        Description: formData.Description?.trim() || '',
        IsActive: formData.IsActive
      };

      const operation = this.isEditMode
        ? this.departmentService.updateDepartment(this.departmentId!, departmentData)
        : this.departmentService.createDepartment(departmentData as DepartmentMaster);

      operation.subscribe({
        next: (result) => {
          if (result) {
            this.router.navigate(['/masters/departments']);
          } else {
            alert('Failed to save department.');
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error saving department:', error);
          alert('Error saving department.');
          this.isSubmitting = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.departmentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  goBack(): void {
    this.router.navigate(['/masters/departments']);
  }
}
