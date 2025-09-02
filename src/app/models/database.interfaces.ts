// Database-driven interfaces for LT India ERP
// Based on typical SQL Server user management schema

export interface DatabaseUser {
  // Primary Key
  UserId: number;

  // Basic Information
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  FullName?: string; // Computed field

  // Authentication
  PasswordHash?: string; // Should not be exposed to frontend
  Salt?: string; // Should not be exposed to frontend
  IsActive: boolean;
  IsLocked: boolean;
  IsEmailVerified: boolean;

  // Profile Information
  PhoneNumber?: string;
  ProfilePicture?: string;
  Department?: string;
  Position?: string;
  EmployeeId?: string;

  // Two-Factor Authentication
  TwoFactorEnabled: boolean;
  TwoFactorSecret?: string; // Base32 encoded secret
  TwoFactorBackupCodes?: string[]; // Array of backup codes
  TwoFactorLastUsed?: Date;
  TwoFactorSetupDate?: Date;

  // Login Tracking
  LastLoginDate?: Date;
  LastLoginIpAddress?: string;
  LastLoginUserAgent?: string;
  LastLoginLocation?: string; // City, Country from IP geolocation
  PreviousLoginDate?: Date;
  LoginAttempts: number;
  LastFailedLoginDate?: Date;
  LastFailedLoginIpAddress?: string;

  // Audit Fields
  CreatedDate: Date;
  CreatedBy: number;
  ModifiedDate?: Date;
  ModifiedBy?: number;

  // Role Information
  RoleId: number;
  RoleName?: string; // From JOIN with Role table

  // Additional Security
  SecurityStamp?: string;
  AccessFailedCount: number;
  LockoutEndDate?: Date;
}

// Frontend-safe interfaces (without sensitive data)
export interface FrontendUser {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  profilePicture?: string;
  department?: string;
  position?: string;
  employeeId?: string;
  isActive: boolean;
  isLocked: boolean;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSetupDate?: Date;
  createdDate: Date;
  lastLoginDate?: Date;
  lastLoginLocation?: string;
  previousLoginDate?: Date;
  loginAttempts: number;
  lastFailedLoginDate?: Date;
  roleId: number;
  roleName: string;
  status: 'Active' | 'Inactive' | 'Locked';
}

