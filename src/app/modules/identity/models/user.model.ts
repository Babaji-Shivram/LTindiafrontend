export interface User {
  id?: number;
  user_id?: number;            // Alias for id
  employee_code: string;
  employee_id?: string;        // Alias for employee_code
  first_name: string;
  last_name: string;
  full_name?: string;          // Computed property
  display_name?: string;       // Alias for full_name
  email: string;
  phone?: string;
  department_id?: number;
  department_name?: string;
  branch_id?: number;
  branch_name?: string;
  division_id?: number;        // NEW: For backend compatibility
  division_name?: string;      // NEW: Division display name
  user_type: UserType;
  is_hod: boolean;
  role_id?: number;
  role_name?: string;
  status: 'Active' | 'Inactive';
  password?: string;
  confirm_password?: string;
  profile_picture?: string;    // NEW: Profile picture URL
  last_login?: Date;           // NEW: Last login timestamp
  created_by?: number;
  updated_by?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  
  // NEW: Backend Integration Fields
  company_id?: number;         // Company association
  emp_name?: string;           // For glEmpName session variable
  user_permissions?: UserPermissionDetail[];  // Full permission set
}

// NEW: Backend-Compatible Permission Structure
export interface UserPermissionDetail {
  module_id: number;
  module_name: string;
  page_id: number;
  page_name: string;
  permission_type: 'P' | 'R' | 'M';  // Page, Read, Modify
  has_access: boolean;
  parent_page_id?: number;
}

export interface UserWithDetails extends User {
  full_name: string;
  department: {
    id: number;
    name: string;
    code: string;
  };
  branch: {
    id: number;
    name: string;
    code: string;
  };
  role: {
    id: number;
    name: string;
    permissions: string[];
  };
}

export interface Department {
  id: number;
  department_id: number;       // Alias for id
  name: string;
  department_name: string;     // Alias for name
  code: string;
  description?: string;
  status: 'Active' | 'Inactive';
  company_id?: number;         // NEW: Multi-company support
}

export interface Division {
  id: number;
  division_id: number;         // Alias for id
  name: string;
  division_name: string;       // Alias for name
  code: string;
  description?: string;
  department_id: number;       // Parent department
  status: 'Active' | 'Inactive';
}

export interface Branch {
  id: number;
  name: string;
  code: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  status: 'Active' | 'Inactive';
  company_id?: number;         // NEW: Multi-company support
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
}

export enum UserType {
  INTERNAL = 1,     // Internal Employee
  CUSTOMER = 2,     // External Customer
  AGENT = 3,        // External Agent/Partner
  ADMIN = -1        // System Administrator
}

export const UserTypeLabels = {
  [UserType.INTERNAL]: 'Internal Employee',
  [UserType.CUSTOMER]: 'Customer',
  [UserType.AGENT]: 'Agent/Partner',
  [UserType.ADMIN]: 'System Administrator'
};

export const UserTypeColors = {
  [UserType.INTERNAL]: 'bg-blue-100 text-blue-800',
  [UserType.CUSTOMER]: 'bg-green-100 text-green-800',
  [UserType.AGENT]: 'bg-purple-100 text-purple-800',
  [UserType.ADMIN]: 'bg-red-100 text-red-800'
};

export interface UserFormData {
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department_id?: number;
  branch_id?: number;
  division_id?: string;        // UPDATED: Now uses division_id
  user_type: UserType;
  is_hod: boolean;
  role_id?: number;
  password?: string;
  confirm_password?: string;
  status: 'Active' | 'Inactive';
  company_id?: number;         // NEW: Company selection
}

export interface UserListFilters {
  search?: string;
  department_id?: number;
  branch_id?: number;
  user_type?: UserType;
  status?: 'Active' | 'Inactive';
  is_hod?: boolean;
  company_id?: number;         // NEW: Company filter
  division_id?: number;        // NEW: Division filter
}

// NEW: Session Management for Backend Compatibility
export interface UserSession {
  user_id: number;
  glEmpName: string;           // Global Employee Name
  glCompanyId: number;         // Global Company ID
  glModuleId?: number;         // Current Module ID (optional)
  session_token: string;
  login_time: Date;
  last_activity: Date;
  permissions: UserPermissionDetail[];
}

// NEW: Company Management
export interface Company {
  id: number;
  name: string;
  code: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  status: 'Active' | 'Inactive';
  logo_url?: string;
}

// Type aliases for consistency with backend
export type UserStatus = 'Active' | 'Inactive';

// Utility Functions for User Type Display
export interface UserTypeDisplayInfo {
  label: string;
  icon: string;
  badgeClass: string;
  description: string;
  isExternal: boolean;
}

export function getUserTypeDisplayInfo(userType: UserType): UserTypeDisplayInfo {
  switch (userType) {
    case UserType.ADMIN:
      return {
        label: 'Administrator',
        icon: '🛡️',
        badgeClass: 'bg-red-100 text-red-800',
        description: 'System Administrator with full access',
        isExternal: false
      };
    case UserType.INTERNAL:
      return {
        label: 'Internal User',
        icon: '👤',
        badgeClass: 'bg-blue-100 text-blue-800',
        description: 'Internal company employee',
        isExternal: false
      };
    case UserType.CUSTOMER:
      return {
        label: 'Customer',
        icon: '🏢',
        badgeClass: 'bg-green-100 text-green-800',
        description: 'External customer user',
        isExternal: true
      };
    case UserType.AGENT:
      return {
        label: 'Agent',
        icon: '🤝',
        badgeClass: 'bg-purple-100 text-purple-800',
        description: 'External agent or partner',
        isExternal: true
      };
    default:
      return {
        label: 'Unknown',
        icon: '❓',
        badgeClass: 'bg-gray-100 text-gray-800',
        description: 'Unknown user type',
        isExternal: false
      };
  }
}

// Helper function to get full name
export function getUserFullName(user: User): string {
  return `${user.first_name} ${user.last_name}`.trim();
}

// Helper function to get display name (alias for full name)
export function getUserDisplayName(user: User): string {
  return getUserFullName(user);
}

// Login Request Interface
export interface LoginRequest {
  username: string;           // This will map to employee_code on backend
  password: string;
  remember_me?: boolean;
}

// Login Response Interface
export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
