export interface StateMaster {
  lid: number;                  // Primary Key
  StateName: string;            // State Name
  StateCode: string;            // State Code
  CountryId: number;            // Country ID (FK)
  IsActive: boolean;            // Active Status
  CreatedDate?: Date;           // Audit field
  CreatedBy?: number;           // Audit field
  ModifiedDate?: Date;          // Audit field
  ModifiedBy?: number;          // Audit field
}

// Keep the old interface for backward compatibility with Port dropdowns
export interface State {
  id: number;
  name: string;
  countryId: number;
  isActive: boolean;
}
