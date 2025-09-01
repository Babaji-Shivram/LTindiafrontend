import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PermissionGrid, 
  ModuleMaster, 
  PageMaster,
  DEFAULT_MODULES,
  DEFAULT_PAGES 
} from '../../../modules/identity/models/module-permission.model';
import { PermissionService } from '../../../modules/identity/services/permission.service';

// Temporary interfaces for compilation
interface ModulePermissionGrid {
  module: ModuleMaster;
  pages: PagePermissionGrid[];
  isExpanded: boolean;
  hasAnyAccess: boolean;
}

interface PagePermissionGrid {
  page: PageMaster;
  permissions: PermissionGrid;
  isExpanded: boolean;
}

type PermissionTypeCode = 'P' | 'R' | 'M';

@Component({
  selector: 'app-permission-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="permission-grid">
      <div class="text-center p-4">
        <p class="text-gray-500">Permission Grid Component</p>
        <p class="text-sm text-gray-400">Under Development - Role ID: {{ roleId || 'Not Set' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .permission-grid {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class PermissionGridComponent implements OnInit, OnChanges {
  @Input() roleId?: number;
  @Input() readOnly = false;
  @Input() showModuleHeaders = true;
  @Input() showPageDetails = true;

  @Output() permissionChange = new EventEmitter<{
    moduleId: number;
    pageId: number;
    permissionType: PermissionTypeCode;
    hasAccess: boolean;
  }>();

  @Output() moduleAccessChange = new EventEmitter<{
    moduleId: number;
    hasAccess: boolean;
  }>();

  permissionGrid: PermissionGrid[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.loadPermissionGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleId'] && this.roleId) {
      this.loadPermissionGrid();
    }
  }

  private async loadPermissionGrid(): Promise<void> {
    if (!this.roleId) return;
    
    this.isLoading = true;
    this.error = null;

    try {
      // Use the existing service method
      this.permissionService.getPermissionGrid().subscribe({
        next: (grid) => {
          this.permissionGrid = grid;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading permission grid:', error);
          this.error = 'Failed to load permissions';
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error loading permission grid:', error);
      this.error = 'Failed to load permissions';
      this.isLoading = false;
    }
  }

  // Stub methods for compatibility
  toggleModuleExpansion(moduleGrid: ModulePermissionGrid): void {
    moduleGrid.isExpanded = !moduleGrid.isExpanded;
  }

  toggleAllModules(): void {
    console.log('Toggle all modules - not implemented');
  }

  toggleModuleAccess(moduleGrid: ModulePermissionGrid, event: Event): void {
    console.log('Toggle module access - not implemented');
  }

  togglePageExpansion(pageGrid: PagePermissionGrid): void {
    pageGrid.isExpanded = !pageGrid.isExpanded;
  }

  togglePermission(
    moduleId: number,
    pageId: number,
    permissionType: PermissionTypeCode,
    event: Event
  ): void {
    console.log('Toggle permission - not implemented');
  }

  hasAnyModuleAccess(): boolean {
    return this.permissionGrid.length > 0;
  }

  hasAnyPagePermission(pageGrid: PagePermissionGrid): boolean {
    return pageGrid.permissions.has_read || pageGrid.permissions.has_modify || pageGrid.permissions.has_print;
  }

  getTotalModules(): number {
    return new Set(this.permissionGrid.map(p => p.module_id)).size;
  }

  getTotalPages(): number {
    return this.permissionGrid.length;
  }

  getTotalPermissions(): number {
    return this.permissionGrid.length * 3; // P, R, M for each page
  }

  getGrantedPermissions(): number {
    return this.permissionGrid.reduce((count, p) => {
      return count + (p.has_print ? 1 : 0) + (p.has_read ? 1 : 0) + (p.has_modify ? 1 : 0);
    }, 0);
  }

  trackByModule(index: number, module: ModulePermissionGrid): number {
    return module.module.module_id;
  }

  trackByPage(index: number, page: PagePermissionGrid): number {
    return page.page.page_id;
  }
}
