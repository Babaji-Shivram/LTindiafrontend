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
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/identity/users/users.component').then(m => m.UsersComponent)
          },
          {
            path: 'new',
            loadComponent: () => import('./pages/identity/users/user-form.component').then(m => m.UserFormComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/identity/users/user-form.component').then(m => m.UserFormComponent)
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./pages/identity/users/user-form.component').then(m => m.UserFormComponent)
          }
        ]
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            loadComponent: () => import('./modules/identity/components/role-detail/role-detail-list.component').then(m => m.RoleDetailListComponent)
          },
          {
            path: 'new',
            loadComponent: () => import('./modules/identity/components/role-detail/role-detail-form.component').then(m => m.RoleDetailFormComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('./modules/identity/components/role-detail/role-detail-view.component').then(m => m.RoleDetailViewComponent)
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./modules/identity/components/role-detail/role-detail-form.component').then(m => m.RoleDetailFormComponent)
          },
          {
            path: ':id/permissions',
            loadComponent: () => import('./modules/identity/components/role-detail/role-detail-form.component').then(m => m.RoleDetailFormComponent)
          }
        ]
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
      },
      {
        path: 'branches',
        loadComponent: () => import('./modules/master/components/branch/branch-list.component').then(m => m.BranchListComponent)
      },
      {
        path: 'branches/new',
        loadComponent: () => import('./modules/master/components/branch/branch-form.component').then(m => m.BranchFormComponent)
      },
      {
        path: 'branches/:id',
        loadComponent: () => import('./modules/master/components/branch/branch-details.component').then(m => m.BranchDetailsComponent)
      },
      {
        path: 'branches/:id/edit',
        loadComponent: () => import('./modules/master/components/branch/branch-form.component').then(m => m.BranchFormComponent)
      },
      {
        path: 'ports',
        loadComponent: () => import('./modules/master/components/port/port-list.component').then(m => m.PortListComponent)
      },
      {
        path: 'ports/new',
        loadComponent: () => import('./modules/master/components/port/port-form.component').then(m => m.PortFormComponent)
      },
      {
        path: 'ports/:id',
        loadComponent: () => import('./modules/master/components/port/port-details.component').then(m => m.PortDetailsComponent)
      },
      {
        path: 'ports/:id/edit',
        loadComponent: () => import('./modules/master/components/port/port-form.component').then(m => m.PortFormComponent)
      },
      {
        path: 'countries',
        loadComponent: () => import('./modules/master/components/country/country-list.component').then(m => m.CountryListComponent)
      },
      {
        path: 'countries/new',
        loadComponent: () => import('./modules/master/components/country/country-form.component').then(m => m.CountryFormComponent)
      },
      {
        path: 'countries/:id',
        loadComponent: () => import('./modules/master/components/country/country-details.component').then(m => m.CountryDetailsComponent)
      },
      {
        path: 'countries/:id/edit',
        loadComponent: () => import('./modules/master/components/country/country-form.component').then(m => m.CountryFormComponent)
      },
      {
        path: 'states',
        loadComponent: () => import('./modules/master/components/state/state-list/state-list.component').then(m => m.StateListComponent)
      },
      {
        path: 'states/new',
        loadComponent: () => import('./modules/master/components/state/state-form/state-form.component').then(m => m.StateFormComponent)
      },
      {
        path: 'states/:id',
        loadComponent: () => import('./modules/master/components/state/state-details/state-details.component').then(m => m.StateDetailsComponent)
      },
      {
        path: 'states/:id/edit',
        loadComponent: () => import('./modules/master/components/state/state-form/state-form.component').then(m => m.StateFormComponent)
      },
      {
        path: 'cities',
        loadComponent: () => import('./modules/master/components/city/city-list/city-list.component').then(m => m.CityListComponent)
      },
      {
        path: 'cities/new',
        loadComponent: () => import('./modules/master/components/city/city-form/city-form.component').then(m => m.CityFormComponent)
      },
      {
        path: 'cities/:id',
        loadComponent: () => import('./modules/master/components/city/city-details/city-details.component').then(m => m.CityDetailsComponent)
      },
      {
        path: 'cities/:id/edit',
        loadComponent: () => import('./modules/master/components/city/city-form/city-form.component').then(m => m.CityFormComponent)
      },
      {
        path: 'currencies',
        loadComponent: () => import('./modules/master/components/currency/currency-list.component').then(m => m.CurrencyListComponent)
      },
      {
        path: 'currencies/new',
        loadComponent: () => import('./modules/master/components/currency/currency-form.component').then(m => m.CurrencyFormComponent)
      },
      {
        path: 'currencies/:id',
        loadComponent: () => import('./modules/master/components/currency/currency-details.component').then(m => m.CurrencyDetailsComponent)
      },
      {
        path: 'currencies/:id/edit',
        loadComponent: () => import('./modules/master/components/currency/currency-form.component').then(m => m.CurrencyFormComponent)
      },
      {
        path: 'departments',
        loadComponent: () => import('./modules/master/components/department/department-list.component').then(m => m.DepartmentListComponent)
      },
      {
        path: 'departments/new',
        loadComponent: () => import('./modules/master/components/department/department-form.component').then(m => m.DepartmentFormComponent)
      },
      {
        path: 'departments/:id',
        loadComponent: () => import('./modules/master/components/department/department-details.component').then(m => m.DepartmentDetailsComponent)
      },
      {
        path: 'departments/:id/edit',
        loadComponent: () => import('./modules/master/components/department/department-form.component').then(m => m.DepartmentFormComponent)
      },
      {
        path: 'divisions',
        loadComponent: () => import('./modules/master/components/division/division-list.component').then(m => m.DivisionListComponent)
      },
      {
        path: 'divisions/new',
        loadComponent: () => import('./modules/master/components/division/division-form.component').then(m => m.DivisionFormComponent)
      },
      {
        path: 'divisions/:id/edit',
        loadComponent: () => import('./modules/master/components/division/division-form.component').then(m => m.DivisionFormComponent)
      },
      {
        path: 'designations',
        loadComponent: () => import('./modules/master/components/designation/designation-list.component').then(m => m.DesignationListComponent)
      },
      {
        path: 'designations/new',
        loadComponent: () => import('./modules/master/components/designation/designation-form.component').then(m => m.DesignationFormComponent)
      },
      {
        path: 'designations/:id/edit',
        loadComponent: () => import('./modules/master/components/designation/designation-form.component').then(m => m.DesignationFormComponent)
      },
      {
        path: 'tax-rate',
        loadComponent: () => import('./modules/master/components/tax-rate/tax-rate-list.component').then(m => m.TaxRateListComponent)
      },
      {
        path: 'tax-rate/new',
        loadComponent: () => import('./modules/master/components/tax-rate/tax-rate-form.component').then(m => m.TaxRateFormComponent)
      },
      {
        path: 'tax-rate/:id/edit',
        loadComponent: () => import('./modules/master/components/tax-rate/tax-rate-form.component').then(m => m.TaxRateFormComponent)
      },
      {
        path: 'customer-sectors',
        loadComponent: () => import('./modules/master/components/customer-sector/customer-sector-list.component').then(m => m.CustomerSectorListComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./modules/master/components/customer/customer-list.component').then(m => m.CustomerListComponent)
      },
      {
        path: 'customers/new',
        loadComponent: () => import('./modules/master/components/customer/customer-form.component').then(m => m.CustomerFormComponent)
      },
      {
        path: 'customers/:id/edit',
        loadComponent: () => import('./modules/master/components/customer/customer-form.component').then(m => m.CustomerFormComponent)
      },
      {
        path: 'document-type',
        loadComponent: () => import('./modules/master/components/document/document-list.component').then(m => m.DocumentListComponent)
      },
      {
        path: 'package-types',
        loadComponent: () => import('./modules/master/components/package-type/package-type-list.component').then(m => m.PackageTypeListComponent)
      },
      {
        path: 'vehicles',
        loadComponent: () => import('./modules/master/components/vehicle/vehicle-list.component').then(m => m.VehicleListComponent)
      },
      {
        path: 'expenses',
        loadComponent: () => import('./modules/master/components/expense/expense-list.component').then(m => m.ExpenseListComponent)
      },
      {
        path: 'expenses/new',
        loadComponent: () => import('./modules/master/components/expense/expense-form.component').then(m => m.ExpenseFormComponent)
      },
      {
        path: 'expenses/:id/edit',
        loadComponent: () => import('./modules/master/components/expense/expense-form.component').then(m => m.ExpenseFormComponent)
      },
      {
        path: 'job-types',
        loadComponent: () => import('./modules/master/components/job-type/job-type-list.component').then(m => m.JobTypeListComponent)
      },
      {
        path: 'job-status',
        loadComponent: () => import('./modules/master/components/job-status/job-status-list.component').then(m => m.JobStatusListComponent)
      },
      {
        path: 'cfs',
        loadComponent: () => import('./modules/master/components/cfs/cfs-list.component').then(m => m.CFSListComponent)
      },
      {
        path: 'incoterms',
        loadComponent: () => import('./modules/master/components/incoterms/incoterms-list.component').then(m => m.IncoTermsListComponent)
      },
      {
        path: 'uom',
        loadComponent: () => import('./modules/master/components/uom/uom-list.component').then(m => m.UOMListComponent)
      },
      {
        path: 'payment-terms',
        loadComponent: () => import('./modules/master/components/payment-terms-list.component').then(m => m.PaymentTermsListComponent)
      },
      {
        path: 'payment-terms/new',
        loadComponent: () => import('./modules/master/components/payment-term-form.component').then(m => m.PaymentTermFormComponent)
      },
      {
        path: 'payment-terms/:id/edit',
        loadComponent: () => import('./modules/master/components/payment-term-form.component').then(m => m.PaymentTermFormComponent)
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
    path: 'masters-demo',
    loadComponent: () => import('./pages/masters-demo.component').then(m => m.MastersDemoComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];