import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z"/>
              </svg>
            </div>
            <h1 class="text-xl font-semibold text-gray-900">LT India ERP</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              (click)="goToDashboard()"
              class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Dashboard
            </button>
            <button 
              (click)="logout()"
              class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-6">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Identity Management</h2>
          <p class="text-gray-600">Manage users, roles, and permissions</p>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Users</h3>
              <p class="text-sm text-gray-600">Manage user accounts and permissions</p>
            </div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add User
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-xs">JD</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">John Doe</div>
                        <div class="text-xs text-gray-500">Administrator</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">john.doe@ltindia.com</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Admin
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="p-1 rounded hover:bg-blue-50 transition-colors mr-2" style="color: #2c4170;" title="Edit">
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors mr-2" title="Delete">
                      <span class="material-icons text-sm">delete</span>
                    </button>
                    <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                      <span class="material-icons text-sm">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-xs">JS</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">Jane Smith</div>
                        <div class="text-xs text-gray-500">User</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">jane.smith@ltindia.com</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      User
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="p-1 rounded hover:bg-blue-50 transition-colors mr-2" style="color: #2c4170;" title="Edit">
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors mr-2" title="Delete">
                      <span class="material-icons text-sm">delete</span>
                    </button>
                    <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                      <span class="material-icons text-sm">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-xs">MJ</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">Mike Johnson</div>
                        <div class="text-xs text-gray-500">Manager</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">mike.johnson@ltindia.com</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Manager
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Inactive
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="p-1 rounded hover:bg-blue-50 transition-colors mr-2" style="color: #2c4170;" title="Edit">
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors mr-2" title="Delete">
                      <span class="material-icons text-sm">delete</span>
                    </button>
                    <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                      <span class="material-icons text-sm">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `
})
export class IdentityComponent {
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}