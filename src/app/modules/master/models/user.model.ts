// User Master Interface - Exact specification from UserBO.cs
export interface User {
  lId: number;           // Primary Key (User ID)
  sName: string;         // User Name
  lType: number;         // User Type (1=Internal, 3=Other)
  lRoleId: number;       // Role ID (Foreign Key to BS_RoleMS)
  bDel: boolean;         // Deletion Flag
  // Additional fields from UserBO.cs:
  deptId: number;        // Department ID
  designId: number;      // Designation ID
  divId: string;         // Division ID
  branchId: number;      // Branch ID
  hod: string;           // Head of Department flag
  empCode: string;       // Employee Code
  email: string;         // Email Address
  contactNo: string;     // Contact Number
}

// User Details Interface - Extended User Information
export interface UserDetail {
  userId: number;        // Foreign Key to BS_UserMS.lId
  empName: string;       // Employee Name
  email: string;         // Email Address
  deptId: number;        // Department ID
  divisionId: number;    // Division ID
  empCode: string;       // Employee Code
  mobile: string;        // Mobile Number
  address: string;       // Address
  userRole: number;      // User Role
  lUser: number;         // Last Updated By User
}

// Combined User with Details for UI
export interface UserWithDetails extends User {
  userDetail?: UserDetail;
  departmentName?: string;
  roleName?: string;
  branchName?: string;
  divisionName?: string;
  designationName?: string;
}

// User Type Enum
export enum UserType {
  INTERNAL = 1,
  OTHER = 3
}

// User dropdown interface
export interface UserDropdown {
  lId: number;
  sName: string;
  email: string;
  empCode: string;
  bDel: boolean;
}
