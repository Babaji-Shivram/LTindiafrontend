export interface DesignationMaster {
  lid: number;
  DesignationName: string;
  DesignationCode: string;
  DepartmentId: number;
  DepartmentName?: string; // For display purposes
  Description?: string;
  Level: number; // Hierarchy level (1=Junior, 2=Senior, 3=Manager, 4=Director, 5=Executive)
  IsActive: boolean;
  bDel: boolean;
  nAddedBy: number;
  nUpdatedBy: number;
  dAddedDate: Date;
  dUpdatedDate: Date;
}

export interface DesignationFilter {
  searchTerm?: string;
  departmentId?: number;
  level?: number;
  isActive?: boolean;
}

export interface DesignationDropdown {
  value: number;
  label: string;
  departmentName?: string;
  level?: number;
}
