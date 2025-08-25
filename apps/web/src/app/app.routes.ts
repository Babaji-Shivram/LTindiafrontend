import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@lt-india-erp/shared-data-access';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'identity',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('@lt-india-erp/feature-identity').then(m => m.identityRoutes)
  },
  {
    path: 'masters',
    canActivate: [AuthGuard],
    loadChildren: () => import('@lt-india-erp/feature-masters').then(m => m.mastersRoutes)
  },
  {
    path: 'crm',
    canActivate: [AuthGuard],
    loadChildren: () => import('@lt-india-erp/feature-crm').then(m => m.crmRoutes)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];