import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Port } from '../../models/port.model';
import { PortService } from '../../services/port.service';

@Component({
  selector: 'app-port-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg border border-gray-200 p-6" *ngIf="port">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="component-header text-gray-900">{{ port.PortName }}</h3>
          <p class="caption text-gray-600">Port Details</p>
        </div>
        <span [class]="getStatusBadge(port.IsActive)">{{ port.IsActive ? 'Active' : 'Inactive' }}</span>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4 class="caption font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>
          
          <div class="space-y-3">
            <div>
              <label class="block caption font-medium text-gray-500">Port Code</label>
              <p class="caption text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{{ port.PortCode }}</p>
            </div>

            <div>
              <label class="block caption font-medium text-gray-500">Port Name</label>
              <p class="caption text-gray-900">{{ port.PortName }}</p>
            </div>

            <div>
              <label class="block caption font-medium text-gray-500">Port Type</label>
              <span [class]="getPortTypeBadge(port.PortType)">{{ port.PortType }}</span>
            </div>

            <div>
              <label class="block caption font-medium text-gray-500">Status</label>
              <span [class]="getStatusBadge(port.IsActive)">{{ port.IsActive ? 'Active' : 'Inactive' }}</span>
            </div>
          </div>
        </div>

        <!-- Location Information -->
        <div class="space-y-4">
          <h4 class="caption font-medium text-gray-900 border-b border-gray-200 pb-2">Location Information</h4>
          
          <div class="space-y-3">
            <div>
              <label class="block caption font-medium text-gray-500">Country</label>
              <p class="caption text-gray-900">{{ getCountryName(port.CountryId) }}</p>
            </div>

            <div>
              <label class="block caption font-medium text-gray-500">State</label>
              <p class="caption text-gray-900">{{ getStateName(port.StateId) }}</p>
            </div>

            <div>
              <label class="block caption font-medium text-gray-500">City</label>
              <p class="caption text-gray-900">{{ getCityName(port.CityId) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block caption font-medium text-gray-500">Created At</label>
            <p class="caption text-gray-900">{{ port.CreatedDate | date:'medium' }}</p>
          </div>
          <div *ngIf="port.ModifiedDate">
            <label class="block caption font-medium text-gray-500">Last Updated</label>
            <p class="caption text-gray-900">{{ port.ModifiedDate | date:'medium' }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PortDetailsComponent {
  @Input() port: Port | null = null;

  constructor(private portService: PortService) {}

  getPortTypeBadge(type: string): string {
    const baseClasses = 'inline-flex px-2 py-1 caption font-semibold rounded-full';
    switch (type) {
      case 'Sea':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Air':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Land':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadge(isActive: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 caption font-semibold rounded-full';
    return isActive 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }

  // Helper methods to get names from IDs
  getCityName(cityId: number): string {
    return this.portService.getCityName(cityId);
  }

  getStateName(stateId: number): string {
    return this.portService.getStateName(stateId);
  }

  getCountryName(countryId: number): string {
    return this.portService.getCountryName(countryId);
  }
}
