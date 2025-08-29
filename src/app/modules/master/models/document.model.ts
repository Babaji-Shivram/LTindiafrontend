export interface Document {
  lid: number;                  // Primary Key
  DocumentName: string;         // Document Name
  DocumentCode: string;         // Document Code
  DocumentType: string;         // Type (Import/Export/Both)
  IsMandatory: boolean;         // Is Mandatory
  ValidityDays?: number;        // Validity in Days
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
