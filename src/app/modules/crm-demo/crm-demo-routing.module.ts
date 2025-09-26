import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipelinePage } from './components/pipeline/pipeline.page';
import { KanbanComponent } from './components/kanban/kanban.component';
import { LeadTableComponent } from './components/table/lead-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pipeline',
    pathMatch: 'full'
  },
  {
    path: 'pipeline',
    component: PipelinePage,
    title: 'CRM Demo - Sales Pipeline'
  },
  {
    path: 'kanban',
    component: KanbanComponent,
    title: 'CRM Demo - Kanban Board'
  },
  {
    path: 'table',
    component: LeadTableComponent,
    title: 'CRM Demo - Lead Table'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmDemoRoutingModule { }
