export interface UOM {
  lid: number;                  // Primary Key
  UOMName: string;              // Unit Name (Kilogram, Pieces, etc.)
  UOMCode: string;              // Unit Code (KG, PCS, etc.)
  UOMType: string;              // Type (Weight/Volume/Quantity)
  ConversionFactor?: number;    // Conversion to Base Unit
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
