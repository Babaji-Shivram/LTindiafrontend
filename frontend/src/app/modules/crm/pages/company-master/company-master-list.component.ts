import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

import { CompanyMasterService } from '../../services/company-master.service';
import { 
  CRMCompanyMaster, 
  CompanyFilterOptions, 
  CompanyMasterResponse 
} from '../../interfaces/company-master.interface';

@Component({
  selector: 'app-company-master-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="company-master-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <span class="material-icons">business</span>
            Company Master (CRM)
          </h1>
          <p class="page-subtitle">Manage prospect and lead companies</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" routerLink="/crm/companies/new">
            <span class="material-icons">add</span>
            Add Company
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-card">
        <form [formGroup]="filterForm" class="filters-form">
          <div class="filter-group">
            <label for="searchTerm">Search Companies</label>
            <div class="search-input">
              <span class="material-icons">search</span>
              <input 
                type="text" 
                id="searchTerm"
                formControlName="searchTerm"
                placeholder="Search by name, email, or contact person..."
                class="form-control">
            </div>
          </div>
          
          <div class="filter-group">
            <label for="isActive">Status</label>
            <select id="isActive" formControlName="isActive" class="form-control">
              <option value="">All Companies</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>

          <div class="filter-actions">
            <button type="button" class="btn btn-secondary" (click)="clearFilters()">
              <span class="material-icons">clear</span>
              Clear
            </button>
          </div>
        </form>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading companies...</p>
      </div>

      <!-- Companies Table -->
      <div *ngIf="!loading" class="companies-card">
        <div class="table-header">
          <h3>Companies ({{ response?.totalCount || 0 }})</h3>
          <div class="table-actions">
            <button class="btn btn-outline" (click)="exportCompanies()">
              <span class="material-icons">download</span>
              Export
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="companies-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Added Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let company of companies" class="company-row">
                <td class="company-name">
                  <div class="company-info">
                    <h4>{{ company.sName }}</h4>
                    <p *ngIf="company.website">
                      <a [href]="company.website" target="_blank" class="website-link">
                        {{ company.website }}
                      </a>
                    </p>
                  </div>
                </td>
                <td>
                  <div class="contact-info">
                    <span class="contact-name">{{ company.contactPerson }}</span>
                  </div>
                </td>
                <td>
                  <a [href]="'mailto:' + company.email" class="email-link">
                    {{ company.email }}
                  </a>
                </td>
                <td>
                  <a [href]="'tel:' + company.mobileNo" class="phone-link">
                    {{ company.mobileNo }}
                  </a>
                </td>
                <td>
                  <div class="location-info">
                    <span>{{ company.officeLocation || company.addressLine1 }}</span>
                  </div>
                </td>
                <td>
                  <span class="date">{{ company.dEntry | date:'dd/MM/yyyy' }}</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button 
                      class="btn-icon btn-view" 
                      [routerLink]="['/crm/companies', company.lid]"
                      title="View Details">
                      <span class="material-icons">visibility</span>
                    </button>
                    <button 
                      class="btn-icon btn-edit" 
                      [routerLink]="['/crm/companies', company.lid, 'edit']"
                      title="Edit Company">
                      <span class="material-icons">edit</span>
                    </button>
                    <button 
                      class="btn-icon btn-convert" 
                      (click)="convertToCustomer(company)"
                      title="Convert to Customer"
                      [disabled]="isConverting === company.lid">
                      <span class="material-icons">swap_horiz</span>
                    </button>
                    <button 
                      class="btn-icon btn-delete" 
                      (click)="deleteCompany(company)"
                      title="Delete Company">
                      <span class="material-icons">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div *ngIf="companies.length === 0" class="empty-state">
            <span class="material-icons">business</span>
            <h3>No Companies Found</h3>
            <p>No companies match your current filters.</p>
            <button class="btn btn-primary" routerLink="/crm/companies/new">
              Add First Company
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div *ngIf="response && response.totalCount > response.pageSize" class="pagination">
          <button 
            class="btn btn-pagination"
            [disabled]="!response.hasPreviousPage"
            (click)="goToPage(currentPage - 1)">
            <span class="material-icons">chevron_left</span>
            Previous
          </button>
          
          <span class="pagination-info">
            Page {{ currentPage }} of {{ getTotalPages() }}
            ({{ response.totalCount }} total)
          </span>
          
          <button 
            class="btn btn-pagination"
            [disabled]="!response.hasNextPage"
            (click)="goToPage(currentPage + 1)">
            Next
            <span class="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./company-master-list.component.css']
})
export class CompanyMasterListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  companies: CRMCompanyMaster[] = [];
  response: CompanyMasterResponse | null = null;
  loading = false;
  currentPage = 1;
  pageSize = 10;
  isConverting: number | null = null;

  filterForm: FormGroup;

  constructor(
    private companyService: CompanyMasterService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      isActive: ['']
    });
  }

  ngOnInit(): void {
    this.setupFilterWatchers();
    this.loadCompanies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFilterWatchers(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentPage = 1;
        this.loadCompanies();
      });
  }

  loadCompanies(): void {
    this.loading = true;
    
    const formValue = this.filterForm.value;
    const filters: CompanyFilterOptions = {
      searchTerm: formValue.searchTerm || undefined,
      isActive: formValue.isActive === '' ? undefined : formValue.isActive === 'true'
    };

    this.companyService.getCompanies(filters, this.currentPage, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.response = response;
          this.companies = response.companies;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading companies:', error);
          this.loading = false;
        }
      });
  }

  clearFilters(): void {
    this.filterForm.reset({
      searchTerm: '',
      isActive: ''
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCompanies();
  }

  getTotalPages(): number {
    if (!this.response) return 1;
    return Math.ceil(this.response.totalCount / this.response.pageSize);
  }

  convertToCustomer(company: CRMCompanyMaster): void {
    // TODO: Open conversion modal with additional fields
    // For now, convert with default values
    this.isConverting = company.lid;
    
    const conversionData = {
      crmCompanyId: company.lid,
      city: company.officeLocation || 'Unknown',
      state: 'Unknown',
      country: 'India',
      pincode: '000000',
      creditLimit: 100000,
      creditDays: 30
    };

    this.companyService.convertToCustomer(conversionData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (customer) => {
          console.log('Company converted to customer:', customer);
          this.isConverting = null;
          // TODO: Show success message
        },
        error: (error) => {
          console.error('Error converting company:', error);
          this.isConverting = null;
          // TODO: Show error message
        }
      });
  }

  deleteCompany(company: CRMCompanyMaster): void {
    if (confirm(`Are you sure you want to delete "${company.sName}"?`)) {
      this.companyService.deleteCompany(company.lid)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (success) => {
            if (success) {
              this.loadCompanies();
              // TODO: Show success message
            }
          },
          error: (error) => {
            console.error('Error deleting company:', error);
            // TODO: Show error message
          }
        });
    }
  }

  exportCompanies(): void {
    // TODO: Implement export functionality
    console.log('Export companies');
  }
}
