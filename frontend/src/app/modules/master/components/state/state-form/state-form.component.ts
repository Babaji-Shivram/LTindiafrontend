import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';
import { StateMaster } from '../../../models/state.model';
import { CountryMaster } from '../../../models/country.model';

@Component({
  selector: 'app-state-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <button (click)="goBack()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h3 class="component-header text-gray-900">
              {{ isEditMode ? 'Edit State' : 'Add New State' }}
            </h3>
            <p class="text-xs text-gray-600">
              {{ isEditMode ? 'Update state information' : 'Create a new state entry' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <form [formGroup]="stateForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <!-- Basic Information Section -->
          <div>
            <h4 class="form-section-header text-gray-900 mb-4 border-b border-gray-200 pb-2">Basic Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- State Name -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">State Name *</label>
                <input
                  type="text"
                  formControlName="StateName"
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
                  placeholder="Enter state name">
                <div *ngIf="stateForm.get('StateName')?.errors?.['required'] && stateForm.get('StateName')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  State name is required
                </div>
              </div>

              <!-- State Code -->
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">State Code *</label>
                <input
                  type="text"
                  formControlName="StateCode"
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs uppercase"
                  placeholder="ENTER STATE CODE (E.G., CA, NY, TN)"
                  maxlength="10">
                <div *ngIf="stateForm.get('StateCode')?.errors?.['required'] && stateForm.get('StateCode')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  State code is required
                </div>
              </div>
            </div>
          </div>

          <!-- Country Selection -->
          <div>
            <h4 class="form-section-header text-gray-900 mb-4 border-b border-gray-200 pb-2">Location Details</h4>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Country *</label>
                <select
                  formControlName="CountryId"
                  class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
                  <option value="">Select a country</option>
                  <option *ngFor="let country of countries" [value]="country.lid">
                    {{country.CountryName}}
                  </option>
                </select>
                <div *ngIf="stateForm.get('CountryId')?.errors?.['required'] && stateForm.get('CountryId')?.touched" 
                     class="text-red-500 text-xs mt-1">
                  Country is required
                </div>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div>
            <h4 class="form-section-header text-gray-900 mb-4 border-b border-gray-200 pb-2">Status</h4>
            <div class="flex items-center space-x-6">
              <label class="flex items-center">
                <input
                  type="radio"
                  formControlName="IsActive"
                  [value]="true"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                <span class="ml-2 text-xs text-gray-700">
                  <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Active
                </span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  formControlName="IsActive"
                  [value]="false"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                <span class="ml-2 text-xs text-gray-700">
                  <span class="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                  Inactive
                </span>
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              (click)="goBack()"
              class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!stateForm.valid || isSubmitting"
              style="background-color: #2c4170;"
              class="px-4 py-2 rounded-lg text-xs font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="isSubmitting" class="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></span>
              {{ isEditMode ? 'Update State' : 'Create State' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class StateFormComponent implements OnInit {
  stateForm: FormGroup;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;
  stateId?: number;
  countries: CountryMaster[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private countryService: CountryService
  ) {
    this.stateForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.checkEditMode();
  }

  createForm(): FormGroup {
    return this.fb.group({
      StateName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      StateCode: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
        Validators.pattern(/^[A-Za-z0-9\-]+$/)
      ]],
      CountryId: ['', [Validators.required]],
      IsActive: [true]
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries.filter(country => country.IsActive);
    });
  }

  checkEditMode(): void {
    this.stateId = this.route.snapshot.params['id'];
    if (this.stateId) {
      this.isEditMode = true;
      this.loadState();
    }
  }

  loadState(): void {
    if (!this.stateId) return;

    this.stateService.getStateById(this.stateId).subscribe(state => {
      if (state) {
        this.stateForm.patchValue({
          StateName: state.StateName,
          StateCode: state.StateCode,
          CountryId: state.CountryId,
          IsActive: state.IsActive
        });
      } else {
        this.router.navigate(['/masters/states']);
      }
    });
  }

  onSubmit(): void {
    if (this.stateForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.stateForm.value;
      
      const stateData: Partial<StateMaster> = {
        StateName: formValue.StateName,
        StateCode: formValue.StateCode.toUpperCase(),
        CountryId: parseInt(formValue.CountryId),
        IsActive: formValue.IsActive
      };

      if (this.isEditMode && this.stateId) {
        this.updateState(this.stateId, stateData);
      } else {
        this.createState(stateData);
      }
    }
  }

  createState(stateData: Partial<StateMaster>): void {
    this.stateService.createState(stateData).subscribe({
      next: (state) => {
        this.router.navigate(['/masters/states', state.lid]);
      },
      error: (error) => {
        console.error('Error creating state:', error);
        alert('Failed to create state. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  updateState(id: number, stateData: Partial<StateMaster>): void {
    this.stateService.updateState(id, stateData).subscribe({
      next: (state) => {
        if (state) {
          this.router.navigate(['/masters/states', state.lid]);
        } else {
          alert('Failed to update state. Please try again.');
          this.isSubmitting = false;
        }
      },
      error: (error) => {
        console.error('Error updating state:', error);
        alert('Failed to update state. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    if (this.isEditMode && this.stateId) {
      this.router.navigate(['/masters/states', this.stateId]);
    } else {
      this.router.navigate(['/masters/states']);
    }
  }
}
