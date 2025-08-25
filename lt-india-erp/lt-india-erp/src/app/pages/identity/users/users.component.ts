import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xs font-bold text-gray-900">Users</h1>
          <p class="text-xs text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button style="background-color: #2c4170;" class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add User
        </button>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-medium text-gray-900">All Users</h3>
            <div class="flex items-center space-x-4">
              <input type="text" 
                     placeholder="Search users..." 
                     class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs">
              <select class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let user of users" class="hover:bg-gray-50">
                <td class="px-4 py-2 whitespace-nowrap">
                  <div class="flex items-center">
                    <div [class]="'w-8 h-8 rounded-full flex items-center justify-center ' + user.avatar">
                      <span class="text-white font-medium text-xs">{{ getInitials(user.name) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-xs font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-xs text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                  <span [class]="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                  <span [class]="getStatusBadgeClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                  {{ user.lastLogin }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs font-medium">
                  <div class="flex items-center space-x-3">
                    <button style="color: #2c4170;" class="hover:text-primary-light p-1 rounded hover:bg-primary/10 transition-colors" title="Edit">
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button class="text-error hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                      <span class="material-icons text-sm">delete</span>
                    </button>
                    <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                      <span class="material-icons text-sm">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-xs text-gray-500">
            Showing 1 to {{ users.length }} of {{ users.length }} results
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">Previous</button>
            <button class="px-2 py-1 rounded text-xs text-white" style="background-color: #2c4170;">1</button>
            <button class="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UsersComponent {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@ltindia.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      avatar: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@ltindia.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '1 day ago',
      avatar: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@ltindia.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '1 week ago',
      avatar: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@ltindia.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '3 hours ago',
      avatar: 'bg-pink-500'
    }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRoleBadgeClass(role: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (role.toLowerCase()) {
      case 'admin':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'manager':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'user':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return status === 'Active' 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }
}