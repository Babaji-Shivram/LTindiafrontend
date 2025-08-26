import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div [class]="sidebarClasses">
      <!-- Logo Section -->
      <div [class]="'border-b border-gray-100' + (isCollapsed ? ' p-4' : ' p-6')">
        <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' justify-between')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <button (click)="toggleSidebar()" 
                    class="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all duration-200 flex-shrink-0" 
                    style="background-color: #2c4170;">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z"/>
              </svg>
            </button>
            <div [class]="isCollapsed ? 'hidden' : 'block'">
              <h1 class="text-xs font-semibold text-gray-900">Live Tracking ERP</h1>
              <p class="text-xs text-gray-500">Enterprise System</p>
            </div>
          </div>
          <!-- Hamburger Menu Button (only when expanded) -->
          <button (click)="toggleSidebar()" 
                  [class]="isCollapsed ? 'hidden' : 'flex'"
                  class="items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav [class]="'flex-1 space-y-1 overflow-y-auto' + (isCollapsed ? ' px-2 py-4' : ' p-4')">
        <!-- Dashboard -->
        <a routerLink="/dashboard" 
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: false}"
           [class]="'nav-item group' + (isCollapsed ? ' justify-center' : '')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            <span [class]="isCollapsed ? 'hidden' : 'block'">Home</span>
          </div>
        </a>

        <!-- Identity Management -->
        <div class="space-y-1">
          <button (click)="toggleIdentityMenu()" 
                  [class]="'nav-item group w-full' + (isCollapsed ? ' justify-center' : ' justify-between')"
                  [class.active]="isIdentityActive()">
            <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              <span [class]="isCollapsed ? 'hidden' : 'block'">Identity</span>
            </div>
            <svg *ngIf="!isCollapsed" 
                 class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                 [class.rotate-180]="isIdentityMenuOpen"
                 fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          
          <!-- Identity Submenu -->
          <div *ngIf="isIdentityMenuOpen && !isCollapsed" class="ml-8 space-y-1">
            <a routerLink="/identity/users" 
               routerLinkActive="active"
               class="sub-nav-item">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"/>
              </svg>
              <span>Users</span>
            </a>
            <a routerLink="/identity/roles" 
               routerLinkActive="active"
               class="sub-nav-item">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              <span>Roles</span>
            </a>
            <a routerLink="/identity/permissions" 
               routerLinkActive="active"
               class="sub-nav-item">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <span>Permissions</span>
            </a>
          </div>
        </div>

        <!-- CRM -->
        <a routerLink="/crm" 
           routerLinkActive="active"
           [class]="'nav-item group' + (isCollapsed ? ' justify-center' : '')">
          <div [class]="'flex items-center w-full' + (isCollapsed ? ' justify-center' : ' justify-between')">
            <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
              </svg>
              <span [class]="isCollapsed ? 'hidden' : 'block'">CRM</span>
            </div>
            <span *ngIf="!isCollapsed" class="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">Soon</span>
          </div>
        </a>

        <!-- Masters -->
        <a routerLink="/masters" 
           routerLinkActive="active"
           [class]="'nav-item group' + (isCollapsed ? ' justify-center' : '')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            <span [class]="isCollapsed ? 'hidden' : 'block'">Masters</span>
          </div>
        </a>

        <!-- Reports -->
        <a routerLink="/reports" 
           routerLinkActive="active"
           [class]="'nav-item group' + (isCollapsed ? ' justify-center' : '')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2v1a2 2 0 002 2v1a2 2 0 002 2v1a2 2 0 002 2v1h2a2 2 0 002-2V8a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2v-1a2 2 0 002-2v-1a2 2 0 002-2v-1a2 2 0 002-2V8a2 2 0 00-2-2z" clip-rule="evenodd"/>
            </svg>
            <span [class]="isCollapsed ? 'hidden' : 'block'">Reports</span>
          </div>
        </a>
      </nav>

      <!-- User Section -->
      <!-- Removed user section content -->
    </div>
  `,
  styles: [`
    .nav-item {
      @apply flex items-center px-3 py-2.5 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer;
      min-height: 40px;
    }
    
    .nav-item.active {
      @apply text-white shadow-sm;
      background-color: #2c4170;
    }
    
    .sub-nav-item {
      @apply flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200;
    }
    
    .sub-nav-item.active {
      @apply text-white;
      background-color: #2c4170;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleCollapsed = new EventEmitter<void>();

  isIdentityMenuOpen = true; // Default open for better UX

  constructor(private router: Router) {}

  get sidebarClasses(): string {
    return `flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 shadow-sm ${
      this.isCollapsed ? 'w-20' : 'w-64'
    }`;
  }

  toggleSidebar() {
    this.toggleCollapsed.emit();
  }

  toggleIdentityMenu() {
    if (!this.isCollapsed) {
      this.isIdentityMenuOpen = !this.isIdentityMenuOpen;
    }
  }

  isIdentityActive(): boolean {
    return this.router.url.startsWith('/identity');
  }
}