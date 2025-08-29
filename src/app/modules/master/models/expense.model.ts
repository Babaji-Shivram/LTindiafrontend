export interface Expense {
  lid: number;                  // Primary Key
  ExpenseName: string;          // Expense Name
  ExpenseCode: string;          // Expense Code
  ExpenseType: string;          // Type (Fixed/Variable)
  AccountCode: string;          // Account Code
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
