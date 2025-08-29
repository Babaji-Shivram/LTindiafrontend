import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  granted: boolean;
}

interface RoleDetail {
  id: number;
  name: string;
  description: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6" *ngIf="role">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button routerLink="/identity/roles" 
                  class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h1 class="page-title text-gray-900">{{ role.name }} Role</h1>
            <p class="text-sm text-gray-600">{{ role.description }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button class="input-text px-4 py-2 border border-gray-300 rounded">
            Edit Role
          </button>
          <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition-all text-sm">
            Delete Role
          </button>
        </div>
      </div>

      <!-- Role Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Users</p>
              <p class="section-header text-gray-900">{{ role.userCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Permissions</p>
              <p class="section-header text-gray-900">{{ getGrantedPermissionsCount() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Created</p>
              <p class="text-sm font-semibold text-gray-900">{{ role.createdAt }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Permissions -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Permissions</h3>
          <p class="text-sm text-gray-600">Manage what this role can access and do</p>
        </div>

        <div class="p-6">
          <div *ngFor="let category of getPermissionCategories()" class="mb-8 last:mb-0">
            <h4 class="text-sm font-semibold text-gray-900 mb-4 capitalize">{{ category }}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div *ngFor="let permission of getPermissionsByCategory(category)" 
                   class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex-1">
                  <h5 class="table-cell font-medium text-gray-900">{{ permission.name }}</h5>
                  <p class="text-xs text-gray-500">{{ permission.description }}</p>
                </div>
                <div class="ml-4">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" 
                           [checked]="permission.granted" 
                           class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button class="input-text px-4 py-2 border border-gray-300 rounded">
            Cancel
          </button>
          <button style="background-color: #243C70;" class="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  `
})
export class RoleDetailsComponent implements OnInit {
  role: RoleDetail | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const roleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRoleDetails(roleId);
  }

  loadRoleDetails(roleId: number) {
    // Mock data - in real app, this would come from a service
    const mockRoles: RoleDetail[] = [
      {
        id: 1,
        name: 'Admin',
        description: 'Full system access with all administrative privileges',
        userCount: 2,
        createdAt: 'Jan 15, 2024',
        updatedAt: 'Mar 10, 2024',
        permissions: [
          { id: 'user.create', name: 'Create Users', description: 'Can create new user accounts', category: 'user management', granted: true },
          { id: 'user.read', name: 'View Users', description: 'Can view user information', category: 'user management', granted: true },
          { id: 'user.update', name: 'Edit Users', description: 'Can modify user accounts', category: 'user management', granted: true },
          { id: 'user.delete', name: 'Delete Users', description: 'Can remove user accounts', category: 'user management', granted: true },
          { id: 'role.manage', name: 'Manage Roles', description: 'Can create and modify roles', category: 'role management', granted: true },
          { id: 'system.config', name: 'System Configuration', description: 'Can modify system settings', category: 'system', granted: true },
          { id: 'reports.view', name: 'View Reports', description: 'Can access system reports', category: 'reports', granted: true },
          { id: 'reports.export', name: 'Export Reports', description: 'Can export report data', category: 'reports', granted: true }
        ]
      },
      {
        id: 2,
        name: 'Manager',
        description: 'Management level access with team oversight capabilities',
        userCount: 5,
        createdAt: 'Jan 20, 2024',
        updatedAt: 'Mar 5, 2024',
        permissions: [
          { id: 'user.read', name: 'View Users', description: 'Can view user information', category: 'user management', granted: true },
          { id: 'user.update', name: 'Edit Users', description: 'Can modify user accounts', category: 'user management', granted: true },
          { id: 'user.create', name: 'Create Users', description: 'Can create new user accounts', category: 'user management', granted: false },
          { id: 'user.delete', name: 'Delete Users', description: 'Can remove user accounts', category: 'user management', granted: false },
          { id: 'reports.view', name: 'View Reports', description: 'Can access system reports', category: 'reports', granted: true },
          { id: 'reports.export', name: 'Export Reports', description: 'Can export report data', category: 'reports', granted: false },
          { id: 'team.manage', name: 'Team Management', description: 'Can manage team members', category: 'team', granted: true }
        ]
      }
    ];

    this.role = mockRoles.find(r => r.id === roleId) || null;
  }

  getGrantedPermissionsCount(): number {
    return this.role?.permissions.filter(p => p.granted).length || 0;
  }

  getPermissionCategories(): string[] {
    if (!this.role) return [];
    const categories = [...new Set(this.role.permissions.map(p => p.category))];
    return categories.sort();
  }

  getPermissionsByCategory(category: string): Permission[] {
    if (!this.role) return [];
    return this.role.permissions.filter(p => p.category === category);
  }
}