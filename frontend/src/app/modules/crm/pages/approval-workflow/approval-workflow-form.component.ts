import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface ApprovalWorkflow {
  id?: string;
  leadId: string;
  leadTitle: string;
  companyName: string;
  estimatedValue: number;
  currency: string;
  requestType: 'stage_change' | 'discount' | 'special_terms' | 'credit_extension';
  currentStage: string;
  requestedStage: string;
  requesterName: string;
  requesterRole: string;
  requestDate: Date;
  businessJustification: string;
  riskAssessment: string;
  competitorAnalysis?: string;
  financialImpact: {
    estimatedRevenue: number;
    estimatedCost: number;
    marginImpact: number;
    probabilityOfSuccess: number;
  };
  attachments: {
    id: string;
    fileName: string;
    fileType: string;
    uploadDate: Date;
    description: string;
  }[];
  approvalChain: {
    level: number;
    approverRole: string;
    approverName?: string;
    status: 'pending' | 'approved' | 'rejected' | 'escalated';
    comments?: string;
    approvedDate?: Date;
    isRequired: boolean;
  }[];
  currentApprovalLevel: number;
  overallStatus: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadlineDate?: Date;
  notificationsSent: {
    recipient: string;
    sentDate: Date;
    type: 'submitted' | 'reminder' | 'escalation' | 'decision';
  }[];
}

