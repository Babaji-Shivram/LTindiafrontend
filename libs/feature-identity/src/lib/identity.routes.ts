import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from '@lt-india-erp/shared-data-access';

export const identityRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/users/users-list.component').then(m => m.UsersListComponent)
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/roles/roles-list.component').then(m => m.RolesListComponent)
      }
    ]
  }
];
