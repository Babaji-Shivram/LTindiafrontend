import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityMaster } from '../models/city.model';
import { CountryService } from './country.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cities: CityMaster[] = [
    // India Cities - Tamil Nadu
    {
      lid: 1,
      CityName: 'Chennai',
      CityCode: 'CHN',
      StateId: 1, // Tamil Nadu
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 2,
      CityName: 'Coimbatore',
      CityCode: 'CBE',
      StateId: 1, // Tamil Nadu
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 3,
      CityName: 'Madurai',
      CityCode: 'MDU',
      StateId: 1, // Tamil Nadu
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },

    // India Cities - Maharashtra
    {
      lid: 4,
      CityName: 'Mumbai',
      CityCode: 'BOM',
      StateId: 2, // Maharashtra
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-02'),
      CreatedBy: 1
    },
    {
      lid: 5,
      CityName: 'Pune',
      CityCode: 'PNQ',
      StateId: 2, // Maharashtra
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-02'),
      CreatedBy: 1
    },

    // India Cities - Karnataka
    {
      lid: 6,
      CityName: 'Bangalore',
      CityCode: 'BLR',
      StateId: 3, // Karnataka
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-03'),
      CreatedBy: 1
    },
    {
      lid: 7,
      CityName: 'Mysore',
      CityCode: 'MYS',
      StateId: 3, // Karnataka
      CountryId: 1, // India
      IsActive: false,
      CreatedDate: new Date('2024-01-03'),
      CreatedBy: 1
    },

    // US Cities - California
    {
      lid: 8,
      CityName: 'Los Angeles',
      CityCode: 'LAX',
      StateId: 6, // California
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-04'),
      CreatedBy: 1
    },
    {
      lid: 9,
      CityName: 'San Francisco',
      CityCode: 'SFO',
      StateId: 6, // California
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-04'),
      CreatedBy: 1
    },

    // US Cities - New York
    {
      lid: 10,
      CityName: 'New York City',
      CityCode: 'NYC',
      StateId: 7, // New York
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-05'),
      CreatedBy: 1
    },
    {
      lid: 11,
      CityName: 'Buffalo',
      CityCode: 'BUF',
      StateId: 7, // New York
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-05'),
      CreatedBy: 1
    },

    // UK Cities - England
    {
      lid: 12,
      CityName: 'London',
      CityCode: 'LHR',
      StateId: 9, // England
      CountryId: 3, // United Kingdom
      IsActive: true,
      CreatedDate: new Date('2024-01-06'),
      CreatedBy: 1
    },
    {
      lid: 13,
      CityName: 'Manchester',
      CityCode: 'MAN',
      StateId: 9, // England
      CountryId: 3, // United Kingdom
      IsActive: true,
      CreatedDate: new Date('2024-01-06'),
      CreatedBy: 1
    },

    // German Cities - Bavaria
    {
      lid: 14,
      CityName: 'Munich',
      CityCode: 'MUC',
      StateId: 11, // Bavaria
      CountryId: 4, // Germany
      IsActive: true,
      CreatedDate: new Date('2024-01-07'),
      CreatedBy: 1
    },
    {
      lid: 15,
      CityName: 'Nuremberg',
      CityCode: 'NUE',
      StateId: 11, // Bavaria
      CountryId: 4, // Germany
      IsActive: true,
      CreatedDate: new Date('2024-01-07'),
      CreatedBy: 1
    }
  ];

  constructor(
    private countryService: CountryService,
    private stateService: StateService
  ) {}

  getCities(): Observable<CityMaster[]> {
    return of([...this.cities]);
  }

  getCityById(id: number): Observable<CityMaster | undefined> {
    const city = this.cities.find(c => c.lid === id);
    return of(city);
  }

  getCitiesByState(stateId: number): Observable<CityMaster[]> {
    return of(this.cities.filter(c => c.StateId === stateId));
  }

  getCitiesByCountry(countryId: number): Observable<CityMaster[]> {
    return of(this.cities.filter(c => c.CountryId === countryId));
  }

  createCity(city: Partial<CityMaster>): Observable<CityMaster> {
    const newCity: CityMaster = {
      lid: Math.max(...this.cities.map(c => c.lid), 0) + 1,
      CityName: city.CityName || '',
      CityCode: city.CityCode || '',
      StateId: city.StateId || 0,
      CountryId: city.CountryId || 0,
      IsActive: city.IsActive ?? true,
      CreatedDate: new Date(),
      CreatedBy: 1
    };
    
    this.cities.push(newCity);
    return of(newCity);
  }

  updateCity(id: number, city: Partial<CityMaster>): Observable<CityMaster | null> {
    const index = this.cities.findIndex(c => c.lid === id);
    if (index !== -1) {
      this.cities[index] = {
        ...this.cities[index],
        ...city,
        ModifiedDate: new Date(),
        ModifiedBy: 1
      };
      return of(this.cities[index]);
    }
    return of(null);
  }

  deleteCity(id: number): Observable<boolean> {
    const index = this.cities.findIndex(c => c.lid === id);
    if (index !== -1) {
      this.cities.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Get cities for dropdown (backward compatibility)
  getCitiesForDropdown(stateId?: number): Observable<any[]> {
    let filteredCities = this.cities;
    if (stateId) {
      filteredCities = this.cities.filter(c => c.StateId === stateId);
    }
    
    return of(filteredCities.map(city => ({
      id: city.lid,
      name: city.CityName,
      stateId: city.StateId,
      countryId: city.CountryId,
      isActive: city.IsActive
    })));
  }

  // Helper methods to get names for display
  getCountryName(countryId: number): Observable<string> {
    return new Observable(observer => {
      this.countryService.getCountryById(countryId).subscribe(country => {
        observer.next(country?.CountryName || 'Unknown');
        observer.complete();
      });
    });
  }

  getStateName(stateId: number): Observable<string> {
    return new Observable(observer => {
      this.stateService.getStateById(stateId).subscribe(state => {
        observer.next(state?.StateName || 'Unknown');
        observer.complete();
      });
    });
  }
}
