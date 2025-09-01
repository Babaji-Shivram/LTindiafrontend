export interface CustomerSector {
  lid: number;                  // Primary Key
  SectorName: string;           // Sector Name
  SectorCode: string;           // Sector Code
  Description: string;          // Description
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
