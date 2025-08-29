export interface JobType {
  lid: number;                  // Primary Key
  JobTypeName: string;          // Job Type Name
  JobTypeCode: string;          // Job Type Code
  ServiceType: string;          // Service Type (Import/Export)
  Description: string;          // Description
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date (optional)
  ModifiedBy?: number;          // Modified By User ID (optional)
}
