export interface IncoTerms {
  lid: number;                  // Primary Key
  IncoTermCode: string;         // Inco Term Code (FOB, CIF, etc.)
  IncoTermName: string;         // Inco Term Name
  Description: string;          // Description
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
