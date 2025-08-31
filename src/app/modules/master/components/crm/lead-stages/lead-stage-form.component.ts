import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface LeadStage {
  id?: string;
  stageName: string;
  description: string;
  stageCategory: 'Pipeline' | 'Won' | 'Lost';
  stageColor: string;
  sortOrder: number;
  targetDays?: number;
  requiresApproval: boolean;
  flags: {
    isPipeline: boolean;
    isWon: boolean;
    isLost: boolean;
  };
  isActive: boolean;
}

@Component({
  selector: 'app-lead-stage-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title text-gray-900">{{ isEditMode ? 'Edit' : 'Create' }} Lead Stage</h1>
          <p class="secondary-text text-gray-600">{{ isEditMode ? 'Update' : 'Define a new' }} lead pipeline stage with workflow settings</p>
        </div>
        <button type="button" class="btn btn-outline" (click)="goBack()">
          <span class="material-icons text-sm mr-2">arrow_back</span>
          Back to Stages
        </button>
      </div>

      <!-- Stage Form -->
      <form [formGroup]="stageForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Basic Information</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Stage Name -->
            <div>
              <label for="stageName" class="form-label">Stage Name <span class="text-red-500">*</span></label>
              <input
                id="stageName"
                type="text"
                formControlName="stageName"
                placeholder="e.g., Qualified Lead"
                class="w-full input-text"
                [class.border-red-300]="stageForm.get('stageName')?.invalid && stageForm.get('stageName')?.touched">
              <div *ngIf="stageForm.get('stageName')?.invalid && stageForm.get('stageName')?.touched" class="mt-1 text-sm text-red-600">
                Stage name is required and must be at least 2 characters
              </div>
            </div>

            <!-- Stage Category -->
            <div>
              <label for="stageCategory" class="form-label">Stage Category <span class="text-red-500">*</span></label>
              <select
                id="stageCategory"
                formControlName="stageCategory"
                class="w-full input-text"
                (change)="onCategoryChange()"
                [class.border-red-300]="stageForm.get('stageCategory')?.invalid && stageForm.get('stageCategory')?.touched">
                <option value="">Select Category</option>
                <option value="Pipeline">Pipeline Stage</option>
                <option value="Won">Won Stage</option>
                <option value="Lost">Lost Stage</option>
              </select>
              <div *ngIf="stageForm.get('stageCategory')?.invalid && stageForm.get('stageCategory')?.touched" class="mt-1 text-sm text-red-600">
                Please select a stage category
              </div>
            </div>

            <!-- Description -->
            <div class="lg:col-span-2">
              <label for="description" class="form-label">Description</label>
              <textarea
                id="description"
                formControlName="description"
                rows="3"
                placeholder="Brief description of what this stage represents..."
                class="w-full input-text resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- Visual & Workflow Settings -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Visual & Workflow Settings</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Stage Color -->
            <div>
              <label for="stageColor" class="form-label">Stage Color <span class="text-red-500">*</span></label>
              <div class="flex items-center gap-3">
                <input
                  id="stageColor"
                  type="color"
                  formControlName="stageColor"
                  class="w-12 h-10 rounded border border-gray-300 cursor-pointer">
                <input
                  type="text"
                  formControlName="stageColor"
                  placeholder="#0079bf"
                  class="flex-1 input-text"
                  pattern="^#[0-9A-Fa-f]{6}$">
              </div>
              <div class="mt-2 flex gap-2">
                <button
                  type="button"
                  *ngFor="let color of predefinedColors"
                  class="w-8 h-8 rounded border-2 cursor-pointer transition-all duration-200"
                  [style.background-color]="color"
                  [class.border-gray-800]="stageForm.get('stageColor')?.value === color"
                  [class.border-gray-300]="stageForm.get('stageColor')?.value !== color"
                  (click)="selectColor(color)"
                  [title]="color">
                </button>
              </div>
              <div *ngIf="stageForm.get('stageColor')?.invalid && stageForm.get('stageColor')?.touched" class="mt-1 text-sm text-red-600">
                Please select a valid color
              </div>
            </div>

            <!-- Sort Order -->
            <div>
              <label for="sortOrder" class="form-label">Sort Order <span class="text-red-500">*</span></label>
              <input
                id="sortOrder"
                type="number"
                formControlName="sortOrder"
                min="1"
                max="100"
                placeholder="1"
                class="w-full input-text"
                [class.border-red-300]="stageForm.get('sortOrder')?.invalid && stageForm.get('sortOrder')?.touched">
              <div class="mt-1 text-sm text-gray-500">Determines the order in which stages appear</div>
              <div *ngIf="stageForm.get('sortOrder')?.invalid && stageForm.get('sortOrder')?.touched" class="mt-1 text-sm text-red-600">
                Sort order must be between 1 and 100
              </div>
            </div>

            <!-- Target Days (Pipeline only) -->
            <div *ngIf="stageForm.get('stageCategory')?.value === 'Pipeline'">
              <label for="targetDays" class="form-label">Target Days</label>
              <input
                id="targetDays"
                type="number"
                formControlName="targetDays"
                min="1"
                max="365"
                placeholder="7"
                class="w-full input-text">
              <div class="mt-1 text-sm text-gray-500">Expected number of days a lead should stay in this stage</div>
            </div>

            <!-- Requires Approval -->
            <div>
              <div class="flex items-center">
                <input
                  id="requiresApproval"
                  type="checkbox"
                  formControlName="requiresApproval"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <label for="requiresApproval" class="ml-2 form-label">Requires Management Approval</label>
              </div>
              <div class="mt-1 text-sm text-gray-500">When enabled, moving leads to this stage requires manager approval</div>
            </div>

            <!-- Is Active -->
            <div>
              <div class="flex items-center">
                <input
                  id="isActive"
                  type="checkbox"
                  formControlName="isActive"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <label for="isActive" class="ml-2 form-label">Active Stage</label>
              </div>
              <div class="mt-1 text-sm text-gray-500">Inactive stages are hidden from the lead pipeline</div>
            </div>
          </div>
        </div>

        <!-- Stage Preview -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Stage Preview</h3>
          
          <div class="space-y-4">
            <!-- Kanban Card Preview -->
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Kanban Card Preview</h4>
              <div
                class="stage-preview-card"
                [style.border-left-color]="stageForm.get('stageColor')?.value || '#0079bf'">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="stage-color-preview" [style.background-color]="stageForm.get('stageColor')?.value || '#0079bf'"></div>
                    <div>
                      <div class="font-medium text-gray-900">{{ stageForm.get('stageName')?.value || 'Stage Name' }}</div>
                      <div class="text-sm text-gray-500">{{ stageForm.get('description')?.value || 'Stage description' }}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span *ngIf="stageForm.get('requiresApproval')?.value" class="badge badge-warning">Approval</span>
                    <span class="badge badge-info">0 leads</span>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>Order: {{ stageForm.get('sortOrder')?.value || 1 }}</span>
                  <span *ngIf="stageForm.get('targetDays')?.value">Target: {{ stageForm.get('targetDays')?.value }} days</span>
                </div>
              </div>
            </div>

            <!-- Badge Preview -->
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Category Badge</h4>
              <span class="badge" [ngClass]="{
                'badge-info': stageForm.get('stageCategory')?.value === 'Pipeline',
                'badge-success': stageForm.get('stageCategory')?.value === 'Won',
                'badge-error': stageForm.get('stageCategory')?.value === 'Lost',
                'badge-gray': !stageForm.get('stageCategory')?.value
              }">{{ stageForm.get('stageCategory')?.value || 'Category' }}</span>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-4 pt-6">
          <button type="button" class="btn btn-outline" (click)="goBack()">Cancel</button>
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="stageForm.invalid || isSubmitting">
            <span *ngIf="isSubmitting" class="material-icons animate-spin text-sm mr-2">refresh</span>
            {{ isEditMode ? 'Update' : 'Create' }} Stage
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .stage-preview-card {
      @apply p-4 border border-gray-200 rounded-lg bg-blue-50;
      border-left-width: 4px;
    }

    .stage-color-preview {
      @apply w-4 h-4 rounded-full border border-gray-300 flex-shrink-0;
    }

    .badge {
      @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
    }

    .badge-info { @apply bg-blue-100 text-blue-800; }
    .badge-success { @apply bg-green-100 text-green-800; }
    .badge-error { @apply bg-red-100 text-red-800; }
    .badge-warning { @apply bg-yellow-100 text-yellow-800; }
    .badge-gray { @apply bg-gray-100 text-gray-800; }

    .btn {
      @apply inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium transition-colors duration-200;
    }

    .btn-primary {
      @apply bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
    }

    .btn-outline {
      @apply bg-white text-gray-700 border-gray-300 hover:bg-gray-50;
    }

    .form-label {
      @apply block text-sm font-medium text-gray-700 mb-1;
    }

    .input-text {
      @apply px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500;
    }
  `]
})
export class LeadStageFormComponent implements OnInit {
  stageForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  stageId: string | null = null;

  predefinedColors = [
    '#0079bf', '#d75a4a', '#f2d600', '#ff9f19', 
    '#c377e0', '#ff78cb', '#00c2e0', '#51e898',
    '#c9372c', '#8e44ad', '#27ae60', '#f39c12',
    '#95a5a6', '#34495e', '#e74c3c', '#9b59b6'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stageForm = this.createForm();
  }

  ngOnInit(): void {
    this.stageId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.stageId;

    if (this.isEditMode && this.stageId) {
      this.loadStageData(this.stageId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      stageName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      stageCategory: ['', [Validators.required]],
      stageColor: ['#0079bf', [Validators.required, Validators.pattern(/^#[0-9A-Fa-f]{6}$/)]],
      sortOrder: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      targetDays: [null, [Validators.min(1), Validators.max(365)]],
      requiresApproval: [false],
      isActive: [true]
    });
  }

  loadStageData(stageId: string): void {
    // Mock data loading - in real app, this would call a service
    const mockStage: LeadStage = {
      id: stageId,
      stageName: 'Qualified Lead',
      description: 'Leads that have been qualified and meet basic criteria',
      stageCategory: 'Pipeline',
      stageColor: '#00c2e0',
      sortOrder: 2,
      targetDays: 5,
      requiresApproval: false,
      flags: { isPipeline: true, isWon: false, isLost: false },
      isActive: true
    };

    this.stageForm.patchValue(mockStage);
  }

  onCategoryChange(): void {
    const category = this.stageForm.get('stageCategory')?.value;
    
    // Clear target days for non-pipeline stages
    if (category !== 'Pipeline') {
      this.stageForm.get('targetDays')?.setValue(null);
    }

    // Set default colors based on category
    const defaultColors = {
      'Pipeline': '#0079bf',
      'Won': '#27ae60',
      'Lost': '#95a5a6'
    };

    if (category && defaultColors[category as keyof typeof defaultColors]) {
      this.stageForm.get('stageColor')?.setValue(defaultColors[category as keyof typeof defaultColors]);
    }
  }

  selectColor(color: string): void {
    this.stageForm.get('stageColor')?.setValue(color);
  }

  onSubmit(): void {
    if (this.stageForm.valid) {
      this.isSubmitting = true;
      
      const formData = this.stageForm.value;
      
      // Set stage flags based on category
      const flags = {
        isPipeline: formData.stageCategory === 'Pipeline',
        isWon: formData.stageCategory === 'Won',
        isLost: formData.stageCategory === 'Lost'
      };

      const stageData: LeadStage = {
        ...formData,
        flags,
        id: this.isEditMode ? this.stageId : undefined
      };

      // Mock API call
      setTimeout(() => {
        console.log('Stage data:', stageData);
        this.isSubmitting = false;
        this.goBack();
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.stageForm.controls).forEach(key => {
        this.stageForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/masters/crm/lead-stages']);
  }
}
