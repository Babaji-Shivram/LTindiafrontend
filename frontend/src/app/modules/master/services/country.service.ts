import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountryMaster } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: CountryMaster[] = [
    {
      lid: 1,
      CountryName: 'India',
      CountryCode: 'IN',
      Currency: 'INR',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 2,
      CountryName: 'United States',
      CountryCode: 'US',
      Currency: 'USD',
      IsActive: true,
      CreatedDate: new Date('2024-01-02'),
      CreatedBy: 1
    },
    {
      lid: 3,
      CountryName: 'United Kingdom',
      CountryCode: 'GB',
      Currency: 'GBP',
      IsActive: true,
      CreatedDate: new Date('2024-01-03'),
      CreatedBy: 1
    },
    {
      lid: 4,
      CountryName: 'Germany',
      CountryCode: 'DE',
      Currency: 'EUR',
      IsActive: true,
      CreatedDate: new Date('2024-01-04'),
      CreatedBy: 1
    },
    {
      lid: 5,
      CountryName: 'Japan',
      CountryCode: 'JP',
      Currency: 'JPY',
      IsActive: true,
      CreatedDate: new Date('2024-01-05'),
      CreatedBy: 1
    },
    {
      lid: 6,
      CountryName: 'Australia',
      CountryCode: 'AU',
      Currency: 'AUD',
      IsActive: false,
      CreatedDate: new Date('2024-01-06'),
      CreatedBy: 1
    }
  ];

  constructor() {}

  getCountries(): Observable<CountryMaster[]> {
    return of([...this.countries]);
  }

  getCountryById(id: number): Observable<CountryMaster | undefined> {
    const country = this.countries.find(c => c.lid === id);
    return of(country);
  }

  createCountry(country: Partial<CountryMaster>): Observable<CountryMaster> {
    const newCountry: CountryMaster = {
      lid: Math.max(...this.countries.map(c => c.lid), 0) + 1,
      CountryName: country.CountryName || '',
      CountryCode: country.CountryCode || '',
      Currency: country.Currency || '',
      IsActive: country.IsActive ?? true,
      CreatedDate: new Date(),
      CreatedBy: 1
    };
    
    this.countries.push(newCountry);
    return of(newCountry);
  }

  updateCountry(id: number, country: Partial<CountryMaster>): Observable<CountryMaster | null> {
    const index = this.countries.findIndex(c => c.lid === id);
    if (index !== -1) {
      this.countries[index] = {
        ...this.countries[index],
        ...country,
        ModifiedDate: new Date(),
        ModifiedBy: 1
      };
      return of(this.countries[index]);
    }
    return of(null);
  }

  deleteCountry(id: number): Observable<boolean> {
    const index = this.countries.findIndex(c => c.lid === id);
    if (index !== -1) {
      this.countries.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Get countries for dropdown (backward compatibility)
  getCountriesForDropdown(): Observable<any[]> {
    return of(this.countries.map(country => ({
      id: country.lid,
      name: country.CountryName,
      code: country.CountryCode,
      isActive: country.IsActive
    })));
  }
}
