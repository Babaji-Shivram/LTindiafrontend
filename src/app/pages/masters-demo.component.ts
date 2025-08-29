import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersDashboardComponent } from '../modules/master/components/masters-dashboard.component';
import { MastersSidebarLayoutComponent } from '../modules/master/components/masters-sidebar-layout.component';
import { MastersDropdownNavComponent } from '../modules/master/components/masters-dropdown-nav.component';

@Component({
  selector: 'app-masters-demo',
  standalone: true,
  imports: [
    CommonModule,
    MastersDashboardComponent,
    MastersSidebarLayoutComponent,
    MastersDropdownNavComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Demo Navigation -->
      <div class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="page-title text-gray-900">Masters UX Demo</h1>
          <div class="flex space-x-4">
            <button
              *ngFor="let option of demoOptions"
              (click)="setActiveDemo(option.id)"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              [class.bg-blue-600]="activeDemo === option.id"
              [class.text-white]="activeDemo === option.id"
              [class.bg-gray-200]="activeDemo !== option.id"
              [class.text-gray-700]="activeDemo !== option.id">
              {{ option.name }}
            </button>
          </div>
        </div>
        
        <!-- Description -->
        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            {{ getCurrentDescription() }}
          </p>
        </div>
      </div>

      <!-- Demo Content -->
      <div *ngIf="activeDemo === 'dashboard'" class="h-screen">
        <app-masters-dashboard></app-masters-dashboard>
      </div>

      <div *ngIf="activeDemo === 'sidebar'">
        <app-masters-sidebar-layout></app-masters-sidebar-layout>
      </div>

      <div *ngIf="activeDemo === 'dropdown'">
        <app-masters-dropdown-nav></app-masters-dropdown-nav>
      </div>
    </div>
  `
})
export class MastersDemoComponent {
  activeDemo = 'dashboard';

  demoOptions = [
    {
      id: 'dashboard',
      name: 'Categorized Dashboard',
      description: 'Expandable card-based approach with search and category organization. Best for overview and quick access to masters.'
    },
    {
      id: 'sidebar',
      name: 'Sidebar Navigation',
      description: 'Persistent sidebar with content area. Best for power users who work extensively with master data. Solves your 5+ items visibility issue.'
    },
    {
      id: 'dropdown',
      name: 'Dropdown Navigation',
      description: 'Mega-menu style with hover interactions. Best for quick access and discoverability. Includes integrated search and statistics.'
    }
  ];

  setActiveDemo(demoId: string): void {
    this.activeDemo = demoId;
  }

  getCurrentDescription(): string {
    const option = this.demoOptions.find(opt => opt.id === this.activeDemo);
    return option?.description || '';
  }
}
