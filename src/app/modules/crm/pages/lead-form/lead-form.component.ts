import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MockCrmService } from '../../services/mock-crm.service';
import { LeadStageMS, LeadSourceMS, CompanyMS, CompanyTypeMS, BusinessCategoryMS, RoleMS, Lead } from '../../models/lead.model';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent implements OnInit {
  leadForm!: FormGroup;
  isEditMode = false;
  leadId: string | null = null;
  
  // Master data observables
  leadStages$!: Observable<LeadStageMS[]>;
  leadSources$!: Observable<LeadSourceMS[]>;
  companies$!: Observable<CompanyMS[]>;
  companyTypes$!: Observable<CompanyTypeMS[]>;
  businessCategories$!: Observable<BusinessCategoryMS[]>;
  roles$!: Observable<RoleMS[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private crmService: MockCrmService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
    this.checkEditMode();
  }

  private initForm() {
    this.leadForm = this.fb.group({
      companyID: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      leadStageID: ['', Validators.required],
      leadSourceID: ['', Validators.required],
      leadSourceValue: ['', Validators.required],
      value: [null, [Validators.min(0)]],
      nextFollowUp: [''],
      // Optional fields
      companyTypeID: [''],
      businessCategoryID: [''],
      roleId: ['']
    });
  }

  private loadMasterData() {
    this.leadStages$ = this.crmService.getLeadStages();
    this.leadSources$ = this.crmService.getLeadSources();
    this.companies$ = this.crmService.searchCompanies();
    this.companyTypes$ = this.crmService.getCompanyTypes();
    this.businessCategories$ = this.crmService.getBusinessCategories();
    this.roles$ = this.crmService.getRoles();
  }

  private checkEditMode() {
    this.leadId = this.route.snapshot.paramMap.get('id');
    if (this.leadId) {
      this.isEditMode = true;
      this.loadLeadData();
    }
  }

  private loadLeadData() {
    if (this.leadId) {
      const lead = this.crmService.getById(this.leadId);
      if (lead) {
        this.leadForm.patchValue({
          companyID: lead.companyID,
          contact: lead.contact,
          email: lead.email,
          mobileNo: lead.mobileNo,
          leadStageID: lead.leadStageID,
          leadSourceID: lead.leadSourceID,
          leadSourceValue: lead.leadSourceValue,
          value: lead.value,
          nextFollowUp: lead.nextFollowUp ? lead.nextFollowUp.split('T')[0] : '',
          companyTypeID: lead.companyTypeID || '',
          businessCategoryID: lead.businessCategoryID || '',
          roleId: lead.roleId || ''
        });
      }
    }
  }

  onCompanySearch(searchTerm: string) {
    this.companies$ = this.crmService.searchCompanies(searchTerm);
  }

  onSubmit() {
    if (this.leadForm.valid) {
      const formData = this.leadForm.value;
      
      if (this.isEditMode && this.leadId) {
        // Update existing lead
        const existingLead = this.crmService.getById(this.leadId);
        if (existingLead) {
          const updatedLead: Lead = {
            ...existingLead,
            ...formData
          };
          this.crmService.upsert(updatedLead);
        }
      } else {
        // Create new lead
        this.crmService.createLead(formData).subscribe();
      }
      
      this.router.navigate(['/crm/leads']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.leadForm.controls).forEach(key => {
      const control = this.leadForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    this.router.navigate(['/crm/leads']);
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.leadForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.leadForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['pattern']) return 'Please enter a valid mobile number';
      if (field.errors['min']) return 'Value must be greater than 0';
    }
    return '';
  }
}
