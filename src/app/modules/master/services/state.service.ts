import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StateMaster } from '../models/state.model';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private states: StateMaster[] = [
    // India States
    {
      lid: 1,
      StateName: 'Tamil Nadu',
      StateCode: 'TN',
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 2,
      StateName: 'Maharashtra',
      StateCode: 'MH',
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 3,
      StateName: 'Karnataka',
      StateCode: 'KA',
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      StateName: 'Gujarat',
      StateCode: 'GJ',
      CountryId: 1, // India
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 5,
      StateName: 'Kerala',
      StateCode: 'KL',
      CountryId: 1, // India
      IsActive: false,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    
    // US States
    {
      lid: 6,
      StateName: 'California',
      StateCode: 'CA',
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-02'),
      CreatedBy: 1
    },
    {
      lid: 7,
      StateName: 'New York',
      StateCode: 'NY',
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-02'),
      CreatedBy: 1
    },
    {
      lid: 8,
      StateName: 'Texas',
      StateCode: 'TX',
      CountryId: 2, // United States
      IsActive: true,
      CreatedDate: new Date('2024-01-02'),
      CreatedBy: 1
    },

    // UK States/Regions
    {
      lid: 9,
      StateName: 'England',
      StateCode: 'ENG',
      CountryId: 3, // United Kingdom
      IsActive: true,
      CreatedDate: new Date('2024-01-03'),
      CreatedBy: 1
    },
    {
      lid: 10,
      StateName: 'Scotland',
      StateCode: 'SCT',
      CountryId: 3, // United Kingdom
      IsActive: true,
      CreatedDate: new Date('2024-01-03'),
      CreatedBy: 1
    },

    // German States
    {
      lid: 11,
      StateName: 'Bavaria',
      StateCode: 'BY',
      CountryId: 4, // Germany
      IsActive: true,
      CreatedDate: new Date('2024-01-04'),
      CreatedBy: 1
    },
    {
      lid: 12,
      StateName: 'Berlin',
      StateCode: 'BE',
      CountryId: 4, // Germany
      IsActive: true,
      CreatedDate: new Date('2024-01-04'),
      CreatedBy: 1
    }
  ];

  constructor(private countryService: CountryService) {}

  getStates(): Observable<StateMaster[]> {
    return of([...this.states]);
  }

  getStateById(id: number): Observable<StateMaster | undefined> {
    const state = this.states.find(s => s.lid === id);
    return of(state);
  }

  getStatesByCountry(countryId: number): Observable<StateMaster[]> {
    return of(this.states.filter(s => s.CountryId === countryId));
  }

  createState(state: Partial<StateMaster>): Observable<StateMaster> {
    const newState: StateMaster = {
      lid: Math.max(...this.states.map(s => s.lid), 0) + 1,
      StateName: state.StateName || '',
      StateCode: state.StateCode || '',
      CountryId: state.CountryId || 0,
      IsActive: state.IsActive ?? true,
      CreatedDate: new Date(),
      CreatedBy: 1
    };
    
    this.states.push(newState);
    return of(newState);
  }

  updateState(id: number, state: Partial<StateMaster>): Observable<StateMaster | null> {
    const index = this.states.findIndex(s => s.lid === id);
    if (index !== -1) {
      this.states[index] = {
        ...this.states[index],
        ...state,
        ModifiedDate: new Date(),
        ModifiedBy: 1
      };
      return of(this.states[index]);
    }
    return of(null);
  }

  deleteState(id: number): Observable<boolean> {
    const index = this.states.findIndex(s => s.lid === id);
    if (index !== -1) {
      this.states.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Get states for dropdown (backward compatibility)
  getStatesForDropdown(countryId?: number): Observable<any[]> {
    let filteredStates = this.states;
    if (countryId) {
      filteredStates = this.states.filter(s => s.CountryId === countryId);
    }
    
    return of(filteredStates.map(state => ({
      id: state.lid,
      name: state.StateName,
      countryId: state.CountryId,
      isActive: state.IsActive
    })));
  }

  // Helper method to get country name
  getCountryName(countryId: number): Observable<string> {
    return new Observable(observer => {
      this.countryService.getCountryById(countryId).subscribe(country => {
        observer.next(country?.CountryName || 'Unknown');
        observer.complete();
      });
    });
  }
}
