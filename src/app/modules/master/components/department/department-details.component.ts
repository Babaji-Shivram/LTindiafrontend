import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { DepartmentMaster } from '../../models/department.model';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="page-title text-gray-900">Department Details</h1>
            <p class="text-sm text-gray-600 mt-1">View detailed information about this department</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              [routerLink]="['/masters/departments', department.lid, 'edit']"
              *ngIf="department"
              class="bg-blue-600 hover:bg-blue-700 btn-text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Edit Department
            </button>
            <button 
              routerLink="/masters/departments"
              class="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm font-medium">
              Back to List
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="px-6 py-12 text-center">
        <div class="text-gray-500">Loading department details...</div>
      </div>

      <!-- Error State -->
      <div *ngIf="!isLoading && !department" class="px-6 py-12 text-center">
        <div class="text-red-600 text-lg font-medium mb-2">Department Not Found</div>
        <div class="text-gray-600 mb-4">The requested department could not be found.</div>
        <button 
          routerLink="/masters/departments"
          class="bg-blue-600 hover:bg-blue-700 btn-text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Back to Department List
        </button>
      </div>

      <!-- Department Details -->
      <div *ngIf="!isLoading && department" class="p-6">
        <!-- Status Badge -->
        <div class="mb-6">
          <span *ngIf="department.IsActive" 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Active Department
          </span>
          <span *ngIf="!department.IsActive" 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <span class="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
            Inactive Department
          </span>
        </div>

        <!-- Main Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Basic Information -->
          <div class="space-y-6">
            <div>
              <h2 class="section-header text-gray-900 mb-4">Basic Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department Name</label>
                  <div class="mt-1 section-header text-gray-900">{{ department.DepartmentName }}</div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department Code</label>
                  <div class="mt-1">
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-mono bg-gray-100 text-gray-800">
                      {{ department.DepartmentCode }}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department Head</label>
                  <div class="mt-1 text-lg text-gray-900">{{ department.DepartmentHead }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Organizational Information -->
          <div class="space-y-6">
            <div>
              <h2 class="section-header text-gray-900 mb-4">Organizational Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department ID</label>
                  <div class="mt-1 text-sm font-mono text-gray-600">{{ department.lid }}</div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <div class="mt-1">
                    <span *ngIf="department.IsActive" class="text-green-600 font-medium">Active</span>
                    <span *ngIf="!department.IsActive" class="text-red-600 font-medium">Inactive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div *ngIf="department.Description" class="mb-8">
          <h2 class="section-header text-gray-900 mb-4">Description</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-gray-700 leading-relaxed">{{ department.Description }}</p>
          </div>
        </div>

        <!-- Audit Information -->
        <div class="border-t border-gray-200 pt-6">
          <h2 class="section-header text-gray-900 mb-4">Audit Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Created Date</label>
              <div class="mt-1 text-sm text-gray-600">
                {{ formatDate(department.CreatedDate) }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Created By</label>
              <div class="mt-1 text-sm text-gray-600">
                User ID: {{ department.CreatedBy }}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button 
            routerLink="/masters/departments"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Back to List
          </button>
          <button 
            [routerLink]="['/masters/departments', department.lid, 'edit']"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Edit Department
          </button>
        </div>
      </div>
    </div>
  `
})
export class DepartmentDetailsComponent implements OnInit {
  department: DepartmentMaster | undefined = undefined;
  isLoading = false;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const departmentId = +params['id'];
        this.loadDepartment(departmentId);
      }
    });
  }

  loadDepartment(id: number): void {
    this.isLoading = true;
    this.departmentService.getDepartmentById(id).subscribe({
      next: (department) => {
        this.department = department || undefined;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading department:', error);
        this.department = undefined;
        this.isLoading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
