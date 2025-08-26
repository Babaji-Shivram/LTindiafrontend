import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ReportTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  module: string;
  type: 'Table' | 'Chart' | 'Dashboard' | 'Export';
  isActive: boolean;
  createdDate: Date;
  lastUsed?: Date;
  usageCount: number;
  parameters: ReportParameter[];
  outputFormats: string[];
  schedulable: boolean;
}

interface ReportParameter {
  name: string;
  type: 'text' | 'date' | 'select' | 'multiselect' | 'number' | 'boolean';
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: { value: any; label: string }[];
}

interface ReportExecution {
  id: number;
  reportId: number;
  reportName: string;
  executedBy: string;
  executedAt: Date;
  status: 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  duration?: number;
  outputFormat: string;
  parameters: { [key: string]: any };
  resultSize?: number;
  error?: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p class="text-sm text-gray-600">Generate, schedule, and manage system reports</p>
        </div>
        <div class="flex items-center space-x-3">
          <button style="background-color: #2c4170;" 
                  class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            New Report
          </button>
          <button class="text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            Import
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2v1a2 2 0 002 2v1a2 2 0 002 2v1a2 2 0 002 2v1h2a2 2 0 002-2V8a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2v-1a2 2 0 002-2v-1a2 2 0 002-2v-1a2 2 0 002-2V8a2 2 0 00-2-2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Reports</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getTotalReports() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">This Month</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getThisMonthExecutions() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Scheduled</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getScheduledReports() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Failed Today</p>
              <p class="text-2xl font-semibold text-gray-900">{{ getFailedToday() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button (click)="activeTab = 'templates'" 
                  [class]="getTabClass('templates')">
            Report Templates
          </button>
          <button (click)="activeTab = 'executions'" 
                  [class]="getTabClass('executions')">
            Recent Executions
          </button>
          <button (click)="activeTab = 'scheduled'" 
                  [class]="getTabClass('scheduled')">
            Scheduled Reports
          </button>
          <button (click)="activeTab = 'analytics'" 
                  [class]="getTabClass('analytics')">
            Usage Analytics
          </button>
        </nav>
      </div>

      <!-- Report Templates Tab -->
      <div *ngIf="activeTab === 'templates'" class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input type="text" 
                     [(ngModel)]="searchTerm"
                     placeholder="Search reports..." 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select [(ngModel)]="selectedCategory" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option value="">All Categories</option>
                <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Module</label>
              <select [(ngModel)]="selectedModule" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option value="">All Modules</option>
                <option *ngFor="let module of modules" [value]="module">{{ module }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select [(ngModel)]="selectedType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option value="">All Types</option>
                <option value="Table">Table</option>
                <option value="Chart">Chart</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Export">Export</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Report Templates Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let report of getFilteredReports()" 
               class="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ report.name }}</h3>
                  <p class="text-sm text-gray-600 mb-3">{{ report.description }}</p>
                  
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {{ report.module }}
                    </span>
                    <span [class]="getTypeBadgeClass(report.type)">
                      {{ report.type }}
                    </span>
                    <span class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {{ report.category }}
                    </span>
                    <span *ngIf="report.schedulable" class="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                      Schedulable
                    </span>
                  </div>
                  
                  <div class="text-xs text-gray-500 space-y-1">
                    <div>Used {{ report.usageCount }} times</div>
                    <div *ngIf="report.lastUsed">Last used: {{ report.lastUsed | date:'short' }}</div>
                    <div>Created: {{ report.createdDate | date:'short' }}</div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-1 ml-4">
                  <span [class]="getStatusBadgeClass(report.isActive)">
                    {{ report.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                  <button (click)="runReport(report)" 
                          style="background-color: #2c4170;" 
                          class="text-white px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition-all">
                    Run Report
                  </button>
                  <button (click)="editReport(report)" 
                          class="text-gray-600 px-3 py-1 border border-gray-300 rounded text-xs font-medium hover:bg-gray-50 transition-all">
                    Edit
                  </button>
                </div>
                
                <div class="flex items-center space-x-1">
                  <button (click)="scheduleReport(report)" 
                          *ngIf="report.schedulable"
                          class="p-1 text-gray-400 hover:text-purple-600 transition-colors" 
                          title="Schedule Report">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                  <button (click)="duplicateReport(report)" 
                          class="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                          title="Duplicate Report">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                    </svg>
                  </button>
                  <button (click)="deleteReport(report)" 
                          class="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                          title="Delete Report">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Executions Tab -->
      <div *ngIf="activeTab === 'executions'" class="space-y-6">
        <div class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Recent Report Executions</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executed By</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let execution of getRecentExecutions()" class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ execution.reportName }}</div>
                    <div class="text-xs text-gray-500">ID: {{ execution.reportId }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ execution.executedBy }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span [class]="getExecutionStatusBadgeClass(execution.status)">
                      {{ execution.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {{ execution.duration ? (execution.duration + 's') : '-' }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ execution.outputFormat }}</div>
                    <div class="text-xs text-gray-500" *ngIf="execution.resultSize">
                      {{ execution.resultSize | number }} records
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ execution.executedAt | date:'short' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button *ngIf="execution.status === 'Completed'" 
                              (click)="downloadResult(execution)"
                              class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors" 
                              title="Download Result">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                      <button (click)="viewExecutionDetails(execution)"
                              class="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50 transition-colors" 
                              title="View Details">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                      <button *ngIf="execution.status === 'Running'" 
                              (click)="cancelExecution(execution)"
                              class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors" 
                              title="Cancel Execution">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
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
  `
})
export class ReportsComponent implements OnInit {
  activeTab = 'templates';
  searchTerm = '';
  selectedCategory = '';
  selectedModule = '';
  selectedType = '';

  categories: string[] = [];
  modules: string[] = [];

  reportTemplates: ReportTemplate[] = [
    {
      id: 1,
      name: 'User Activity Report',
      description: 'Comprehensive report of user activities and login patterns',
      category: 'Security',
      module: 'Identity',
      type: 'Table',
      isActive: true,
      createdDate: new Date('2024-01-15'),
      lastUsed: new Date('2024-01-20'),
      usageCount: 45,
      parameters: [
        { name: 'dateFrom', type: 'date', label: 'From Date', required: true },
        { name: 'dateTo', type: 'date', label: 'To Date', required: true },
        { name: 'userId', type: 'select', label: 'User', required: false, options: [] }
      ],
      outputFormats: ['PDF', 'Excel', 'CSV'],
      schedulable: true
    },
    {
      id: 2,
      name: 'Role Permissions Matrix',
      description: 'Matrix view of roles and their assigned permissions',
      category: 'Security',
      module: 'Identity',
      type: 'Table',
      isActive: true,
      createdDate: new Date('2024-01-10'),
      lastUsed: new Date('2024-01-18'),
      usageCount: 23,
      parameters: [
        { name: 'roleId', type: 'multiselect', label: 'Roles', required: false, options: [] }
      ],
      outputFormats: ['PDF', 'Excel'],
      schedulable: false
    },
    {
      id: 3,
      name: 'System Performance Dashboard',
      description: 'Real-time system performance metrics and trends',
      category: 'Performance',
      module: 'System',
      type: 'Dashboard',
      isActive: true,
      createdDate: new Date('2024-01-05'),
      lastUsed: new Date('2024-01-21'),
      usageCount: 89,
      parameters: [
        { name: 'timeRange', type: 'select', label: 'Time Range', required: true, 
          options: [
            { value: '1h', label: 'Last Hour' },
            { value: '24h', label: 'Last 24 Hours' },
            { value: '7d', label: 'Last 7 Days' },
            { value: '30d', label: 'Last 30 Days' }
          ]
        }
      ],
      outputFormats: ['PDF'],
      schedulable: true
    },
    {
      id: 4,
      name: 'Financial Summary',
      description: 'Monthly financial summary with key metrics',
      category: 'Financial',
      module: 'Finance',
      type: 'Chart',
      isActive: true,
      createdDate: new Date('2024-01-12'),
      usageCount: 67,
      parameters: [
        { name: 'month', type: 'select', label: 'Month', required: true, options: [] },
        { name: 'year', type: 'number', label: 'Year', required: true, defaultValue: 2024 }
      ],
      outputFormats: ['PDF', 'Excel'],
      schedulable: true
    },
    {
      id: 5,
      name: 'Employee Attendance Report',
      description: 'Detailed employee attendance and time tracking report',
      category: 'HR',
      module: 'HR',
      type: 'Table',
      isActive: true,
      createdDate: new Date('2024-01-08'),
      lastUsed: new Date('2024-01-19'),
      usageCount: 34,
      parameters: [
        { name: 'dateFrom', type: 'date', label: 'From Date', required: true },
        { name: 'dateTo', type: 'date', label: 'To Date', required: true },
        { name: 'department', type: 'select', label: 'Department', required: false, options: [] }
      ],
      outputFormats: ['PDF', 'Excel', 'CSV'],
      schedulable: true
    }
  ];

  recentExecutions: ReportExecution[] = [
    {
      id: 1,
      reportId: 1,
      reportName: 'User Activity Report',
      executedBy: 'Admin User',
      executedAt: new Date('2024-01-21T10:30:00'),
      status: 'Completed',
      duration: 3.2,
      outputFormat: 'PDF',
      parameters: { dateFrom: '2024-01-01', dateTo: '2024-01-20' },
      resultSize: 1250
    },
    {
      id: 2,
      reportId: 3,
      reportName: 'System Performance Dashboard',
      executedBy: 'Admin User',
      executedAt: new Date('2024-01-21T09:15:00'),
      status: 'Running',
      outputFormat: 'PDF',
      parameters: { timeRange: '24h' }
    },
    {
      id: 3,
      reportId: 2,
      reportName: 'Role Permissions Matrix',
      executedBy: 'Manager User',
      executedAt: new Date('2024-01-21T08:45:00'),
      status: 'Completed',
      duration: 1.8,
      outputFormat: 'Excel',
      parameters: {},
      resultSize: 45
    },
    {
      id: 4,
      reportId: 5,
      reportName: 'Employee Attendance Report',
      executedBy: 'HR Manager',
      executedAt: new Date('2024-01-20T16:20:00'),
      status: 'Failed',
      outputFormat: 'CSV',
      parameters: { dateFrom: '2024-01-01', dateTo: '2024-01-20', department: 'IT' },
      error: 'Database connection timeout'
    },
    {
      id: 5,
      reportId: 4,
      reportName: 'Financial Summary',
      executedBy: 'Finance Manager',
      executedAt: new Date('2024-01-20T14:30:00'),
      status: 'Completed',
      duration: 5.4,
      outputFormat: 'PDF',
      parameters: { month: '12', year: '2023' },
      resultSize: 89
    }
  ];

  ngOnInit(): void {
    this.initializeFilters();
  }

  initializeFilters(): void {
    this.categories = [...new Set(this.reportTemplates.map(r => r.category))].sort();
    this.modules = [...new Set(this.reportTemplates.map(r => r.module))].sort();
  }

  getTabClass(tab: string): string {
    const baseClasses = 'py-2 px-1 border-b-2 font-medium text-sm transition-colors';
    return tab === this.activeTab
      ? `${baseClasses} border-blue-500 text-blue-600`
      : `${baseClasses} border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`;
  }

  getTotalReports(): number {
    return this.reportTemplates.filter(r => r.isActive).length;
  }

  getThisMonthExecutions(): number {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    return this.recentExecutions.filter(e => 
      e.executedAt.getMonth() === thisMonth && 
      e.executedAt.getFullYear() === thisYear
    ).length;
  }

  getScheduledReports(): number {
    return this.reportTemplates.filter(r => r.schedulable && r.isActive).length;
  }

  getFailedToday(): number {
    const today = new Date().toDateString();
    return this.recentExecutions.filter(e => 
      e.status === 'Failed' && 
      e.executedAt.toDateString() === today
    ).length;
  }

  getFilteredReports(): ReportTemplate[] {
    return this.reportTemplates.filter(report => {
      const matchesSearch = !this.searchTerm || 
        report.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || report.category === this.selectedCategory;
      const matchesModule = !this.selectedModule || report.module === this.selectedModule;
      const matchesType = !this.selectedType || report.type === this.selectedType;
      
      return matchesSearch && matchesCategory && matchesModule && matchesType;
    });
  }

  getRecentExecutions(): ReportExecution[] {
    return this.recentExecutions.sort((a, b) => b.executedAt.getTime() - a.executedAt.getTime());
  }

  getTypeBadgeClass(type: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-medium rounded';
    switch (type) {
      case 'Table':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Chart':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Dashboard':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Export':
        return `${baseClasses} bg-orange-100 text-orange-800`;
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

  getExecutionStatusBadgeClass(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Running':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Cancelled':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  }

  runReport(report: ReportTemplate): void {
    console.log('Running report:', report.name);
    // TODO: Open parameter input modal and execute report
  }

  editReport(report: ReportTemplate): void {
    console.log('Editing report:', report.name);
    // TODO: Open report editor
  }

  scheduleReport(report: ReportTemplate): void {
    console.log('Scheduling report:', report.name);
    // TODO: Open schedule configuration modal
  }

  duplicateReport(report: ReportTemplate): void {
    console.log('Duplicating report:', report.name);
    // TODO: Create copy of report with modified name
  }

  deleteReport(report: ReportTemplate): void {
    if (confirm(`Are you sure you want to delete report "${report.name}"?`)) {
      console.log('Deleting report:', report.name);
      // TODO: Call API to delete report
      const index = this.reportTemplates.findIndex(r => r.id === report.id);
      if (index > -1) {
        this.reportTemplates.splice(index, 1);
      }
    }
  }

  downloadResult(execution: ReportExecution): void {
    console.log('Downloading result for execution:', execution.id);
    // TODO: Download report result file
  }

  viewExecutionDetails(execution: ReportExecution): void {
    console.log('Viewing execution details:', execution.id);
    // TODO: Open execution details modal
  }

  cancelExecution(execution: ReportExecution): void {
    if (confirm('Are you sure you want to cancel this execution?')) {
      console.log('Cancelling execution:', execution.id);
      execution.status = 'Cancelled';
      // TODO: Call API to cancel execution
    }
  }
}
