import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Department, Division, Company } from '../../../modules/identity/models/user.model';
import { OrganizationService } from '../../../modules/identity/services/organization.service';

@Component({
  selector: 'app-organization-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="organization-selector space-y-4">
      <!-- Company Selection (if multi-company) -->
      <div *ngIf="showCompanySelector" class="form-group">
        <label for="company" class="form-label">Company *</label>
        <select 
          id="company"
          class="form-select w-full"
          [value]="selectedCompanyId"
          (change)="onCompanyChange($event)"
          [disabled]="disabled">
          <option value="">Select Company</option>
          <option *ngFor="let company of companies" [value]="company.id">
            {{ company.name }} ({{ company.code }})
          </option>
        </select>
      </div>

      <!-- Department Selection -->
      <div class="form-group">
        <label for="department" class="form-label">Department *</label>
        <select 
          id="department"
          class="form-select w-full"
          [value]="selectedDepartmentId"
          (change)="onDepartmentChange($event)"
          [disabled]="disabled || !availableDepartments.length">
          <option value="">Select Department</option>
          <option *ngFor="let dept of availableDepartments" [value]="dept.id">
            {{ dept.name }} ({{ dept.code }})
          </option>
        </select>
      </div>

      <!-- Division Selection -->
      <div class="form-group">
        <label for="division" class="form-label">Division</label>
        <select 
          id="division"
          class="form-select w-full"
          [value]="selectedDivisionId"
          (change)="onDivisionChange($event)"
          [disabled]="disabled || !availableDivisions.length">
          <option value="">Select Division</option>
          <option *ngFor="let div of availableDivisions" [value]="div.id">
            {{ div.name }} ({{ div.code }})
          </option>
        </select>
        <div class="form-help text-sm text-gray-500 mt-1">
          Divisions are sub-units within departments
        </div>
      </div>

      <!-- Selection Summary -->
      <div *ngIf="showSummary && (selectedDepartment || selectedDivision)" 
           class="selection-summary bg-gray-50 p-3 rounded-lg border">
        <h4 class="font-medium text-gray-700 mb-2">Selection Summary</h4>
        <div class="space-y-1 text-sm">
          <div *ngIf="selectedCompany" class="flex">
            <span class="font-medium text-gray-600 w-20">Company:</span>
            <span class="text-gray-800">{{ selectedCompany.name }}</span>
          </div>
          <div *ngIf="selectedDepartment" class="flex">
            <span class="font-medium text-gray-600 w-20">Department:</span>
            <span class="text-gray-800">{{ selectedDepartment.name }}</span>
          </div>
          <div *ngIf="selectedDivision" class="flex">
            <span class="font-medium text-gray-600 w-20">Division:</span>
            <span class="text-gray-800">{{ selectedDivision.name }}</span>
          </div>
        </div>
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
    
    .form-help {
      @apply text-xs text-gray-500 mt-1;
    }
    
    .selection-summary {
      @apply bg-blue-50 border-blue-200;
    }
  `]
})
export class OrganizationSelectorComponent implements OnInit {
  @Input() selectedCompanyId?: number;
  @Input() selectedDepartmentId?: number;
  @Input() selectedDivisionId?: number;
  @Input() disabled = false;
  @Input() showCompanySelector = false;
  @Input() showSummary = true;

  @Output() companyChange = new EventEmitter<number | undefined>();
  @Output() departmentChange = new EventEmitter<number | undefined>();
  @Output() divisionChange = new EventEmitter<number | undefined>();
  @Output() selectionChange = new EventEmitter<{
    company?: Company;
    department?: Department;
    division?: Division;
  }>();

  companies: Company[] = [];
  departments: Department[] = [];
  divisions: Division[] = [];

  availableDepartments: Department[] = [];
  availableDivisions: Division[] = [];

  selectedCompany?: Company;
  selectedDepartment?: Department;
  selectedDivision?: Division;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.loadOrganizationData();
  }

  async loadOrganizationData(): Promise<void> {
    try {
      // Load all organization data
      this.companies = await firstValueFrom(this.organizationService.getCompanies()) || [];
      const masterDepartments = await firstValueFrom(this.organizationService.getDepartments()) || [];
      // Convert DepartmentMaster to Department interface
      this.departments = masterDepartments.map(dept => ({
        id: dept.lid,
        department_id: dept.lid,
        name: dept.DepartmentName,
        department_name: dept.DepartmentName,
        code: dept.DepartmentCode,
        description: dept.Description,
        status: dept.IsActive ? 'Active' : 'Inactive'
      }));
      this.divisions = await firstValueFrom(this.organizationService.getDivisions()) || [];

      // Initialize selections
      this.updateAvailableDepartments();
      this.updateSelections();
    } catch (error) {
      console.error('Error loading organization data:', error);
    }
  }

  onCompanyChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const companyId = target.value ? Number(target.value) : undefined;
    
    this.selectedCompanyId = companyId;
    this.selectedDepartmentId = undefined;
    this.selectedDivisionId = undefined;
    
    this.updateAvailableDepartments();
    this.updateSelections();
    
    this.companyChange.emit(companyId);
    this.departmentChange.emit(undefined);
    this.divisionChange.emit(undefined);
    this.emitSelectionChange();
  }

  onDepartmentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departmentId = target.value ? Number(target.value) : undefined;
    
    this.selectedDepartmentId = departmentId;
    this.selectedDivisionId = undefined;
    
    this.updateAvailableDivisions();
    this.updateSelections();
    
    this.departmentChange.emit(departmentId);
    this.divisionChange.emit(undefined);
    this.emitSelectionChange();
  }

  onDivisionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const divisionId = target.value ? Number(target.value) : undefined;
    
    this.selectedDivisionId = divisionId;
    this.updateSelections();
    
    this.divisionChange.emit(divisionId);
    this.emitSelectionChange();
  }

  private updateAvailableDepartments(): void {
    if (this.showCompanySelector && this.selectedCompanyId) {
      this.availableDepartments = this.departments.filter(
        dept => dept.company_id === this.selectedCompanyId && dept.status === 'Active'
      );
    } else {
      this.availableDepartments = this.departments.filter(dept => dept.status === 'Active');
    }
    
    this.updateAvailableDivisions();
  }

  private updateAvailableDivisions(): void {
    if (this.selectedDepartmentId) {
      this.availableDivisions = this.divisions.filter(
        div => div.department_id === this.selectedDepartmentId && div.status === 'Active'
      );
    } else {
      this.availableDivisions = [];
    }
  }

  private updateSelections(): void {
    this.selectedCompany = this.companies.find(c => c.id === this.selectedCompanyId);
    this.selectedDepartment = this.departments.find(d => d.id === this.selectedDepartmentId);
    this.selectedDivision = this.divisions.find(d => d.id === this.selectedDivisionId);
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit({
      company: this.selectedCompany,
      department: this.selectedDepartment,
      division: this.selectedDivision
    });
  }

  // Public methods for external validation
  isValid(): boolean {
    return !!this.selectedDepartmentId;
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];
    
    if (this.showCompanySelector && !this.selectedCompanyId) {
      errors.push('Company is required');
    }
    
    if (!this.selectedDepartmentId) {
      errors.push('Department is required');
    }
    
    return errors;
  }

  reset(): void {
    this.selectedCompanyId = undefined;
    this.selectedDepartmentId = undefined;
    this.selectedDivisionId = undefined;
    this.updateAvailableDepartments();
    this.updateSelections();
  }
}
