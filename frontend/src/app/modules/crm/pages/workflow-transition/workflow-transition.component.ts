import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnhancedCrmService, CrmEnquiry, CrmQuote, CrmContract } from '../../services/enhanced-crm.service';
import { MockCrmService } from '../../services/mock-crm.service';
import { Lead } from '../../models/lead.model';

@Component({
  selector: 'app-workflow-transition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">CRM Workflow Transition</h1>
        <p class="text-sm text-gray-600 mt-1">Convert between different CRM stages</p>
      </div>
      <button
        (click)="goBack()"
        class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
        <i class="fas fa-arrow-left"></i>
        Back
      </button>
    </div>

    <!-- Lead to Enquiry Conversion -->
    <div *ngIf="transitionType === 'lead-to-enquiry'" class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Convert Lead to Enquiry</h3>
        <p class="text-sm text-gray-600 mt-1">Create a formal enquiry from this lead</p>
      </div>
      
      <form (ngSubmit)="convertLeadToEnquiry()" class="p-6 space-y-6">
        <!-- Lead Information (Read-only) -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 mb-3">Lead Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Company</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedLead?.company }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedLead?.contact }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedLead?.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedLead?.mobileNo }}</p>
            </div>
          </div>
        </div>
        
        <!-- Enquiry Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
            <select
              [(ngModel)]="newEnquiry.serviceTypeID"
              name="serviceType"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Service Type</option>
              <option value="ST-001">Ocean Freight</option>
              <option value="ST-002">Air Freight</option>
              <option value="ST-003">Road Transportation</option>
              <option value="ST-004">Warehousing</option>
              <option value="ST-005">Customs Clearance</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              [(ngModel)]="newEnquiry.priority"
              name="priority"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Expected Value (₹)</label>
            <input
              type="number"
              [(ngModel)]="newEnquiry.expectedValue"
              name="expectedValue"
              required
              placeholder="0"
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Expected Date</label>
            <input
              type="date"
              [(ngModel)]="newEnquiry.expectedDate"
              name="expectedDate"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
          <textarea
            [(ngModel)]="newEnquiry.requirements"
            name="requirements"
            rows="4"
            required
            placeholder="Describe the detailed requirements..."
            class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            (click)="goBack()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            Create Enquiry
          </button>
        </div>
      </form>
    </div>

    <!-- Enquiry to Quote Conversion -->
    <div *ngIf="transitionType === 'enquiry-to-quote'" class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Convert Enquiry to Quote</h3>
        <p class="text-sm text-gray-600 mt-1">Generate a formal quote from this enquiry</p>
      </div>
      
      <form (ngSubmit)="convertEnquiryToQuote()" class="p-6 space-y-6">
        <!-- Enquiry Information (Read-only) -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 mb-3">Enquiry Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Enquiry ID</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedEnquiry?.enquiryID }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Company</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedEnquiry?.leadCompany }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Service Type</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedEnquiry?.serviceTypeName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Expected Value</label>
              <p class="mt-1 text-sm text-gray-900">₹{{ selectedEnquiry?.expectedValue | number:'1.0-0' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Quote Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Quote Amount (₹)</label>
            <input
              type="number"
              [(ngModel)]="newQuote.totalAmount"
              name="totalAmount"
              required
              placeholder="0"
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Validity Date</label>
            <input
              type="date"
              [(ngModel)]="newQuote.validityDate"
              name="validityDate"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <input
                type="checkbox"
                [(ngModel)]="newQuote.approvalRequired"
                name="approvalRequired"
                class="mr-2">
              Requires Approval
            </label>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
          <textarea
            [(ngModel)]="newQuote.terms"
            name="terms"
            rows="4"
            placeholder="Enter terms and conditions..."
            class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            [(ngModel)]="newQuote.notes"
            name="notes"
            rows="3"
            placeholder="Additional notes..."
            class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            (click)="goBack()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            Generate Quote
          </button>
        </div>
      </form>
    </div>

    <!-- Quote to Contract Conversion -->
    <div *ngIf="transitionType === 'quote-to-contract'" class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Convert Quote to Contract</h3>
        <p class="text-sm text-gray-600 mt-1">Create a contract from an accepted quote</p>
      </div>
      
      <form (ngSubmit)="convertQuoteToContract()" class="p-6 space-y-6">
        <!-- Quote Information (Read-only) -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 mb-3">Quote Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Quote Number</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedQuote?.quoteNumber }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Company</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedQuote?.leadCompany }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Quote Amount</label>
              <p class="mt-1 text-sm text-gray-900">₹{{ selectedQuote?.totalAmount | number:'1.0-0' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Service Type</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedQuote?.serviceType }}</p>
            </div>
          </div>
        </div>
        
        <!-- Contract Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contract Value (₹)</label>
            <input
              type="number"
              [(ngModel)]="newContract.contractValue"
              name="contractValue"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contract Date</label>
            <input
              type="date"
              [(ngModel)]="newContract.contractDate"
              name="contractDate"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              [(ngModel)]="newContract.startDate"
              name="startDate"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              [(ngModel)]="newContract.endDate"
              name="endDate"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contract Terms</label>
          <textarea
            [(ngModel)]="newContract.terms"
            name="terms"
            rows="6"
            placeholder="Enter detailed contract terms and conditions..."
            class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            (click)="goBack()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            Create Contract
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .workflow-step {
      @apply flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium;
    }
    
    .step-active {
      @apply bg-blue-600 text-white;
    }
    
    .step-completed {
      @apply bg-green-600 text-white;
    }
    
    .step-pending {
      @apply bg-gray-300 text-gray-600;
    }
  `]
})
export class WorkflowTransitionComponent implements OnInit {
  transitionType: string = '';
  
  // Entity data
  selectedLead: Lead | null = null;
  selectedEnquiry: CrmEnquiry | null = null;
  selectedQuote: CrmQuote | null = null;
  
  // Form data
  newEnquiry: Partial<CrmEnquiry> = {
    priority: 'MEDIUM',
    expectedValue: 0,
    expectedDate: new Date()
  };
  
  newQuote: Partial<CrmQuote> = {
    totalAmount: 0,
    validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    approvalRequired: false,
    terms: '',
    notes: ''
  };
  
  newContract: Partial<CrmContract> = {
    contractValue: 0,
    contractDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    terms: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enhancedCrmService: EnhancedCrmService,
    private mockCrmService: MockCrmService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transitionType = params['type'] || '';
      const entityId = params['id'] || '';
      
      this.loadEntityData(entityId);
    });
  }

  loadEntityData(entityId: string) {
    switch (this.transitionType) {
      case 'lead-to-enquiry':
        const lead = this.mockCrmService.getById(entityId);
        if (lead) {
          this.selectedLead = lead;
          this.newEnquiry.leadID = this.selectedLead.id;
          this.newEnquiry.leadCompany = this.selectedLead.company;
          this.newEnquiry.leadContact = this.selectedLead.contact;
        }
        break;
        
      case 'enquiry-to-quote':
        this.enhancedCrmService.getEnquiryById(entityId).subscribe((enquiry: CrmEnquiry | undefined) => {
          this.selectedEnquiry = enquiry || null;
          if (this.selectedEnquiry) {
            this.newQuote.enquiryID = this.selectedEnquiry.enquiryID;
            this.newQuote.leadID = this.selectedEnquiry.leadID;
            this.newQuote.leadCompany = this.selectedEnquiry.leadCompany;
            this.newQuote.leadContact = this.selectedEnquiry.leadContact;
            this.newQuote.serviceType = this.selectedEnquiry.serviceTypeName;
            this.newQuote.totalAmount = this.selectedEnquiry.expectedValue;
          }
        });
        break;
        
      case 'quote-to-contract':
        this.enhancedCrmService.getQuoteById(entityId).subscribe((quote: CrmQuote | undefined) => {
          this.selectedQuote = quote || null;
          if (this.selectedQuote) {
            this.newContract.quoteID = this.selectedQuote.quoteID;
            this.newContract.leadID = this.selectedQuote.leadID;
            this.newContract.leadCompany = this.selectedQuote.leadCompany;
            this.newContract.contractValue = this.selectedQuote.totalAmount;
          }
        });
        break;
    }
  }

  convertLeadToEnquiry() {
    if (this.selectedLead && this.newEnquiry.serviceTypeID && this.newEnquiry.requirements) {
      // Set service type name based on ID
      const serviceTypes: Record<string, string> = {
        'ST-001': 'Ocean Freight',
        'ST-002': 'Air Freight',
        'ST-003': 'Road Transportation',
        'ST-004': 'Warehousing',
        'ST-005': 'Customs Clearance'
      };
      
      this.newEnquiry.serviceTypeName = serviceTypes[this.newEnquiry.serviceTypeID] || '';
      this.newEnquiry.assignedTo = 'Current User';
      
      this.enhancedCrmService.createEnquiry(this.newEnquiry).subscribe((enquiry: CrmEnquiry) => {
        this.router.navigate(['/crm/enquiries', enquiry.enquiryID]);
      });
    }
  }

  convertEnquiryToQuote() {
    if (this.selectedEnquiry && this.newQuote.totalAmount) {
      this.enhancedCrmService.createQuote(this.newQuote).subscribe((quote: CrmQuote) => {
        // Update enquiry status to QUOTED
        if (this.selectedEnquiry) {
          this.selectedEnquiry.status = 'QUOTED';
          this.enhancedCrmService.updateEnquiry(this.selectedEnquiry).subscribe();
        }
        
        this.router.navigate(['/crm/quotes', quote.quoteID]);
      });
    }
  }

  convertQuoteToContract() {
    if (this.selectedQuote && this.newContract.contractValue) {
      this.enhancedCrmService.createContract(this.newContract).subscribe((contract: CrmContract) => {
        // Update quote status to ACCEPTED
        if (this.selectedQuote) {
          this.selectedQuote.status = 'ACCEPTED';
          this.enhancedCrmService.updateQuote(this.selectedQuote).subscribe();
        }
        
        this.router.navigate(['/crm/contracts', contract.contractID]);
      });
    }
  }

  goBack() {
    this.router.navigate(['/crm']);
  }
}
