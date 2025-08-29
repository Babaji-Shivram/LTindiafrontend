export interface DivisionMaster {
  lid: number;                  // Primary Key (Division ID)
  DivisionName: string;         // Division Name (Required)
  DivisionCode: string;         // Division Code
  Description: string;          // Division Description
  DivisionHead: string;         // Division Head
  IsActive: boolean;            // Active Status
  bDel: boolean;                // Deletion Flag
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date
  ModifiedBy?: number;          // Modified By User ID
}
