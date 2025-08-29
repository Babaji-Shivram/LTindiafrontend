export interface User {
  id?: number;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department_id?: number;
  department_name?: string;
  branch_id?: number;
  branch_name?: string;
  division?: string;
  user_type: UserType;
  is_hod: boolean;
  role_id?: number;
  role_name?: string;
  status: 'Active' | 'Inactive';
  password?: string;
  confirm_password?: string;
  created_by?: number;
  updated_by?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
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
  name: string;
  code: string;
  description?: string;
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
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
}

export enum UserType {
  INTERNAL = 'Internal',
  OTHER = 'Other'
}

export interface UserFormData {
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department_id?: number;
  branch_id?: number;
  division?: string;
  user_type: UserType;
  is_hod: boolean;
  role_id?: number;
  password?: string;
  confirm_password?: string;
  status: 'Active' | 'Inactive';
}

export interface UserListFilters {
  search?: string;
  department_id?: number;
  branch_id?: number;
  user_type?: UserType;
  status?: 'Active' | 'Inactive';
  is_hod?: boolean;
}
