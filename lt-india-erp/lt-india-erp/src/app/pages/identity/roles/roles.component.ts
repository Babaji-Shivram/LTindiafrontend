import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Roles</h1>
          <p class="text-gray-600">Manage user roles and permissions</p>
        </div>
        <button style="background-color: #243C70;" class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Create Role
        </button>

      <!-- Roles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let role of roles" class="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div [class]="getRoleIconClass(role.name)">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ role.name }}</h3>
            </div>
            <div class="flex items-center space-x-2">
              <button [routerLink]="['/identity/roles', role.id]" 
                      class="text-blue-600 hover:text-blue-800">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button class="text-gray-600 hover:text-gray-800">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
          </div>

          <p class="text-gray-600 text-sm mb-4">{{ role.description }}</p>

          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Users:</span>
              <span class="font-medium text-gray-900">{{ role.userCount }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Permissions:</span>
              <span class="font-medium text-gray-900">{{ role.permissions.length }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Created:</span>
              <span class="font-medium text-gray-900">{{ role.createdAt }}</span>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex flex-wrap gap-1">
              <span *ngFor="let permission of role.permissions.slice(0, 3)" 
                    class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {{ permission }}
              </span>
              <span *ngIf="role.permissions.length > 3" 
                    class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                +{{ role.permissions.length - 3 }} more
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RolesComponent {
  roles: Role[] = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access with all administrative privileges',
      permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'role.manage', 'system.config'],
      userCount: 2,
      createdAt: 'Jan 15, 2024'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Management level access with team oversight capabilities',
      permissions: ['user.read', 'user.update', 'reports.view', 'team.manage'],
      userCount: 5,
      createdAt: 'Jan 20, 2024'
    },
    {
      id: 3,
      name: 'User',
      description: 'Standard user access with basic system functionality',
      permissions: ['profile.read', 'profile.update', 'data.read'],
      userCount: 15,
      createdAt: 'Feb 1, 2024'
    },
    {
      id: 4,
      name: 'Viewer',
      description: 'Read-only access for viewing system information',
      permissions: ['data.read', 'reports.view'],
      userCount: 8,
      createdAt: 'Feb 10, 2024'
    }
  ];

  getRoleIconClass(roleName: string): string {
    const baseClasses = 'w-8 h-8 rounded-lg flex items-center justify-center';
    switch (roleName.toLowerCase()) {
      case 'admin':
        return `${baseClasses} bg-red-500`;
      case 'manager':
        return `${baseClasses} bg-yellow-500`;
      case 'user':
        return `${baseClasses} bg-blue-500`;
      case 'viewer':
        return `${baseClasses} bg-gray-500`;
      default:
        return `${baseClasses} bg-gray-500`;
    }
  }
}