// API Response interfaces
export interface UserListResponse {
  users: FrontendUser[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

// User detail view interface for showing comprehensive information
export interface UserDetailView extends FrontendUser {
  // Security information
  accountLocked: boolean;
  lockoutEndDate?: Date;
  securityQuestions?: SecurityQuestion[];

  // Login history (recent)
  recentLogins: LoginAttempt[];
  activeSession?: UserSession;

  // 2FA details
  twoFactorDetails?: {
    enabled: boolean;
    setupDate?: Date;
    lastUsed?: Date;
    backupCodesRemaining?: number;
  };

  // Audit information
  createdBy: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface SecurityQuestion {
  id: number;
  question: string;
  isAnswered: boolean;
  createdDate: Date;
}

export interface UserSession {
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  ipAddress: string;
  userAgent: string;
  deviceType?: string;
  location?: string;
  isActive: boolean;
}

export interface LoginAttempt {
  id: number;
  userId: number;
  attemptTime: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
  isSuccessful: boolean;
  failureReason?: string;
  twoFactorUsed?: boolean;
}export interface DatabaseRole {
  // Primary Key
  RoleId: number;
  
  // Basic Information
  RoleName: string;
  RoleDescription?: string;
  
  // Role Properties
  IsActive: boolean;
  IsSystemRole: boolean; // System roles cannot be deleted
  Priority: number; // Role hierarchy/priority
  
  // Audit Fields
  CreatedDate: Date;
  CreatedBy: number;
  ModifiedDate?: Date;
  ModifiedBy?: number;
  
  // Computed Fields (from JOINs)
  UserCount?: number;
  PermissionCount?: number;
}

export interface DatabasePermission {
  // Primary Key
  PermissionId: number;
  
  // Basic Information
  PermissionName: string;
  PermissionDescription?: string;
  ResourceName: string; // What resource this permission applies to
  ActionName: string; // What action is allowed (Create, Read, Update, Delete)
  
  // Categorization
  ModuleName: string; // Which module/feature this belongs to
  Category: string; // Group permissions logically
  
  // Properties
  IsActive: boolean;
  
  // Audit Fields
  CreatedDate: Date;
  CreatedBy: number;
  ModifiedDate?: Date;
  ModifiedBy?: number;
}

export interface DatabaseRolePermission {
  // Composite Key
  RolePermissionId: number;
  RoleId: number;
  PermissionId: number;
  
  // Permission State
  IsGranted: boolean;
  
  // Audit Fields
  GrantedDate: Date;
  GrantedBy: number;
  RevokedDate?: Date;
  RevokedBy?: number;
}

export interface DatabaseUserSession {
  // Primary Key
  SessionId: string;
  
  // Session Information
  UserId: number;
  LoginTime: Date;
  LogoutTime?: Date;
  LastActivityTime: Date;
  IsActive: boolean;
  
  // Session Details
  IpAddress: string;
  UserAgent: string;
  DeviceType?: string;
  BrowserName?: string;
  Location?: string;
  
  // Security
  SessionToken: string;
  RefreshToken?: string;
  ExpiryTime: Date;
}

// Frontend-safe interfaces (without sensitive data)
export interface FrontendUser {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  profilePicture?: string;
  department?: string;
  position?: string;
  employeeId?: string;
  isActive: boolean;
  isLocked: boolean;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSetupDate?: Date;
  createdDate: Date;
  lastLoginDate?: Date;
  lastLoginLocation?: string;
  previousLoginDate?: Date;
  loginAttempts: number;
  lastFailedLoginDate?: Date;
  roleId: number;
  roleName: string;
  status: 'Active' | 'Inactive' | 'Locked';
  
  // Additional required fields from DB
  passwordResetRequired?: boolean;     // Password reset flag
  passwordResetDays?: number;          // Number of days for password reset
  signatureImageUrl?: string;          // Upload signature image URL
  faLedgerCode?: string;              // FA Ledger Code
  branchLocations?: string;            // Branch location (single branch ID or name)
  viewContract?: boolean;              // View Contract permission
}

export interface FrontendRole {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isSystemRole: boolean;
  priority: number;
  createdDate: Date;
  userCount: number;
  permissionCount: number;
  permissions: FrontendPermission[];
}

export interface FrontendPermission {
  id: number;
  name: string;
  description?: string;
  resourceName: string;
  actionName: string;
  moduleName: string;
  category: string;
  isActive: boolean;
  isGranted?: boolean; // For role-permission context
}

export interface FrontendUserSession {
  id: string;
  loginTime: Date;
  lastActivityTime: Date;
  ipAddress: string;
  deviceType?: string;
  browserName?: string;
  location?: string;
  isActive: boolean;
}

// API Response interfaces
export interface UserListResponse {
  users: FrontendUser[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface RoleListResponse {
  roles: FrontendRole[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}

export interface PermissionListResponse {
  permissions: FrontendPermission[];
  modules: string[];
  categories: string[];
}

// API Request interfaces
export interface CreateUserRequest {
  // Core User Master (BS_UserMS) - Required fields
  userName: string;           // Login username (required)
  password: string;           // Password (required, store hashed)
  userType?: number;          // User type (1=Internal, 2=Customer, 3=Agent, -1=Admin)
  roleId: number;             // Role assignment (FK to BS_RoleMS, required)
  status: number;             // Active status (1=Active, 0=Inactive)
  
  // User Details (BS_UserDetail) - Required fields
  empName: string;            // Employee full name (required)
  email: string;              // Email address (required)
  mobile: string;             // Mobile number (required)
  
  // Optional fields
  deptId?: number;            // Department ID (optional)
  divisionId?: number;        // Division ID (optional)
  empCode?: string;           // Employee code (optional)
  address?: string;           // Address (optional)
  
  // Legacy compatibility fields
  firstName?: string;         // For backward compatibility
  lastName?: string;          // For backward compatibility
  phoneNumber?: string;       // Alias for mobile
  department?: string;        // Legacy department field
  position?: string;          // Job position
  employeeId?: string;        // Alias for empCode
  isActive?: boolean;         // Legacy active flag
  twoFactorEnabled?: boolean; // Two-factor authentication
}

export interface UpdateUserRequest {
  id: number;
  
  // Core User Master (BS_UserMS)
  userName?: string;
  userType?: number;
  roleId?: number;
  status?: number;
  
  // User Details (BS_UserDetail)
  empName?: string;
  email?: string;
  mobile?: string;
  deptId?: number;
  divisionId?: number;
  empCode?: string;
  address?: string;
  
  // Legacy compatibility fields
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  employeeId?: string;
  isActive?: boolean;
  twoFactorEnabled?: boolean;
}

export interface CreateRoleRequest {
  // Core Role Information (BS_RoleMS compatible)
  sName: string;              // Role Name (Required, Max: 100)
  sRemarks?: string;          // Role Description/Remarks (Optional, Max: 500)
  lCompId?: number;           // Company ID (Default: 0, Optional)
  
  // System Fields (Auto-managed)
  lUserId?: number;           // Created By User ID (System managed)
  lDate?: number;             // Creation Date (System managed)
  wefDate?: number;           // Effective From Date (System managed)
  bDel?: boolean;             // Deletion Flag (Default: false, System managed)
  
  // Legacy compatibility fields (keep existing frontend working)
  name?: string;              // Alias for sName
  description?: string;       // Alias for sRemarks
  priority?: number;          // For frontend sorting
  permissionIds?: number[];   // Permission IDs for role
  isActive?: boolean;         // Active status (maps to !bDel)
}

export interface UpdateRoleRequest {
  // Required for update
  id?: number;                // Frontend role ID
  lRoleId?: number;           // BS_RoleMS primary key
  
  // Core Role Information (BS_RoleMS compatible)
  sName?: string;             // Role Name (Max: 100)
  sRemarks?: string;          // Role Description/Remarks (Max: 500)
  lCompId?: number;           // Company ID
  
  // System Fields (Auto-managed)
  lUserId?: number;           // Modified By User ID (System managed)
  lDate?: number;             // Modification Date (System managed)
  wefDate?: number;           // Effective From Date (System managed)
  bDel?: boolean;             // Deletion Flag (System managed)
  
  // Legacy compatibility fields (keep existing frontend working)
  name?: string;              // Alias for sName
  description?: string;       // Alias for sRemarks
  priority?: number;          // For frontend sorting
  permissionIds?: number[];   // Permission IDs for role
  isActive?: boolean;         // Active status (maps to !bDel)
}

// Role Permission Fields (BS_RoleDetail compatible)
export interface RolePermissionRequest {
  lRoleId: number;            // Role ID (FK to BS_RoleMS)
  lModuleId: number;          // Module ID (Which module/section)
  lTaskId: number;            // Task/Page ID (FK to BS_PageMS)
  cTyp: string;               // Type ('R'=Report, 'P'=Page, 'M'=Module)
  lTypId: number;             // Type identifier
  lMode: number;              // Permission mode (0=No Access, 1=Access)
  
  // System Fields
  lUserId?: number;           // Created/Modified by
  dEntry?: Date;              // Entry date (System managed)
  bDel?: boolean;             // Deletion flag (Default: false)
}

// Complete Role Management Interface
export interface RoleFormData {
  // Required Fields
  roleName: string;           // Role Name (mandatory)
  roleDescription?: string;   // Role Description (recommended)
  
  // Optional Fields
  companyId?: number;         // Company context (default: 0)
  isActive?: boolean;         // Active status (default: true)
  
  // Permission Assignment
  permissions?: RolePermission[];
}

export interface RolePermission {
  moduleId: number;           // CRM, Operations, Finance, etc.
  pageName: string;           // Specific page/function
  pageId: number;             // Page ID from BS_PageMS
  hasAccess: boolean;         // Access granted/denied
  permissionType: 'Read' | 'Write' | 'Delete' | 'Approve';
}

// Predefined Role Templates for CRM
export interface CRMRoleTemplate {
  roleName: string;
  description: string;
  permissions: CRMPermission[];
}

export interface CRMPermission {
  module: string;
  page: string;
  access: string;
}

// Role Assignment Workflow
export interface CreateRoleWorkflow {
  basicInfo: {
    name: string;             // "Regional Sales Manager"
    description: string;      // "Manages regional sales operations"
    category: string;         // "Sales", "Management", "Admin"
  };
  
  moduleAccess: {
    crm?: boolean;            // CRM module access
    operations?: boolean;     // Operations module access
    finance?: boolean;        // Finance module access
    reports?: boolean;        // Reports module access
  };
  
  pagePermissions?: {
    [moduleName: string]: {
      [pageName: string]: PermissionLevel;
    };
  };
}

export enum PermissionLevel {
  None = 0,        // No access
  Read = 1,        // View only
  Write = 2,       // Create/Edit
  Delete = 3,      // Delete records
  Approve = 4      // Approval rights
}

// Permission Matrix for comprehensive role management
export interface PermissionMatrix {
  crm?: {
    leadManagement?: PermissionLevel;
    companyManagement?: PermissionLevel;
    enquiryManagement?: PermissionLevel;
    quoteManagement?: PermissionLevel;
    approvalWorkflow?: PermissionLevel;
    dashboard?: PermissionLevel;
    reports?: PermissionLevel;
    masterData?: PermissionLevel;
  };
  
  operations?: {
    jobManagement?: PermissionLevel;
    containerTracking?: PermissionLevel;
    documentManagement?: PermissionLevel;
  };
  
  finance?: {
    invoicing?: PermissionLevel;
    payments?: PermissionLevel;
    reports?: PermissionLevel;
  };
  
  administration?: {
    userManagement?: PermissionLevel;
    roleManagement?: PermissionLevel;
    systemSettings?: PermissionLevel;
  };
}

// Role Validation Rules
export interface RoleValidationRules {
  roleName: {
    required: boolean;
    maxLength: number;
    unique: boolean;          // Role name must be unique
    pattern: RegExp;          // Alphanumeric, spaces, hyphens, underscores
  };
  
  roleDescription?: {
    maxLength: number;
    recommended: boolean;     // Recommended but not required
  };
  
  permissions?: {
    atLeastOne: boolean;      // Must have at least one permission
    validModuleId: boolean;   // Module ID must exist
    validPageId: boolean;     // Page ID must exist in BS_PageMS
  };
  
  hierarchy?: {
    cannotExceedCreator: boolean; // Cannot assign permissions creator doesn't have
    inheritanceRules: boolean;    // Some permissions require others
  };
}

// Filter and Search interfaces
export interface UserFilterOptions {
  search?: string;
  roleId?: number | string;
  status?: 'Active' | 'Inactive' | 'Locked';
  department?: string;
  isEmailVerified?: boolean;
  twoFactorEnabled?: boolean;
  createdDateFrom?: Date;
  createdDateTo?: Date;
  lastLoginFrom?: Date;
  lastLoginTo?: Date;
}

export interface RoleFilterOptions {
  search?: string;
  isActive?: boolean;
  isSystemRole?: boolean;
  moduleName?: string;
  hasUsers?: boolean;
}

// Database connection and query interfaces
export interface DatabaseConfig {
  server: string;
  database: string;
  userId: string;
  password: string;
  port?: number;
  connectionTimeout?: number;
  requestTimeout?: number;
  encrypt?: boolean;
  trustServerCertificate?: boolean;
}

export interface QueryResult<T> {
  data: T[];
  totalCount: number;
  success: boolean;
  message?: string;
  errors?: string[];
}

// Common SQL queries that your backend might need
export const CommonQueries = {
  // User queries
  GET_ALL_USERS: `
    SELECT 
      u.UserId as id,
      u.UserName as userName,
      u.Email as email,
      u.FirstName as firstName,
      u.LastName as lastName,
      u.PhoneNumber as phoneNumber,
      u.Department as department,
      u.Position as position,
      u.EmployeeId as employeeId,
      u.IsActive as isActive,
      u.IsLocked as isLocked,
      u.IsEmailVerified as isEmailVerified,
      u.TwoFactorEnabled as twoFactorEnabled,
      u.CreatedDate as createdDate,
      u.LastLoginDate as lastLoginDate,
      r.RoleId as roleId,
      r.RoleName as roleName
    FROM Users u
    INNER JOIN Roles r ON u.RoleId = r.RoleId
    WHERE (@search IS NULL OR u.UserName LIKE '%' + @search + '%' OR u.Email LIKE '%' + @search + '%')
      AND (@roleId IS NULL OR u.RoleId = @roleId)
      AND (@isActive IS NULL OR u.IsActive = @isActive)
    ORDER BY u.CreatedDate DESC
  `,
  
  GET_USER_BY_ID: `
    SELECT 
      u.*,
      r.RoleName,
      r.RoleDescription
    FROM Users u
    INNER JOIN Roles r ON u.RoleId = r.RoleId
    WHERE u.UserId = @userId
  `,
  
  // Role queries
  GET_ALL_ROLES: `
    SELECT 
      r.RoleId as id,
      r.RoleName as name,
      r.RoleDescription as description,
      r.IsActive as isActive,
      r.IsSystemRole as isSystemRole,
      r.Priority as priority,
      r.CreatedDate as createdDate,
      COUNT(u.UserId) as userCount
    FROM Roles r
    LEFT JOIN Users u ON r.RoleId = u.RoleId AND u.IsActive = 1
    WHERE (@search IS NULL OR r.RoleName LIKE '%' + @search + '%')
      AND (@isActive IS NULL OR r.IsActive = @isActive)
    GROUP BY r.RoleId, r.RoleName, r.RoleDescription, r.IsActive, r.IsSystemRole, r.Priority, r.CreatedDate
    ORDER BY r.Priority, r.RoleName
  `,
  
  GET_ROLE_PERMISSIONS: `
    SELECT 
      p.PermissionId as id,
      p.PermissionName as name,
      p.PermissionDescription as description,
      p.ResourceName as resourceName,
      p.ActionName as actionName,
      p.ModuleName as moduleName,
      p.Category as category,
      CASE WHEN rp.RolePermissionId IS NOT NULL THEN 1 ELSE 0 END as isGranted
    FROM Permissions p
    LEFT JOIN RolePermissions rp ON p.PermissionId = rp.PermissionId AND rp.RoleId = @roleId
    WHERE p.IsActive = 1
    ORDER BY p.ModuleName, p.Category, p.PermissionName
  `
};

// Two-Factor Authentication Interfaces
export interface TwoFactorSetupRequest {
  userId: number;
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface TwoFactorVerificationRequest {
  userId: number;
  token: string;
  isBackupCode?: boolean;
}

export interface TwoFactorVerificationResponse {
  isValid: boolean;
  message?: string;
}

export interface TwoFactorDisableRequest {
  userId: number;
  currentPassword: string;
  verificationToken: string;
}

export interface LoginAttempt {
  id: number;
  userId: number;
  attemptTime: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
  isSuccessful: boolean;
  failureReason?: string;
  twoFactorUsed?: boolean;
}

export interface UserLoginHistory {
  userId: number;
  userName: string;
  attempts: LoginAttempt[];
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  lastSuccessfulLogin?: Date;
  lastFailedLogin?: Date;
}

// User detail view interface for showing comprehensive information
export interface UserDetailView extends FrontendUser {
  // Security information
  accountLocked: boolean;
  lockoutEndDate?: Date;
  securityQuestions?: SecurityQuestion[];
  
  // Login history (recent)
  recentLogins: LoginAttempt[];
  activeSession?: UserSession;
  
  // 2FA details
  twoFactorDetails?: {
    enabled: boolean;
    setupDate?: Date;
    lastUsed?: Date;
    backupCodesRemaining?: number;
  };
  
  // Additional required fields from DB
  passwordResetRequired?: boolean;     // Password reset flag
  passwordResetDays?: number;          // Number of days for password reset
  signatureImageUrl?: string;          // Upload signature image URL
  faLedgerCode?: string;              // FA Ledger Code
  branchLocations?: string;            // Branch location (single branch ID or name)
  viewContract?: boolean;              // View Contract permission
  
  // Audit information
  createdBy: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface SecurityQuestion {
  id: number;
  question: string;
  isAnswered: boolean;
  createdDate: Date;
}

export interface UserSession {
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  ipAddress: string;
  userAgent: string;
  deviceType?: string;
  location?: string;
  isActive: boolean;
}
