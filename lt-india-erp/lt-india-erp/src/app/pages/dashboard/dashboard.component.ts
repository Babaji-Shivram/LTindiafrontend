import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
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
              (click)="goToIdentity()"
              class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Identity
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
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p class="text-gray-600">Welcome to your ERP system overview</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">1,234</p>
                <p class="text-green-600 text-sm">+12% from last month</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Active Parties</p>
                <p class="text-2xl font-bold text-gray-900">856</p>
                <p class="text-green-600 text-sm">+8% from last month</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Open Leads</p>
                <p class="text-2xl font-bold text-gray-900">23</p>
                <p class="text-red-600 text-sm">-5% from last month</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm">Revenue</p>
                <p class="text-2xl font-bold text-gray-900">₹45.2L</p>
                <p class="text-green-600 text-sm">+15% from last month</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
              <svg class="w-8 h-8 text-blue-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
              </svg>
              <span class="text-sm font-medium">Add User</span>
            </button>
            <button class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
              <svg class="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm font-medium">Add Party</span>
            </button>
            <button class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all">
              <svg class="w-8 h-8 text-yellow-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm font-medium">Add Port</span>
            </button>
            <button class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
              <svg class="w-8 h-8 text-purple-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <span class="text-sm font-medium">Reports</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToIdentity() {
    this.router.navigate(['/identity']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}