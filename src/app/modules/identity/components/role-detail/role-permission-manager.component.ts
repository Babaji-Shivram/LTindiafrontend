import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleDetailService } from '../../services/role-detail.service';
import { BSRoleMaster, BSRoleDetail } from '../../models/role-detail.model';

// ERP-style Role Permission Manager Component

interface ModulePage {
  lPageId: number;
  sPageName: string;
  isSubPage: boolean;
  hasAccess: boolean;
}

interface AvailableModule {
  lModuleId: number;
  sModuleName: string;
  sDescription?: string;
}

@Component({
  selector: 'app-role-permission-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="permission-manager-container">
      <!-- Compact Header -->
      <div class="page-header">
        <div class="header-content">
          <button 
            type="button" 
            class="btn btn-outline back-btn"
            (click)="goBack()">
            <i class="icon-arrow-left"></i>
            Back
          </button>
          <h1 class="page-title">Role Permissions</h1>
          <div class="header-actions" *ngIf="!isLoading && currentRole">
            <button 
              type="button" 
              class="btn btn-primary"
              (click)="saveAllPermissions()"
              [disabled]="isSaving">
              <i class="icon-save"></i>
              {{ isSaving ? 'Saving...' : 'Save All' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-container" *ngIf="isLoading">
        <div class="loading-spinner"></div>
        <span>Loading role permissions...</span>
      </div>

      <!-- Error State - Role Not Found -->
      <div class="loading-container" *ngIf="!isLoading && !currentRole">
        <div style="text-align: center;">
          <div style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem;">⚠️</div>
          <h2 style="margin-bottom: 0.5rem; color: #374151;">Role Not Found</h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">The requested role could not be found or you don't have permission to view it.</p>
          <button type="button" class="btn btn-primary" (click)="goBack()">
            <i class="icon-arrow-left"></i>
            Back to Roles
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="main-content" *ngIf="!isLoading && currentRole">
        <!-- Role Info Bar -->
        <div class="role-info-bar">
          <span class="role-label">Role:</span>
          <span class="role-name">{{ roleName }}</span>
          <span class="permissions-count">{{ getSelectedPermissionsCount() }} permissions selected</span>
        </div>

        <!-- Modules and Permissions -->
        <div class="modules-container">
          <div class="module-section" *ngFor="let module of availableModules">
            <div class="module-header" (click)="toggleModule(module.lModuleId)">
              <div class="module-info">
                <h3 class="module-name">{{ module.sModuleName }}</h3>
                <span class="page-count">{{ getModulePages(module.lModuleId).length }} pages</span>
              </div>
              <div class="module-toggle">
                <span class="toggle-icon" [class.expanded]="isModuleExpanded(module.lModuleId)">▼</span>
              </div>
            </div>
            
            <div class="module-content" *ngIf="isModuleExpanded(module.lModuleId)">
              <div class="permissions-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="col-si">SI</th>
                      <th class="col-name">Name</th>
                      <th class="col-rights">Rights</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let page of getModulePages(module.lModuleId); let i = index">
                      <td class="col-si">{{ i + 1 }}</td>
                      <td class="col-name">
                        <span class="page-prefix" *ngIf="page.isSubPage">.... -- </span>
                        <span class="page-name">{{ page.sPageName }}</span>
                      </td>
                      <td class="col-rights">
                        <input 
                          type="checkbox" 
                          class="rights-checkbox"
                          [checked]="page.hasAccess"
                          (change)="togglePermission(page.lPageId, $event)">
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div class="no-pages" *ngIf="getModulePages(module.lModuleId).length === 0">
                  No pages available for this module
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./role-permission-manager.component.css']
})
export class RolePermissionManagerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roleService = inject(RoleDetailService);
  
  currentRole: BSRoleMaster | null = null;
  roleName: string = '';
  
  // New interface properties
  availableModules: AvailableModule[] = [];
  allPages: ModulePage[] = [];
  expandedModules: Set<number> = new Set();
  
  isLoading = true;
  isSaving = false;
  hasChanges = false;

  ngOnInit(): void {
    this.loadRoleAndModules();
  }

  private async loadRoleAndModules(): Promise<void> {
    try {
      const roleId = this.route.snapshot.paramMap.get('id');
      if (!roleId) {
        this.router.navigate(['/identity/roles']);
        return;
      }

      this.isLoading = true;
      
      // Load role details
      const roleResponse: any = await this.roleService.getRoleDetail(parseInt(roleId));
      // Handle nested response structure
      this.currentRole = roleResponse?.role || roleResponse;
      this.roleName = this.currentRole?.sName || 'Unknown Role';
      
      // Load available modules and their pages
      this.loadMockData();
      
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading role and modules:', error);
      this.isLoading = false;
      // Redirect back to roles list if role not found
      this.router.navigate(['/identity/roles']);
    }
  }

  private loadMockData(): void {
    // Mock modules
    this.availableModules = [
      { lModuleId: 1, sModuleName: 'Import Tracking', sDescription: 'Import operations and tracking' },
      { lModuleId: 2, sModuleName: 'Export Tracking', sDescription: 'Export operations and tracking' },
      { lModuleId: 3, sModuleName: 'CRM Management', sDescription: 'Customer relationship management' }
    ];

    // Mock pages for all modules
    this.allPages = [
      // Import Tracking Module
      { lPageId: 1, sPageName: 'User Setup', isSubPage: false, hasAccess: false },
      { lPageId: 2, sPageName: 'BS User', isSubPage: true, hasAccess: false },
      { lPageId: 3, sPageName: 'Department', isSubPage: true, hasAccess: false },
      { lPageId: 4, sPageName: 'BS Group', isSubPage: true, hasAccess: false },
      { lPageId: 5, sPageName: 'Import Entry', isSubPage: false, hasAccess: false },
      { lPageId: 6, sPageName: 'Import Reports', isSubPage: false, hasAccess: false },
      
      // Export Tracking Module
      { lPageId: 7, sPageName: 'Export Entry', isSubPage: false, hasAccess: false },
      { lPageId: 8, sPageName: 'Export Reports', isSubPage: false, hasAccess: false },
      { lPageId: 9, sPageName: 'Shipping Instructions', isSubPage: false, hasAccess: false },
      { lPageId: 10, sPageName: 'Export Documents', isSubPage: false, hasAccess: false },
      
      // CRM Management Module
      { lPageId: 11, sPageName: 'Customer Management', isSubPage: false, hasAccess: false },
      { lPageId: 12, sPageName: 'Lead Management', isSubPage: false, hasAccess: false },
      { lPageId: 13, sPageName: 'Sales Dashboard', isSubPage: false, hasAccess: false },
      { lPageId: 14, sPageName: 'CRM Reports', isSubPage: false, hasAccess: false }
    ];

    // Store module mapping for getModulePages function
    this.allPages = this.allPages.map((page, index) => ({
      ...page,
      moduleId: index < 6 ? 1 : index < 10 ? 2 : 3
    } as any));

    // Expand first module by default
    this.expandedModules.add(1);
  }

  getModulePages(moduleId: number): ModulePage[] {
    return this.allPages.filter(page => (page as any).moduleId === moduleId);
  }

  getSelectedPermissionsCount(): number {
    return this.allPages.filter(page => page.hasAccess).length;
  }

  toggleModule(moduleId: number): void {
    if (this.expandedModules.has(moduleId)) {
      this.expandedModules.delete(moduleId);
    } else {
      this.expandedModules.add(moduleId);
    }
  }

  isModuleExpanded(moduleId: number): boolean {
    return this.expandedModules.has(moduleId);
  }

  togglePermission(pageId: number, event: any): void {
    const page = this.allPages.find(p => p.lPageId === pageId);
    if (page) {
      page.hasAccess = event.target.checked;
      this.hasChanges = true;
    }
  }

  saveAllPermissions(): void {
    this.isSaving = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving all permissions:', this.allPages.filter(p => p.hasAccess));
      this.isSaving = false;
      this.hasChanges = false;
      
      // Navigate back to role details
      this.goBack();
    }, 1000);
  }

  cancel(): void {
    this.goBack();
  }

  goBack(): void {
    const roleId = this.route.snapshot.paramMap.get('id');
    if (roleId) {
      // Navigate back to the role detail view
      this.router.navigate(['/identity/roles', roleId]);
    } else {
      // Fallback to roles list
      this.router.navigate(['/identity/roles']);
    }
  }
}
