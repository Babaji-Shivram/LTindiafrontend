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
        sRemarks: 'Full system access with all permissions',
        bDel: false,
        dEntry: new Date('2024-01-15')
      },
      {
        lRoleId: 2,
        sName: 'Manager',
        sRemarks: 'Department management and oversight',
        bDel: false,
        dEntry: new Date('2024-02-10')
      },
      {
        lRoleId: 3,
        sName: 'User',
        sRemarks: 'Standard user access for daily operations',
        bDel: false,
        dEntry: new Date('2024-02-20')
      },
      {
        lRoleId: 4,
        sName: 'Developer',
        sRemarks: 'Technical development and system maintenance',
        bDel: false,
        dEntry: new Date('2024-03-01')
      },
      {
        lRoleId: 5,
        sName: 'Sales Representative',
        sRemarks: 'Customer relationship and sales management',
        bDel: false,
        dEntry: new Date('2024-03-05')
      },
      {
        lRoleId: 6,
        sName: 'Financial Analyst',
        sRemarks: 'Financial reporting and analysis',
        bDel: false,
        dEntry: new Date('2024-03-10')
      },
      {
        lRoleId: 7,
        sName: 'Support Specialist',
        sRemarks: 'Customer support and technical assistance',
        bDel: false,
        dEntry: new Date('2024-03-15')
      },
      {
        lRoleId: 8,
        sName: 'Guest User',
        sRemarks: 'Limited access for external users',
        bDel: false,
        dEntry: new Date('2024-03-20')
      },
      {
        lRoleId: 9,
        sName: 'Quality Assurance',
        sRemarks: 'Testing and quality control',
        bDel: false,
        dEntry: new Date('2024-03-25')
      },
      {
        lRoleId: 10,
        sName: 'Supervisor',
        sRemarks: 'Team supervision and coordination',
        bDel: true,
        dEntry: new Date('2024-01-05')
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
