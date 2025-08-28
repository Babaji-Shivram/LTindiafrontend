export interface CountryMaster {
  lid: number;                  // Primary Key
  CountryName: string;          // Country Name
  CountryCode: string;          // ISO Country Code (IN, US, etc.)
  Currency: string;             // Default Currency
  IsActive: boolean;            // Active Status
  CreatedDate?: Date;           // Audit field
  CreatedBy?: number;           // Audit field
  ModifiedDate?: Date;          // Audit field
  ModifiedBy?: number;          // Audit field
}

// Keep the old interface for backward compatibility with Port dropdowns
export interface Country {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}
