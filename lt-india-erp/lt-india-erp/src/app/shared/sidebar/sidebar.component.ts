import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div [class]="sidebarClasses">
      <!-- Logo Section -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z"/>
            </svg>
          </div>
          <div [class]="isCollapsed ? 'hidden' : 'block'">
            <h1 class="text-lg font-bold text-gray-900">LT India ERP</h1>
            <p class="text-xs text-gray-500">Enterprise System</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <!-- Dashboard -->
        <a routerLink="/dashboard" 
           routerLinkActive="active"
           class="nav-item group">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'block'">Dashboard</span>
        </a>

        <!-- Identity Management -->
        <div class="space-y-1">
          <button (click)="toggleIdentityMenu()" 
                  class="nav-item group w-full justify-between"
                  [class.active]="isIdentityMenuOpen">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              <span [class]="isCollapsed ? 'hidden' : 'block'">Identity</span>
            </div>
            <svg *ngIf="!isCollapsed" 
                 class="w-4 h-4 transition-transform duration-200"
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
          </div>
        </div>

        <!-- Masters -->
        <a routerLink="/masters" 
           routerLinkActive="active"
           class="nav-item group">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'block'">Masters</span>
        </a>

        <!-- CRM -->
        <a routerLink="/crm" 
           routerLinkActive="active"
           class="nav-item group">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
          </svg>
          <span [class]="isCollapsed ? 'hidden' : 'block'">CRM</span>
          <span *ngIf="!isCollapsed" class="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Soon</span>
        </a>
      </nav>

      <!-- Toggle Button -->
      <div class="p-4 border-t border-gray-200">
        <button (click)="toggleSidebar()" 
                class="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" [attr.d]="isCollapsed ? 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' : 'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .nav-item {
      @apply flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200;
    }
    
    .nav-item.active {
      @apply bg-blue-50 text-blue-700;
    }
    
    .sub-nav-item {
      @apply flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200;
    }
    
    .sub-nav-item.active {
      @apply bg-blue-50 text-blue-700;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleCollapsed = new EventEmitter<void>();

  isIdentityMenuOpen = false;

  get sidebarClasses(): string {
    return `flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${
      this.isCollapsed ? 'w-16' : 'w-64'
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
}