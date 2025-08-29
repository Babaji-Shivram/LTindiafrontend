import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerSector } from '../models/customer-sector.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerSectorService {
  private customerSectors: CustomerSector[] = [
    {
      lid: 1,
      SectorName: 'Manufacturing',
      SectorCode: 'MFG',
      Description: 'Manufacturing and production companies',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      SectorName: 'Trading',
      SectorCode: 'TRD',
      Description: 'Import/Export and trading companies',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 3,
      SectorName: 'Services',
      SectorCode: 'SVC',
      Description: 'Service providing companies',
      IsActive: true,
      CreatedDate: new Date('2024-02-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      SectorName: 'Technology',
      SectorCode: 'TECH',
      Description: 'IT and technology companies',
      IsActive: true,
      CreatedDate: new Date('2024-02-05'),
      CreatedBy: 1
    },
    {
      lid: 5,
      SectorName: 'Healthcare',
      SectorCode: 'HC',
      Description: 'Healthcare and pharmaceutical companies',
      IsActive: false,
      CreatedDate: new Date('2024-02-10'),
      CreatedBy: 1
    }
  ];

  getAllCustomerSectors(): Observable<CustomerSector[]> {
    return of(this.customerSectors);
  }

  getCustomerSectorById(lid: number): Observable<CustomerSector | undefined> {
    return of(this.customerSectors.find(sector => sector.lid === lid));
  }

  createCustomerSector(sector: Omit<CustomerSector, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<CustomerSector> {
    const newSector: CustomerSector = {
      ...sector,
      lid: Math.max(...this.customerSectors.map(s => s.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.customerSectors.push(newSector);
    return of(newSector);
  }

  updateCustomerSector(lid: number, sector: Partial<CustomerSector>): Observable<CustomerSector | null> {
    const index = this.customerSectors.findIndex(s => s.lid === lid);
    if (index !== -1) {
      this.customerSectors[index] = { 
        ...this.customerSectors[index], 
        ...sector
      };
      return of(this.customerSectors[index]);
    }
    return of(null);
  }

  deleteCustomerSector(lid: number): Observable<boolean> {
    const index = this.customerSectors.findIndex(s => s.lid === lid);
    if (index !== -1) {
      this.customerSectors.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
