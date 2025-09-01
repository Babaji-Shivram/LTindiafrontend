import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Port } from '../../models/port.model';
import { City } from '../../models/city.model';
import { State } from '../../models/state.model';
import { Country } from '../../models/country.model';
import { PortService } from '../../services/port.service';

@Component({
  selector: 'app-port-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="component-header text-gray-900">
          {{ port.lid ? 'Edit Port' : 'Add New Port' }}
        </h3>
        <button (click)="onCancel()" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Port Code -->
          <div>
            <label class="block caption font-medium text-gray-700 mb-1">Port Code *</label>
            <input
              type="text"
              [(ngModel)]="port.PortCode"
              name="PortCode"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption"
              placeholder="Enter port code (e.g., INMAA)">
          </div>

          <!-- Port Name -->
          <div>
            <label class="block caption font-medium text-gray-700 mb-1">Port Name *</label>
            <input
              type="text"
              [(ngModel)]="port.PortName"
              name="PortName"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption"
              placeholder="Enter port name">
          </div>

          <!-- Port Type -->
          <div>
            <label class="block caption font-medium text-gray-700 mb-1">Port Type *</label>
            <select
              [(ngModel)]="port.PortType"
              name="PortType"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption">
              <option value="">Select Port Type</option>
              <option value="Sea">Sea Port</option>
              <option value="Air">Air Port</option>
              <option value="Land">Land Port</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label class="block caption font-medium text-gray-700 mb-1">Status *</label>
            <select
              [(ngModel)]="port.IsActive"
              name="IsActive"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption">
              <option value="">Select Status</option>
              <option [value]="true">Active</option>
              <option [value]="false">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Location Section -->
        <div class="border-t border-gray-200 pt-4">
          <h4 class="caption font-medium text-gray-900 mb-3">Location Details</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Country -->
            <div>
              <label class="block caption font-medium text-gray-700 mb-1">Country *</label>
              <select
                [(ngModel)]="port.CountryId"
                name="CountryId"
                (ngModelChange)="onCountryChange($event)"
                required
                class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption">
                <option value="">Select Country</option>
                <option *ngFor="let country of countries" [value]="country.id">{{ country.name }}</option>
              </select>
            </div>

            <!-- State -->
            <div>
              <label class="block caption font-medium text-gray-700 mb-1">State *</label>
              <select
                [(ngModel)]="port.StateId"
                name="StateId"
                (ngModelChange)="onStateChange($event)"
                [disabled]="!port.CountryId"
                required
                class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption disabled:bg-gray-100">
                <option value="">Select State</option>
                <option *ngFor="let state of filteredStates" [value]="state.id">{{ state.name }}</option>
              </select>
            </div>

            <!-- City -->
            <div>
              <label class="block caption font-medium text-gray-700 mb-1">City *</label>
              <select
                [(ngModel)]="port.CityId"
                name="CityId"
                [disabled]="!port.StateId"
                required
                class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caption disabled:bg-gray-100">
                <option value="">Select City</option>
                <option *ngFor="let city of filteredCities" [value]="city.id">{{ city.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            (click)="onCancel()"
            class="px-4 py-1.5 border border-gray-300 rounded-lg caption font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            style="background-color: #2c4170;"
            class="px-4 py-1.5 rounded-lg caption font-medium text-white hover:opacity-90">
            {{ port.lid ? 'Update Port' : 'Create Port' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class PortFormComponent implements OnInit {
  @Input() port: Partial<Port> = {
    PortCode: '',
    PortName: '',
    PortType: '',
    CityId: 0,
    StateId: 0,
    CountryId: 0,
    IsActive: true
  };

  @Output() save = new EventEmitter<Partial<Port>>();
  @Output() cancel = new EventEmitter<void>();

  countries: Country[] = [];
  filteredStates: State[] = [];
  filteredCities: City[] = [];

  constructor(private portService: PortService) {}

  ngOnInit() {
    this.loadCountries();
    
    // If editing existing port, load related states and cities
    if (this.port.CountryId) {
      this.onCountryChange(this.port.CountryId);
    }
    if (this.port.StateId) {
      this.onStateChange(this.port.StateId);
    }
  }

  loadCountries() {
    this.portService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  onCountryChange(countryId: number) {
    if (countryId) {
      this.portService.getStatesByCountry(countryId).subscribe(states => {
        this.filteredStates = states;
        // Reset state and city when country changes
        if (this.port.CountryId !== countryId) {
          this.port.StateId = 0;
          this.port.CityId = 0;
          this.filteredCities = [];
        }
      });
    } else {
      this.filteredStates = [];
      this.filteredCities = [];
      this.port.StateId = 0;
      this.port.CityId = 0;
    }
  }

  onStateChange(stateId: number) {
    if (stateId) {
      this.portService.getCitiesByState(stateId).subscribe(cities => {
        this.filteredCities = cities;
        // Reset city when state changes
        if (this.port.StateId !== stateId) {
          this.port.CityId = 0;
        }
      });
    } else {
      this.filteredCities = [];
      this.port.CityId = 0;
    }
  }

  onSubmit() {
    this.save.emit(this.port);
  }

  onCancel() {
    this.cancel.emit();
  }
}
