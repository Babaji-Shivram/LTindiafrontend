import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsListComponent } from './pages/leads-list/leads-list.component';
import { LeadFormComponent } from './pages/lead-form/lead-form.component';
import { LeadDetailComponent } from './pages/lead-detail/lead-detail.component';
import { LeadBoardComponent } from './pages/lead-board/lead-board.component';
import { ApprovalsListComponent } from './pages/approvals-list/approvals-list.component';
import { ApprovalSheetComponent } from './pages/approval-sheet/approval-sheet.component';
import { CompanyMasterListComponent } from './pages/company-master/company-master-list.component';
import { CrmDashboardComponent } from './pages/crm-dashboard/crm-dashboard.component';
import { EnquiryManagementComponent } from './pages/enquiry-management/enquiry-management.component';
import { QuoteManagementComponent } from './pages/quote-management/quote-management.component';
import { ContractManagementComponent } from './pages/contract-management/contract-management.component';
import { ApprovalWorkflowComponent } from './pages/approval-workflow/approval-workflow.component';
import { VisitPlanningComponent } from './pages/visit-planning/visit-planning.component';
import { SalesTargetTrackingComponent } from './pages/sales-target-tracking/sales-target-tracking.component';
import { WorkflowTransitionComponent } from './pages/workflow-transition/workflow-transition.component';
import { ProcessManagementComponent } from './pages/process-management/process-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CrmDashboardComponent },
  { path: 'leads', component: LeadsListComponent },
  { path: 'leads/new', component: LeadFormComponent },
  { path: 'leads/edit/:id', component: LeadFormComponent },
  { path: 'leads/:id', component: LeadDetailComponent },
  { path: 'board', component: LeadBoardComponent },
  { path: 'process-management', component: ProcessManagementComponent },
  { path: 'approvals', component: ApprovalsListComponent },
  { path: 'approvals/:id', component: ApprovalSheetComponent },
  { path: 'companies', component: CompanyMasterListComponent },
  // New CRM Workflow Components
  { path: 'enquiries', component: EnquiryManagementComponent },
  { path: 'enquiries/:id', component: EnquiryManagementComponent }, // Detail view
  { path: 'enquiries/:id/edit', component: EnquiryManagementComponent }, // Edit view
  { path: 'quotes', component: QuoteManagementComponent },
  { path: 'quotes/new', component: QuoteManagementComponent }, // New quote from enquiry
  { path: 'quotes/:id', component: QuoteManagementComponent }, // Detail view
  { path: 'quotes/:id/edit', component: QuoteManagementComponent }, // Edit view
  { path: 'contracts', component: ContractManagementComponent },
  { path: 'contracts/new', component: ContractManagementComponent }, // New contract from quote
  { path: 'contracts/:id', component: ContractManagementComponent }, // Detail view
  { path: 'contracts/:id/edit', component: ContractManagementComponent }, // Edit view
  { path: 'workflow', component: ApprovalWorkflowComponent },
  { path: 'workflow/:id', component: ApprovalWorkflowComponent }, // Workflow detail
  { path: 'visits', component: VisitPlanningComponent },
  { path: 'visits/new', component: VisitPlanningComponent }, // New visit
  { path: 'visits/:id', component: VisitPlanningComponent }, // Visit detail
  { path: 'visits/:id/edit', component: VisitPlanningComponent }, // Edit visit
  { path: 'visits/:id/complete', component: VisitPlanningComponent }, // Complete visit
  { path: 'visits/:id/reschedule', component: VisitPlanningComponent }, // Reschedule visit
  { path: 'targets', component: SalesTargetTrackingComponent },
  { path: 'targets/new', component: SalesTargetTrackingComponent }, // New target
  { path: 'targets/:id', component: SalesTargetTrackingComponent }, // Target detail
  { path: 'targets/:id/edit', component: SalesTargetTrackingComponent }, // Edit target
  { path: 'workflow-transition', component: WorkflowTransitionComponent } // Workflow transitions
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CrmRoutingModule {}
