// Role Detail Master System Models based on backend DB structure

export interface BSRoleMaster {
  lRoleId: number;       // Primary Key
  sName: string;         // Role Name
  sRemarks: string;      // Role Description/Remarks
  bDel: boolean;         // Deletion Flag (frontend boolean)
  lUser: number;         // Created By User
  dEntry: Date;          // Entry Date
}

export interface BSRoleDetail {
  lid: number;           // Primary Key
  lRoleId: number;       // Foreign Key to BS_RoleMS
  lModuleId: number;     // Module ID
  lTaskId: number;       // Task/Page ID (Foreign Key to BS_PageMS)
  cTyp: string;          // Type ('R' = Report, 'P' = Page, etc.)
  lTypId: number;        // Type ID
  lMode: number;         // Permission Mode (0/1)
  bDel: number;          // Deletion Flag
  lUserId: number;       // Created/Modified By User
  dEntry: Date;          // Entry Date
}

export interface BSPageMaster {
  PageId: number;        // Primary Key
  ModuleId: number;      // Module ID
  ParentPage: number;    // Parent Page ID
  PageName: string;      // Page Name
  PageURL: string;       // Page URL
  ChildNode: number;     // Child Node Index
  cTyp: string;          // Type ('R', 'P', etc.)
  cGsGpFlag: string;     // Group Flag
  bDel: boolean;         // Deletion Flag
}

// Extended interfaces for frontend use
export interface RoleWithDetails {
  role: BSRoleMaster;
  permissions: RolePermissionDetail[];
}

export interface RolePermissionDetail extends BSRoleDetail {
  // Frontend additional properties
  moduleId: number;      // Alias for lModuleId
  taskId: number;        // Alias for lTaskId 
  permissionType: PermissionType; // Alias for cTyp
  typeId: number;        // Alias for lTypId
  mode: PermissionMode;  // Alias for lMode
  
  // Display properties
  moduleName: string;
  taskName: string;
  description?: string;
}

export interface ModuleStructure {
  moduleId: number;
  moduleName: string;
  pages: BSPageMaster[];
  isExpanded?: boolean;
}

export interface PageHierarchy {
  pageId: number;
  moduleId: number;
  parentPageId: number;
  pageName: string;
  pageURL: string;
  isChildNode: boolean;
  cTyp: string;
  gsgpFlag: string;
  isDeleted: boolean;
  children: PageHierarchy[];
  level: number;
  hasPermission: boolean;
}

export enum PermissionType {
  P = 'P',     // Page/View Permission
  R = 'R',     // Read Permission  
  M = 'M'      // Modify Permission
}

export enum PermissionMode {
  DENIED = 0,
  GRANTED = 1
}

// For role assignment dropdowns
export interface RoleDropdown {
  lRoleId: number;
  sName: string;
  isActive: boolean;
}

// For permission assignment
export interface PermissionAssignment {
  roleId: number;
  moduleId: number;
  permissions: {
    pageId: number;
    hasAccess: boolean;
    permissionType: PermissionType;
  }[];
}

// For role hierarchy display
export interface RoleHierarchy {
  role: BSRoleMaster;
  level: number;
  permissions: {
    modules: ModulePermission[];
    totalPermissions: number;
    activePermissions: number;
  };
}

export interface ModulePermission {
  moduleId: number;
  moduleName: string;
  totalPages: number;
  accessiblePages: number;
  pages: PagePermission[];
  reports: PagePermission[];
}

export interface PagePermission {
  pageId: number;
  pageName: string;
  hasAccess: boolean;
  permissionType: PermissionType;
  children: PagePermission[];
}

// For search and filtering
export interface RoleSearchCriteria {
  searchTerm?: string;
  hasPermissions?: boolean;
  isActive?: boolean;
  createdDateFrom?: Date;
  createdDateTo?: Date;
  userCountMin?: number;
  userCountMax?: number;
}

export interface PermissionSearchCriteria {
  roleId?: number;
  moduleId?: number;
  permissionType?: PermissionType;
  hasAccess?: boolean;
  searchTerm?: string;
}
