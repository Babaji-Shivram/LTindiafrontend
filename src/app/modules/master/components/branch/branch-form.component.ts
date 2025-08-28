import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-base font-medium text-gray-900">
          {{ branch.lid ? 'Edit Branch' : 'Add New Branch' }}
        </h3>
        <button (click)="onCancel()" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Branch Code -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Branch Code *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchCode"
              name="BranchCode"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter branch code">
          </div>

          <!-- Branch Name -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Branch Name *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchName"
              name="BranchName"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter branch name">
          </div>

          <!-- Manager -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Manager *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchManager"
              name="BranchManager"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter manager name">
          </div>
        </div>

        <!-- Address -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Address *</label>
          <textarea
            [(ngModel)]="branch.BranchAddress"
            name="BranchAddress"
            required
            rows="3"
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            placeholder="Enter complete address"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- City -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchCity"
              name="BranchCity"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter city">
          </div>

          <!-- State -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">State *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchState"
              name="BranchState"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter state">
          </div>

          <!-- Country -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Country *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchCountry"
              name="BranchCountry"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter country">
          </div>

          <!-- Pincode -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Pincode *</label>
            <input
              type="text"
              [(ngModel)]="branch.BranchPinCode"
              name="BranchPinCode"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter pincode">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Email -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              [(ngModel)]="branch.BranchEmail"
              name="BranchEmail"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter email address">
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              [(ngModel)]="branch.BranchPhone"
              name="BranchPhone"
              required
              class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter phone number">
          </div>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Status *</label>
          <select
            [(ngModel)]="branch.IsActive"
            name="IsActive"
            required
            class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs md:w-48">
            <option value="">Select Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            (click)="onCancel()"
            class="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            style="background-color: #2c4170;"
            class="px-4 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90">
            {{ branch.lid ? 'Update Branch' : 'Create Branch' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class BranchFormComponent {
  @Input() branch: Partial<Branch> = {
    BranchCode: '',
    BranchName: '',
    BranchAddress: '',
    BranchCity: '',
    BranchState: '',
    BranchCountry: 'India',
    BranchPinCode: '',
    BranchEmail: '',
    BranchPhone: '',
    BranchManager: '',
    IsActive: true
  };

  @Output() save = new EventEmitter<Partial<Branch>>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.branch);
  }

  onCancel() {
    this.cancel.emit();
  }
}
