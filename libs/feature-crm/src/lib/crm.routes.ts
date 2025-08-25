import { Routes } from '@angular/router';
import { AuthGuard } from '@lt-india-erp/shared-data-access';

export const crmRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'leads', canActivate: [AuthGuard], loadComponent: () => import('./pages/leads/leads-list.component').then(m => m.LeadsListComponent) },
      { path: 'opportunities', canActivate: [AuthGuard], loadComponent: () => import('./pages/opportunities/opportunities-list.component').then(m => m.OpportunitiesListComponent) },
      { path: 'accounts', canActivate: [AuthGuard], loadComponent: () => import('./pages/accounts/accounts-list.component').then(m => m.AccountsListComponent) }
    ]
  }
];
