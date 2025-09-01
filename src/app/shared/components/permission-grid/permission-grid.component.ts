import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PermissionGrid, 
  ModulePermissionGrid, 
  PagePermissionGrid, 
  PermissionTypeCode 
} from '../../../modules/identity/models/module-permission.model';
import { PermissionService } from '../../../modules/identity/services/permission.service';

@Component({
  selector: 'app-permission-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="permission-grid">
      <!-- Header -->
      <div class="grid-header bg-gray-50 p-4 rounded-t-lg border-b">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Permission Management</h3>
          <div class="flex items-center space-x-3">
            <div class="text-sm text-gray-600">
              {{ getTotalGrantedPermissions() }} / {{ getTotalPermissions() }} permissions granted
            </div>
            <div class="flex space-x-2">
              <button 
                type="button"
                class="btn-secondary"
                (click)="expandAllModules()">
                Expand All
              </button>
              <button 
                type="button"
                class="btn-secondary"
                (click)="collapseAllModules()">
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Permission Grid -->
      <div class="grid-content bg-white rounded-b-lg border border-t-0">
        <div *ngFor="let moduleGrid of permissionGrid?.modules || []; trackBy: trackByModule" 
             class="module-section border-b last:border-b-0">
          
          <!-- Module Header -->
          <div class="module-header bg-gray-25 p-4 cursor-pointer hover:bg-gray-50"
               (click)="toggleModuleExpansion(moduleGrid)">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <button type="button" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5 transform transition-transform" 
                       [class.rotate-90]="moduleGrid.isExpanded">
                    <path fill="currentColor" d="M9 5l7 7-7 7V5z"/>
                  </svg>
                </button>
                
                <div class="flex items-center space-x-2">
                  <span class="text-lg font-medium text-gray-900">
                    {{ moduleGrid.module.module_name }}
                  </span>
                  <span class="text-sm text-gray-500">
                    ({{ moduleGrid.module.module_code }})
                  </span>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <!-- Permission Count -->
                <div class="text-sm text-gray-600">
                  {{ moduleGrid.permissions_count.granted }} / {{ moduleGrid.permissions_count.total }}
                </div>
                
                <!-- Module-level Toggle -->
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-700">Full Access:</span>
                  <input 
                    type="checkbox"
                    class="form-checkbox"
                    [checked]="moduleGrid.has_full_access"
                    (change)="toggleModuleAccess(moduleGrid, $event)"
                    [disabled]="disabled"
                    (click)="$event.stopPropagation()">
                </div>
              </div>
            </div>
          </div>

          <!-- Pages Content -->
          <div *ngIf="moduleGrid.isExpanded" class="pages-content">
            <!-- Permission Type Headers -->
            <div class="permission-headers bg-gray-100 px-4 py-2 grid grid-cols-7 gap-4 text-sm font-medium text-gray-700">
              <div class="col-span-4">Page / Function</div>
              <div class="text-center">View (P)</div>
              <div class="text-center">Read (R)</div>
              <div class="text-center">Modify (M)</div>
            </div>

            <!-- Pages List -->
            <div class="pages-list">
              <div *ngFor="let pageGrid of moduleGrid.pages; trackBy: trackByPage"
                   class="page-row">
                
                <!-- Root Page -->
                <div class="page-item border-b border-gray-100 hover:bg-gray-50"
                     [class.bg-blue-50]="hasAnyPagePermission(pageGrid)">
                  <div class="px-4 py-3 grid grid-cols-7 gap-4 items-center">
                    
                    <!-- Page Name -->
                    <div class="col-span-4 flex items-center space-x-2">
                      <button 
                        *ngIf="pageGrid.children.length > 0"
                        type="button" 
                        class="text-gray-400 hover:text-gray-600"
                        (click)="togglePageExpansion(pageGrid)">
                        <svg class="w-4 h-4 transform transition-transform" 
                             [class.rotate-90]="pageGrid.isExpanded">
                          <path fill="currentColor" d="M9 5l7 7-7 7V5z"/>
                        </svg>
                      </button>
                      
                      <div class="flex items-center space-x-2">
                        <span class="font-medium text-gray-900">
                          {{ pageGrid.page.page_name }}
                        </span>
                        <span class="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                          {{ pageGrid.page.page_type }}
                        </span>
                      </div>
                    </div>

                    <!-- Permission Checkboxes -->
                    <div class="text-center">
                      <input 
                        type="checkbox"
                        class="form-checkbox"
                        [checked]="pageGrid.permissions.view"
                        (change)="togglePagePermission(moduleGrid.module.module_id, pageGrid.page.page_id, 'P', $event)"
                        [disabled]="disabled">
                    </div>
                    
                    <div class="text-center">
                      <input 
                        type="checkbox"
                        class="form-checkbox"
                        [checked]="pageGrid.permissions.read"
                        (change)="togglePagePermission(moduleGrid.module.module_id, pageGrid.page.page_id, 'R', $event)"
                        [disabled]="disabled">
                    </div>
                    
                    <div class="text-center">
                      <input 
                        type="checkbox"
                        class="form-checkbox"
                        [checked]="pageGrid.permissions.modify"
                        (change)="togglePagePermission(moduleGrid.module.module_id, pageGrid.page.page_id, 'M', $event)"
                        [disabled]="disabled">
                    </div>
                  </div>
                </div>

                <!-- Child Pages -->
                <div *ngIf="pageGrid.isExpanded && pageGrid.children.length > 0" 
                     class="child-pages ml-8">
                  <div *ngFor="let childPage of pageGrid.children" 
                       class="page-item border-b border-gray-100 hover:bg-gray-50">
                    <div class="px-4 py-2 grid grid-cols-7 gap-4 items-center">
                      
                      <!-- Child Page Name -->
                      <div class="col-span-4 flex items-center space-x-2">
                        <div class="w-4"></div> <!-- Spacer for alignment -->
                        <div class="flex items-center space-x-2">
                          <span class="text-sm text-gray-700">
                            {{ childPage.page.page_name }}
                          </span>
                          <span class="text-xs text-gray-400 px-1 py-0.5 bg-gray-50 rounded">
                            {{ childPage.page.page_type }}
                          </span>
                        </div>
                      </div>

                      <!-- Child Permission Checkboxes -->
                      <div class="text-center">
                        <input 
                          type="checkbox"
                          class="form-checkbox text-sm"
                          [checked]="childPage.permissions.view"
                          (change)="togglePagePermission(moduleGrid.module.module_id, childPage.page.page_id, 'P', $event)"
                          [disabled]="disabled">
                      </div>
                      
                      <div class="text-center">
                        <input 
                          type="checkbox"
                          class="form-checkbox text-sm"
                          [checked]="childPage.permissions.read"
                          (change)="togglePagePermission(moduleGrid.module.module_id, childPage.page.page_id, 'R', $event)"
                          [disabled]="disabled">
                      </div>
                      
                      <div class="text-center">
                        <input 
                          type="checkbox"
                          class="form-checkbox text-sm"
                          [checked]="childPage.permissions.modify"
                          (change)="togglePagePermission(moduleGrid.module.module_id, childPage.page.page_id, 'M', $event)"
                          [disabled]="disabled">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Permission Summary -->
      <div class="permission-summary mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">Permission Summary</h4>
        <div class="grid grid-cols-4 gap-4 text-sm">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ getTotalModules() }}</div>
            <div class="text-gray-600">Modules</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ getTotalGrantedPermissions() }}</div>
            <div class="text-gray-600">Granted</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-600">{{ getTotalPermissions() }}</div>
            <div class="text-gray-600">Total</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">{{ getPermissionPercentage() }}%</div>
            <div class="text-gray-600">Coverage</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .btn-secondary {
      @apply px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500;
    }
    
    .form-checkbox {
      @apply h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500;
    }
    
    .page-item:hover {
      @apply bg-gray-50;
    }
    
    .child-pages {
      @apply border-l-2 border-gray-200;
    }
  `]
})
export class PermissionGridComponent implements OnInit, OnChanges {
  @Input() roleId!: number;
  @Input() disabled = false;
  @Output() permissionChange = new EventEmitter<{
    moduleId: number;
    pageId: number;
    permissionType: PermissionTypeCode;
    hasAccess: boolean;
  }>();

  permissionGrid: PermissionGrid | null = null;

  constructor(private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.loadPermissionGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleId'] && !changes['roleId'].firstChange) {
      this.loadPermissionGrid();
    }
  }

  async loadPermissionGrid(): Promise<void> {
    if (!this.roleId) return;

    try {
      this.permissionGrid = await this.permissionService.buildPermissionGrid(this.roleId).toPromise() || null;
      
      // Initialize expansion states
      if (this.permissionGrid) {
        this.permissionGrid.modules.forEach(module => {
          module.isExpanded = false;
          module.pages.forEach(page => {
            page.isExpanded = false;
          });
        });
      }
    } catch (error) {
      console.error('Error loading permission grid:', error);
    }
  }

  // Module Operations
  toggleModuleExpansion(moduleGrid: ModulePermissionGrid): void {
    moduleGrid.isExpanded = !moduleGrid.isExpanded;
  }

  expandAllModules(): void {
    if (this.permissionGrid) {
      this.permissionGrid.modules.forEach(module => {
        module.isExpanded = true;
      });
    }
  }

  collapseAllModules(): void {
    if (this.permissionGrid) {
      this.permissionGrid.modules.forEach(module => {
        module.isExpanded = false;
      });
    }
  }

  toggleModuleAccess(moduleGrid: ModulePermissionGrid, event: Event): void {
    const target = event.target as HTMLInputElement;
    const hasAccess = target.checked;
    
    this.permissionService.setModulePermissions(this.roleId, moduleGrid.module.module_id, hasAccess);
    this.loadPermissionGrid(); // Refresh the grid
  }

  // Page Operations
  togglePageExpansion(pageGrid: PagePermissionGrid): void {
    pageGrid.isExpanded = !pageGrid.isExpanded;
  }

  togglePagePermission(
    moduleId: number, 
    pageId: number, 
    permissionType: PermissionTypeCode, 
    event: Event
  ): void {
    const target = event.target as HTMLInputElement;
    const hasAccess = target.checked;
    
    this.permissionService.setRolePermission(this.roleId, moduleId, pageId, permissionType, hasAccess);
    this.loadPermissionGrid(); // Refresh the grid
    
    this.permissionChange.emit({
      moduleId,
      pageId,
      permissionType,
      hasAccess
    });
  }

  // Utility Methods
  hasAnyPagePermission(pageGrid: PagePermissionGrid): boolean {
    return pageGrid.permissions.view || pageGrid.permissions.read || pageGrid.permissions.modify;
  }

  getTotalModules(): number {
    return this.permissionGrid?.modules.length || 0;
  }

  getTotalPermissions(): number {
    if (!this.permissionGrid) return 0;
    
    return this.permissionGrid.modules.reduce((total, module) => {
      return total + module.permissions_count.total;
    }, 0);
  }

  getTotalGrantedPermissions(): number {
    if (!this.permissionGrid) return 0;
    
    return this.permissionGrid.modules.reduce((total, module) => {
      return total + module.permissions_count.granted;
    }, 0);
  }

  getPermissionPercentage(): number {
    const total = this.getTotalPermissions();
    const granted = this.getTotalGrantedPermissions();
    
    return total > 0 ? Math.round((granted / total) * 100) : 0;
  }

  // TrackBy Functions
  trackByModule(index: number, module: ModulePermissionGrid): number {
    return module.module.module_id;
  }

  trackByPage(index: number, page: PagePermissionGrid): number {
    return page.page.page_id;
  }
}
