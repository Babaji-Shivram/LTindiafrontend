import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    FormsModule
  ],
  template: `
    <mat-toolbar class="bg-white border-b border-gray-200 px-6 py-2 h-16">
      <div class="flex items-center justify-between w-full">
        <!-- Left Section -->
        <div class="flex items-center space-x-4">
          <button
            mat-icon-button
            (click)="menuClick.emit()"
            class="text-gray-500 hover:text-gray-700 lg:hidden">
            <mat-icon>menu</mat-icon>
          </button>

          <div class="flex flex-col">
            <h1 class="text-lg font-heading font-semibold text-primary">{{ title }}</h1>
            <p class="text-xs text-gray-500">{{ getCurrentDateTime() }}</p>
          </div>
        </div>

        <!-- Center Section - Search -->
        <div *ngIf="showSearch" class="flex-1 max-w-md mx-8">
          <mat-form-field appearance="outline" class="w-full search-field">
            <mat-icon matPrefix class="text-gray-400">search</mat-icon>
            <input
              matInput
              placeholder="Search..."
              [(ngModel)]="searchQuery"
              (input)="onSearch($event)"
              class="text-sm">
          </mat-form-field>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2">
          <!-- Notifications -->
          <button
            mat-icon-button
            [matMenuTriggerFor]="notificationMenu"
            class="text-gray-500 hover:text-gray-700">
            <mat-icon matBadge="3" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
          </button>

          <!-- Quick Actions -->
          <button
            mat-icon-button
            class="text-gray-500 hover:text-gray-700">
            <mat-icon>add</mat-icon>
          </button>

          <!-- User Menu -->
          <button
            mat-icon-button
            [matMenuTriggerFor]="userMenu"
            class="text-gray-500 hover:text-gray-700">
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- Notification Menu -->
    <mat-menu #notificationMenu="matMenu" class="notification-menu">
      <div class="px-4 py-2 border-b border-gray-200">
        <h3 class="font-medium text-gray-900">Notifications</h3>
      </div>
      <button mat-menu-item class="notification-item">
        <div class="flex items-start space-x-3">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          <div>
            <p class="text-sm font-medium">New user registered</p>
            <p class="text-xs text-gray-500">2 minutes ago</p>
          </div>
        </div>
      </button>
      <button mat-menu-item class="notification-item">
        <div class="flex items-start space-x-3">
          <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
          <div>
            <p class="text-sm font-medium">Export completed</p>
            <p class="text-xs text-gray-500">5 minutes ago</p>
          </div>
        </div>
      </button>
      <button mat-menu-item class="notification-item">
        <div class="flex items-start space-x-3">
          <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
          <div>
            <p class="text-sm font-medium">System maintenance scheduled</p>
            <p class="text-xs text-gray-500">1 hour ago</p>
          </div>
        </div>
      </button>
      <div class="border-t border-gray-200">
        <button mat-menu-item class="text-center text-primary text-sm">
          View all notifications
        </button>
      </div>
    </mat-menu>

    <!-- User Menu -->
    <mat-menu #userMenu="matMenu">
      <div class="px-4 py-3 border-b border-gray-200">
        <p class="text-sm font-medium text-gray-900">Admin User</p>
        <p class="text-xs text-gray-500">admin@ltindia.com</p>
      </div>
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      <button mat-menu-item>
        <mat-icon>help</mat-icon>
        <span>Help</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .search-field {
      font-size: 14px;
    }
    
    .search-field ::ng-deep .mat-mdc-form-field-wrapper {
      padding-bottom: 0;
    }
    
    .search-field ::ng-deep .mat-mdc-text-field-wrapper {
      height: 40px;
    }
    
    .notification-menu {
      width: 320px;
    }
    
    .notification-item {
      height: auto !important;
      padding: 12px 16px !important;
      white-space: normal !important;
    }
    
    .notification-item:hover {
      background-color: #F9FAFB;
    }
  `]
})
export class ToolbarComponent {
  @Input() title: string = '';
  @Input() showSearch: boolean = true;
  @Output() menuClick = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  searchQuery: string = '';

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onSearch(event: any): void {
    this.searchChange.emit(event.target.value);
  }

  logout(): void {
    // Implement logout logic
    console.log('Logout clicked');
  }
}