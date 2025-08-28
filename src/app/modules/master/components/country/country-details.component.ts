import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CountryMaster } from '../../models/country.model';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
            <h3 class="text-base font-medium text-gray-900">Country Details</h3>
            <p class="text-xs text-gray-600">View country information and settings</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button 
            [routerLink]="'/master/countries/' + country?.lid + '/edit'"
            style="background-color: #2c4170;" 
            class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
            <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            Edit
          </button>
        </div>
      </div>

      <!-- Country Details Card -->
      <div *ngIf="country" class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <!-- Country Header -->
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-12 w-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
              <span class="text-sm font-bold text-gray-700">{{ country.CountryCode }}</span>
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-medium text-gray-900">{{ country.CountryName }}</h4>
              <div class="flex items-center space-x-2 mt-1">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      [class]="country.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ country.IsActive ? 'Active' : 'Inactive' }}
                </span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ country.Currency }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="space-y-4">
              <h5 class="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h5>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Country ID</label>
                  <div class="text-sm text-gray-900">#{{ country.lid }}</div>
                </div>
                
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Country Name</label>
                  <div class="text-sm text-gray-900">{{ country.CountryName }}</div>
                </div>
                
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Country Code</label>
                  <div class="text-sm text-gray-900">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ country.CountryCode }}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Default Currency</label>
                  <div class="text-sm text-gray-900">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ country.Currency }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status & Audit Information -->
            <div class="space-y-4">
              <h5 class="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">Status & Audit</h5>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <div class="text-sm">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          [class]="country.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path *ngIf="country.IsActive" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        <path *ngIf="!country.IsActive" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                      </svg>
                      {{ country.IsActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>
                
                <div *ngIf="country.CreatedDate">
                  <label class="block text-xs font-medium text-gray-500 mb-1">Created Date</label>
                  <div class="text-sm text-gray-900">{{ country.CreatedDate | date:'dd/MM/yyyy HH:mm' }}</div>
                </div>
                
                <div *ngIf="country.CreatedBy">
                  <label class="block text-xs font-medium text-gray-500 mb-1">Created By</label>
                  <div class="text-sm text-gray-900">User #{{ country.CreatedBy }}</div>
                </div>
                
                <div *ngIf="country.ModifiedDate">
                  <label class="block text-xs font-medium text-gray-500 mb-1">Last Modified</label>
                  <div class="text-sm text-gray-900">{{ country.ModifiedDate | date:'dd/MM/yyyy HH:mm' }}</div>
                </div>
                
                <div *ngIf="country.ModifiedBy">
                  <label class="block text-xs font-medium text-gray-500 mb-1">Modified By</label>
                  <div class="text-sm text-gray-900">User #{{ country.ModifiedBy }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="!country" class="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div class="text-gray-500 text-sm">Loading country details...</div>
      </div>
    </div>
  `
})
export class CountryDetailsComponent implements OnInit {
  country: CountryMaster | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCountry(id);
    }
  }

  loadCountry(id: number) {
    this.countryService.getCountryById(id).subscribe(country => {
      this.country = country || null;
    });
  }

  goBack() {
    this.router.navigate(['/master/countries']);
  }
}
