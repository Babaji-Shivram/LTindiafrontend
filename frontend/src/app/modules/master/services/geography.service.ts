import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, State, City } from '../models/geography.model';

@Injectable({
  providedIn: 'root'
})
export class GeographyService {
  private countries: Country[] = [
    {
      id: 1,
      code: 'IN',
      name: 'India',
      currency: 'INR',
      timeZone: 'Asia/Kolkata',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 2,
      code: 'US',
      name: 'United States',
      currency: 'USD',
      timeZone: 'America/New_York',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  private states: State[] = [
    {
      id: 1,
      code: 'MH',
      name: 'Maharashtra',
      countryId: 1,
      countryName: 'India',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 2,
      code: 'TN',
      name: 'Tamil Nadu',
      countryId: 1,
      countryName: 'India',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  private cities: City[] = [
    {
      id: 1,
      name: 'Mumbai',
      stateId: 1,
      stateName: 'Maharashtra',
      countryId: 1,
      countryName: 'India',
      pincode: '400001',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Chennai',
      stateId: 2,
      stateName: 'Tamil Nadu',
      countryId: 1,
      countryName: 'India',
      pincode: '600001',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  // Country methods
  getAllCountries(): Observable<Country[]> {
    return of(this.countries);
  }

  getCountryById(id: number): Observable<Country | undefined> {
    return of(this.countries.find(country => country.id === id));
  }

  // State methods
  getAllStates(): Observable<State[]> {
    return of(this.states);
  }

  getStatesByCountry(countryId: number): Observable<State[]> {
    return of(this.states.filter(state => state.countryId === countryId));
  }

  // City methods
  getAllCities(): Observable<City[]> {
    return of(this.cities);
  }

  getCitiesByState(stateId: number): Observable<City[]> {
    return of(this.cities.filter(city => city.stateId === stateId));
  }
}
