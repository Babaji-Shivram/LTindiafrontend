import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisionService } from '../../services/division.service';
import { DivisionMaster } from '../../models/division.model';

@Component({
  selector: 'app-division-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="component-header text-[#2c4170]">{{ isEditMode ? 'Edit Division' : 'Add New Division' }}</h1>
          <p class="text-xs text-gray-600 mt-1">{{ isEditMode ? 'Update division information' : 'Create a new organizational division' }}</p>
        </div>
        <button 
          (click)="onCancel()"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]">
          <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to List
        </button>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <form (ngSubmit)="onSubmit()" #divisionForm="ngForm" class="p-6 space-y-6">
          
          <!-- Basic Information -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label for="divisionName" class="block text-xs font-medium text-gray-700 mb-1">Division Name *</label>
                <input
                  type="text"
                  id="divisionName"
                  name="divisionName"
                  [(ngModel)]="division.DivisionName"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter division name">
              </div>

              <div>
                <label for="divisionCode" class="block text-xs font-medium text-gray-700 mb-1">Division Code *</label>
                <input
                  type="text"
                  id="divisionCode"
                  name="divisionCode"
                  [(ngModel)]="division.DivisionCode"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter division code">
              </div>

              <div>
                <label for="divisionHead" class="block text-xs font-medium text-gray-700 mb-1">Division Head *</label>
                <input
                  type="text"
                  id="divisionHead"
                  name="divisionHead"
                  [(ngModel)]="division.DivisionHead"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter division head name">
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Additional Information</h3>
            
            <div class="mb-4">
              <label for="description" class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                [(ngModel)]="division.Description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170] resize-none"
                placeholder="Enter division description"
              ></textarea>
            </div>

            <!-- Active Status -->
            <div class="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                [(ngModel)]="division.IsActive"
                class="h-4 w-4 text-[#2c4170] focus:ring-[#2c4170] border-gray-300 rounded"
              >
              <label for="isActive" class="ml-2 text-xs font-medium text-gray-700">
                Active Division
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              (click)="onCancel()"
              class="px-4 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!divisionForm.form.valid"
              class="px-4 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-[#2c4170] hover:bg-[#1e2d4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ isEditMode ? 'Update Division' : 'Create Division' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class DivisionFormComponent implements OnInit {
  division: Partial<DivisionMaster> = {
    DivisionName: '',
    DivisionCode: '',
    Description: '',
    DivisionHead: '',
    IsActive: true,
    bDel: false,
    CreatedBy: 1
  };

  isEditMode = false;
  divisionId?: number;

  constructor(
    private divisionService: DivisionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.divisionId = +params['id'];
        this.loadDivision();
      }
    });
  }

  loadDivision(): void {
    if (this.divisionId) {
      this.divisionService.getDivisionById(this.divisionId).subscribe(
        division => {
          if (division) {
            this.division = division;
          }
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.divisionId) {
      this.divisionService.updateDivision(this.divisionId, this.division).subscribe(
        () => {
          this.router.navigate(['/masters/divisions']);
        }
      );
    } else {
      this.divisionService.createDivision(this.division as Omit<DivisionMaster, 'lid' | 'CreatedDate' | 'ModifiedDate'>).subscribe(
        () => {
          this.router.navigate(['/masters/divisions']);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/masters/divisions']);
  }
}
