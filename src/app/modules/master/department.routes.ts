import { Routes } from '@angular/router';
import { DepartmentListComponent } from './components/department/department-list.component';
import { DepartmentFormComponent } from './components/department/department-form.component';
import { DepartmentDetailsComponent } from './components/department/department-details.component';

export const departmentRoutes: Routes = [
  {
    path: '',
    component: DepartmentListComponent
  },
  {
    path: 'new',
    component: DepartmentFormComponent
  },
  {
    path: ':id',
    component: DepartmentDetailsComponent
  },
  {
    path: ':id/edit',
    component: DepartmentFormComponent
  }
];
