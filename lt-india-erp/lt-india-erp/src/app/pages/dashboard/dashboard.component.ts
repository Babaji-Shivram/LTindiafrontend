import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Recently visited section -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-semibold text-gray-900">Recently visited</h2>
          <button class="text-xs font-medium hover:opacity-90" style="color: #2c4170;">View all</button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Board Cards -->
          <div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div class="mb-3">
              <div class="w-full h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div class="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                  <div class="space-y-1">
                    <div class="h-1 w-8 bg-blue-500 rounded"></div>
                    <div class="h-1 w-6 bg-blue-300 rounded"></div>
                    <div class="h-1 w-10 bg-green-500 rounded"></div>
                    <div class="h-1 w-8 bg-yellow-500 rounded"></div>
                    <div class="h-1 w-6 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="font-medium text-gray-900 text-xs">Users</h3>
            </div>
            <p class="text-xs text-gray-500 mt-1">LT India ERP > Identity</p>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div class="mb-3">
              <div class="w-full h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <div class="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                  <div class="space-y-1">
                    <div class="h-1 w-8 bg-blue-500 rounded"></div>
                    <div class="h-1 w-6 bg-blue-300 rounded"></div>
                    <div class="h-1 w-10 bg-green-500 rounded"></div>
                    <div class="h-1 w-8 bg-yellow-500 rounded"></div>
                    <div class="h-1 w-6 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="font-medium text-gray-900 text-xs">Roles</h3>
            </div>
            <p class="text-xs text-gray-500 mt-1">LT India ERP > Identity</p>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div class="mb-3">
              <div class="w-full h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <div class="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                  <div class="space-y-1">
                    <div class="h-1 w-8 bg-blue-500 rounded"></div>
                    <div class="h-1 w-6 bg-blue-300 rounded"></div>
                    <div class="h-1 w-10 bg-green-500 rounded"></div>
                    <div class="h-1 w-8 bg-yellow-500 rounded"></div>
                    <div class="h-1 w-6 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="font-medium text-gray-900 text-xs">Roles</h3>
            </div>
            <p class="text-xs text-gray-500 mt-1">LT India ERP > Identity</p>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div class="mb-3">
              <div class="w-full h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <div class="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                  <div class="space-y-1">
                    <div class="h-1 w-8 bg-blue-500 rounded"></div>
                    <div class="h-1 w-6 bg-blue-300 rounded"></div>
                    <div class="h-1 w-10 bg-green-500 rounded"></div>
                    <div class="h-1 w-8 bg-yellow-500 rounded"></div>
                    <div class="h-1 w-6 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="font-medium text-gray-900 text-xs">Dashboard</h3>
            </div>
            <p class="text-xs text-gray-500 mt-1">LT India ERP > Analytics</p>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div class="mb-3">
              <div class="w-full h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <div class="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                  <div class="space-y-1">
                    <div class="h-1 w-8 bg-blue-500 rounded"></div>
                    <div class="h-1 w-6 bg-blue-300 rounded"></div>
                    <div class="h-1 w-10 bg-green-500 rounded"></div>
                    <div class="h-1 w-8 bg-yellow-500 rounded"></div>
                    <div class="h-1 w-6 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="font-medium text-gray-900 text-xs">Reports</h3>
            </div>
            <p class="text-xs text-gray-500 mt-1">LT India ERP > Analytics</p>
          </div>
        </div>
      </div>

      <!-- Complete Your Profile -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xs font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-xs text-gray-600">Setup Account</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span class="text-xs text-gray-600">Upload Your Photo</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span class="text-xs text-gray-600">Enable Desktop Notifications</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-xs text-gray-600">Invite Team Members</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span class="text-xs text-gray-600">Complete Profile</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span class="text-xs text-gray-600">Install Our Mobile App</span>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style="width: 33%"></div>
              </div>
            </div>
          </div>
          
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Learn & get inspired -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-xs font-semibold text-gray-900 mb-4">Learn & get inspired</h3>
        <div class="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 text-xs">Getting started</h4>
            <p class="text-xs text-gray-600">Learn how LT India ERP works</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
}