@Component({
  selector: 'app-approval-workflow-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title text-gray-900">{{ isEditMode ? 'Review' : 'Submit' }} Approval Request</h1>
          <p class="secondary-text text-gray-600">{{ isEditMode ? 'Review and process' : 'Create a new' }} lead approval workflow</p>
        </div>
        <button type="button" class="btn btn-outline" (click)="goBack()">
          <span class="material-icons text-sm mr-2">arrow_back</span>
          Back to Approvals
        </button>
      </div>

      <form [formGroup]="approvalForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Lead Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Lead Information</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label for="leadTitle" class="form-label">Lead Title <span class="text-red-500">*</span></label>
              <input
                id="leadTitle"
                type="text"
                formControlName="leadTitle"
                placeholder="e.g., Export Documentation Services - ABC Corp"
                class="w-full input-text"
                [class.border-red-300]="approvalForm.get('leadTitle')?.invalid && approvalForm.get('leadTitle')?.touched">
            </div>

            <div>
              <label for="companyName" class="form-label">Company Name <span class="text-red-500">*</span></label>
              <input
                id="companyName"
                type="text"
                formControlName="companyName"
                placeholder="Company name"
                class="w-full input-text"
                [class.border-red-300]="approvalForm.get('companyName')?.invalid && approvalForm.get('companyName')?.touched">
            </div>

            <div>
              <label for="estimatedValue" class="form-label">Estimated Value <span class="text-red-500">*</span></label>
              <div class="flex">
                <select formControlName="currency" class="input-text rounded-r-none border-r-0 w-20">
                  <option value="INR">₹</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                </select>
                <input
                  id="estimatedValue"
                  type="number"
                  formControlName="estimatedValue"
                  placeholder="0.00"
                  class="flex-1 input-text rounded-l-none"
                  [class.border-red-300]="approvalForm.get('estimatedValue')?.invalid && approvalForm.get('estimatedValue')?.touched">
              </div>
            </div>
          </div>
        </div>

        <!-- Request Details -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Request Details</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label for="requestType" class="form-label">Request Type <span class="text-red-500">*</span></label>
              <select
                id="requestType"
                formControlName="requestType"
                class="w-full input-text"
                (change)="onRequestTypeChange()"
                [class.border-red-300]="approvalForm.get('requestType')?.invalid && approvalForm.get('requestType')?.touched">
                <option value="">Select Request Type</option>
                <option value="stage_change">Stage Change Approval</option>
                <option value="discount">Discount Approval</option>
                <option value="special_terms">Special Terms Approval</option>
                <option value="credit_extension">Credit Extension</option>
              </select>
            </div>

            <div>
              <label for="priority" class="form-label">Priority Level <span class="text-red-500">*</span></label>
              <select
                id="priority"
                formControlName="priority"
                class="w-full input-text"
                [class.border-red-300]="approvalForm.get('priority')?.invalid && approvalForm.get('priority')?.touched">
                <option value="">Select Priority</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div *ngIf="approvalForm.get('requestType')?.value === 'stage_change'">
              <label for="currentStage" class="form-label">Current Stage</label>
              <input
                id="currentStage"
                type="text"
                formControlName="currentStage"
                placeholder="e.g., Proposal Sent"
                class="w-full input-text" readonly>
            </div>

            <div *ngIf="approvalForm.get('requestType')?.value === 'stage_change'">
              <label for="requestedStage" class="form-label">Requested Stage <span class="text-red-500">*</span></label>
              <select formControlName="requestedStage" class="w-full input-text">
                <option value="">Select Target Stage</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won - Contract Signed</option>
                <option value="lost-price">Lost - Price</option>
                <option value="lost-competitor">Lost - Competitor</option>
              </select>
            </div>

            <div class="lg:col-span-2">
              <label for="deadlineDate" class="form-label">Decision Deadline</label>
              <input
                id="deadlineDate"
                type="datetime-local"
                formControlName="deadlineDate"
                class="w-full input-text">
              <div class="mt-1 text-sm text-gray-500">When approval decision is needed by</div>
            </div>
          </div>
        </div>

        <!-- Business Justification -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Business Justification</h3>
          
          <div class="space-y-6">
            <div>
              <label for="businessJustification" class="form-label">Business Rationale <span class="text-red-500">*</span></label>
              <textarea
                id="businessJustification"
                formControlName="businessJustification"
                rows="4"
                placeholder="Explain the business reasons for this request, including client requirements, market conditions, competitive factors, etc."
                class="w-full input-text resize-none"
                [class.border-red-300]="approvalForm.get('businessJustification')?.invalid && approvalForm.get('businessJustification')?.touched"></textarea>
            </div>

            <div>
              <label for="riskAssessment" class="form-label">Risk Assessment <span class="text-red-500">*</span></label>
              <textarea
                id="riskAssessment"
                formControlName="riskAssessment"
                rows="3"
                placeholder="Describe potential risks, mitigation strategies, and impact analysis..."
                class="w-full input-text resize-none"
                [class.border-red-300]="approvalForm.get('riskAssessment')?.invalid && approvalForm.get('riskAssessment')?.touched"></textarea>
            </div>

            <div>
              <label for="competitorAnalysis" class="form-label">Competitor Analysis</label>
              <textarea
                id="competitorAnalysis"
                formControlName="competitorAnalysis"
                rows="3"
                placeholder="Analysis of competitive landscape, competitor offerings, pricing comparison..."
                class="w-full input-text resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- Financial Impact -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Financial Impact Analysis</h3>
          
          <div formGroupName="financialImpact" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label for="estimatedRevenue" class="form-label">Estimated Revenue</label>
              <input
                id="estimatedRevenue"
                type="number"
                formControlName="estimatedRevenue"
                placeholder="0.00"
                class="w-full input-text">
            </div>

            <div>
              <label for="estimatedCost" class="form-label">Estimated Cost</label>
              <input
                id="estimatedCost"
                type="number"
                formControlName="estimatedCost"
                placeholder="0.00"
                class="w-full input-text">
            </div>

            <div>
              <label for="marginImpact" class="form-label">Margin Impact (%)</label>
              <input
                id="marginImpact"
                type="number"
                formControlName="marginImpact"
                min="-100"
                max="100"
                step="0.1"
                placeholder="0.0"
                class="w-full input-text">
            </div>

            <div>
              <label for="probabilityOfSuccess" class="form-label">Success Probability (%)</label>
              <input
                id="probabilityOfSuccess"
                type="number"
                formControlName="probabilityOfSuccess"
                min="0"
                max="100"
                step="1"
                placeholder="50"
                class="w-full input-text">
            </div>
          </div>
        </div>

        <!-- Supporting Documents -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-6">Supporting Documents</h3>
          
          <div class="space-y-4">
            <!-- File Upload Area -->
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <div class="space-y-2">
                <span class="material-icons text-4xl text-gray-400">cloud_upload</span>
                <div>
                  <button type="button" class="btn btn-outline" (click)="triggerFileUpload()">
                    Choose Files
                  </button>
                  <input #fileInput type="file" multiple class="hidden" (change)="onFileSelected($event)">
                </div>
                <p class="text-sm text-gray-500">
                  Upload supporting documents (PDF, DOC, XLS, images)
                  <br>Maximum file size: 10MB per file
                </p>
              </div>
            </div>

            <!-- Uploaded Files List -->
            <div *ngIf="uploadedFiles.length > 0" class="space-y-2">
              <h4 class="font-medium text-gray-900">Uploaded Documents ({{ uploadedFiles.length }})</h4>
              <div class="space-y-2">
                <div
                  *ngFor="let file of uploadedFiles; let i = index"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div class="flex items-center gap-3">
                    <span class="material-icons text-gray-400">{{ getFileIcon(file.fileType) }}</span>
                    <div>
                      <div class="font-medium text-gray-900">{{ file.fileName }}</div>
                      <div class="text-sm text-gray-500">{{ file.description || 'No description' }}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn-icon text-red-500 hover:text-red-700"
                    (click)="removeFile(i)"
                    title="Remove file">
                    <span class="material-icons text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Approval Chain Preview -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6" *ngIf="!isEditMode">
          <h3 class="section-header text-gray-900 mb-6">Approval Chain</h3>
          
          <div class="space-y-4">
            <div
              *ngFor="let approver of getApprovalChain(); let i = index"
              class="flex items-center gap-4 p-4 border border-gray-200 rounded">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-medium">{{ i + 1 }}</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="font-medium text-gray-900">{{ approver.approverRole }}</div>
                <div class="text-sm text-gray-500">{{ approver.approverName || 'To be assigned' }}</div>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge" [ngClass]="{
                  'badge-warning': approver.status === 'pending',
                  'badge-success': approver.status === 'approved',
                  'badge-error': approver.status === 'rejected',
                  'badge-info': approver.status === 'escalated'
                }">{{ approver.status | titlecase }}</span>
                <span *ngIf="!approver.isRequired" class="badge badge-gray">Optional</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-4 pt-6">
          <button type="button" class="btn btn-outline" (click)="saveDraft()" [disabled]="isSubmitting">
            <span class="material-icons text-sm mr-2">save</span>
            Save Draft
          </button>
          <button type="button" class="btn btn-outline" (click)="goBack()">Cancel</button>
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="approvalForm.invalid || isSubmitting">
            <span *ngIf="isSubmitting" class="material-icons animate-spin text-sm mr-2">refresh</span>
            {{ isEditMode ? 'Update Request' : 'Submit for Approval' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .badge {
      @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
    }

    .badge-info { @apply bg-blue-100 text-blue-800; }
    .badge-success { @apply bg-green-100 text-green-800; }
    .badge-error { @apply bg-red-100 text-red-800; }
    .badge-warning { @apply bg-yellow-100 text-yellow-800; }
    .badge-gray { @apply bg-gray-100 text-gray-800; }

    .btn {
      @apply inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium transition-colors duration-200;
    }

    .btn-primary {
      @apply bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
    }

    .btn-outline {
      @apply bg-white text-gray-700 border-gray-300 hover:bg-gray-50;
    }

    .btn-icon {
      @apply p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200;
    }

    .form-label {
      @apply block text-sm font-medium text-gray-700 mb-1;
    }

    .input-text {
      @apply px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500;
    }
  `]
})
export class ApprovalWorkflowFormComponent implements OnInit {
  approvalForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  workflowId: string | null = null;
  uploadedFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.approvalForm = this.createForm();
  }

  ngOnInit(): void {
    this.workflowId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.workflowId;

    if (this.isEditMode && this.workflowId) {
      this.loadWorkflowData(this.workflowId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      leadTitle: ['', [Validators.required, Validators.minLength(5)]],
      companyName: ['', [Validators.required]],
      estimatedValue: [0, [Validators.required, Validators.min(0)]],
      currency: ['INR', [Validators.required]],
      requestType: ['', [Validators.required]],
      priority: ['medium', [Validators.required]],
      currentStage: ['Proposal Sent'],
      requestedStage: [''],
      deadlineDate: [''],
      businessJustification: ['', [Validators.required, Validators.minLength(50)]],
      riskAssessment: ['', [Validators.required, Validators.minLength(30)]],
      competitorAnalysis: [''],
      financialImpact: this.fb.group({
        estimatedRevenue: [0, [Validators.min(0)]],
        estimatedCost: [0, [Validators.min(0)]],
        marginImpact: [0],
        probabilityOfSuccess: [50, [Validators.min(0), Validators.max(100)]]
      })
    });
  }

  loadWorkflowData(workflowId: string): void {
    // Mock data loading - in real app, this would call a service
    const mockWorkflow: Partial<ApprovalWorkflow> = {
      leadTitle: 'Export Documentation Services - ABC Corp',
      companyName: 'ABC Corporation Ltd',
      estimatedValue: 50000,
      currency: 'INR',
      requestType: 'stage_change',
      priority: 'high',
      currentStage: 'Proposal Sent',
      requestedStage: 'won',
      businessJustification: 'Client has confirmed acceptance of our proposal and requested immediate contract execution. This is a strategic account with potential for long-term partnership.',
      riskAssessment: 'Low risk - client has strong financial standing and established track record. Payment terms are standard.',
      competitorAnalysis: 'We were the preferred vendor among 3 competitors. Our pricing was competitive and service offering was comprehensive.',
      financialImpact: {
        estimatedRevenue: 50000,
        estimatedCost: 35000,
        marginImpact: 30,
        probabilityOfSuccess: 85
      }
    };

    this.approvalForm.patchValue(mockWorkflow);
  }

  onRequestTypeChange(): void {
    const requestType = this.approvalForm.get('requestType')?.value;
    
    if (requestType === 'stage_change') {
      this.approvalForm.get('requestedStage')?.setValidators([Validators.required]);
    } else {
      this.approvalForm.get('requestedStage')?.clearValidators();
    }
    
    this.approvalForm.get('requestedStage')?.updateValueAndValidity();
  }

  triggerFileUpload(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (let file of files) {
      if (file.size <= 10 * 1024 * 1024) { // 10MB limit
        const fileInfo = {
          id: this.generateId(),
          fileName: file.name,
          fileType: file.type,
          uploadDate: new Date(),
          description: ''
        };
        this.uploadedFiles.push(fileInfo);
      }
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  getFileIcon(fileType: string): string {
    if (fileType.includes('pdf')) return 'picture_as_pdf';
    if (fileType.includes('word')) return 'description';
    if (fileType.includes('sheet') || fileType.includes('excel')) return 'table_chart';
    if (fileType.includes('image')) return 'image';
    return 'insert_drive_file';
  }

  getApprovalChain(): any[] {
    const requestType = this.approvalForm.get('requestType')?.value;
    const estimatedValue = this.approvalForm.get('estimatedValue')?.value;
    
    // Define approval chain based on request type and value
    let chain: any[] = [];
    
    if (requestType === 'stage_change') {
      chain = [
        { approverRole: 'Sales Manager', status: 'pending', isRequired: true },
        { approverRole: 'Regional Director', status: 'pending', isRequired: estimatedValue > 100000 }
      ];
    } else if (requestType === 'discount') {
      chain = [
        { approverRole: 'Sales Manager', status: 'pending', isRequired: true },
        { approverRole: 'Finance Manager', status: 'pending', isRequired: true },
        { approverRole: 'General Manager', status: 'pending', isRequired: estimatedValue > 50000 }
      ];
    }
    
    return chain.filter(c => c.isRequired);
  }

  saveDraft(): void {
    console.log('Saving draft...', this.approvalForm.value);
  }

  onSubmit(): void {
    if (this.approvalForm.valid) {
      this.isSubmitting = true;
      
      const formData = {
        ...this.approvalForm.value,
        attachments: this.uploadedFiles,
        approvalChain: this.getApprovalChain()
      };

      // Mock API call
      setTimeout(() => {
        console.log('Approval workflow submitted:', formData);
        this.isSubmitting = false;
        this.goBack();
      }, 1000);
    } else {
      Object.keys(this.approvalForm.controls).forEach(key => {
        this.approvalForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/crm/approvals']);
  }

  private generateId(): string {
    return 'DOC-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
