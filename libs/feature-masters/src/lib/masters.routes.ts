import { Routes } from '@angular/router';
import { AuthGuard } from '@lt-india-erp/shared-data-access';

export const mastersRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'parties', canActivate: [AuthGuard], loadComponent: () => import('./pages/parties/parties-list.component').then(m => m.PartiesListComponent) },
      { path: 'ports', canActivate: [AuthGuard], loadComponent: () => import('./pages/ports/ports-list.component').then(m => m.PortsListComponent) },
      { path: 'charge-codes', canActivate: [AuthGuard], loadComponent: () => import('./pages/charge-codes/charge-codes-list.component').then(m => m.ChargeCodesListComponent) },
      { path: 'tax-rates', canActivate: [AuthGuard], loadComponent: () => import('./pages/tax-rates/tax-rates-list.component').then(m => m.TaxRatesListComponent) },
      { path: 'uom', canActivate: [AuthGuard], loadComponent: () => import('./pages/uom/uom-list.component').then(m => m.UomListComponent) }
    ]
  }
];
