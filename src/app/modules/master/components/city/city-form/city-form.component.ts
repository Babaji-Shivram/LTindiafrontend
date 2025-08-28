import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
import { StateService } from '../../../services/state.service';
import { CityMaster } from '../../../models/city.model';
import { CountryMaster } from '../../../models/country.model';
import { StateMaster } from '../../../models/state.model';

@Component({
  selector: 'app-city-form',
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
              {{isEditMode ? 'Edit City' : 'Add New City'}}
            </h1>
            <p class="text-gray-600 mt-1">
              {{isEditMode ? 'Update city information' : 'Create a new city entry'}}
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="max-w-2xl">
        <form [formGroup]="cityForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-md p-8">
          <div class="space-y-6">
            <!-- City Name -->
            <div>
              <label for="cityName" class="block text-sm font-medium text-gray-700 mb-2">
                City Name <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cityName"
                formControlName="CityName"
                placeholder="Enter city name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                [class.border-red-500]="cityForm.get('CityName')?.invalid && cityForm.get('CityName')?.touched">
              
              <div *ngIf="cityForm.get('CityName')?.invalid && cityForm.get('CityName')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="cityForm.get('CityName')?.errors?.['required']">City name is required</p>
                <p *ngIf="cityForm.get('CityName')?.errors?.['minlength']">City name must be at least 2 characters</p>
                <p *ngIf="cityForm.get('CityName')?.errors?.['maxlength']">City name cannot exceed 100 characters</p>
              </div>
            </div>

            <!-- City Code -->
            <div>
              <label for="cityCode" class="block text-sm font-medium text-gray-700 mb-2">
                City Code <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cityCode"
                formControlName="CityCode"
                placeholder="Enter city code (e.g., CHN, NYC, LON)"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 font-mono"
                [class.border-red-500]="cityForm.get('CityCode')?.invalid && cityForm.get('CityCode')?.touched"
                style="text-transform: uppercase;">
              
              <div *ngIf="cityForm.get('CityCode')?.invalid && cityForm.get('CityCode')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="cityForm.get('CityCode')?.errors?.['required']">City code is required</p>
                <p *ngIf="cityForm.get('CityCode')?.errors?.['minlength']">City code must be at least 2 characters</p>
                <p *ngIf="cityForm.get('CityCode')?.errors?.['maxlength']">City code cannot exceed 10 characters</p>
                <p *ngIf="cityForm.get('CityCode')?.errors?.['pattern']">City code can only contain letters, numbers, and hyphens</p>
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
                (change)="onCountryChange()"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                [class.border-red-500]="cityForm.get('CountryId')?.invalid && cityForm.get('CountryId')?.touched">
                <option value="">Select a country</option>
                <option *ngFor="let country of countries" [value]="country.lid">
                  {{country.CountryName}} ({{country.CountryCode}})
                </option>
              </select>
              
              <div *ngIf="cityForm.get('CountryId')?.invalid && cityForm.get('CountryId')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="cityForm.get('CountryId')?.errors?.['required']">Please select a country</p>
              </div>
            </div>

            <!-- State -->
            <div>
              <label for="stateId" class="block text-sm font-medium text-gray-700 mb-2">
                State <span class="text-red-500">*</span>
              </label>
              <select
                id="stateId"
                formControlName="StateId"
                [disabled]="!cityForm.get('CountryId')?.value"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:bg-gray-100"
                [class.border-red-500]="cityForm.get('StateId')?.invalid && cityForm.get('StateId')?.touched">
                <option value="">{{cityForm.get('CountryId')?.value ? 'Select a state' : 'Select country first'}}</option>
                <option *ngFor="let state of filteredStates" [value]="state.lid">
                  {{state.StateName}} ({{state.StateCode}})
                </option>
              </select>
              
              <div *ngIf="cityForm.get('StateId')?.invalid && cityForm.get('StateId')?.touched" 
                   class="mt-2 text-sm text-red-600">
                <p *ngIf="cityForm.get('StateId')?.errors?.['required']">Please select a state</p>
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
              [disabled]="cityForm.invalid || isSubmitting"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium flex items-center gap-2">
              <span *ngIf="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              {{isSubmitting ? 'Saving...' : (isEditMode ? 'Update City' : 'Create City')}}
            </button>
          </div>
        </form>

        <!-- Form Validation Summary -->
        <div *ngIf="cityForm.invalid && cityForm.touched" 
             class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul class="text-sm text-red-700 space-y-1">
            <li *ngIf="cityForm.get('CityName')?.invalid && cityForm.get('CityName')?.touched">
              • City name is required and must be between 2-100 characters
            </li>
            <li *ngIf="cityForm.get('CityCode')?.invalid && cityForm.get('CityCode')?.touched">
              • City code is required and must be between 2-10 characters (letters, numbers, hyphens only)
            </li>
            <li *ngIf="cityForm.get('CountryId')?.invalid && cityForm.get('CountryId')?.touched">
              • Please select a country
            </li>
            <li *ngIf="cityForm.get('StateId')?.invalid && cityForm.get('StateId')?.touched">
              • Please select a state
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class CityFormComponent implements OnInit {
  cityForm: FormGroup;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;
  cityId?: number;
  countries: CountryMaster[] = [];
  states: StateMaster[] = [];
  filteredStates: StateMaster[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cityService: CityService,
    private countryService: CountryService,
    private stateService: StateService
  ) {
    this.cityForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.loadStates();
    this.checkEditMode();
  }

  createForm(): FormGroup {
    return this.fb.group({
      CityName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      CityCode: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
        Validators.pattern(/^[A-Za-z0-9\-]+$/)
      ]],
      CountryId: ['', [Validators.required]],
      StateId: ['', [Validators.required]],
      IsActive: [true]
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries.filter(country => country.IsActive);
    });
  }

  loadStates(): void {
    this.stateService.getStates().subscribe(states => {
      this.states = states;
    });
  }

  onCountryChange(): void {
    const countryId = this.cityForm.get('CountryId')?.value;
    this.cityForm.get('StateId')?.setValue('');
    
    if (countryId) {
      this.filteredStates = this.states.filter(state => 
        state.CountryId.toString() === countryId && state.IsActive
      );
    } else {
      this.filteredStates = [];
    }
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.cityId = Number(id);
      this.loadCity(this.cityId);
    }
  }

  loadCity(id: number): void {
    this.cityService.getCityById(id).subscribe(city => {
      if (city) {
        this.cityForm.patchValue({
          CityName: city.CityName,
          CityCode: city.CityCode,
          CountryId: city.CountryId,
          StateId: city.StateId,
          IsActive: city.IsActive
        });
        
        // Load states for the selected country
        this.filteredStates = this.states.filter(state => 
          state.CountryId === city.CountryId && state.IsActive
        );
      } else {
        this.router.navigate(['/masters/cities']);
      }
    });
  }

  onSubmit(): void {
    if (this.cityForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.cityForm.value;
      
      // Convert string values to appropriate types
      const cityData: Partial<CityMaster> = {
        CityName: formValue.CityName?.trim(),
        CityCode: formValue.CityCode?.trim().toUpperCase(),
        CountryId: Number(formValue.CountryId),
        StateId: Number(formValue.StateId),
        IsActive: formValue.IsActive === true || formValue.IsActive === 'true'
      };

      if (this.isEditMode && this.cityId) {
        this.updateCity(this.cityId, cityData);
      } else {
        this.createCity(cityData);
      }
    }
  }

  createCity(cityData: Partial<CityMaster>): void {
    this.cityService.createCity(cityData).subscribe({
      next: (city) => {
        this.router.navigate(['/masters/cities', city.lid]);
      },
      error: (error) => {
        console.error('Error creating city:', error);
        alert('Failed to create city. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  updateCity(id: number, cityData: Partial<CityMaster>): void {
    this.cityService.updateCity(id, cityData).subscribe({
      next: (city) => {
        if (city) {
          this.router.navigate(['/masters/cities', city.lid]);
        } else {
          alert('Failed to update city. Please try again.');
          this.isSubmitting = false;
        }
      },
      error: (error) => {
        console.error('Error updating city:', error);
        alert('Failed to update city. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    if (this.isEditMode && this.cityId) {
      this.router.navigate(['/masters/cities', this.cityId]);
    } else {
      this.router.navigate(['/masters/cities']);
    }
  }
}
