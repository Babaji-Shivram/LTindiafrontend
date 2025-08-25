import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
  children?: NavItem[];
}

@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <aside [class]="sidebarClasses">
      <!-- Logo -->
      <div class="flex items-center px-4 py-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <mat-icon class="text-white text-lg">business</mat-icon>
          </div>
          <div [class]="logoTextClasses">
            <h1 class="text-lg font-heading font-semibold text-primary">LT India</h1>
            <p class="text-xs text-gray-500">ERP System</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <div *ngFor="let item of navItems" class="space-y-1">
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: false}"
            [class]="getNavItemClasses()"
            [matTooltip]="isCollapsed ? item.label : ''"
            matTooltipPosition="right">
            
            <mat-icon class="w-5 h-5">{{ item.icon }}</mat-icon>
            <span [class]="navTextClasses">{{ item.label }}</span>
            
            <span *ngIf="item.badge && !isCollapsed" 
                  class="ml-auto bg-accent text-accent-contrast text-xs px-2 py-1 rounded-full">
              {{ item.badge }}
            </span>
          </a>

          <!-- Sub-navigation -->
          <div *ngIf="item.children && !isCollapsed" class="ml-6 space-y-1">
            <a *ngFor="let child of item.children"
               [routerLink]="child.route"
               routerLinkActive="active"
               [class]="getSubNavItemClasses()">
              <mat-icon class="w-4 h-4">{{ child.icon }}</mat-icon>
              <span>{{ child.label }}</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- User Section -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <mat-icon class="text-gray-600 text-sm">person</mat-icon>
          </div>
          <div [class]="userInfoClasses">
            <p class="text-sm font-medium text-gray-900">Admin User</p>
            <p class="text-xs text-gray-500">admin@ltindia.com</p>
          </div>
        </div>
      </div>

      <!-- Collapse Toggle -->
      <div class="border-t border-gray-200 p-2">
        <button
          mat-icon-button
          (click)="toggleSidebar.emit()"
          class="w-full flex items-center justify-center text-gray-500 hover:text-gray-700">
          <mat-icon>{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</mat-icon>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar-nav-item {
      @apply flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200;
    }
    
    .sidebar-nav-item:not(.active) {
      @apply text-gray-600 hover:bg-gray-100 hover:text-primary;
    }
    
    .sidebar-nav-item.active {
      @apply bg-primary text-white shadow-sm;
    }
    
    .sidebar-sub-nav-item {
      @apply flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200;
    }
    
    .sidebar-sub-nav-item:not(.active) {
      @apply text-gray-500 hover:bg-gray-50 hover:text-gray-700;
    }
    
    .sidebar-sub-nav-item.active {
      @apply bg-primary/10 text-primary;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  private router = inject(Router);

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Identity',
      icon: 'people',
      route: '/identity',
      children: [
        { label: 'Users', icon: 'person', route: '/identity/users' },
        { label: 'Roles', icon: 'admin_panel_settings', route: '/identity/roles' }
      ]
    },
    {
      label: 'Masters',
      icon: 'settings',
      route: '/masters',
      children: [
        { label: 'Parties', icon: 'business', route: '/masters/parties' },
        { label: 'Ports', icon: 'location_on', route: '/masters/ports' },
        { label: 'Charge Codes', icon: 'receipt', route: '/masters/charge-codes' },
        { label: 'Tax Rates', icon: 'percent', route: '/masters/tax-rates' },
        { label: 'UOM', icon: 'straighten', route: '/masters/uom' }
      ]
    },
    {
      label: 'CRM',
      icon: 'contacts',
      route: '/crm',
      badge: 'Soon',
      children: [
        { label: 'Leads', icon: 'person_add', route: '/crm/leads' },
        { label: 'Opportunities', icon: 'trending_up', route: '/crm/opportunities' },
        { label: 'Accounts', icon: 'account_balance', route: '/crm/accounts' }
      ]
    }
  ];

  get sidebarClasses(): string {
    return `flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${
      this.isCollapsed ? 'w-16' : 'w-64'
    }`;
  }

  get logoTextClasses(): string {
    return this.isCollapsed ? 'hidden' : 'block';
  }

  get navTextClasses(): string {
    return this.isCollapsed ? 'hidden' : 'block';
  }

  get userInfoClasses(): string {
    return this.isCollapsed ? 'hidden' : 'block';
  }

  getNavItemClasses(): string {
    return `sidebar-nav-item ${this.isCollapsed ? 'justify-center' : ''}`;
  }

  getSubNavItemClasses(): string {
    return 'sidebar-sub-nav-item space-x-2';
  }
}