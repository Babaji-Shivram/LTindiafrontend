import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DesignationService } from '../../services/designation.service';
import { DesignationMaster, DesignationFilter } from '../../models/designation.model';

@Component({
  selector: 'app-designation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title text-gray-900">Designations</h1>
          <p class="text-sm text-gray-600">Manage organizational designations and roles</p>
        </div>
        <button 
          routerLink="/masters/designations/new"
          class="bg-[#2c4170] btn-text-primary px-4 py-2 rounded-lg hover:bg-[#1e2d4f] transition-colors">
          Add Designation
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              [(ngModel)]="filter.searchTerm"
              (input)="applyFilters()"
              placeholder="Search designations..."
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
          </div>

          <!-- Department Filter -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Department</label>
            <select
              [(ngModel)]="filter.departmentId"
              (change)="applyFilters()"
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              <option value="">All Departments</option>
              <option value="1">Executive</option>
              <option value="2">Finance</option>
              <option value="3">Information Technology</option>
              <option value="4">Human Resources</option>
              <option value="5">Operations</option>
              <option value="6">Sales</option>
            </select>
          </div>

          <!-- Level Filter -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Level</label>
            <select
              [(ngModel)]="filter.level"
              (change)="applyFilters()"
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              <option value="">All Levels</option>
              <option value="1">Junior</option>
              <option value="2">Senior</option>
              <option value="3">Manager</option>
              <option value="4">Director</option>
              <option value="5">Executive</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              [(ngModel)]="filter.isActive"
              (change)="applyFilters()"
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2c4170] focus:border-transparent">
              <option value="">All Status</option>
              <option [value]="true">Active</option>
              <option [value]="false">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Clear Filters -->
        <div class="mt-4 flex justify-end">
          <button
            (click)="clearFilters()"
            class="text-sm text-gray-600 hover:text-gray-800">
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2c4170]"></div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" *ngIf="!loading">
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-xs text-gray-500">Total Designations</div>
          <div class="page-title text-gray-900">{{ getTotalDesignationsCount() }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-xs text-gray-500">Active Designations</div>
          <div class="page-title text-green-600">{{ getActiveDesignationsCount() }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-xs text-gray-500">Inactive Designations</div>
          <div class="page-title text-red-600">{{ getInactiveDesignationsCount() }}</div>
        </div>
      </div>

      <!-- Designations Table -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden" *ngIf="!loading">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Designation
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Code
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Department
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Level
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left table-header uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let designation of filteredDesignations" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="component-header text-gray-900">{{ designation.DesignationName }}</div>
                  <div class="text-xs text-gray-500" *ngIf="designation.Description">{{ designation.Description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900 font-mono">{{ designation.DesignationCode }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900">{{ designation.DepartmentName }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class]="getLevelBadgeClass(designation.Level)">
                    {{ getLevelName(designation.Level) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class]="designation.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ designation.IsActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap table-cell font-medium">
                  <div class="flex space-x-2">
                    <button
                      [routerLink]="['/masters/designations', designation.lid, 'edit']"
                      class="text-[#2c4170] hover:text-[#1e2d4f]">
                      Edit
                    </button>
                    <button
                      *ngIf="designation.IsActive"
                      (click)="deactivateDesignation(designation.lid)"
                      class="text-red-600 hover:text-red-800">
                      Deactivate
                    </button>
                    <button
                      *ngIf="!designation.IsActive"
                      (click)="activateDesignation(designation.lid)"
                      class="text-green-600 hover:text-green-800">
                      Activate
                    </button>
                    <button
                      (click)="deleteDesignation(designation.lid)"
                      class="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredDesignations.length === 0" class="text-center py-8">
          <div class="text-gray-500">
            <p class="text-base">No designations found</p>
            <p class="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DesignationListComponent implements OnInit {
  designations: DesignationMaster[] = [];
  filteredDesignations: DesignationMaster[] = [];
  loading = false;

  filter: DesignationFilter = {
    searchTerm: '',
    departmentId: undefined,
    level: undefined,
    isActive: undefined
  };

  constructor(private designationService: DesignationService) {}

  ngOnInit(): void {
    this.loadDesignations();
  }

  loadDesignations(): void {
    this.loading = true;
    this.designationService.getAllDesignations().subscribe({
      next: (data) => {
        this.designations = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading designations:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.designationService.getFilteredDesignations(this.filter).subscribe({
      next: (data) => {
        this.filteredDesignations = data;
      },
      error: (error) => {
        console.error('Error filtering designations:', error);
      }
    });
  }

  clearFilters(): void {
    this.filter = {
      searchTerm: '',
      departmentId: undefined,
      level: undefined,
      isActive: undefined
    };
    this.applyFilters();
  }

  activateDesignation(id: number): void {
    this.designationService.activateDesignation(id).subscribe({
      next: () => {
        this.loadDesignations();
      },
      error: (error) => {
        console.error('Error activating designation:', error);
      }
    });
  }

  deactivateDesignation(id: number): void {
    if (confirm('Are you sure you want to deactivate this designation?')) {
      this.designationService.deactivateDesignation(id).subscribe({
        next: () => {
          this.loadDesignations();
        },
        error: (error) => {
          console.error('Error deactivating designation:', error);
        }
      });
    }
  }

  deleteDesignation(id: number): void {
    if (confirm('Are you sure you want to delete this designation? This action cannot be undone.')) {
      this.designationService.deleteDesignation(id).subscribe({
        next: () => {
          this.loadDesignations();
        },
        error: (error) => {
          console.error('Error deleting designation:', error);
        }
      });
    }
  }

  getLevelName(level: number): string {
    return this.designationService.getLevelName(level);
  }

  getLevelBadgeClass(level: number): string {
    const classes: { [key: number]: string } = {
      1: 'bg-blue-100 text-blue-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-purple-100 text-purple-800',
      5: 'bg-red-100 text-red-800'
    };
    return classes[level] || 'bg-gray-100 text-gray-800';
  }

  getTotalDesignationsCount(): number {
    return this.designations.length;
  }

  getActiveDesignationsCount(): number {
    return this.designations.filter(d => d.IsActive).length;
  }

  getInactiveDesignationsCount(): number {
    return this.designations.filter(d => !d.IsActive).length;
  }
}
