import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CrmRoutingModule } from './crm-routing.module';
import { LeadsListComponent } from './pages/leads-list/leads-list.component';
import { LeadFormComponent } from './pages/lead-form/lead-form.component';
import { LeadDetailComponent } from './pages/lead-detail/lead-detail.component';
import { LeadBoardComponent } from './pages/lead-board/lead-board.component';
import { ApprovalsListComponent } from './pages/approvals-list/approvals-list.component';
import { ApprovalSheetComponent } from './pages/approval-sheet/approval-sheet.component';
import { CompanyMasterListComponent } from './pages/company-master/company-master-list.component';
import { CrmDashboardComponent } from './pages/crm-dashboard/crm-dashboard.component';
import { ProcessManagementComponent } from './pages/process-management/process-management.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrmRoutingModule,
    LeadsListComponent,
    LeadFormComponent,
    LeadDetailComponent,
    LeadBoardComponent,
    ApprovalsListComponent,
    ApprovalSheetComponent,
    CompanyMasterListComponent,
    CrmDashboardComponent,
    ProcessManagementComponent
  ]
})
export class CrmModule { }
