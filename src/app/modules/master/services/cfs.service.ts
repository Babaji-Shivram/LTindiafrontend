import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CFS } from '../models/cfs.model';

@Injectable({
  providedIn: 'root'
})
export class CFSService {
  private cfsList: CFS[] = [
    {
      lid: 1,
      CFSName: 'JNPT Container Freight Station',
      CFSCode: 'JNPT-CFS-01',
      CFSAddress: 'Plot No. 15, Sector 6, JNPT Area, Uran, Navi Mumbai',
      CityId: 1, // Mumbai
      ContactPerson: 'Rajesh Kumar',
      Phone: '+91 22 2724 5678',
      Email: 'operations@jnptcfs.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      CFSName: 'Gateway Distriparks CFS',
      CFSCode: 'GDL-CFS-02',
      CFSAddress: 'Sector 6, JNPT, Uran, Navi Mumbai, Maharashtra',
      CityId: 1, // Mumbai
      ContactPerson: 'Amit Sharma',
      Phone: '+91 22 2724 9012',
      Email: 'info@gdlindia.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 3,
      CFSName: 'Chennai Port CFS',
      CFSCode: 'CHN-CFS-03',
      CFSAddress: 'Bharathi Dock Road, Royapuram, Chennai, Tamil Nadu',
      CityId: 2, // Chennai
      ContactPerson: 'Suresh Babu',
      Phone: '+91 44 2522 3456',
      Email: 'operations@chennaicfs.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 4,
      CFSName: 'Kolkata Port Trust CFS',
      CFSCode: 'KOL-CFS-04',
      CFSAddress: 'Haldia Dock Complex, Haldia, West Bengal',
      CityId: 3, // Kolkata
      ContactPerson: 'Debasis Roy',
      Phone: '+91 33 2469 7890',
      Email: 'cfs@kolkataport.gov.in',
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 5,
      CFSName: 'Visakhapatnam Port CFS',
      CFSCode: 'VZG-CFS-05',
      CFSAddress: 'Administrative Building, Visakhapatnam Port, Andhra Pradesh',
      CityId: 4, // Visakhapatnam
      ContactPerson: 'Venkat Reddy',
      Phone: '+91 891 256 4321',
      Email: 'info@vizagport.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-19'),
      CreatedBy: 1
    },
    {
      lid: 6,
      CFSName: 'Kandla Port CFS',
      CFSCode: 'KDL-CFS-06',
      CFSAddress: 'Deendayal Port Authority, Kandla, Kutch, Gujarat',
      CityId: 5, // Kandla
      ContactPerson: 'Kishore Patel',
      Phone: '+91 2836 252 100',
      Email: 'cfs@kandlaport.gov.in',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 7,
      CFSName: 'Cochin Port CFS',
      CFSCode: 'COK-CFS-07',
      CFSAddress: 'Willingdon Island, Kochi, Kerala',
      CityId: 6, // Kochi
      ContactPerson: 'Raghavan Nair',
      Phone: '+91 484 266 8900',
      Email: 'operations@cochinport.com',
      IsActive: false,
      CreatedDate: new Date('2024-01-21'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-15'),
      ModifiedBy: 2
    },
    {
      lid: 8,
      CFSName: 'Tuticorin Port CFS',
      CFSCode: 'TCR-CFS-08',
      CFSAddress: 'V.O. Chidambaranar Port, Tuticorin, Tamil Nadu',
      CityId: 7, // Tuticorin
      ContactPerson: 'Murugan S',
      Phone: '+91 461 233 4567',
      Email: 'cfs@tuticorinport.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-22'),
      CreatedBy: 1
    },
    {
      lid: 9,
      CFSName: 'Mundra Port CFS',
      CFSCode: 'MUN-CFS-09',
      CFSAddress: 'Mundra Port & SEZ Ltd, Mundra, Kutch, Gujarat',
      CityId: 8, // Mundra
      ContactPerson: 'Harsh Patel',
      Phone: '+91 2838 289 000',
      Email: 'info@mundraport.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-23'),
      CreatedBy: 1
    },
    {
      lid: 10,
      CFSName: 'Paradip Port CFS',
      CFSCode: 'PAR-CFS-10',
      CFSAddress: 'Paradip Port Trust, Paradip, Jagatsinghpur, Odisha',
      CityId: 9, // Paradip
      ContactPerson: 'Santosh Mohanty',
      Phone: '+91 6722 222 345',
      Email: 'operations@paradipport.gov.in',
      IsActive: true,
      CreatedDate: new Date('2024-01-24'),
      CreatedBy: 1
    },
    {
      lid: 11,
      CFSName: 'Ennore Port CFS',
      CFSCode: 'ENR-CFS-11',
      CFSAddress: 'Kamarajar Port Limited, Ennore, Chennai, Tamil Nadu',
      CityId: 2, // Chennai (Ennore is part of Chennai)
      ContactPerson: 'Krishna Kumar',
      Phone: '+91 44 2634 5678',
      Email: 'cfs@ennoreport.gov.in',
      IsActive: true,
      CreatedDate: new Date('2024-01-25'),
      CreatedBy: 1
    },
    {
      lid: 12,
      CFSName: 'New Mangalore Port CFS',
      CFSCode: 'NMG-CFS-12',
      CFSAddress: 'New Mangalore Port Trust, Panambur, Mangalore, Karnataka',
      CityId: 10, // Mangalore
      ContactPerson: 'Prakash Rao',
      Phone: '+91 824 240 4500',
      Email: 'info@newmangaloreport.com',
      IsActive: true,
      CreatedDate: new Date('2024-01-26'),
      CreatedBy: 1
    }
  ];

  getAllCFS(): Observable<CFS[]> {
    return of(this.cfsList);
  }

  getActiveCFS(): Observable<CFS[]> {
    return of(this.cfsList.filter(cfs => cfs.IsActive));
  }

  getCFSByCity(cityId: number): Observable<CFS[]> {
    return of(this.cfsList.filter(cfs => cfs.CityId === cityId && cfs.IsActive));
  }

  getCFSById(lid: number): Observable<CFS | undefined> {
    return of(this.cfsList.find(cfs => cfs.lid === lid));
  }

  getCFSByCode(cfsCode: string): Observable<CFS | undefined> {
    return of(this.cfsList.find(cfs => cfs.CFSCode === cfsCode));
  }

  createCFS(cfs: Omit<CFS, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<CFS> {
    const newCFS: CFS = {
      ...cfs,
      lid: Math.max(...this.cfsList.map(c => c.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.cfsList.push(newCFS);
    return of(newCFS);
  }

  updateCFS(lid: number, cfs: Partial<CFS>): Observable<CFS | null> {
    const index = this.cfsList.findIndex(c => c.lid === lid);
    if (index !== -1) {
      this.cfsList[index] = { 
        ...this.cfsList[index], 
        ...cfs, 
        ModifiedDate: new Date(),
        ModifiedBy: 1 // Current user ID
      };
      return of(this.cfsList[index]);
    }
    return of(null);
  }

  deleteCFS(lid: number): Observable<boolean> {
    const index = this.cfsList.findIndex(c => c.lid === lid);
    if (index !== -1) {
      this.cfsList.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  toggleCFSStatus(lid: number): Observable<CFS | null> {
    const index = this.cfsList.findIndex(c => c.lid === lid);
    if (index !== -1) {
      this.cfsList[index].IsActive = !this.cfsList[index].IsActive;
      this.cfsList[index].ModifiedDate = new Date();
      this.cfsList[index].ModifiedBy = 1; // Current user ID
      return of(this.cfsList[index]);
    }
    return of(null);
  }

  searchCFS(searchTerm: string): Observable<CFS[]> {
    const term = searchTerm.toLowerCase();
    return of(this.cfsList.filter(cfs => 
      cfs.CFSName.toLowerCase().includes(term) ||
      cfs.CFSCode.toLowerCase().includes(term) ||
      cfs.CFSAddress.toLowerCase().includes(term) ||
      cfs.ContactPerson.toLowerCase().includes(term) ||
      cfs.Email.toLowerCase().includes(term)
    ));
  }
}
