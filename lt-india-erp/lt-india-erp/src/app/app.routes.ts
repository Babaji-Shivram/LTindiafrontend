import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'identity',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/identity/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'roles',
        loadComponent: () => import('./pages/identity/roles/roles.component').then(m => m.RolesComponent)
      },
      {
        path: 'roles/:id',
        loadComponent: () => import('./pages/identity/role-details/role-details.component').then(m => m.RoleDetailsComponent)
      },
      {
        path: 'permissions',
        loadComponent: () => import('./pages/identity/permissions/permissions.component').then(m => m.PermissionsComponent)
      }
    ]
  },
  {
    path: 'masters',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/masters/masters.component').then(m => m.MastersComponent)
      }
    ]
  },
  {
    path: 'reports',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)
      }
    ]
  },
  {
    path: 'crm',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'coming-soon',
        pathMatch: 'full'
      },
      {
        path: 'coming-soon',
        loadComponent: () => import('./pages/crm/coming-soon.component').then(m => m.ComingSoonComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];