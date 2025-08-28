export interface Branch {
  lid: number;                    // Primary Key
  BranchName: string;            // Branch Name (Required)
  BranchCode: string;            // Branch Code
  BranchAddress: string;         // Address
  BranchCity: string;            // City
  BranchState: string;           // State
  BranchCountry: string;         // Country
  BranchPinCode: string;         // Pin Code
  BranchPhone: string;           // Phone Number
  BranchEmail: string;           // Email
  BranchManager: string;         // Manager Name
  IsActive: boolean;             // Active Status
  CreatedDate: Date;             // Created Date
  CreatedBy: number;             // Created By User ID
  ModifiedDate?: Date;           // Modified Date
  ModifiedBy?: number;           // Modified By User ID
}
