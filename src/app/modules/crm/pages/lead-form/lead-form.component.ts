import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { LeadCreationService } from '../../services/lead-creation.service';
import {
  CRMCompany,
  CustomerSector,
  CompanyType,
  BusinessCategory,
  ContactRole,
  LeadSource,
  Branch,
  SalesUser,
  Service,
  ServiceLocation,
  LeadCreationFormData,
  CompanySearchResult,
  ServiceRequirement,
  LeadCreationStep
} from '../../interfaces/lead-creation.interface';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  leadForm!: FormGroup;
  currentStep = 1;
  totalSteps = 6;
  isSubmitting = false;
  isEditMode = false;
  leadId: string | null = null;

  // Steps tracking
  steps: LeadCreationStep[] = [
    { stepNumber: 1, stepName: 'Company Information', isComplete: false, isValid: false, errors: [] },
    { stepNumber: 2, stepName: 'Business Classification', isComplete: false, isValid: false, errors: [] },
    { stepNumber: 3, stepName: 'Contact Information', isComplete: false, isValid: false, errors: [] },
    { stepNumber: 4, stepName: 'Lead Source', isComplete: false, isValid: false, errors: [] },
    { stepNumber: 5, stepName: 'Sales Assignment', isComplete: false, isValid: false, errors: [] },
    { stepNumber: 6, stepName: 'Service Requirements', isComplete: false, isValid: false, errors: [] }
  ];

  // Company search
  companySearchTerm = '';
  companySearchResults$: Observable<CompanySearchResult[]> = of([]);
  showNewCompanyFields = false;
  selectedCompany: CRMCompany | null = null;

  // Master data
  customerSectors$: Observable<CustomerSector[]> = of([]);
  companyTypes$: Observable<CompanyType[]> = of([]);
  businessCategories$: Observable<BusinessCategory[]> = of([]);
  contactRoles$: Observable<ContactRole[]> = of([]);
  leadSources$: Observable<LeadSource[]> = of([]);
  selectedLeadSource: LeadSource | null = null;
  
  // Sales assignment
  userBranches$: Observable<Branch[]> = of([]);
  salesTeam$: Observable<SalesUser[]> = of([]);
  
  // Services
  availableServices$: Observable<Service[]> = of([]);
  serviceLocations: { [serviceId: number]: ServiceLocation[] } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private leadCreationService: LeadCreationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadMasterData();
    this.setupCompanySearch();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.leadForm = this.fb.group({
      // Step 1: Company Information
      companyId: [null],
      companyName: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      country: ['India'],
      pincode: [''],
      website: [''],

      // Step 2: Business Classification
      sectorId: [null, Validators.required],
      companyTypeId: [null, Validators.required],
      businessCategoryId: [null, Validators.required],
      turnover: ['', Validators.required],
      employeeCount: ['', Validators.required],

      // Step 3: Contact Information
      contactName: ['', Validators.required],
      designation: ['', Validators.required],
      contactRoleId: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      alternateNumber: [''],

      // Step 4: Lead Source
      leadSourceId: [null, Validators.required],
      leadSourceValue: [''], // Remove required validator - will be validated conditionally

      // Step 5: Sales Assignment
      branchId: [null, Validators.required],
      salesPersonId: [null, Validators.required],

      // Step 6: Service Requirements
      serviceRequirements: this.fb.array([], Validators.required),

      // Additional fields
      estimatedValue: [null],
      expectedClosureDate: [''],
      priority: ['MEDIUM', Validators.required],
      notes: ['']
    });

    // Watch for form changes to update step validation
    this.leadForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateStepValidation());
  }

  private loadMasterData(): void {
    this.customerSectors$ = this.leadCreationService.getCustomerSectors();
    this.companyTypes$ = this.leadCreationService.getCompanyTypes();
    this.businessCategories$ = this.leadCreationService.getBusinessCategories();
    this.contactRoles$ = this.leadCreationService.getContactRoles();
    this.leadSources$ = this.leadCreationService.getLeadSources();
    this.userBranches$ = this.leadCreationService.getUserAccessibleBranches(1); // Current user ID
    this.availableServices$ = this.leadCreationService.getAvailableServices();
  }

  private setupCompanySearch(): void {
    // Setup debounced company search
    this.companySearchResults$ = of(this.companySearchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.leadCreationService.searchCompanies(term)),
      takeUntil(this.destroy$)
    );
  }

  private checkEditMode(): void {
    this.leadId = this.route.snapshot.paramMap.get('id');
    if (this.leadId) {
      this.isEditMode = true;
      // Load existing lead data for editing
      // TODO: Implement edit mode data loading
    }
  }

  // Company search methods
  onCompanySearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.companySearchTerm = target.value;
    
    if (this.companySearchTerm.length >= 2) {
      this.companySearchResults$ = this.leadCreationService.searchCompanies(this.companySearchTerm);
    } else {
      this.companySearchResults$ = of([]);
    }
  }

  onCompanySelect(company: CompanySearchResult): void {
    this.leadCreationService.getCompanyById(company.companyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(fullCompany => {
        if (fullCompany) {
          this.selectedCompany = fullCompany;
          this.leadForm.patchValue({
            companyId: fullCompany.companyId,
            companyName: fullCompany.companyName,
            addressLine1: fullCompany.addressLine1,
            addressLine2: fullCompany.addressLine2,
            city: fullCompany.city,
            state: fullCompany.state,
            country: fullCompany.country,
            pincode: fullCompany.pincode,
            website: fullCompany.website
          });
          this.showNewCompanyFields = false;
          this.companySearchTerm = fullCompany.companyName;
        }
      });
  }

  onCreateNewCompany(): void {
    this.showNewCompanyFields = true;
    this.selectedCompany = null;
    this.leadForm.patchValue({
      companyId: null,
      companyName: this.companySearchTerm,
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
      website: ''
    });
  }

  // Lead source handling
  onLeadSourceChange(): void {
    const leadSourceId = this.leadForm.get('leadSourceId')?.value;
    if (leadSourceId) {
      this.leadCreationService.getLeadSourceById(leadSourceId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(source => {
          this.selectedLeadSource = source;
          // Clear previous source value
          this.leadForm.patchValue({ leadSourceValue: '' });
        });
    }
  }

  // Sales assignment
  onBranchChange(): void {
    const branchId = this.leadForm.get('branchId')?.value;
    if (branchId) {
      this.salesTeam$ = this.leadCreationService.getSalesTeamByBranch(branchId);
      // Clear previous sales person selection
      this.leadForm.patchValue({ salesPersonId: null });
    }
  }

  // Service requirements
  get serviceRequirementsArray(): FormArray {
    return this.leadForm.get('serviceRequirements') as FormArray;
  }

  onAddServiceRequirement(): void {
    const serviceGroup = this.fb.group({
      serviceId: [null, Validators.required],
      serviceName: [''],
      locationId: [null],
      locationName: [''],
      priority: ['MEDIUM', Validators.required],
      notes: ['']
    });

    this.serviceRequirementsArray.push(serviceGroup);
  }

  onRemoveServiceRequirement(index: number): void {
    this.serviceRequirementsArray.removeAt(index);
  }

  onServiceChange(index: number): void {
    const serviceControl = this.serviceRequirementsArray.at(index);
    const serviceId = serviceControl.get('serviceId')?.value;
    
    if (serviceId) {
      this.leadCreationService.getServiceLocations(serviceId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(locations => {
          this.serviceLocations[serviceId] = locations;
          // Clear previous location selection
          serviceControl.patchValue({ locationId: null, locationName: '' });
        });

      // Update service name
      this.availableServices$.pipe(takeUntil(this.destroy$)).subscribe(services => {
        const service = services.find(s => s.serviceId === serviceId);
        if (service) {
          serviceControl.patchValue({ serviceName: service.serviceName });
        }
      });
    }
  }

  onLocationChange(index: number): void {
    const serviceControl = this.serviceRequirementsArray.at(index);
    const locationId = serviceControl.get('locationId')?.value;
    const serviceId = serviceControl.get('serviceId')?.value;

    if (locationId && serviceId && this.serviceLocations[serviceId]) {
      const location = this.serviceLocations[serviceId].find(l => l.locationId === locationId);
      if (location) {
        serviceControl.patchValue({ locationName: location.locationName });
      }
    }
  }

  // Step navigation
  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.steps[this.currentStep - 1].isComplete = true;
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    // Only allow navigation to completed steps or the next immediate step
    if (step <= this.currentStep || this.steps[step - 2]?.isComplete) {
      this.currentStep = step;
    }
  }

  private validateCurrentStep(): boolean {
    const stepValidators: { [step: number]: string[] } = {
      1: ['companyName'],
      2: ['sectorId', 'companyTypeId', 'businessCategoryId', 'turnover', 'employeeCount'],
      3: ['contactName', 'designation', 'contactRoleId', 'email', 'mobileNumber'],
      4: ['leadSourceId'],
      5: ['branchId', 'salesPersonId'],
      6: ['serviceRequirements']
    };

    const fieldsToValidate = stepValidators[this.currentStep] || [];
    let isValid = true;

    fieldsToValidate.forEach(fieldName => {
      const control = this.leadForm.get(fieldName);
      if (control && control.invalid) {
        control.markAsTouched();
        isValid = false;
      }
    });

    // Special validation for lead source value (only if source requires it)
    if (this.currentStep === 4 && this.selectedLeadSource?.requiresSourceValue) {
      const sourceValueControl = this.leadForm.get('leadSourceValue');
      if (sourceValueControl && !sourceValueControl.value?.trim()) {
        sourceValueControl.markAsTouched();
        isValid = false;
      }
    }

    // Special validation for service requirements
    if (this.currentStep === 6 && this.serviceRequirementsArray.length === 0) {
      isValid = false;
    }

    return isValid;
  }

  private updateStepValidation(): void {
    // Update validation status for each step
    const stepValidations = [
      // Step 1: Company Information
      this.leadForm.get('companyName')?.valid,
      // Step 2: Business Classification
      this.leadForm.get('sectorId')?.valid && 
      this.leadForm.get('companyTypeId')?.valid && 
      this.leadForm.get('businessCategoryId')?.valid &&
      this.leadForm.get('turnover')?.valid && 
      this.leadForm.get('employeeCount')?.valid,
      // Step 3: Contact Information
      this.leadForm.get('contactName')?.valid && 
      this.leadForm.get('designation')?.valid && 
      this.leadForm.get('contactRoleId')?.valid &&
      this.leadForm.get('email')?.valid && 
      this.leadForm.get('mobileNumber')?.valid,
      // Step 4: Lead Source
      this.leadForm.get('leadSourceId')?.valid && 
      this.leadForm.get('leadSourceValue')?.valid,
      // Step 5: Sales Assignment
      this.leadForm.get('branchId')?.valid && 
      this.leadForm.get('salesPersonId')?.valid,
      // Step 6: Service Requirements
      this.serviceRequirementsArray.length > 0 && this.serviceRequirementsArray.valid
    ];

    stepValidations.forEach((isValid, index) => {
      this.steps[index].isValid = !!isValid;
    });
  }

  // Form submission
  onSubmit(): void {
    if (this.leadForm.valid && this.serviceRequirementsArray.length > 0) {
      this.isSubmitting = true;
      
      const formData: LeadCreationFormData = {
        ...this.leadForm.value,
        serviceRequirements: this.serviceRequirementsArray.value
      };

      this.leadCreationService.createLead(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Lead created successfully:', response);
            this.router.navigate(['/crm/leads']);
          },
          error: (error) => {
            console.error('Error creating lead:', error);
            this.isSubmitting = false;
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/crm/leads']);
  }

  // Utility methods
  private markFormGroupTouched(): void {
    Object.keys(this.leadForm.controls).forEach(key => {
      const control = this.leadForm.get(key);
      control?.markAsTouched();
    });

    // Mark service requirements as touched
    this.serviceRequirementsArray.controls.forEach(control => {
      Object.keys(control.value).forEach(key => {
        control.get(key)?.markAsTouched();
      });
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.leadForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.leadForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['pattern']) return 'Please enter a valid format';
    }
    return '';
  }

  getServiceLocationsForService(serviceId: number): ServiceLocation[] {
    return this.serviceLocations[serviceId] || [];
  }
}
