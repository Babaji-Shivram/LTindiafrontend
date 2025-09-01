// Module Master Interface - Backend Compatible
export interface ModuleMaster {
  module_id: number;
  module_name: string;
  module_description?: string;
  display_order: number;
  is_active: boolean;
  route_path?: string;
  created_date?: Date;
  updated_date?: Date;
}

// Page Master Interface - Backend Compatible
export interface PageMaster {
  page_id: number;
  module_id: number;
  page_name: string;
  page_description?: string;
  display_order: number;
  is_active: boolean;
  route_path?: string;
  created_date?: Date;
  updated_date?: Date;
}

// Permission Grid for Role Management
export interface PermissionGrid {
  module_id: number;
  module_name: string;
  page_id: number;
  page_name: string;
  has_print: boolean;
  has_read: boolean;
  has_modify: boolean;
}

// Role Detail Master (BS_RoleDetail equivalent)
export interface RoleDetailMaster {
  role_detail_id?: number;
  role_id: number;
  page_id: number;
  permission_type: 'P' | 'R' | 'M'; // Print, Read, Modify
  has_access: boolean;
  created_date?: Date;
  updated_date?: Date;
}

// Default Modules for the system
export const DEFAULT_MODULES: ModuleMaster[] = [
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

// Default Pages for the system
export const DEFAULT_PAGES: PageMaster[] = [
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