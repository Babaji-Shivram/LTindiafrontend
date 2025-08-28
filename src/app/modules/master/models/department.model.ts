// Department Master interface for exact business specifications
export interface DepartmentMaster {
  lid: number;                  // Primary Key
  DepartmentName: string;       // Department Name
  DepartmentCode: string;       // Department Code
  DepartmentHead: string;       // Department Head
  Description: string;          // Description
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date (optional)
  ModifiedBy?: number;          // Modified By User ID (optional)
}

// Backward compatibility interface (if needed)
export interface Department {
  id: number;
  name: string;
  code: string;
  head: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}
