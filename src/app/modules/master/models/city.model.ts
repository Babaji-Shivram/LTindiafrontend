export interface CityMaster {
  lid: number;                  // Primary Key
  CityName: string;             // City Name
  CityCode: string;             // City Code
  StateId: number;              // State ID (FK)
  CountryId: number;            // Country ID (FK)
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Audit field
  CreatedBy: number;            // Audit field
  ModifiedDate?: Date;          // Audit field
  ModifiedBy?: number;          // Audit field
}

// For backward compatibility with existing Port component
export interface City {
  id: number;
  name: string;
  stateId: number;
  countryId: number;
  isActive: boolean;
}
