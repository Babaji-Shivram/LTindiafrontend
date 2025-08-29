export interface CFS {
  lid: number;                  // Primary Key
  CFSName: string;              // CFS Name
  CFSCode: string;              // CFS Code
  CFSAddress: string;           // Address
  CityId: number;               // City ID (FK)
  ContactPerson: string;        // Contact Person
  Phone: string;                // Phone Number
  Email: string;                // Email
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date (optional)
  ModifiedBy?: number;          // Modified By User ID (optional)
}
