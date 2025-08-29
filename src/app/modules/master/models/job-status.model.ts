export interface JobStatus {
  lid: number;                  // Primary Key
  StatusName: string;           // Status Name
  StatusCode: string;           // Status Code
  StatusOrder: number;          // Display Order
  StatusColor: string;          // Color Code for UI
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date (optional)
  ModifiedBy?: number;          // Modified By User ID (optional)
}
