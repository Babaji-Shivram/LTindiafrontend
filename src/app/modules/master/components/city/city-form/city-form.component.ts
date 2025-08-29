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
    <div class="min-h-screen bg-gray-50 py-4">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Header -->
        <div class="flex items-center mb-4">
          <button 
            (click)="goBack()"
            class="p-2 hover:bg-gray-100 rounded-lg transition duration-200 mr-3">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 class="component-header text-gray-900">
            {{isEditMode ? 'Edit City' : 'Add New City'}}
          </h1>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg border border-gray-200">
          <form [formGroup]="cityForm" (ngSubmit)="onSubmit()">
            <div class="p-4 border-b border-gray-200">
              <h2 class="table-cell font-medium text-gray-900">City Information</h2>
            </div>
            
            <div class="p-4">
              <table class="w-full">
                <tbody>
                  <!-- City Name -->
                  <tr>
                    <td class="px-3 py-1.5 text-xs font-medium text-gray-700 w-1/4">
                      City Name <span class="text-red-500">*</span>
                    </td>
                    <td class="px-3 py-1.5">
                      <input
                        type="text"
                        id="cityName"
                        formControlName="CityName"
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                        placeholder="Enter city name">
                      <div *ngIf="cityForm.get('CityName')?.invalid && cityForm.get('CityName')?.touched" 
                           class="mt-1 text-xs text-red-600">
                        City name is required
                      </div>
                    </td>
                  </tr>

                  <!-- City Code -->
                  <tr>
                    <td class="px-3 py-1.5 text-xs font-medium text-gray-700">
                      City Code <span class="text-red-500">*</span>
                    </td>
                    <td class="px-3 py-1.5">
                      <input
                        type="text"
                        id="cityCode"
                        formControlName="CityCode"
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                        placeholder="Enter city code">
                      <div *ngIf="cityForm.get('CityCode')?.invalid && cityForm.get('CityCode')?.touched" 
                           class="mt-1 text-xs text-red-600">
                        City code is required
                      </div>
                    </td>
                  </tr>

                  <!-- Country -->
                  <tr>
                    <td class="px-3 py-1.5 text-xs font-medium text-gray-700">
                      Country <span class="text-red-500">*</span>
                    </td>
                    <td class="px-3 py-1.5">
                      <select
                        id="country"
                        formControlName="CountryId"
                        (change)="onCountryChange()"
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs">
                        <option value="">Select Country</option>
                        <option *ngFor="let country of countries" [value]="country.lid">
                          {{country.CountryName}}
                        </option>
                      </select>
                      <div *ngIf="cityForm.get('CountryId')?.invalid && cityForm.get('CountryId')?.touched" 
                           class="mt-1 text-xs text-red-600">
                        Country is required
                      </div>
                    </td>
                  </tr>

                  <!-- State -->
                  <tr>
                    <td class="px-3 py-1.5 text-xs font-medium text-gray-700">
                      State <span class="text-red-500">*</span>
                    </td>
                    <td class="px-3 py-1.5">
                      <select
                        id="state"
                        formControlName="StateId"
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                        [disabled]="!cityForm.get('CountryId')?.value">
                        <option value="">Select State</option>
                        <option *ngFor="let state of filteredStates" [value]="state.lid">
                          {{state.StateName}}
                        </option>
                      </select>
                      <div *ngIf="cityForm.get('StateId')?.invalid && cityForm.get('StateId')?.touched" 
                           class="mt-1 text-xs text-red-600">
                        State is required
                      </div>
                    </td>
                  </tr>

                  <!-- Status -->
                  <tr>
                    <td class="px-3 py-1.5 text-xs font-medium text-gray-700">
                      Status
                    </td>
                    <td class="px-3 py-1.5">
                      <label class="inline-flex items-center">
                        <input
                          type="checkbox"
                          formControlName="IsActive"
                          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2">
                        <span class="ml-2 text-xs text-gray-700">Active</span>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Form Actions -->
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                (click)="goBack()"
                class="px-4 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="!cityForm.valid || isLoading"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                [ngClass]="!cityForm.valid || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2c4170] hover:bg-[#1e2d4f] focus:ring-[#2c4170]'">
                <span *ngIf="isLoading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
                <span *ngIf="!isLoading">
                  {{isEditMode ? 'Update City' : 'Create City'}}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class CityFormComponent implements OnInit {
  cityForm!: FormGroup;
  countries: CountryMaster[] = [];
  states: StateMaster[] = [];
  filteredStates: StateMaster[] = [];
  isEditMode = false;
  isLoading = false;
  cityId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private countryService: CountryService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.loadStates();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.cityForm = this.fb.group({
      CityName: ['', [Validators.required]],
      CityCode: ['', [Validators.required]],
      CountryId: ['', [Validators.required]],
      StateId: ['', [Validators.required]],
      IsActive: [true]
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  loadStates(): void {
    this.stateService.getStates().subscribe(states => {
      this.states = states;
    });
  }

  checkEditMode(): void {
    this.cityId = this.route.snapshot.params['id'];
    if (this.cityId) {
      this.isEditMode = true;
      this.loadCity();
    }
  }

  loadCity(): void {
    if (this.cityId) {
      const id = parseInt(this.cityId);
      this.cityService.getCityById(id).subscribe(city => {
        if (city) {
          this.cityForm.patchValue(city);
          this.onCountryChange();
        }
      });
    }
  }

  onCountryChange(): void {
    const countryId = this.cityForm.get('CountryId')?.value;
    if (countryId) {
      this.filteredStates = this.states.filter(state => state.CountryId.toString() === countryId.toString());
    } else {
      this.filteredStates = [];
      this.cityForm.get('StateId')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.cityForm.valid) {
      this.isLoading = true;
      const cityData = this.cityForm.value;

      if (this.isEditMode && this.cityId) {
        const id = parseInt(this.cityId);
        this.cityService.updateCity(id, cityData).subscribe({
          next: () => {
            this.router.navigate(['/masters/cities']);
          },
          error: () => {
            this.isLoading = false;
          }
        });
      } else {
        this.cityService.createCity(cityData).subscribe({
          next: () => {
            this.router.navigate(['/masters/cities']);
          },
          error: () => {
            this.isLoading = false;
          }
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/masters/cities']);
  }
}
