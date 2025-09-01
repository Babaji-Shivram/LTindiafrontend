import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Port } from '../models/port.model';
import { City } from '../models/city.model';
import { State } from '../models/state.model';
import { Country } from '../models/country.model';
import { CountryService } from './country.service';
import { StateService } from './state.service';
import { CityService } from './city.service';

@Injectable({
  providedIn: 'root'
})
export class PortService {
  constructor(
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService
  ) {}

  private ports: Port[] = [
    {
      lid: 1,
      PortCode: 'INMAA',
      PortName: 'Chennai Port',
      CityId: 1,
      StateId: 1,
      CountryId: 1,
      PortType: 'Sea',
      IsActive: true,
      CreatedDate: new Date('2024-01-10'),
      CreatedBy: 1
    },
    {
      lid: 2,
      PortCode: 'INNSA',
      PortName: 'Mumbai Port',
      CityId: 2,
      StateId: 2,
      CountryId: 1,
      PortType: 'Sea',
      IsActive: true,
      CreatedDate: new Date('2024-01-12'),
      CreatedBy: 1
    },
    {
      lid: 3,
      PortCode: 'INBLR',
      PortName: 'Bangalore Airport',
      CityId: 3,
      StateId: 3,
      CountryId: 1,
      PortType: 'Air',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    }
  ];

  private countries: Country[] = [
    { id: 1, name: 'India', code: 'IN', isActive: true },
    { id: 2, name: 'United States', code: 'US', isActive: true },
    { id: 3, name: 'United Kingdom', code: 'GB', isActive: true }
  ];

  private states: State[] = [
    { id: 1, name: 'Tamil Nadu', countryId: 1, isActive: true },
    { id: 2, name: 'Maharashtra', countryId: 1, isActive: true },
    { id: 3, name: 'Karnataka', countryId: 1, isActive: true },
    { id: 4, name: 'Kerala', countryId: 1, isActive: true }
  ];

  private cities: City[] = [
    { id: 1, name: 'Chennai', stateId: 1, countryId: 1, isActive: true },
    { id: 2, name: 'Mumbai', stateId: 2, countryId: 1, isActive: true },
    { id: 3, name: 'Bangalore', stateId: 3, countryId: 1, isActive: true },
    { id: 4, name: 'Kochi', stateId: 4, countryId: 1, isActive: true }
  ];

  getAllPorts(): Observable<Port[]> {
    return of(this.ports);
  }

  getPortById(id: number): Observable<Port | undefined> {
    return of(this.ports.find(port => port.lid === id));
  }

  createPort(port: Omit<Port, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<Port> {
    const newPort: Port = {
      ...port,
      lid: Math.max(...this.ports.map(p => p.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1
    };
    this.ports.push(newPort);
    return of(newPort);
  }

  updatePort(id: number, port: Partial<Port>): Observable<Port | null> {
    const index = this.ports.findIndex(p => p.lid === id);
    if (index !== -1) {
      this.ports[index] = { 
        ...this.ports[index], 
        ...port, 
        ModifiedDate: new Date(),
        ModifiedBy: 1
      };
      return of(this.ports[index]);
    }
    return of(null);
  }

  deletePort(id: number): Observable<boolean> {
    const index = this.ports.findIndex(p => p.lid === id);
    if (index !== -1) {
      this.ports.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Dropdown data methods
  getCountries(): Observable<Country[]> {
    // Use the CountryService for better integration
    return this.countryService.getCountriesForDropdown();
  }

  getStatesByCountry(countryId: number): Observable<State[]> {
    // Use the new StateService for better integration
    return this.stateService.getStatesByCountry(countryId).pipe(
      map(states => states.map(state => ({
        id: state.lid,
        name: state.StateName,
        countryId: state.CountryId,
        isActive: state.IsActive
      })))
    );
  }

  getCitiesByState(stateId: number): Observable<City[]> {
    // Use the new CityService for better integration
    return this.cityService.getCitiesByState(stateId).pipe(
      map(cities => cities.map(city => ({
        id: city.lid,
        name: city.CityName,
        stateId: city.StateId,
        countryId: city.CountryId,
        isActive: city.IsActive
      })))
    );
  }

  // Helper methods to get names for display
  getCountryName(countryId: number): string {
    return this.countries.find(c => c.id === countryId)?.name || '';
  }

  getStateName(stateId: number): string {
    return this.states.find(s => s.id === stateId)?.name || '';
  }

  getCityName(cityId: number): string {
    return this.cities.find(c => c.id === cityId)?.name || '';
  }
}
