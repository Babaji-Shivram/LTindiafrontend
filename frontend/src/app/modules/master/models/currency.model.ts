export interface CurrencyMaster {
  lid: number;                  // Primary Key
  CurrencyName: string;         // Currency Name (US Dollar)
  CurrencyCode: string;         // Currency Code (USD)
  CurrencySymbol: string;       // Currency Symbol ($)
  ExchangeRate?: number;        // Exchange Rate to Base Currency
  IsBaseCurrency: boolean;      // Is Base Currency (INR)
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
  ModifiedDate?: Date;          // Modified Date
  ModifiedBy?: number;          // Modified By User ID
}

// For backward compatibility with existing components
export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  baseCurrency: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}
