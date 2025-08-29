export interface PackageType {
  lid: number;                  // Primary Key
  PackageTypeName: string;      // Package Type Name
  PackageTypeCode: string;      // Package Type Code
  Description: string;          // Description
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
