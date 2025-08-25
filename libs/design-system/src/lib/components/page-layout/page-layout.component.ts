import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'ds-page-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, ToolbarComponent],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <ds-sidebar 
        [isCollapsed]="sidebarCollapsed"
        (toggleSidebar)="toggleSidebar()"
        class="flex-shrink-0">
      </ds-sidebar>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Toolbar -->
        <ds-toolbar 
          [title]="pageTitle"
          [showSearch]="showSearch"
          (menuClick)="toggleSidebar()"
          class="flex-shrink-0">
        </ds-toolbar>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto bg-gray-50">
          <div class="h-full">
            <ng-content></ng-content>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class PageLayoutComponent {
  @Input() pageTitle: string = '';
  @Input() showSearch: boolean = true;
  
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}