import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { 
  CreateRoleRequest, 
  UpdateRoleRequest, 
  RolePermissionRequest, 
  RoleFormData,
  CRMRoleTemplate 
} from '../../../models/database.interfaces';
import { BSRoleMaster, BSRoleDetail } from '../models/role-detail.model';

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

  // CRM-Compatible Role Management Methods
  
  /**
   * Create role with CRM BS_RoleMS compatibility
   * @param roleData CRM-compatible role creation data
   */
  createCRMRole(roleData: CreateRoleRequest): Observable<{ success: boolean; roleId?: number; message?: string }> {
    // Transform to BS_RoleMS structure
    const crmRoleData = {
      sName: roleData.sName || roleData.name || '',
      sRemarks: roleData.sRemarks || roleData.description || '',
      lCompId: roleData.lCompId || 0,
      lUserId: roleData.lUserId || 1, // Current user ID
      lDate: roleData.lDate || Date.now(),
      wefDate: roleData.wefDate || Date.now(),
      bDel: roleData.bDel || false
    };

    console.log('Creating CRM role with BS_RoleMS structure:', crmRoleData);
    
    // TODO: Call actual API endpoint
    // return this.http.post<ApiResponse>('/api/roles/crm', crmRoleData);
    
    // Mock response
    return of({ 
      success: true, 
      roleId: Math.floor(Math.random() * 1000) + 100,
      message: 'Role created successfully with CRM compatibility' 
    });
  }

  /**
   * Update role with CRM BS_RoleMS compatibility
   * @param roleData CRM-compatible role update data
   */
  updateCRMRole(roleData: UpdateRoleRequest): Observable<{ success: boolean; message?: string }> {
    // Transform to BS_RoleMS structure
    const crmUpdateData = {
      lRoleId: roleData.lRoleId || roleData.id,
      sName: roleData.sName || roleData.name,
      sRemarks: roleData.sRemarks || roleData.description,
      lCompId: roleData.lCompId,
      lUserId: roleData.lUserId || 1, // Current user ID
      lDate: roleData.lDate || Date.now(),
      wefDate: roleData.wefDate,
      bDel: roleData.bDel
    };

    console.log('Updating CRM role with BS_RoleMS structure:', crmUpdateData);
    
    // TODO: Call actual API endpoint
    // return this.http.put<ApiResponse>(`/api/roles/crm/${roleData.lRoleId}`, crmUpdateData);
    
    // Mock response
    return of({ 
      success: true, 
      message: 'Role updated successfully with CRM compatibility' 
    });
  }

  /**
   * Assign permissions to role with BS_RoleDetail compatibility
   * @param roleId Role ID
   * @param permissions Array of CRM-compatible permissions
   */
  assignCRMPermissions(roleId: number, permissions: RolePermissionRequest[]): Observable<{ success: boolean; message?: string }> {
    console.log('Assigning CRM permissions with BS_RoleDetail structure:', { roleId, permissions });
    
    // TODO: Call actual API endpoint
    // return this.http.post<ApiResponse>(`/api/roles/${roleId}/permissions/crm`, { permissions });
    
    // Mock response
    return of({ 
      success: true, 
      message: 'Permissions assigned successfully with CRM compatibility' 
    });
  }

  /**
   * Get predefined CRM role templates
   */
  getCRMRoleTemplates(): Observable<CRMRoleTemplate[]> {
    const templates: CRMRoleTemplate[] = [
      {
        roleName: "CRM Sales Executive",
        description: "Basic sales person with lead management access",
        permissions: [
          { module: 'CRM', page: 'Lead Management', access: 'Read/Write' },
          { module: 'CRM', page: 'Company Management', access: 'Read/Write' },
          { module: 'CRM', page: 'Activity Logging', access: 'Read/Write' },
          { module: 'CRM', page: 'Dashboard', access: 'Read' }
        ]
      },
      {
        roleName: "CRM Sales Manager", 
        description: "Sales manager with team lead oversight and approval rights",
        permissions: [
          { module: 'CRM', page: 'All Lead Management', access: 'Read/Write' },
          { module: 'CRM', page: 'Lead Approval', access: 'Approve' },
          { module: 'CRM', page: 'Team Reports', access: 'Read' },
          { module: 'CRM', page: 'Quote Management', access: 'Read/Write/Approve' }
        ]
      },
      {
        roleName: "Branch Manager",
        description: "Branch-level management with full CRM access", 
        permissions: [
          { module: 'CRM', page: 'All Functions', access: 'Full Access' },
          { module: 'CRM', page: 'Branch Reports', access: 'Read' },
          { module: 'CRM', page: 'User Management', access: 'Read/Write' }
        ]
      },
      {
        roleName: "CRM Administrator",
        description: "Full CRM system administration rights",
        permissions: [
          { module: 'CRM', page: 'All Functions', access: 'Full Access' },
          { module: 'CRM', page: 'Master Data', access: 'Read/Write/Delete' },
          { module: 'CRM', page: 'System Configuration', access: 'Full Access' }
        ]
      }
    ];

    return of(templates);
  }

  /**
   * Validate role data according to CRM business rules
   * @param roleData Role data to validate
   */
  validateCRMRole(roleData: RoleFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required field validation
    if (!roleData.roleName || roleData.roleName.trim().length === 0) {
      errors.push('Role name is required');
    } else if (roleData.roleName.length > 100) {
      errors.push('Role name cannot exceed 100 characters');
    }

    // Description validation
    if (roleData.roleDescription && roleData.roleDescription.length > 500) {
      errors.push('Role description cannot exceed 500 characters');
    }

    // Role name pattern validation
    const roleNamePattern = /^[a-zA-Z0-9\s\-_]+$/;
    if (roleData.roleName && !roleNamePattern.test(roleData.roleName)) {
      errors.push('Role name can only contain alphanumeric characters, spaces, hyphens, and underscores');
    }

    // Permission validation
    if (roleData.permissions && roleData.permissions.length === 0) {
      errors.push('At least one permission must be assigned to the role');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Additional methods for permission manager
  getRoleById(roleId: number): Promise<BSRoleMaster> {
    return new Promise((resolve, reject) => {
      this.getRoleDetail(roleId).subscribe({
        next: (role) => resolve(role),
        error: (error) => reject(error)
      });
    });
  }

  getAvailableModules(): Promise<any[]> {
    // Mock data for available modules and tasks
    const modules = [
      {
        lModuleId: 1,
        sModuleName: 'CRM Management',
        sDescription: 'Customer relationship management',
        tasks: [
          { lTaskId: 1, sTaskName: 'View Customers', sDescription: 'View customer list and basic details' },
          { lTaskId: 2, sTaskName: 'Manage Customers', sDescription: 'Create, edit, and delete customer records' },
          { lTaskId: 3, sTaskName: 'Customer Reports', sDescription: 'Generate customer analytics and reports' }
        ]
      },
      {
        lModuleId: 2,
        sModuleName: 'Sales Management',
        sDescription: 'Sales operations and tracking',
        tasks: [
          { lTaskId: 4, sTaskName: 'View Leads', sDescription: 'View leads and opportunities' },
          { lTaskId: 5, sTaskName: 'Manage Leads', sDescription: 'Create and update lead information' },
          { lTaskId: 6, sTaskName: 'Sales Reports', sDescription: 'View sales performance reports' }
        ]
      },
      {
        lModuleId: 3,
        sModuleName: 'User Management',
        sDescription: 'System user administration',
        tasks: [
          { lTaskId: 7, sTaskName: 'View Users', sDescription: 'View system user list' },
          { lTaskId: 8, sTaskName: 'Manage Users', sDescription: 'Create, edit, and deactivate users' },
          { lTaskId: 9, sTaskName: 'User Permissions', sDescription: 'Assign and manage user permissions' }
        ]
      },
      {
        lModuleId: 4,
        sModuleName: 'Reports & Analytics',
        sDescription: 'Business intelligence and reporting',
        tasks: [
          { lTaskId: 10, sTaskName: 'View Dashboards', sDescription: 'Access business dashboards' },
          { lTaskId: 11, sTaskName: 'Generate Reports', sDescription: 'Create custom reports' },
          { lTaskId: 12, sTaskName: 'Export Data', sDescription: 'Export reports and data' }
        ]
      }
    ];
    
    return Promise.resolve(modules);
  }

  getRolePermissions(roleId: number): Promise<BSRoleDetail[]> {
    // Mock current permissions for the role
    const permissions: BSRoleDetail[] = [
      {
        lid: 1,
        lRoleId: roleId,
        lModuleId: 1,
        lTaskId: 1,
        cTyp: 'P',
        lTypId: 1,
        lMode: 1,
        bDel: 0,
        lUserId: 1,
        dEntry: new Date()
      },
      {
        lid: 2,
        lRoleId: roleId,
        lModuleId: 1,
        lTaskId: 1,
        cTyp: 'R',
        lTypId: 1,
        lMode: 1,
        bDel: 0,
        lUserId: 1,
        dEntry: new Date()
      },
      {
        lid: 3,
        lRoleId: roleId,
        lModuleId: 2,
        lTaskId: 4,
        cTyp: 'P',
        lTypId: 1,
        lMode: 1,
        bDel: 0,
        lUserId: 1,
        dEntry: new Date()
      }
    ];
    
    return Promise.resolve(permissions);
  }
}
