import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsListComponent } from './pages/leads-list/leads-list.component';
import { LeadFormComponent } from './pages/lead-form/lead-form.component';
import { LeadDetailComponent } from './pages/lead-detail/lead-detail.component';
import { LeadBoardComponent } from './pages/lead-board/lead-board.component';
import { ApprovalsListComponent } from './pages/approvals-list/approvals-list.component';
import { ApprovalSheetComponent } from './pages/approval-sheet/approval-sheet.component';

const routes: Routes = [
  { path: '', redirectTo: 'leads', pathMatch: 'full' },
  { path: 'leads', component: LeadsListComponent },
  { path: 'leads/new', component: LeadFormComponent },
  { path: 'leads/:id', component: LeadDetailComponent },
  { path: 'board', component: LeadBoardComponent },
  { path: 'approvals', component: ApprovalsListComponent },
  { path: 'approvals/:id', component: ApprovalSheetComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CrmRoutingModule {}
