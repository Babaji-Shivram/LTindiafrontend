import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Currency, CurrencyMaster } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies: CurrencyMaster[] = [
    // Base Currency - INR is typically the base for Indian ERP
    {
      lid: 1,
      CurrencyName: 'Indian Rupee',
      CurrencyCode: 'INR',
      CurrencySymbol: '₹',
      ExchangeRate: 1.00,
      IsBaseCurrency: true,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    
    // Major International Currencies
    {
      lid: 2,
      CurrencyName: 'US Dollar',
      CurrencyCode: 'USD',
      CurrencySymbol: '$',
      ExchangeRate: 0.012,  // 1 INR = 0.012 USD
      IsBaseCurrency: false,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 3,
      CurrencyName: 'Euro',
      CurrencyCode: 'EUR',
      CurrencySymbol: '€',
      ExchangeRate: 0.011,  // 1 INR = 0.011 EUR
      IsBaseCurrency: false,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      CurrencyName: 'British Pound',
      CurrencyCode: 'GBP',
      CurrencySymbol: '£',
      ExchangeRate: 0.0095,  // 1 INR = 0.0095 GBP
      IsBaseCurrency: false,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 5,
      CurrencyName: 'Japanese Yen',
      CurrencyCode: 'JPY',
      CurrencySymbol: '¥',
      ExchangeRate: 1.75,   // 1 INR = 1.75 JPY
      IsBaseCurrency: false,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 6,
      CurrencyName: 'Chinese Yuan',
      CurrencyCode: 'CNY',
      CurrencySymbol: '¥',
      ExchangeRate: 0.086,  // 1 INR = 0.086 CNY
      IsBaseCurrency: false,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 7,
      CurrencyName: 'Australian Dollar',
      CurrencyCode: 'AUD',
      CurrencySymbol: 'A$',
      ExchangeRate: 0.018,  // 1 INR = 0.018 AUD
      IsBaseCurrency: false,
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 8,
      CurrencyName: 'Canadian Dollar',
      CurrencyCode: 'CAD',
      CurrencySymbol: 'C$',
      ExchangeRate: 0.016,  // 1 INR = 0.016 CAD
      IsBaseCurrency: false,
      IsActive: false,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    }
  ];

  constructor() {}

  // New CurrencyMaster methods
  getCurrencies(): Observable<CurrencyMaster[]> {
    return of([...this.currencies]);
  }

  getCurrencyById(id: number): Observable<CurrencyMaster | undefined> {
    const currency = this.currencies.find(c => c.lid === id);
    return of(currency);
  }

  getActiveCurrencies(): Observable<CurrencyMaster[]> {
    return of(this.currencies.filter(c => c.IsActive));
  }

  getBaseCurrency(): Observable<CurrencyMaster | undefined> {
    const baseCurrency = this.currencies.find(c => c.IsBaseCurrency);
    return of(baseCurrency);
  }

  createCurrency(currency: Partial<CurrencyMaster>): Observable<CurrencyMaster> {
    const newCurrency: CurrencyMaster = {
      lid: Math.max(...this.currencies.map(c => c.lid), 0) + 1,
      CurrencyName: currency.CurrencyName || '',
      CurrencyCode: currency.CurrencyCode || '',
      CurrencySymbol: currency.CurrencySymbol || '',
      ExchangeRate: currency.ExchangeRate,
      IsBaseCurrency: currency.IsBaseCurrency ?? false,
      IsActive: currency.IsActive ?? true,
      CreatedDate: new Date(),
      CreatedBy: 1
    };
    
    // If this is being set as base currency, unset all others
    if (newCurrency.IsBaseCurrency) {
      this.currencies.forEach(c => c.IsBaseCurrency = false);
    }
    
    this.currencies.push(newCurrency);
    return of(newCurrency);
  }

  updateCurrency(id: number, currency: Partial<CurrencyMaster>): Observable<CurrencyMaster | null> {
    const index = this.currencies.findIndex(c => c.lid === id);
    if (index !== -1) {
      // If this is being set as base currency, unset all others
      if (currency.IsBaseCurrency) {
        this.currencies.forEach(c => c.IsBaseCurrency = false);
      }
      
      this.currencies[index] = {
        ...this.currencies[index],
        ...currency,
        ModifiedDate: new Date(),
        ModifiedBy: 1
      };
      return of(this.currencies[index]);
    }
    return of(null);
  }

  deleteCurrency(id: number): Observable<boolean> {
    const currency = this.currencies.find(c => c.lid === id);
    
    // Prevent deletion of base currency
    if (currency?.IsBaseCurrency) {
      return of(false);
    }
    
    const index = this.currencies.findIndex(c => c.lid === id);
    if (index !== -1) {
      this.currencies.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Exchange rate utilities
  convertToBaseCurrency(amount: number, fromCurrencyId: number): Observable<number> {
    const currency = this.currencies.find(c => c.lid === fromCurrencyId);
    if (currency && currency.ExchangeRate) {
      return of(amount / currency.ExchangeRate);
    }
    return of(amount);
  }

  convertFromBaseCurrency(amount: number, toCurrencyId: number): Observable<number> {
    const currency = this.currencies.find(c => c.lid === toCurrencyId);
    if (currency && currency.ExchangeRate) {
      return of(amount * currency.ExchangeRate);
    }
    return of(amount);
  }

  // Format currency display
  formatCurrency(amount: number, currencyId: number): string {
    const currency = this.currencies.find(c => c.lid === currencyId);
    if (currency) {
      return `${currency.CurrencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Backward compatibility methods for old Currency interface
  getAllCurrencies(): Observable<Currency[]> {
    return of(this.currencies.map(c => this.mapToOldCurrency(c)));
  }

  private mapToOldCurrency(currency: CurrencyMaster): Currency {
    return {
      id: currency.lid,
      code: currency.CurrencyCode,
      name: currency.CurrencyName,
      symbol: currency.CurrencySymbol,
      exchangeRate: currency.ExchangeRate || 1,
      baseCurrency: currency.IsBaseCurrency ? currency.CurrencyCode : 'INR',
      status: currency.IsActive ? 'Active' : 'Inactive',
      createdAt: currency.CreatedDate.toISOString(),
      updatedAt: currency.ModifiedDate?.toISOString() || currency.CreatedDate.toISOString()
    };
  }
}
