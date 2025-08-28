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

export interface DatabaseRole {
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
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  employeeId?: string;
  roleId: number;
  password: string;
  isActive: boolean;
  twoFactorEnabled: boolean;
}

export interface UpdateUserRequest {
  id: number;
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  employeeId?: string;
  roleId?: number;
  isActive?: boolean;
  twoFactorEnabled?: boolean;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  priority: number;
  permissionIds: number[];
  isActive: boolean;
}

export interface UpdateRoleRequest {
  id: number;
  name?: string;
  description?: string;
  priority?: number;
  permissionIds?: number[];
  isActive?: boolean;
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
