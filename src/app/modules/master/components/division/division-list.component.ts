import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DivisionService } from '../../services/division.service';
import { DivisionMaster } from '../../models/division.model';

@Component({
  selector: 'app-division-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="page-title text-gray-900">Division Management</h1>
            <p class="text-sm text-gray-600 mt-1">Manage organizational divisions and operations</p>
          </div>
          <button 
            routerLink="/masters/divisions/new"
            class="bg-[#2c4170] hover:bg-[#1e2d4f] btn-text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Division
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
              placeholder="Search divisions..."
              class="w-full input-text px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2c4170] focus:border-[#2c4170]">
          </div>
          
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Status:</label>
            <select 
              [(ngModel)]="statusFilter" 
              (change)="applyFilters()"
              class="input-text px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2c4170] focus:border-[#2c4170]">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="px-6 py-12 text-center">
        <div class="text-gray-500">Loading divisions...</div>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Division</th>
              <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Code</th>
              <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Head</th>
              <th class="px-6 py-3 text-left table-header uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-center table-header uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-center table-header uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let division of filteredDivisions; trackBy: trackByDivision" 
                class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-[#2c4170] font-semibold text-sm">{{ division.DivisionCode }}</span>
                  </div>
                  <div>
                    <div class="table-cell font-medium text-gray-900">{{ division.DivisionName }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {{ division.DivisionCode }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ division.DivisionHead }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate" [title]="division.Description">
                  {{ division.Description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span *ngIf="division.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
                <span *ngIf="!division.IsActive" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inactive
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                  <button 
                    [routerLink]="['/masters/divisions', division.lid]"
                    class="text-[#2c4170] hover:text-[#1e2d4f] text-sm font-medium">
                    View
                  </button>
                  <button 
                    [routerLink]="['/masters/divisions', division.lid, 'edit']"
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Edit
                  </button>
                  <button 
                    (click)="deleteDivision(division)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div *ngIf="filteredDivisions.length === 0" class="px-6 py-12 text-center">
          <div class="text-gray-500">
            <div class="text-lg font-medium mb-2">No divisions found</div>
            <div class="text-sm">{{ searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first division' }}</div>
          </div>
        </div>
      </div>

      <!-- Footer with Summary -->
      <div *ngIf="!isLoading && divisions.length > 0" class="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <div>
            Total: {{ divisions.length }} divisions 
            ({{ getActiveDivisionsCount() }} active, 
             {{ getInactiveDivisionsCount() }} inactive)
          </div>
        </div>
      </div>
    </div>
  `
})
export class DivisionListComponent implements OnInit {
  divisions: DivisionMaster[] = [];
  filteredDivisions: DivisionMaster[] = [];
  
  searchTerm = '';
  statusFilter = '';
  isLoading = false;

  constructor(private divisionService: DivisionService) {}

  ngOnInit(): void {
    this.loadDivisions();
  }

  loadDivisions(): void {
    this.isLoading = true;
    this.divisionService.getDivisions().subscribe({
      next: (divisions) => {
        this.divisions = divisions;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading divisions:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.divisions];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(division =>
        division.DivisionName.toLowerCase().includes(term) ||
        division.DivisionCode.toLowerCase().includes(term) ||
        division.DivisionHead.toLowerCase().includes(term) ||
        division.Description.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(division => {
        if (this.statusFilter === 'active') return division.IsActive;
        if (this.statusFilter === 'inactive') return !division.IsActive;
        return true;
      });
    }

    this.filteredDivisions = filtered;
  }

  deleteDivision(division: DivisionMaster): void {
    if (confirm(`Are you sure you want to delete ${division.DivisionName}?`)) {
      this.divisionService.deleteDivision(division.lid).subscribe({
        next: (success) => {
          if (success) {
            this.loadDivisions();
          } else {
            alert('Failed to delete division.');
          }
        },
        error: (error) => {
          console.error('Error deleting division:', error);
          alert('Error deleting division.');
        }
      });
    }
  }

  trackByDivision(index: number, division: DivisionMaster): number {
    return division.lid;
  }

  getActiveDivisionsCount(): number {
    return this.divisions.filter(d => d.IsActive).length;
  }

  getInactiveDivisionsCount(): number {
    return this.divisions.filter(d => !d.IsActive).length;
  }
}
