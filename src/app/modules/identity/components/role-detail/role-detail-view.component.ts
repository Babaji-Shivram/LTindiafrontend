import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { 
  BSRoleMaster, 
  RolePermissionDetail, 
  PageHierarchy, 
  PermissionType, 
  PermissionMode 
} from '../../models/role-detail.model';
import { RoleDetailService } from '../../services/role-detail.service';

@Component({
  selector: 'app-role-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RoleDetailService],
  template: `
    <div class="role-view-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="title-section">
            <h1 class="page-title">
              {{ currentRole ? (isReadOnlyMode ? 'Role Details' : 'Edit Role') : 'Create New Role' }}
              <span *ngIf="isReadOnlyMode && currentRole" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-3">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                Read-Only View
              </span>
            </h1>
            <p class="page-subtitle">
              {{ currentRole ? (isReadOnlyMode ? 'View role information and permissions' : 'Update role information and permissions') : 'Create a new role with permissions' }}
            </p>
          </div>
          <div class="action-section">
            <button 
              type="button"
              class="btn btn-secondary"
              (click)="goBack()">
              <i class="icon-arrow-left"></i>
              Back to List
            </button>
            <button 
              type="button"
              class="btn btn-primary"
              (click)="enableEditMode()"
              *ngIf="isReadOnlyMode && currentRole && !currentRole.bDel">
              <i class="icon-edit"></i>
              Edit Role
            </button>
            <button 
              type="submit"
              class="btn btn-primary"
              (click)="onSubmit()"
              [disabled]="roleForm.invalid || saving"
              *ngIf="!isReadOnlyMode">
              <div class="btn-content">
                <div *ngIf="saving" class="spinner-sm"></div>
                {{ saving ? 'Saving...' : (currentRole ? 'Save Changes' : 'Create Role') }}
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-container" *ngIf="loading">
        <div class="loading-spinner"></div>
        <p>Loading role details...</p>
      </div>

      <!-- Role Details Form -->
      <form [formGroup]="roleForm" *ngIf="!loading && currentRole">
        
        <!-- Basic Information -->
        <div class="detail-section">
          <div class="section-header">
            <h2 class="section-title">Basic Information</h2>
            <div class="role-status">
              <span class="status-badge" 
                    [ngClass]="currentRole.bDel ? 'status-deleted' : 'status-active'">
                {{ currentRole.bDel ? 'Deleted' : 'Active' }}
              </span>
            </div>
          </div>
          
          <div class="info-grid">
            <div class="info-item" *ngIf="currentRole">
              <label class="info-label">Role ID</label>
              <div class="info-value role-id">{{ currentRole.lRoleId }}</div>
            </div>
            
            <div class="info-item">
              <label class="info-label">Role Name *</label>
              <div *ngIf="isReadOnlyMode && currentRole" class="info-value role-name">{{ currentRole.sName }}</div>
              <input 
                *ngIf="!isReadOnlyMode"
                type="text"
                formControlName="roleName"
                class="form-input"
                placeholder="Enter role name">
              <div *ngIf="!isReadOnlyMode && roleForm.get('roleName')?.invalid && roleForm.get('roleName')?.touched" 
                   class="error-text">
                Role name is required (3-100 characters)
              </div>
            </div>
            
            <div class="info-item full-width">
              <label class="info-label">Description</label>
              <div *ngIf="isReadOnlyMode && currentRole" class="info-value remarks">
                {{ currentRole.sRemarks || 'No description provided' }}
              </div>
              <textarea 
                *ngIf="!isReadOnlyMode"
                formControlName="remarks"
                rows="3"
                class="form-input"
                placeholder="Enter role description"></textarea>
              <div *ngIf="!isReadOnlyMode && roleForm.get('remarks')?.invalid && roleForm.get('remarks')?.touched" 
                   class="error-text">
                Description cannot exceed 500 characters
              </div>
            </div>
            
            <div class="info-item" *ngIf="currentRole">
              <label class="info-label">Created Date</label>
              <div class="info-value">
                {{ currentRole.dEntry | date:'medium' }}
              </div>
            </div>
            
            <div class="info-item" *ngIf="currentRole">
              <label class="info-label">Created By</label>
              <div class="info-value">
                User ID: {{ currentRole.lUser }}
              </div>
            </div>
          </div>
        </div>

        <!-- Permission Summary -->
        <div class="detail-section">
          <div class="section-header">
            <h2 class="section-title">Permission Summary</h2>
            <div class="summary-stats">
              <div class="stat-item">
                <span class="stat-value">{{ getModulesCount() }}</span>
                <span class="stat-label">Modules</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ rolePermissions.length }}</span>
                <span class="stat-label">Total Permissions</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ getViewPermissionsCount() }}</span>
                <span class="stat-label">View</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ getReadPermissionsCount() }}</span>
                <span class="stat-label">Read</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ getModifyPermissionsCount() }}</span>
                <span class="stat-label">Modify</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Details -->
        <div class="detail-section">
          <div class="section-header">
            <h2 class="section-title">Permissions</h2>
            <div class="permission-actions">
              <button 
                type="button"
                class="btn btn-outline btn-sm"
                (click)="toggleViewMode()">
                <i [class]="viewMode === 'tree' ? 'icon-list' : 'icon-tree'"></i>
                {{ viewMode === 'tree' ? 'List View' : 'Tree View' }}
              </button>
              <button 
                type="button"
                class="btn btn-outline btn-sm"
                (click)="expandAllPermissions()"
                *ngIf="viewMode === 'tree'">
                <i class="icon-expand"></i>
                Expand All
              </button>
              <button 
                type="button"
                class="btn btn-outline btn-sm"
                (click)="collapseAllPermissions()"
                *ngIf="viewMode === 'tree'">
                <i class="icon-collapse"></i>
                Collapse All
              </button>
            </div>
          </div>

          <!-- Tree View -->
          <div class="permissions-tree" *ngIf="viewMode === 'tree'">
            <div 
              *ngFor="let group of groupedPermissions; trackBy: trackByModuleId"
              class="permission-group"
              [class.expanded]="group.expanded">
              
              <!-- Module Header -->
              <div class="group-header" (click)="toggleGroup(group)">
                <div class="group-info">
                  <i class="expand-icon" 
                     [ngClass]="group.expanded ? 'icon-chevron-down' : 'icon-chevron-right'"></i>
                  <span class="module-name">{{ group.moduleName }}</span>
                  <span class="permission-count">({{ group.permissions.length }} permissions)</span>
                </div>
                
                <div class="permission-badges">
                  <span class="permission-badge view" 
                        *ngIf="hasPermissionType(group.permissions, PermissionType.P)">
                    View
                  </span>
                  <span class="permission-badge read" 
                        *ngIf="hasPermissionType(group.permissions, PermissionType.R)">
                    Read
                  </span>
                  <span class="permission-badge modify" 
                        *ngIf="hasPermissionType(group.permissions, PermissionType.M)">
                    Modify
                  </span>
                </div>
              </div>

              <!-- Module Permissions -->
              <div class="group-content" *ngIf="group.expanded">
                <div 
                  *ngFor="let permission of group.permissions; trackBy: trackByPermissionId"
                  class="permission-item">
                  
                  <div class="permission-info">
                    <i class="task-icon icon-task"></i>
                    <div class="task-details">
                      <span class="task-name">{{ permission.taskName }}</span>
                      <span class="task-description" *ngIf="permission.description">
                        {{ permission.description }}
                      </span>
                    </div>
                  </div>

                  <div class="permission-details">
                    <span class="permission-type" 
                          [ngClass]="getPermissionTypeClass(permission.permissionType)">
                      {{ getPermissionTypeLabel(permission.permissionType) }}
                    </span>
                    <span class="permission-mode"
                          [ngClass]="permission.mode === PermissionMode.GRANTED ? 'granted' : 'denied'">
                      {{ permission.mode === PermissionMode.GRANTED ? 'Granted' : 'Denied' }}
                    </span>
                  </div>
                </div>

                <!-- Empty State for Module -->
                <div class="empty-permissions" *ngIf="group.permissions.length === 0">
                  <span class="empty-text">No permissions in this module</span>
                </div>
              </div>
            </div>

            <!-- Empty State for All Permissions -->
            <div class="empty-permissions" *ngIf="groupedPermissions.length === 0">
              <div class="empty-content">
                <i class="empty-icon icon-shield"></i>
                <h3>No Permissions Assigned</h3>
                <p>This role has no permissions assigned</p>
                <button 
                  type="button"
                  class="btn btn-primary"
                  (click)="managePermissions()"
                  *ngIf="currentRole && !currentRole.bDel">
                  <i class="icon-edit"></i>
                  Add Permissions
                </button>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div class="permissions-list" *ngIf="viewMode === 'list'">
            <div class="list-container">
              <div class="list-header">
                <div class="col-module">Module</div>
                <div class="col-task">Task</div>
                <div class="col-permission">Permission</div>
                <div class="col-mode">Mode</div>
                <div class="col-date">Date</div>
              </div>
              
              <div class="list-body">
                <div 
                  *ngFor="let permission of rolePermissions; trackBy: trackByPermissionId"
                  class="list-row">
                  
                  <div class="col-module">
                    <span class="module-name">{{ permission.moduleName }}</span>
                  </div>
                  
                  <div class="col-task">
                    <div class="task-info">
                      <span class="task-name">{{ permission.taskName }}</span>
                      <span class="task-description" *ngIf="permission.description">
                        {{ permission.description }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="col-permission">
                    <span class="permission-type" 
                          [ngClass]="getPermissionTypeClass(permission.permissionType)">
                      {{ getPermissionTypeLabel(permission.permissionType) }}
                    </span>
                  </div>
                  
                  <div class="col-mode">
                    <span class="permission-mode"
                          [ngClass]="permission.mode === PermissionMode.GRANTED ? 'granted' : 'denied'">
                      {{ permission.mode === PermissionMode.GRANTED ? 'Granted' : 'Denied' }}
                    </span>
                  </div>
                  
                  <div class="col-date">
                    <span class="date">{{ permission.dEntry | date:'shortDate' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State for List -->
            <div class="empty-permissions" *ngIf="rolePermissions.length === 0">
              <div class="empty-content">
                <i class="empty-icon icon-shield"></i>
                <h3>No Permissions Assigned</h3>
                <p>This role has no permissions assigned</p>
                <button 
                  type="button"
                  class="btn btn-primary"
                  (click)="managePermissions()"
                  *ngIf="currentRole && !currentRole.bDel">
                  <i class="icon-edit"></i>
                  Add Permissions
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Role Actions - Essential actions only -->
        <div class="detail-section">
          <div class="section-header">
            <h2 class="section-title">Actions</h2>
          </div>
          
          <div class="action-grid">
            <button 
              type="button"
              class="action-card permissions-action"
              (click)="managePermissions()"
              *ngIf="!currentRole.bDel">
              <i class="action-icon icon-shield"></i>
              <div class="action-content">
                <h3 class="action-title">Manage Permissions</h3>
                <p class="action-description">Configure detailed permissions</p>
              </div>
            </button>
            
            <button 
              type="button"
              class="action-card edit-action"
              (click)="editRole()"
              *ngIf="!currentRole.bDel">
              <i class="action-icon icon-edit"></i>
              <div class="action-content">
                <h3 class="action-title">Edit Role</h3>
                <p class="action-description">Modify role details</p>
              </div>
            </button>
          </div>
        </div>
      </form>

      <!-- Error State -->
      <div class="error-state" *ngIf="!loading && !currentRole">
        <div class="error-content">
          <i class="error-icon icon-alert"></i>
          <h3>Role Not Found</h3>
          <p>The requested role could not be found</p>
          <button 
            type="button"
            class="btn btn-primary"
            (click)="goBack()">
            <i class="icon-arrow-left"></i>
            Back to List
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./role-detail-view.component.css']
})
export class RoleDetailViewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data
  currentRole: BSRoleMaster | null = null;
  rolePermissions: RolePermissionDetail[] = [];
  groupedPermissions: any[] = [];
  
  // Form and edit mode
  roleForm!: FormGroup;
  isReadOnlyMode = true;
  saving = false;
  
  // State
  loading = false;
  viewMode: 'tree' | 'list' = 'tree';
  
  // Permission enums for template
  PermissionType = PermissionType;
  PermissionMode = PermissionMode;

  constructor(
    private roleDetailService: RoleDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Check for readonly mode from query params
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(queryParams => {
      this.isReadOnlyMode = queryParams['readonly'] === 'true';
      this.setFormReadOnlyMode();
    });

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id'] === 'new') {
        // Creating new role
        this.currentRole = null;
        this.isReadOnlyMode = false;
        this.setFormReadOnlyMode();
        this.initializeForm(); // Reset form for new role
      } else if (params['id']) {
        const roleId = +params['id'];
        this.loadRoleDetails(roleId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      remarks: ['', [Validators.maxLength(500)]]
    });
  }

  private setFormReadOnlyMode(): void {
    if (this.isReadOnlyMode) {
      this.roleForm.disable();
    } else {
      this.roleForm.enable();
    }
  }

  private loadRoleDetails(roleId: number): void {
    this.loading = true;
    
    this.roleDetailService.getRoleDetail(roleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (roleWithDetails) => {
          this.currentRole = roleWithDetails.role;
          this.rolePermissions = roleWithDetails.permissions;
          this.populateForm();
          this.groupPermissionsByModule();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading role details:', error);
          this.loading = false;
        }
      });
  }

  private populateForm(): void {
    if (this.currentRole) {
      this.roleForm.patchValue({
        roleName: this.currentRole.sName,
        remarks: this.currentRole.sRemarks || ''
      });
      this.setFormReadOnlyMode();
    }
  }

  private groupPermissionsByModule(): void {
    const moduleMap = new Map<number, any>();
    
    this.rolePermissions.forEach(permission => {
      if (!moduleMap.has(permission.moduleId)) {
        moduleMap.set(permission.moduleId, {
          moduleId: permission.moduleId,
          moduleName: permission.moduleName,
          permissions: [],
          expanded: true
        });
      }
      
      moduleMap.get(permission.moduleId)!.permissions.push(permission);
    });
    
    this.groupedPermissions = Array.from(moduleMap.values());
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'tree' ? 'list' : 'tree';
  }

  toggleGroup(group: any): void {
    group.expanded = !group.expanded;
  }

  expandAllPermissions(): void {
    this.groupedPermissions.forEach(group => group.expanded = true);
  }

  collapseAllPermissions(): void {
    this.groupedPermissions.forEach(group => group.expanded = false);
  }

  hasPermissionType(permissions: RolePermissionDetail[], type: PermissionType): boolean {
    return permissions.some(p => p.permissionType === type);
  }

  getPermissionTypeClass(type: PermissionType): string {
    switch (type) {
      case PermissionType.P: return 'type-view';
      case PermissionType.R: return 'type-read';
      case PermissionType.M: return 'type-modify';
      default: return '';
    }
  }

  getPermissionTypeLabel(type: PermissionType): string {
    switch (type) {
      case PermissionType.P: return 'View';
      case PermissionType.R: return 'Read';
      case PermissionType.M: return 'Modify';
      default: return type;
    }
  }

  getModulesCount(): number {
    const moduleIds = new Set(this.rolePermissions.map(p => p.moduleId));
    return moduleIds.size;
  }

  getViewPermissionsCount(): number {
    return this.rolePermissions.filter(p => p.permissionType === PermissionType.P).length;
  }

  getReadPermissionsCount(): number {
    return this.rolePermissions.filter(p => p.permissionType === PermissionType.R).length;
  }

  getModifyPermissionsCount(): number {
    return this.rolePermissions.filter(p => p.permissionType === PermissionType.M).length;
  }

  // Form submission
  onSubmit(): void {
    if (this.roleForm.valid && !this.saving) {
      this.saving = true;
      
      const formValue = this.roleForm.value;
      
      if (this.currentRole) {
        // Update existing role
        const updateData = {
          lRoleId: this.currentRole.lRoleId,
          sName: formValue.roleName,
          sRemarks: formValue.remarks || '',
          lCompId: this.currentRole.lCompId,
          lUserId: this.currentRole.lUserId,
          isActive: !this.currentRole.bDel
        };
        
        this.roleDetailService.updateCRMRole(updateData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response.success && this.currentRole) {
                // Update the current role with new values
                this.currentRole.sName = formValue.roleName;
                this.currentRole.sRemarks = formValue.remarks;
                
                alert('Role updated successfully!');
                this.enableReadOnlyMode();
              } else {
                alert('Error updating role: ' + (response.message || 'Unknown error'));
              }
              this.saving = false;
            },
            error: (error) => {
              console.error('Error updating role:', error);
              alert('Error updating role. Please try again.');
              this.saving = false;
            }
          });
      } else {
        // Create new role
        const createData = {
          sName: formValue.roleName,
          sRemarks: formValue.remarks || '',
          lCompId: 0, // Default company ID
          lUserId: 1, // TODO: Get current user ID from auth service
          isActive: true
        };
        
        this.roleDetailService.createCRMRole(createData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response.success) {
                alert('Role created successfully!');
                this.router.navigate(['/identity/roles']);
              } else {
                alert('Error creating role: ' + (response.message || 'Unknown error'));
              }
              this.saving = false;
            },
            error: (error) => {
              console.error('Error creating role:', error);
              alert('Error creating role. Please try again.');
              this.saving = false;
            }
          });
      }
    }
  }

  enableEditMode(): void {
    this.isReadOnlyMode = false;
    this.setFormReadOnlyMode();
    // Remove readonly query param and stay on current page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });
  }

  enableReadOnlyMode(): void {
    this.isReadOnlyMode = true;
    this.setFormReadOnlyMode();
    // Add readonly query param
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { readonly: 'true' },
      replaceUrl: true
    });
  }

  editRole(): void {
    // This method is now replaced by enableEditMode
    this.enableEditMode();
  }

  managePermissions(): void {
    if (this.currentRole) {
      console.log('Navigating to manage permissions:', this.currentRole.lRoleId);
      this.router.navigate(['/identity/roles', this.currentRole.lRoleId, 'permissions'])
        .then(success => {
          console.log('Navigation to permissions successful:', success);
        })
        .catch(error => {
          console.error('Navigation to permissions failed:', error);
        });
    } else {
      console.error('No current role for permissions');
    }
  }

  copyRole(): void {
    if (this.currentRole) {
      this.router.navigate(['/identity/roles/new'], {
        queryParams: { copyFrom: this.currentRole.lRoleId }
      });
    }
  }

  deleteRole(): void {
    if (this.currentRole && confirm(`Are you sure you want to delete the role "${this.currentRole.sName}"?`)) {
      this.roleDetailService.deleteRole(this.currentRole.lRoleId, 1) // Assuming current user ID is 1
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              alert('Role deleted successfully!');
              this.goBack();
            } else {
              alert(`Error deleting role: ${response.message}`);
            }
          },
          error: (error) => {
            console.error('Error deleting role:', error);
            alert('Error deleting role. Please try again.');
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/identity/roles']);
  }

  trackByModuleId(index: number, group: any): number {
    return group.moduleId;
  }

  trackByPermissionId(index: number, permission: RolePermissionDetail): number {
    return permission.lid;
  }
}
