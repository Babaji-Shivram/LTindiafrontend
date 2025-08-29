import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';
import { StateMaster } from '../../../models/state.model';
import { CountryMaster } from '../../../models/country.model';

@Component({
  selector: 'app-state-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-6 py-8" *ngIf="state">
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
            <h1 class="page-title text-gray-800">{{state.StateName}}</h1>
            <p class="text-gray-600 mt-1">State Details</p>
          </div>
          <span 
            [class]="state.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            class="px-3 py-1 text-sm font-semibold rounded-full ml-4">
            {{state.IsActive ? 'Active' : 'Inactive'}}
          </span>
        </div>
        
        <div class="flex gap-3">
          <a 
            [routerLink]="['/masters/states', state.lid, 'edit']"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit State
          </a>
          <button 
            (click)="deleteState()"
            class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete
          </button>
        </div>
      </div>

      <!-- State Information Card -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Information -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="page-title text-gray-800 mb-6">State Information</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- State Name -->
              <div>
                <label class="label-text text-gray-500 mb-2">State Name</label>
                <p class="section-header text-gray-800">{{state.StateName}}</p>
              </div>

              <!-- State Code -->
              <div>
                <label class="label-text text-gray-500 mb-2">State Code</label>
                <p class="text-lg font-mono font-semibold text-gray-800 bg-gray-50 px-3 py-2 rounded-md inline-block">
                  {{state.StateCode}}
                </p>
              </div>

              <!-- Country -->
              <div class="md:col-span-2">
                <label class="label-text text-gray-500 mb-2">Country</label>
                <div class="flex items-center gap-3">
                  <p class="section-header text-gray-800">{{getCountryName()}}</p>
                  <span class="text-sm text-gray-500" *ngIf="country">
                    ({{country.CountryCode}} - {{country.Currency}})
                  </span>
                </div>
              </div>

              <!-- Status -->
              <div>
                <label class="label-text text-gray-500 mb-2">Status</label>
                <div class="flex items-center gap-2">
                  <div 
                    [class]="state.IsActive ? 'bg-green-400' : 'bg-red-400'"
                    class="w-3 h-3 rounded-full">
                  </div>
                  <span 
                    [class]="state.IsActive ? 'text-green-700' : 'text-red-700'"
                    class="font-medium">
                    {{state.IsActive ? 'Active' : 'Inactive'}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metadata Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="section-header text-gray-800 mb-4">Metadata</h3>
            
            <div class="space-y-4">
              <!-- ID -->
              <div>
                <label class="label-text text-gray-500 mb-1">ID</label>
                <p class="text-gray-800 font-mono">#{{state.lid}}</p>
              </div>

              <!-- Created Date -->
              <div>
                <label class="label-text text-gray-500 mb-1">Created Date</label>
                <p class="text-gray-800">{{state.CreatedDate | date:'full'}}</p>
              </div>

              <!-- Created By -->
              <div>
                <label class="label-text text-gray-500 mb-1">Created By</label>
                <p class="text-gray-800">User ID: {{state.CreatedBy}}</p>
              </div>

              <!-- Modified Date -->
              <div *ngIf="state.ModifiedDate">
                <label class="label-text text-gray-500 mb-1">Last Modified</label>
                <p class="text-gray-800">{{state.ModifiedDate | date:'full'}}</p>
              </div>

              <!-- Modified By -->
              <div *ngIf="state.ModifiedBy">
                <label class="label-text text-gray-500 mb-1">Modified By</label>
                <p class="text-gray-800">User ID: {{state.ModifiedBy}}</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 class="section-header text-gray-800 mb-4">Quick Actions</h3>
            
            <div class="space-y-3">
              <a 
                routerLink="/masters/states"
                class="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium block">
                View All States
              </a>
              <a 
                routerLink="/masters/states/new"
                class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium block">
                Add New State
              </a>
              <a 
                [routerLink]="['/master/countries', state.CountryId]"
                class="w-full bg-green-50 hover:bg-green-100 text-green-700 text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium block"
                *ngIf="country">
                View Country Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="container mx-auto px-6 py-8" *ngIf="!state && !error">
      <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Loading state details...</span>
      </div>
    </div>

    <!-- Error State -->
    <div class="container mx-auto px-6 py-8" *ngIf="error">
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">State not found</h3>
        <p class="mt-1 text-sm text-gray-500">The state you're looking for doesn't exist or has been deleted.</p>
        <div class="mt-6">
          <a 
            routerLink="/master/states"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Back to States
          </a>
        </div>
      </div>
    </div>
  `
})
export class StateDetailsComponent implements OnInit {
  state?: StateMaster;
  country?: CountryMaster;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadState(id);
    } else {
      this.error = true;
    }
  }

  loadState(id: number): void {
    this.stateService.getStateById(id).subscribe(state => {
      if (state) {
        this.state = state;
        this.loadCountry(state.CountryId);
      } else {
        this.error = true;
      }
    });
  }

  loadCountry(countryId: number): void {
    this.countryService.getCountryById(countryId).subscribe(country => {
      this.country = country;
    });
  }

  getCountryName(): string {
    return this.country?.CountryName || 'Unknown Country';
  }

  goBack(): void {
    this.router.navigate(['/masters/states']);
  }

  deleteState(): void {
    if (!this.state) return;

    if (confirm(`Are you sure you want to delete the state "${this.state.StateName}"? This action cannot be undone.`)) {
      this.stateService.deleteState(this.state.lid).subscribe(success => {
        if (success) {
          this.router.navigate(['/masters/states']);
        } else {
          alert('Failed to delete state. Please try again.');
        }
      });
    }
  }
}
