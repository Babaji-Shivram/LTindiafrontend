import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DepartmentService } from '../../master/services/department.service';
import { DepartmentMaster } from '../../master/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  
  constructor(private departmentService: DepartmentService) { }

  // Get departments from Masters module
  getDepartments(): Observable<DepartmentMaster[]> {
    return this.departmentService.getDepartments();
  }

  // Get active departments from Masters module
  getActiveDepartments(): Observable<DepartmentMaster[]> {
    return this.departmentService.getActiveDepartments();
  }

  // Get branches (mock data - should be from Masters module)
  getBranches(): Observable<any[]> {
    return of([
      { id: 1, name: 'Mumbai Branch', code: 'MUM', address: 'Mumbai Office', status: 'Active' },
      { id: 2, name: 'Delhi Branch', code: 'DEL', address: 'Delhi Office', status: 'Active' },
      { id: 3, name: 'Bangalore Branch', code: 'BLR', address: 'Bangalore Office', status: 'Active' }
    ]);
  }

  // Get organizations (companies)
  getOrganizations(): Observable<any[]> {
    return of([
      { id: 1, name: 'LT India ERP', code: 'LTI', description: 'Main Company', status: 'Active' }
    ]);
  }

  // Get companies (alias for organizations)
  getCompanies(): Observable<any[]> {
    return this.getOrganizations();
  }

  // Get divisions
  getDivisions(): Observable<any[]> {
    return of([
      { id: 1, name: 'Sales Division', code: 'SALES', status: 'Active' },
      { id: 2, name: 'Operations Division', code: 'OPS', status: 'Active' },
      { id: 3, name: 'Finance Division', code: 'FIN', status: 'Active' }
    ]);
  }
}