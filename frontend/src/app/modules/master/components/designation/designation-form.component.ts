import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DesignationService } from '../../services/designation.service';
import { DesignationMaster } from '../../models/designation.model';

@Component({
  selector: 'app-designation-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title text-gray-900">
            {{ isEditMode ? 'Edit' : 'Add' }} Designation
          </h1>
          <p class="text-sm text-gray-600">
            {{ isEditMode ? 'Update designation information' : 'Create a new organizational designation' }}
          </p>
        </div>
        <button 
          routerLink="/masters/designations"
          class="text-gray-600 hover:text-gray-800">
          ← Back to Designations
        </button>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <form [formGroup]="designationForm" (ngSubmit)="onSubmit()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Designation Name -->
            <div class="md:col-span-2">
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Designation Name *
              </label>
              <input
                type="text"
                formControlName="DesignationName"
                placeholder="Enter designation name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                [class.border-red-500]="designationForm.get('DesignationName')?.invalid && designationForm.get('DesignationName')?.touched">
              <div *ngIf="designationForm.get('DesignationName')?.invalid && designationForm.get('DesignationName')?.touched" 
                   class="text-red-500 text-xs mt-1">
                Designation name is required
              </div>
            </div>

            <!-- Designation Code -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Designation Code *
              </label>
              <input
                type="text"
                formControlName="DesignationCode"
                placeholder="Enter designation code"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                [class.border-red-500]="designationForm.get('DesignationCode')?.invalid && designationForm.get('DesignationCode')?.touched">
              <div *ngIf="designationForm.get('DesignationCode')?.invalid && designationForm.get('DesignationCode')?.touched" 
                   class="text-red-500 text-xs mt-1">
                Designation code is required
              </div>
            </div>

            <!-- Department -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                formControlName="DepartmentId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                [class.border-red-500]="designationForm.get('DepartmentId')?.invalid && designationForm.get('DepartmentId')?.touched">
                <option value="">Select department</option>
                <option value="1">Executive</option>
                <option value="2">Finance</option>
                <option value="3">Information Technology</option>
                <option value="4">Human Resources</option>
                <option value="5">Operations</option>
                <option value="6">Sales</option>
              </select>
              <div *ngIf="designationForm.get('DepartmentId')?.invalid && designationForm.get('DepartmentId')?.touched" 
                   class="text-red-500 text-xs mt-1">
                Department is required
              </div>
            </div>

            <!-- Level -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Level *
              </label>
              <select
                formControlName="Level"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent"
                [class.border-red-500]="designationForm.get('Level')?.invalid && designationForm.get('Level')?.touched">
                <option value="">Select level</option>
                <option value="1">Junior</option>
                <option value="2">Senior</option>
                <option value="3">Manager</option>
                <option value="4">Director</option>
                <option value="5">Executive</option>
              </select>
              <div *ngIf="designationForm.get('Level')?.invalid && designationForm.get('Level')?.touched" 
                   class="text-red-500 text-xs mt-1">
                Level is required
              </div>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                formControlName="IsActive"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
                <option [value]="true">Active</option>
                <option [value]="false">Inactive</option>
              </select>
            </div>

            <!-- Description -->
            <div class="md:col-span-2">
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                formControlName="Description"
                rows="3"
                placeholder="Enter designation description"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent resize-none">
              </textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              routerLink="/masters/designations"
              class="px-6 py-2 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="designationForm.invalid || saving"
              class="px-6 py-2 bg-[#2c4170] text-white rounded-md text-base font-medium hover:bg-[#1e2d4f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span *ngIf="saving">Saving...</span>
              <span *ngIf="!saving">{{ isEditMode ? 'Update' : 'Create' }} Designation</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Loading Overlay -->
      <div *ngIf="loading" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="flex items-center space-x-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2c4170]"></div>
            <span>Loading designation...</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DesignationFormComponent implements OnInit {
  designationForm: FormGroup;
  isEditMode = false;
  designationId: number | null = null;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private designationService: DesignationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.designationForm = this.fb.group({
      DesignationName: ['', [Validators.required, Validators.minLength(2)]],
      DesignationCode: ['', [Validators.required, Validators.minLength(2)]],
      DepartmentId: ['', Validators.required],
      Level: ['', Validators.required],
      Description: [''],
      IsActive: [true]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.designationId = +params['id'];
        this.loadDesignation();
      }
    });
  }

  loadDesignation(): void {
    if (!this.designationId) return;

    this.loading = true;
    this.designationService.getDesignationById(this.designationId).subscribe({
      next: (designation) => {
        if (designation) {
          this.designationForm.patchValue({
            DesignationName: designation.DesignationName,
            DesignationCode: designation.DesignationCode,
            DepartmentId: designation.DepartmentId,
            Level: designation.Level,
            Description: designation.Description,
            IsActive: designation.IsActive
          });
        } else {
          this.router.navigate(['/masters/designations']);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading designation:', error);
        this.router.navigate(['/masters/designations']);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.designationForm.valid) {
      this.saving = true;
      const formValue = this.designationForm.value;

      // Set department name based on ID
      const departmentNames: { [key: number]: string } = {
        1: 'Executive',
        2: 'Finance', 
        3: 'Information Technology',
        4: 'Human Resources',
        5: 'Operations',
        6: 'Sales'
      };

      const designationData: Partial<DesignationMaster> = {
        ...formValue,
        DepartmentId: +formValue.DepartmentId,
        Level: +formValue.Level,
        DepartmentName: departmentNames[+formValue.DepartmentId]
      };

      const operation = this.isEditMode
        ? this.designationService.updateDesignation(this.designationId!, designationData)
        : this.designationService.createDesignation(designationData);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/masters/designations']);
        },
        error: (error) => {
          console.error('Error saving designation:', error);
          this.saving = false;
        }
      });
    }
  }
}
