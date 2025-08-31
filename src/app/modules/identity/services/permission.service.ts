import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { UserPermissionDetail } from '../models/user.model';
import { ModuleMaster, PageMaster, PermissionGrid } from '../models/module-permission.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private modulesSubject = new BehaviorSubject<ModuleMaster[]>([]);
  private pagesSubject = new BehaviorSubject<PageMaster[]>([]);
  
  public modules$ = this.modulesSubject.asObservable();
  public pages$ = this.pagesSubject.asObservable();

  constructor(private sessionService: SessionService) {
    this.initializeDefaultData();
  }

  // Initialize with default modules and pages
  private initializeDefaultData(): void {
    const defaultModules: ModuleMaster[] = [
      { 
        module_id: 1, 
        module_name: 'CRM', 
        module_description: 'Customer Relationship Management',
        display_order: 1,
        is_active: true,
        route_path: '/crm'
      },
      { 
        module_id: 2, 
        module_name: 'Masters', 
        module_description: 'Master Data Management',
        display_order: 2,
        is_active: true,
        route_path: '/masters'
      },
      { 
        module_id: 3, 
        module_name: 'Identity', 
        module_description: 'User & Role Management',
        display_order: 3,
        is_active: true,
        route_path: '/identity'
      },
      { 
        module_id: 4, 
        module_name: 'Reports', 
        module_description: 'Reports & Analytics',
        display_order: 4,
        is_active: true,
        route_path: '/reports'
      }
    ];

    const defaultPages: PageMaster[] = [
      // CRM Pages
      { page_id: 101, module_id: 1, page_name: 'Leads', page_description: 'Lead Management', display_order: 1, is_active: true, route_path: '/crm/leads' },
      { page_id: 102, module_id: 1, page_name: 'Accounts', page_description: 'Account Management', display_order: 2, is_active: true, route_path: '/crm/accounts' },
      { page_id: 103, module_id: 1, page_name: 'Opportunities', page_description: 'Opportunity Management', display_order: 3, is_active: true, route_path: '/crm/opportunities' },
      
      // Masters Pages
      { page_id: 201, module_id: 2, page_name: 'Parties', page_description: 'Party Master', display_order: 1, is_active: true, route_path: '/masters/parties' },
      { page_id: 202, module_id: 2, page_name: 'Ports', page_description: 'Port Master', display_order: 2, is_active: true, route_path: '/masters/ports' },
      { page_id: 203, module_id: 2, page_name: 'Charge Codes', page_description: 'Charge Code Master', display_order: 3, is_active: true, route_path: '/masters/charge-codes' },
      { page_id: 204, module_id: 2, page_name: 'Tax Rates', page_description: 'Tax Rate Master', display_order: 4, is_active: true, route_path: '/masters/tax-rates' },
      { page_id: 205, module_id: 2, page_name: 'UOM', page_description: 'Unit of Measurement', display_order: 5, is_active: true, route_path: '/masters/uom' },
      
      // Identity Pages
      { page_id: 301, module_id: 3, page_name: 'Users', page_description: 'User Management', display_order: 1, is_active: true, route_path: '/identity/users' },
      { page_id: 302, module_id: 3, page_name: 'Roles', page_description: 'Role Management', display_order: 2, is_active: true, route_path: '/identity/roles' },
      { page_id: 303, module_id: 3, page_name: 'Login', page_description: 'User Login', display_order: 3, is_active: true, route_path: '/identity/login' },
      
      // Reports Pages
      { page_id: 401, module_id: 4, page_name: 'Sales Reports', page_description: 'Sales Analytics', display_order: 1, is_active: true, route_path: '/reports/sales' },
      { page_id: 402, module_id: 4, page_name: 'Financial Reports', page_description: 'Financial Analytics', display_order: 2, is_active: true, route_path: '/reports/financial' }
    ];

    this.modulesSubject.next(defaultModules);
    this.pagesSubject.next(defaultPages);
  }

  // Get Available Modules for Current User
  getAvailableModules(): Observable<ModuleMaster[]> {
    return combineLatest([
      this.modules$,
      this.sessionService.currentSession$
    ]).pipe(
      map(([modules, session]) => {
        if (!session) return [];
        
        // Filter modules based on user permissions
        return modules.filter(module => {
          return session.permissions.some(p => 
            p.module_id === module.module_id && p.has_access
          );
        }).sort((a, b) => a.display_order - b.display_order);
      })
    );
  }

  // Get Available Pages for Module
  getModulePages(moduleId: number): Observable<PageMaster[]> {
    return combineLatest([
      this.pages$,
      this.sessionService.currentSession$
    ]).pipe(
      map(([pages, session]) => {
        if (!session) return [];
        
        // Filter pages based on user permissions
        const modulePages = pages.filter(page => page.module_id === moduleId);
        
        return modulePages.filter(page => {
          return session.permissions.some(p => 
            p.module_id === moduleId && 
            p.page_id === page.page_id && 
            p.has_access
          );
        }).sort((a, b) => a.display_order - b.display_order);
      })
    );
  }

  // Check if user has specific permission
  hasPermission(moduleId: number, pageId: number, permissionType: 'P' | 'R' | 'M' = 'P'): boolean {
    return this.sessionService.hasPageAccess(moduleId, pageId, permissionType);
  }

  // Check if user has module access
  hasModuleAccess(moduleId: number): boolean {
    return this.sessionService.hasModuleAccess(moduleId);
  }

  // Get Permission Grid for Role
  getPermissionGrid(moduleId?: number): Observable<PermissionGrid[]> {
    return combineLatest([
      this.modules$,
      this.pages$
    ]).pipe(
      map(([modules, pages]) => {
        const filteredModules = moduleId 
          ? modules.filter(m => m.module_id === moduleId)
          : modules;

        const grid: PermissionGrid[] = [];

        filteredModules.forEach(module => {
          const modulePages = pages.filter(p => p.module_id === module.module_id);
          
          modulePages.forEach(page => {
            grid.push({
              module_id: module.module_id,
              module_name: module.module_name,
              page_id: page.page_id,
              page_name: page.page_name,
              has_print: false,
              has_read: false,
              has_modify: false
            });
          });
        });

        return grid;
      })
    );
  }

  // Get User Permissions Summary
  getUserPermissionSummary(): Observable<{ moduleId: number; moduleName: string; pageCount: number; permissions: string[] }[]> {
    return combineLatest([
      this.modules$,
      this.sessionService.currentSession$
    ]).pipe(
      map(([modules, session]) => {
        if (!session) return [];

        return modules.map(module => {
          const userModulePermissions = session.permissions.filter(p => 
            p.module_id === module.module_id && p.has_access
          );

          const uniquePages = [...new Set(userModulePermissions.map(p => p.page_id))];
          const permissionTypes = [...new Set(userModulePermissions.map(p => p.permission_type))];

          return {
            moduleId: module.module_id,
            moduleName: module.module_name,
            pageCount: uniquePages.length,
            permissions: permissionTypes
          };
        }).filter(summary => summary.pageCount > 0);
      })
    );
  }

  // Utility Methods
  getModuleById(moduleId: number): Observable<ModuleMaster | undefined> {
    return this.modules$.pipe(
      map(modules => modules.find(m => m.module_id === moduleId))
    );
  }

  getPageById(pageId: number): Observable<PageMaster | undefined> {
    return this.pages$.pipe(
      map(pages => pages.find(p => p.page_id === pageId))
    );
  }

  // Permission Type Helpers
  getPermissionTypeDisplay(type: 'P' | 'R' | 'M'): string {
    switch (type) {
      case 'P': return 'Print';
      case 'R': return 'Read';
      case 'M': return 'Modify';
      default: return 'Unknown';
    }
  }

  // Navigation Helper
  getRouteForPage(moduleId: number, pageId: number): string | null {
    const modules = this.modulesSubject.value;
    const pages = this.pagesSubject.value;
    
    const module = modules.find(m => m.module_id === moduleId);
    const page = pages.find(p => p.page_id === pageId);
    
    if (page?.route_path) {
      return page.route_path;
    } else if (module?.route_path) {
      return module.route_path;
    }
    
    return null;
  }

  // Load Modules and Pages from Backend (Future Implementation)
  async loadModulesFromBackend(): Promise<void> {
    // TODO: Implement when backend is ready
    // This will replace the default data with actual backend data
    console.log('Loading modules from backend - To be implemented');
  }

  async loadPagesFromBackend(): Promise<void> {
    // TODO: Implement when backend is ready
    // This will replace the default data with actual backend data
    console.log('Loading pages from backend - To be implemented');
  }
}
