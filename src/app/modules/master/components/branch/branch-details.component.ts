import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-branch-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg border border-gray-200 p-6" *ngIf="branch">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-base font-medium text-gray-900">{{ branch.BranchName }}</h3>
          <p class="text-xs text-gray-600">Branch Details</p>
        </div>
        <span [class]="getStatusBadge(branch.IsActive)">{{ branch.IsActive ? 'Active' : 'Inactive' }}</span>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4 class="text-xs font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>
          
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-500">Branch Code</label>
              <p class="text-xs text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{{ branch.BranchCode }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500">Branch Name</label>
              <p class="text-xs text-gray-900">{{ branch.BranchName }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500">Manager</label>
              <p class="text-xs text-gray-900">{{ branch.BranchManager }}</p>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500">Status</label>
              <span [class]="getStatusBadge(branch.IsActive)">{{ branch.IsActive ? 'Active' : 'Inactive' }}</span>
            </div>
          </div>
        </div>

        <!-- Contact & Location -->
        <div class="space-y-4">
          <h4 class="text-xs font-medium text-gray-900 border-b border-gray-200 pb-2">Contact & Location</h4>
          
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-500">Address</label>
              <p class="text-xs text-gray-900">{{ branch.BranchAddress }}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-500">City</label>
                <p class="text-xs text-gray-900">{{ branch.BranchCity }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">State</label>
                <p class="text-xs text-gray-900">{{ branch.BranchState }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-500">Country</label>
                <p class="text-xs text-gray-900">{{ branch.BranchCountry }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Pincode</label>
                <p class="text-xs text-gray-900">{{ branch.BranchPinCode }}</p>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500">Email</label>
              <p class="text-xs text-gray-900">
                <a href="mailto:{{ branch.BranchEmail }}" class="text-blue-600 hover:text-blue-800">{{ branch.BranchEmail }}</a>
              </p>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-500">Phone</label>
              <p class="text-xs text-gray-900">
                <a href="tel:{{ branch.BranchPhone }}" class="text-blue-600 hover:text-blue-800">{{ branch.BranchPhone }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-500">Created At</label>
            <p class="text-xs text-gray-900">{{ branch.CreatedDate | date:'medium' }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500">Last Updated</label>
            <p class="text-xs text-gray-900">{{ branch.ModifiedDate | date:'medium' }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BranchDetailsComponent {
  @Input() branch: Branch | null = null;

  getStatusBadge(isActive: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return isActive 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }
}
