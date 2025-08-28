import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleDetailService {

  constructor() {}

  // Mock methods to match component expectations
  getSampleRoles(): Observable<any[]> {
    return of([
      {
        lRoleId: 1,
        sName: 'Administrator',
        sRemarks: 'Full system access',
        bDel: false,
        dEntry: new Date()
      },
      {
        lRoleId: 2,
        sName: 'Manager',
        sRemarks: 'Management access',
        bDel: false,
        dEntry: new Date()
      },
      {
        lRoleId: 3,
        sName: 'User',
        sRemarks: 'Standard user access',
        bDel: false,
        dEntry: new Date()
      }
    ]);
  }

  setCurrentRole(role: any): void {
    // Mock implementation
    console.log('Setting current role:', role);
  }

  getRoleDetail(roleId: number): Observable<any> {
    return of({
      role: {
        lRoleId: roleId,
        sName: 'Sample Role',
        sRemarks: 'Sample role description',
        bDel: false,
        dEntry: new Date()
      },
      permissions: []
    });
  }

  saveRole(roleData: any): Observable<any> {
    return of({ success: true, message: 'Role saved successfully' });
  }

  deleteRole(roleId: number, userId?: number): Observable<any> {
    return of({ success: true, message: 'Role deleted successfully' });
  }

  getAllRoles(): Observable<any[]> {
    return this.getSampleRoles();
  }

  getRoleMenu(roleId: number): Observable<any[]> {
    return of([]);
  }

  getAllPages(): Observable<any[]> {
    return of([]);
  }

  createRole(role: any): Observable<any> {
    return of({ success: true, role: role });
  }

  updateRole(roleId: number, role: any): Observable<any> {
    return of({ success: true, role: role });
  }

  updateRolePermissions(roleId: number, permissions: any[], reason?: string): Observable<any> {
    return of({ success: true });
  }

  getModulePermissions(roleId: number, moduleId: number): Observable<any[]> {
    return of([]);
  }

  searchRoles(criteria: any): Observable<any> {
    return of({ roles: [], total: 0 });
  }

  clearCurrentRole(): void {
    console.log('Clearing current role');
  }
}
