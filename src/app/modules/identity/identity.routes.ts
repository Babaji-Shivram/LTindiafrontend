import { Routes } from '@angular/router';

export const identityRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => import('../../pages/identity/users/users.component').then(m => m.UsersComponent),
    title: 'Users - Identity Management'
  },
  {
    path: 'roles',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/role-detail/role-detail-list.component').then(m => m.RoleDetailListComponent),
        title: 'Roles - Identity Management'
      },
      {
        path: 'new',
        loadComponent: () => import('./components/role-detail/role-detail-form.component').then(m => m.RoleDetailFormComponent),
        title: 'Create Role - Identity Management'
      },
      {
        path: ':id',
        loadComponent: () => import('./components/role-detail/role-detail-view.component').then(m => m.RoleDetailViewComponent),
        title: 'Role Details - Identity Management'
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./components/role-detail/role-detail-form.component').then(m => m.RoleDetailFormComponent),
        title: 'Edit Role - Identity Management'
      },
      {
        path: ':id/permissions',
        loadComponent: () => import('./components/role-detail/role-detail-form.component').then(m => m.RoleDetailFormComponent),
        title: 'Manage Permissions - Identity Management'
      }
    ]
  }
];
