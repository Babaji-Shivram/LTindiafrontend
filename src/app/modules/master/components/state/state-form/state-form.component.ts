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
    <div class="container mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-4">
          <button 
            (click)="goBack()"
            class="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-gray-800">
              {{isEditMode ? 'Edit State' : 'Add New State'}}
            </h1>
            <p class="text-gray-600 mt-1">
              {{isEditMode ? 'Update state information' : 'Create a new state entry'}}
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="max-w-2xl">
        <form [formGroup]="stateForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-md p-8">
          <div class="space-y-6">
            <!-- State Name -->
            <div>
              <label for="stateName" class="block text-sm font-medium text-gray-700 mb-2">
                State Name <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="stateName"
                formControlName="StateName"
                placeholder="Enter state name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                [class.border-red-500]="stateForm.get('StateName')?.invalid && stateForm.get('StateName')?.touched">
              
              <div *ngIf="stateForm.get('StateName')?.invalid && stateForm.get('StateName')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="stateForm.get('StateName')?.errors?.['required']">State name is required</p>
                <p *ngIf="stateForm.get('StateName')?.errors?.['minlength']">State name must be at least 2 characters</p>
                <p *ngIf="stateForm.get('StateName')?.errors?.['maxlength']">State name cannot exceed 100 characters</p>
              </div>
            </div>

            <!-- State Code -->
            <div>
              <label for="stateCode" class="block text-sm font-medium text-gray-700 mb-2">
                State Code <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="stateCode"
                formControlName="StateCode"
                placeholder="Enter state code (e.g., CA, NY, TN)"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 font-mono"
                [class.border-red-500]="stateForm.get('StateCode')?.invalid && stateForm.get('StateCode')?.touched"
                style="text-transform: uppercase;">
              
              <div *ngIf="stateForm.get('StateCode')?.invalid && stateForm.get('StateCode')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="stateForm.get('StateCode')?.errors?.['required']">State code is required</p>
                <p *ngIf="stateForm.get('StateCode')?.errors?.['minlength']">State code must be at least 2 characters</p>
                <p *ngIf="stateForm.get('StateCode')?.errors?.['maxlength']">State code cannot exceed 10 characters</p>
                <p *ngIf="stateForm.get('StateCode')?.errors?.['pattern']">State code can only contain letters, numbers, and hyphens</p>
              </div>
            </div>

            <!-- Country -->
            <div>
              <label for="countryId" class="block text-sm font-medium text-gray-700 mb-2">
                Country <span class="text-red-500">*</span>
              </label>
              <select
                id="countryId"
                formControlName="CountryId"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                [class.border-red-500]="stateForm.get('CountryId')?.invalid && stateForm.get('CountryId')?.touched">
                <option value="">Select a country</option>
                <option *ngFor="let country of countries" [value]="country.lid">
                  {{country.CountryName}} ({{country.CountryCode}})
                </option>
              </select>
              
              <div *ngIf="stateForm.get('CountryId')?.invalid && stateForm.get('CountryId')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="stateForm.get('CountryId')?.errors?.['required']">Please select a country</p>
              </div>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Status</label>
              <div class="flex items-center gap-6">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    formControlName="IsActive"
                    [value]="true"
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                  <span class="ml-2 text-sm text-gray-700 flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                    Active
                  </span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    formControlName="IsActive"
                    [value]="false"
                    class="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500">
                  <span class="ml-2 text-sm text-gray-700 flex items-center gap-2">
                    <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                    Inactive
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              (click)="goBack()"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="stateForm.invalid || isSubmitting"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium flex items-center gap-2">
              <span *ngIf="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              {{isSubmitting ? 'Saving...' : (isEditMode ? 'Update State' : 'Create State')}}
            </button>
          </div>
        </form>

        <!-- Form Validation Summary -->
        <div *ngIf="stateForm.invalid && stateForm.touched" 
             class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul class="text-sm text-red-700 space-y-1">
            <li *ngIf="stateForm.get('StateName')?.invalid && stateForm.get('StateName')?.touched">
              • State name is required and must be between 2-100 characters
            </li>
            <li *ngIf="stateForm.get('StateCode')?.invalid && stateForm.get('StateCode')?.touched">
              • State code is required and must be between 2-10 characters (letters, numbers, hyphens only)
            </li>
            <li *ngIf="stateForm.get('CountryId')?.invalid && stateForm.get('CountryId')?.touched">
              • Please select a country
            </li>
          </ul>
        </div>
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.stateId = Number(id);
      this.loadState(this.stateId);
    }
  }

  loadState(id: number): void {
    this.stateService.getStateById(id).subscribe(state => {
      if (state) {
        this.stateForm.patchValue({
          StateName: state.StateName,
          StateCode: state.StateCode,
          CountryId: state.CountryId,
          IsActive: state.IsActive
        });
      } else {
        this.router.navigate(['/master/states']);
      }
    });
  }

  onSubmit(): void {
    if (this.stateForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.stateForm.value;
      
      // Convert string values to appropriate types
      const stateData: Partial<StateMaster> = {
        StateName: formValue.StateName?.trim(),
        StateCode: formValue.StateCode?.trim().toUpperCase(),
        CountryId: Number(formValue.CountryId),
        IsActive: formValue.IsActive === true || formValue.IsActive === 'true'
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
        this.router.navigate(['/master/states', state.lid]);
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
          this.router.navigate(['/master/states', state.lid]);
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
      this.router.navigate(['/master/states', this.stateId]);
    } else {
      this.router.navigate(['/master/states']);
    }
  }
}
