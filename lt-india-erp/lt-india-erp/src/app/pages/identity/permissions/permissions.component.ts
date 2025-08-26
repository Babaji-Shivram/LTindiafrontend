import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FrontendPermission, FrontendRole } from '../../../models/database.interfaces';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Permissions Management</h1>
          <p class="text-sm text-gray-600">Manage system permissions and assign them to roles</p>
        </div>
        <div class="flex items-center space-x-3">
          <button style="background-color: #2c4170;" 
                  class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            Add Permission
          </button>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input type="text" 
                   [(ngModel)]="searchTerm"
                   placeholder="Search permissions..." 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Module</label>
            <select [(ngModel)]="selectedModule" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              <option value="">All Modules</option>
              <option *ngFor="let module of modules" [value]="module">{{ module }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select [(ngModel)]="selectedCategory" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              <option value="">All Categories</option>
              <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Action</label>
            <select [(ngModel)]="selectedAction" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              <option value="">All Actions</option>
              <option value="Create">Create</option>
              <option value="Read">Read</option>
              <option value="Update">Update</option>
              <option value="Delete">Delete</option>
              <option value="Manage">Manage</option>
              <option value="View">View</option>
              <option value="Configure">Configure</option>
            </select>
          </div>
        </div>
        <div class="mt-4 flex items-center space-x-2">
          <button (click)="applyFilters()" 
                  style="background-color: #2c4170;" 
                  class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
            Apply Filters
          </button>
          <button (click)="clearFilters()" 
                  class="text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
            Clear
          </button>
        </div>
      </div>

      <!-- Permissions by Module -->
      <div class="space-y-6">
        <div *ngFor="let module of getGroupedPermissions()" class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900">{{ module.name }}</h3>
            <p class="text-sm text-gray-600">{{ module.permissions.length }} permissions</p>
          </div>
          
          <!-- Permissions by Category -->
          <div class="p-6 space-y-4">
            <div *ngFor="let category of module.categories" class="space-y-3">
              <h4 class="text-md font-medium text-gray-800">{{ category.name }}</h4>
              
              <!-- Permissions Table -->
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let permission of category.permissions" class="hover:bg-gray-50">
                      <td class="px-4 py-3">
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ permission.name }}</div>
                          <div class="text-xs text-gray-500">{{ permission.description }}</div>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <span class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {{ permission.resourceName }}
                        </span>
                      </td>
                      <td class="px-4 py-3">
                        <span [class]="getActionBadgeClass(permission.actionName)">
                          {{ permission.actionName }}
                        </span>
                      </td>
                      <td class="px-4 py-3">
                        <span [class]="getStatusBadgeClass(permission.isActive)">
                          {{ permission.isActive ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex flex-wrap gap-1">
                          <span *ngFor="let role of getRolesWithPermission(permission.id)" 
                                class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            {{ role }}
                          </span>
                          <span *ngIf="getRolesWithPermission(permission.id).length === 0"
                                class="text-xs text-gray-500">No roles assigned</span>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <button (click)="editPermission(permission)" 
                                  class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors" 
                                  title="Edit Permission">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                            </svg>
                          </button>
                          <button (click)="togglePermissionStatus(permission)" 
                                  [class]="permission.isActive ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'"
                                  class="p-1 rounded hover:bg-gray-50 transition-colors" 
                                  [title]="permission.isActive ? 'Deactivate Permission' : 'Activate Permission'">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path *ngIf="permission.isActive" fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd"/>
                              <path *ngIf="!permission.isActive" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                            </svg>
                          </button>
                          <button (click)="assignToRoles(permission)" 
                                  class="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50 transition-colors" 
                                  title="Assign to Roles">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                          </button>
                          <button (click)="deletePermission(permission)" 
                                  class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors" 
                                  title="Delete Permission">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clip-rule="evenodd"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PermissionsComponent implements OnInit {
  searchTerm = '';
  selectedModule = '';
  selectedCategory = '';
  selectedAction = '';

  modules: string[] = [];
  categories: string[] = [];

  permissions: FrontendPermission[] = [
    // Identity Module Permissions
    { id: 1, name: 'user.create', description: 'Create new users', resourceName: 'Users', actionName: 'Create', moduleName: 'Identity', category: 'User Management', isActive: true },
    { id: 2, name: 'user.read', description: 'View user information', resourceName: 'Users', actionName: 'Read', moduleName: 'Identity', category: 'User Management', isActive: true },
    { id: 3, name: 'user.update', description: 'Update user information', resourceName: 'Users', actionName: 'Update', moduleName: 'Identity', category: 'User Management', isActive: true },
    { id: 4, name: 'user.delete', description: 'Delete users', resourceName: 'Users', actionName: 'Delete', moduleName: 'Identity', category: 'User Management', isActive: true },
    { id: 5, name: 'role.create', description: 'Create new roles', resourceName: 'Roles', actionName: 'Create', moduleName: 'Identity', category: 'Role Management', isActive: true },
    { id: 6, name: 'role.read', description: 'View role information', resourceName: 'Roles', actionName: 'Read', moduleName: 'Identity', category: 'Role Management', isActive: true },
    { id: 7, name: 'role.update', description: 'Update role information', resourceName: 'Roles', actionName: 'Update', moduleName: 'Identity', category: 'Role Management', isActive: true },
    { id: 8, name: 'role.delete', description: 'Delete roles', resourceName: 'Roles', actionName: 'Delete', moduleName: 'Identity', category: 'Role Management', isActive: true },
    { id: 9, name: 'permission.manage', description: 'Manage permissions', resourceName: 'Permissions', actionName: 'Manage', moduleName: 'Identity', category: 'Permission Management', isActive: true },
    
    // System Module Permissions
    { id: 10, name: 'system.config', description: 'Configure system settings', resourceName: 'System', actionName: 'Configure', moduleName: 'System', category: 'Configuration', isActive: true },
    { id: 11, name: 'system.backup', description: 'Perform system backups', resourceName: 'System', actionName: 'Manage', moduleName: 'System', category: 'Maintenance', isActive: true },
    { id: 12, name: 'system.logs', description: 'View system logs', resourceName: 'Logs', actionName: 'Read', moduleName: 'System', category: 'Monitoring', isActive: true },
    { id: 13, name: 'system.audit', description: 'View audit trails', resourceName: 'Audit', actionName: 'Read', moduleName: 'System', category: 'Monitoring', isActive: true },
    
    // Analytics Module Permissions
    { id: 14, name: 'reports.view', description: 'View reports', resourceName: 'Reports', actionName: 'View', moduleName: 'Analytics', category: 'Reporting', isActive: true },
    { id: 15, name: 'reports.create', description: 'Create new reports', resourceName: 'Reports', actionName: 'Create', moduleName: 'Analytics', category: 'Reporting', isActive: true },
    { id: 16, name: 'dashboard.view', description: 'View dashboard', resourceName: 'Dashboard', actionName: 'View', moduleName: 'Analytics', category: 'Dashboard', isActive: true },
    { id: 17, name: 'analytics.advanced', description: 'Access advanced analytics', resourceName: 'Analytics', actionName: 'View', moduleName: 'Analytics', category: 'Advanced Analytics', isActive: true },
    
    // HR Module Permissions
    { id: 18, name: 'employee.manage', description: 'Manage employee records', resourceName: 'Employees', actionName: 'Manage', moduleName: 'HR', category: 'Employee Management', isActive: true },
    { id: 19, name: 'payroll.manage', description: 'Manage payroll', resourceName: 'Payroll', actionName: 'Manage', moduleName: 'HR', category: 'Payroll', isActive: true },
    { id: 20, name: 'attendance.view', description: 'View attendance records', resourceName: 'Attendance', actionName: 'View', moduleName: 'HR', category: 'Attendance', isActive: true },
    
    // Finance Module Permissions
    { id: 21, name: 'finance.read', description: 'View financial data', resourceName: 'Finance', actionName: 'Read', moduleName: 'Finance', category: 'Financial Data', isActive: true },
    { id: 22, name: 'finance.write', description: 'Modify financial data', resourceName: 'Finance', actionName: 'Update', moduleName: 'Finance', category: 'Financial Data', isActive: true },
    { id: 23, name: 'budget.manage', description: 'Manage budgets', resourceName: 'Budget', actionName: 'Manage', moduleName: 'Finance', category: 'Budget Management', isActive: true }
  ];

  roles: FrontendRole[] = [
    { id: 1, name: 'Admin', description: 'Administrator', isActive: true, isSystemRole: true, priority: 1, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 2, name: 'Manager', description: 'Manager', isActive: true, isSystemRole: false, priority: 2, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 3, name: 'User', description: 'Standard User', isActive: true, isSystemRole: false, priority: 3, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] },
    { id: 4, name: 'Viewer', description: 'Read-only User', isActive: true, isSystemRole: false, priority: 4, createdDate: new Date(), userCount: 0, permissionCount: 0, permissions: [] }
  ];

  // Mock role-permission mappings
  rolePermissions: { [roleId: number]: number[] } = {
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // Admin has all permissions
    2: [2, 3, 6, 7, 14, 16, 18, 19, 20, 21], // Manager permissions
    3: [2, 6, 14, 16, 20, 21], // User permissions
    4: [2, 6, 12, 13, 14, 16, 20, 21] // Viewer permissions
  };

  ngOnInit(): void {
    this.initializeFilters();
  }

  initializeFilters(): void {
    this.modules = [...new Set(this.permissions.map(p => p.moduleName))].sort();
    this.categories = [...new Set(this.permissions.map(p => p.category))].sort();
  }

  getGroupedPermissions() {
    let filteredPermissions = this.permissions;

    // Apply filters
    if (this.searchTerm) {
      filteredPermissions = filteredPermissions.filter(p => 
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedModule) {
      filteredPermissions = filteredPermissions.filter(p => p.moduleName === this.selectedModule);
    }

    if (this.selectedCategory) {
      filteredPermissions = filteredPermissions.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedAction) {
      filteredPermissions = filteredPermissions.filter(p => p.actionName === this.selectedAction);
    }

    // Group by module and category
    const modules: any[] = [];
    const moduleMap = new Map();

    filteredPermissions.forEach(permission => {
      if (!moduleMap.has(permission.moduleName)) {
        moduleMap.set(permission.moduleName, {
          name: permission.moduleName,
          permissions: [],
          categories: []
        });
        modules.push(moduleMap.get(permission.moduleName));
      }

      const module = moduleMap.get(permission.moduleName);
      module.permissions.push(permission);

      let category = module.categories.find((c: any) => c.name === permission.category);
      if (!category) {
        category = {
          name: permission.category,
          permissions: []
        };
        module.categories.push(category);
      }
      category.permissions.push(permission);
    });

    return modules;
  }

  getActionBadgeClass(action: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-medium rounded';
    switch (action.toLowerCase()) {
      case 'create':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'read':
      case 'view':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'update':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'delete':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'manage':
      case 'configure':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadgeClass(isActive: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return isActive 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }

  getRolesWithPermission(permissionId: number): string[] {
    const rolesWithPermission: string[] = [];
    Object.keys(this.rolePermissions).forEach(roleIdStr => {
      const roleId = parseInt(roleIdStr);
      if (this.rolePermissions[roleId].includes(permissionId)) {
        const role = this.roles.find(r => r.id === roleId);
        if (role) {
          rolesWithPermission.push(role.name);
        }
      }
    });
    return rolesWithPermission;
  }

  applyFilters(): void {
    console.log('Applying permission filters');
    // Filters are applied in getGroupedPermissions()
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedModule = '';
    this.selectedCategory = '';
    this.selectedAction = '';
  }

  editPermission(permission: FrontendPermission): void {
    console.log('Editing permission:', permission);
    // TODO: Open edit permission modal
  }

  togglePermissionStatus(permission: FrontendPermission): void {
    console.log('Toggling permission status:', permission.name, !permission.isActive);
    permission.isActive = !permission.isActive;
    // TODO: Call API to update permission status
  }

  assignToRoles(permission: FrontendPermission): void {
    console.log('Assigning permission to roles:', permission);
    // TODO: Open role assignment modal
  }

  deletePermission(permission: FrontendPermission): void {
    if (confirm(`Are you sure you want to delete permission "${permission.name}"?`)) {
      console.log('Deleting permission:', permission);
      // TODO: Call API to delete permission
      const index = this.permissions.findIndex(p => p.id === permission.id);
      if (index > -1) {
        this.permissions.splice(index, 1);
      }
    }
  }
}
