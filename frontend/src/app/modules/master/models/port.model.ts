export interface Port {
  lid: number;                   // Primary Key
  PortName: string;             // Port Name (Required)
  PortCode: string;             // Port Code (Required)
  CityId: number;               // City ID (FK)
  StateId: number;              // State ID (FK)
  CountryId: number;            // Country ID (FK)
  PortType: string;             // Sea/Air/Land
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date
  ModifiedBy?: number;          // Modified By User ID
}
