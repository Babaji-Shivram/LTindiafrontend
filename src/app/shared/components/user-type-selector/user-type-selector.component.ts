import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserType, UserTypeLabels, UserTypeColors } from '../../../modules/identity/models/user.model';

@Component({
  selector: 'app-user-type-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-type-selector">
      <label for="userType" class="form-label">User Type *</label>
      <select 
        id="userType"
        class="form-select w-full"
        [value]="selectedUserType"
        (change)="onUserTypeChange($event)"
        [disabled]="disabled">
        <option value="">Select User Type</option>
        <option *ngFor="let type of userTypes" [value]="type.value">
          {{ type.label }}
        </option>
      </select>
      
      <!-- User Type Description -->
      <div *ngIf="selectedUserType" class="user-type-info mt-2 p-3 rounded-lg border">
        <div class="flex items-center space-x-2 mb-2">
          <span [class]="getSelectedTypeClass()" class="px-2 py-1 text-xs font-medium rounded-full">
            {{ getSelectedTypeLabel() }}
          </span>
          <span class="text-sm font-medium text-gray-700">
            {{ getSelectedTypeLabel() }}
          </span>
        </div>
        <p class="text-sm text-gray-600">{{ getSelectedTypeDescription() }}</p>
        
        <!-- Access Level Indicator -->
        <div class="mt-2 text-xs text-gray-500">
          <strong>Access Level:</strong> {{ getAccessLevel() }}
        </div>
      </div>

      <!-- Warning for External Users -->
      <div *ngIf="isExternalUserType()" 
           class="warning-box mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm font-medium text-yellow-800">External User</span>
        </div>
        <p class="text-sm text-yellow-700 mt-1">
          This user type has limited access and requires additional verification.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .form-label {
      @apply block text-sm font-medium text-gray-700 mb-1;
    }
    
    .form-select {
      @apply px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
    }
    
    .form-select:disabled {
      @apply bg-gray-100 text-gray-500 cursor-not-allowed;
    }
    
    .user-type-info {
      @apply bg-blue-50 border-blue-200;
    }
    
    .warning-box {
      @apply bg-yellow-50 border-yellow-200;
    }
  `]
})
export class UserTypeSelectorComponent {
  @Input() selectedUserType?: UserType;
  @Input() disabled = false;
  @Input() showDescription = true;

  @Output() userTypeChange = new EventEmitter<UserType | undefined>();

  userTypes = [
    { 
      value: UserType.INTERNAL, 
      label: UserTypeLabels[UserType.INTERNAL],
      description: 'Full-time employees with complete system access',
      accessLevel: 'Full Access'
    },
    { 
      value: UserType.CUSTOMER, 
      label: UserTypeLabels[UserType.CUSTOMER],
      description: 'External customers with limited portal access',
      accessLevel: 'Customer Portal'
    },
    { 
      value: UserType.AGENT, 
      label: UserTypeLabels[UserType.AGENT],
      description: 'External partners and agents with specific module access',
      accessLevel: 'Partner Access'
    },
    { 
      value: UserType.ADMIN, 
      label: UserTypeLabels[UserType.ADMIN],
      description: 'System administrators with unrestricted access',
      accessLevel: 'Administrative'
    }
  ];

  onUserTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const userType = target.value ? Number(target.value) as UserType : undefined;
    
    this.selectedUserType = userType;
    this.userTypeChange.emit(userType);
  }

  getSelectedTypeClass(): string {
    if (!this.selectedUserType) return '';
    return UserTypeColors[this.selectedUserType] || 'bg-gray-100 text-gray-800';
  }

  getSelectedTypeLabel(): string {
    if (!this.selectedUserType) return '';
    return this.userTypes.find(t => t.value === this.selectedUserType)?.label || '';
  }

  getSelectedTypeDescription(): string {
    if (!this.selectedUserType) return '';
    return this.userTypes.find(t => t.value === this.selectedUserType)?.description || '';
  }

  getAccessLevel(): string {
    if (!this.selectedUserType) return '';
    return this.userTypes.find(t => t.value === this.selectedUserType)?.accessLevel || '';
  }

  isExternalUserType(): boolean {
    return this.selectedUserType === UserType.CUSTOMER || this.selectedUserType === UserType.AGENT;
  }

  isValidSelection(): boolean {
    return this.selectedUserType !== undefined;
  }

  getValidationMessage(): string {
    return this.isValidSelection() ? '' : 'Please select a user type';
  }
}
