import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { DepartmentMaster } from '../../models/department.model';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Department Management</h1>
            <p class="text-sm text-gray-600 mt-1">Manage organizational departments and hierarchy</p>
          </div>
          <button 
            routerLink="/masters/departments/new"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Department
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="border-b border-gray-200 px-6 py-4 bg-gray-50">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search departments..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Status:</label>
            <select 
              [(ngModel)]="statusFilter" 
              (change)="applyFilters()"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="px-6 py-12 text-center">
        <div class="text-gray-500">Loading departments...</div>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let department of filteredDepartments; trackBy: trackByDepartment" 
                class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-blue-600 font-semibold text-sm">{{ department.DepartmentCode }}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ department.DepartmentName }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {{ department.DepartmentCode }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ department.DepartmentHead }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate" [title]="department.Description">
                  {{ department.Description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span *ngIf="department.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
                <span *ngIf="!department.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inactive
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                  <button 
                    [routerLink]="['/masters/departments', department.lid]"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
                  </button>
                  <button 
                    [routerLink]="['/masters/departments', department.lid, 'edit']"
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Edit
                  </button>
                  <button 
                    (click)="deleteDepartment(department)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div *ngIf="filteredDepartments.length === 0" class="px-6 py-12 text-center">
          <div class="text-gray-500">
            <div class="text-lg font-medium mb-2">No departments found</div>
            <div class="text-sm">{{ searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first department' }}</div>
          </div>
        </div>
      </div>

      <!-- Footer with Summary -->
      <div *ngIf="!isLoading && departments.length > 0" class="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <div>
            Total: {{ departments.length }} departments 
            ({{ getActiveDepartmentsCount() }} active, 
             {{ getInactiveDepartmentsCount() }} inactive)
          </div>
        </div>
      </div>
    </div>
  `
})
export class DepartmentListComponent implements OnInit {
  departments: DepartmentMaster[] = [];
  filteredDepartments: DepartmentMaster[] = [];
  
  searchTerm = '';
  statusFilter = '';
  isLoading = false;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.departments];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(department =>
        department.DepartmentName.toLowerCase().includes(term) ||
        department.DepartmentCode.toLowerCase().includes(term) ||
        department.DepartmentHead.toLowerCase().includes(term) ||
        department.Description.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(department => {
        if (this.statusFilter === 'active') return department.IsActive;
        if (this.statusFilter === 'inactive') return !department.IsActive;
        return true;
      });
    }

    this.filteredDepartments = filtered;
  }

  deleteDepartment(department: DepartmentMaster): void {
    if (confirm(`Are you sure you want to delete ${department.DepartmentName}?`)) {
      this.departmentService.deleteDepartment(department.lid).subscribe({
        next: (success) => {
          if (success) {
            this.loadDepartments();
          } else {
            alert('Failed to delete department.');
          }
        },
        error: (error) => {
          console.error('Error deleting department:', error);
          alert('Error deleting department.');
        }
      });
    }
  }

  trackByDepartment(index: number, department: DepartmentMaster): number {
    return department.lid;
  }

  getActiveDepartmentsCount(): number {
    return this.departments.filter(d => d.IsActive).length;
  }

  getInactiveDepartmentsCount(): number {
    return this.departments.filter(d => !d.IsActive).length;
  }
}
