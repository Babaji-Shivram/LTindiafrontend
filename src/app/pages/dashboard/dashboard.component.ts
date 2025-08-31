import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';

interface DashboardMetric {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  trend?: number[];
  loading?: boolean;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
  previousValue?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface RecentActivity {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  type: 'user' | 'role' | 'system' | 'crm' | 'alert';
  priority?: 'high' | 'medium' | 'low';
}

interface QuickAction {
  title: string;
  description: string;
  route: string;
  iconClass: string;
  icon: string;
  badge?: number;
  category: 'identity' | 'crm' | 'reports' | 'system';
}

interface SystemAlert {
  id: number;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  dismissible: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Header Section -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="secondary-text">Welcome back! Here's what's happening with your ERP system.</p>
        </div>
        <div class="flex items-center space-x-2 secondary-text text-gray-500">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          <span>{{ getCurrentDate() }}</span>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div *ngFor="let metric of dashboardMetrics" class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="label-text text-gray-600">{{ metric.title }}</p>
              <p class="metric-value text-gray-900">{{ metric.value }}</p>
            </div>
            <div [class]="getMetricIconClass(metric.icon)">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path *ngIf="metric.icon === 'users'" d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                <path *ngIf="metric.icon === 'activity'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                <path *ngIf="metric.icon === 'server'" fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"/>
                <path *ngIf="metric.icon === 'database'" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                <path *ngIf="!metric.icon || (metric.icon !== 'users' && metric.icon !== 'activity' && metric.icon !== 'server' && metric.icon !== 'database')" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div [class]="getChangeClass(metric.changeType)">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path *ngIf="metric.changeType === 'increase'" fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                <path *ngIf="metric.changeType === 'decrease'" fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="metric-label">{{ metric.change }}</span>
            </div>
            <span class="secondary-text text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- User Activity Chart -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-header text-gray-900">User Activity</h3>
            <div class="flex items-center space-x-2">
              <button class="secondary-text text-gray-500 hover:text-gray-700">7d</button>
              <button class="metric-label text-blue-600">30d</button>
              <button class="secondary-text text-gray-500 hover:text-gray-700">90d</button>
            </div>
          </div>
          <div class="space-y-4">
            <div *ngFor="let item of userActivityData" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div [class]="'w-3 h-3 rounded-full ' + item.color"></div>
                <span class="secondary-text text-gray-700">{{ item.label }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="table-cell font-medium text-gray-900">{{ item.value }}</span>
                <div class="w-16 h-2 bg-gray-200 rounded-full">
                  <div [class]="'h-2 rounded-full ' + item.color" [style.width.%]="(item.value / getMaxActivityValue()) * 100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Performance -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-4">System Performance</h3>
          <div class="space-y-4">
            <div *ngFor="let perf of systemPerformance">
              <div class="flex justify-between items-center mb-1">
                <span class="secondary-text text-gray-700">{{ perf.metric }}</span>
                <span class="table-cell font-medium text-gray-900">{{ perf.value }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div [class]="getPerformanceBarClass(perf.value)" [style.width.%]="perf.value"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-header text-gray-900">Recent Activity</h3>
            <button class="secondary-text text-blue-600 hover:text-blue-800">View all</button>
          </div>
          <div class="space-y-4">
            <div *ngFor="let activity of recentActivities" class="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div [class]="getActivityIconClass(activity.type)">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path *ngIf="activity.type === 'user'" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  <path *ngIf="activity.type === 'role'" fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2z" clip-rule="evenodd"/>
                  <path *ngIf="activity.type === 'system'" fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="secondary-text text-gray-900">{{ activity.action }}</p>
                <p class="caption text-gray-500">by {{ activity.user }} • {{ activity.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button *ngFor="let action of quickActions" 
                    [routerLink]="action.route"
                    class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div [class]="action.iconClass">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <!-- Add User Icon -->
                  <path *ngIf="action.title === 'Add New User'" d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                  <!-- Create Role Icon -->
                  <path *ngIf="action.title === 'Create Role'" fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  <!-- View Reports Icon -->
                  <path *ngIf="action.title === 'View Reports'" d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  <!-- Default Icon for other actions -->
                  <path *ngIf="action.title !== 'Add New User' && action.title !== 'Create Role' && action.title !== 'View Reports'" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="table-cell font-medium text-gray-900">{{ action.title }}</p>
                <p class="caption text-gray-500">{{ action.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Recently visited section -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-header text-gray-900">Recently Visited</h2>
          <button class="metric-label hover:opacity-90" style="color: #2c4170;">View all</button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div *ngFor="let item of recentlyVisited" 
               [routerLink]="item.route"
               class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div class="mb-3">
              <div [class]="'w-full h-24 rounded-lg flex items-center justify-center ' + item.bgGradient">
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
              <h3 class="font-medium text-gray-900 secondary-text">{{ item.title }}</h3>
            </div>
            <p class="secondary-text text-gray-500 mt-1">{{ item.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  dashboardMetrics: DashboardMetric[] = [
    {
      title: 'Total Users',
      value: 1248,
      change: '+12.3%',
      changeType: 'increase',
      icon: 'users'
    },
    {
      title: 'Active Sessions',
      value: 342,
      change: '+8.2%',
      changeType: 'increase',
      icon: 'activity'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'increase',
      icon: 'server'
    },
    {
      title: 'Storage Used',
      value: '67.8%',
      change: '+2.4%',
      changeType: 'neutral',
      icon: 'database'
    }
  ];

  userActivityData: ChartData[] = [
    { label: 'Daily Active Users', value: 847, color: 'bg-blue-500' },
    { label: 'New Registrations', value: 124, color: 'bg-green-500' },
    { label: 'Page Views', value: 2156, color: 'bg-purple-500' },
    { label: 'API Requests', value: 15423, color: 'bg-yellow-500' }
  ];

  systemPerformance = [
    { metric: 'CPU Usage', value: 68 },
    { metric: 'Memory Usage', value: 74 },
    { metric: 'Disk Usage', value: 45 },
    { metric: 'Network I/O', value: 82 }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: 1,
      action: 'New user account created for John Smith',
      user: 'Admin',
      timestamp: '2 minutes ago',
      type: 'user'
    },
    {
      id: 2,
      action: 'Role permissions updated for Manager role',
      user: 'Super Admin',
      timestamp: '15 minutes ago',
      type: 'role'
    },
    {
      id: 3,
      action: 'System backup completed successfully',
      user: 'System',
      timestamp: '1 hour ago',
      type: 'system'
    },
    {
      id: 4,
      action: 'User Sarah Johnson logged in',
      user: 'Sarah Johnson',
      timestamp: '2 hours ago',
      type: 'user'
    },
    {
      id: 5,
      action: 'Database optimization completed',
      user: 'System',
      timestamp: '3 hours ago',
      type: 'system'
    }
  ];

  quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      route: '/identity/users',
      iconClass: 'w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center',
      icon: '<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>'
    },
    {
      title: 'Create Role',
      description: 'Define new user role',
      route: '/identity/roles',
      iconClass: 'w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center',
      icon: '<path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>'
    },
    {
      title: 'View Reports',
      description: 'Access system reports',
      route: '/analytics/reports',
      iconClass: 'w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center',
      icon: '<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>'
    },
    {
      title: 'System Settings',
      description: 'Configure system',
      route: '/settings',
      iconClass: 'w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center',
      icon: '<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'
    }
  ];

  recentlyVisited = [
    {
      title: 'Users',
      subtitle: 'LT India ERP > Identity',
      route: '/identity/users',
      bgGradient: 'bg-gradient-to-br from-blue-100 to-blue-200',
      icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    },
    {
      title: 'Roles',
      subtitle: 'LT India ERP > Identity',
      route: '/identity/roles',
      bgGradient: 'bg-gradient-to-br from-green-100 to-green-200',
      icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    },
    {
      title: 'Dashboard',
      subtitle: 'LT India ERP > Analytics',
      route: '/dashboard',
      bgGradient: 'bg-gradient-to-br from-purple-100 to-purple-200',
      icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    },
    {
      title: 'Reports',
      subtitle: 'LT India ERP > Analytics',
      route: '/analytics/reports',
      bgGradient: 'bg-gradient-to-br from-orange-100 to-orange-200',
      icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    }
  ];

  ngOnInit() {
    // Component initialization if needed
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getMetricIconClass(icon: string): string {
    const baseClasses = 'w-12 h-12 rounded-lg flex items-center justify-center';
    switch (icon) {
      case 'users':
        return `${baseClasses} bg-blue-500`;
      case 'activity':
        return `${baseClasses} bg-green-500`;
      case 'server':
        return `${baseClasses} bg-purple-500`;
      case 'database':
        return `${baseClasses} bg-yellow-500`;
      default:
        return `${baseClasses} bg-gray-500`;
    }
  }

  getChangeClass(changeType: string): string {
    const baseClasses = 'flex items-center';
    switch (changeType) {
      case 'increase':
        return `${baseClasses} text-green-600`;
      case 'decrease':
        return `${baseClasses} text-red-600`;
      default:
        return `${baseClasses} text-yellow-600`;
    }
  }

  getMaxActivityValue(): number {
    return Math.max(...this.userActivityData.map(item => item.value));
  }

  getPerformanceBarClass(value: number): string {
    if (value >= 80) return 'bg-red-500 h-2 rounded-full';
    if (value >= 60) return 'bg-yellow-500 h-2 rounded-full';
    return 'bg-green-500 h-2 rounded-full';
  }

  getActivityIconClass(type: string): string {
    const baseClasses = 'w-8 h-8 rounded-lg flex items-center justify-center';
    switch (type) {
      case 'user':
        return `${baseClasses} bg-blue-500`;
      case 'role':
        return `${baseClasses} bg-green-500`;
      case 'system':
        return `${baseClasses} bg-purple-500`;
      default:
        return `${baseClasses} bg-gray-500`;
    }
  }
}
