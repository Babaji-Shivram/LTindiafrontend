import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PackageType } from '../models/package-type.model';

@Injectable({
  providedIn: 'root'
})
export class PackageTypeService {
  private packageTypes: PackageType[] = [
    {
      lid: 1,
      PackageTypeName: 'Carton Box',
      PackageTypeCode: 'CTN',
      Description: 'Standard cardboard carton boxes for general packaging',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      PackageTypeName: 'Wooden Crate',
      PackageTypeCode: 'WCR',
      Description: 'Heavy-duty wooden crates for fragile or heavy items',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 3,
      PackageTypeName: 'Plastic Bag',
      PackageTypeCode: 'PLB',
      Description: 'Plastic bags for light items and bulk packaging',
      IsActive: true,
      CreatedDate: new Date('2024-02-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      PackageTypeName: 'Metal Drum',
      PackageTypeCode: 'MDR',
      Description: 'Metal drums for liquid and chemical storage',
      IsActive: true,
      CreatedDate: new Date('2024-02-05'),
      CreatedBy: 1
    },
    {
      lid: 5,
      PackageTypeName: 'Pallet',
      PackageTypeCode: 'PAL',
      Description: 'Wooden or plastic pallets for bulk transportation',
      IsActive: true,
      CreatedDate: new Date('2024-02-10'),
      CreatedBy: 1
    },
    {
      lid: 6,
      PackageTypeName: 'Sack/Bag',
      PackageTypeCode: 'SAK',
      Description: 'Jute or fabric sacks for agricultural products',
      IsActive: true,
      CreatedDate: new Date('2024-02-15'),
      CreatedBy: 1
    },
    {
      lid: 7,
      PackageTypeName: 'Steel Container',
      PackageTypeCode: 'SCN',
      Description: 'Steel containers for secure transportation',
      IsActive: false,
      CreatedDate: new Date('2024-02-20'),
      CreatedBy: 1
    },
    {
      lid: 8,
      PackageTypeName: 'Bulk',
      PackageTypeCode: 'BLK',
      Description: 'Loose bulk cargo without specific packaging',
      IsActive: true,
      CreatedDate: new Date('2024-02-25'),
      CreatedBy: 1
    },
    {
      lid: 9,
      PackageTypeName: 'Roll',
      PackageTypeCode: 'ROL',
      Description: 'Rolled materials like fabric, paper, or carpet',
      IsActive: true,
      CreatedDate: new Date('2024-03-01'),
      CreatedBy: 1
    },
    {
      lid: 10,
      PackageTypeName: 'Bundle',
      PackageTypeCode: 'BND',
      Description: 'Bundled items tied together with strapping',
      IsActive: true,
      CreatedDate: new Date('2024-03-05'),
      CreatedBy: 1
    }
  ];

  getAllPackageTypes(): Observable<PackageType[]> {
    return of(this.packageTypes);
  }

  getPackageTypeById(lid: number): Observable<PackageType | undefined> {
    return of(this.packageTypes.find(type => type.lid === lid));
  }

  createPackageType(packageType: Omit<PackageType, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<PackageType> {
    const newPackageType: PackageType = {
      ...packageType,
      lid: Math.max(...this.packageTypes.map(p => p.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.packageTypes.push(newPackageType);
    return of(newPackageType);
  }

  updatePackageType(lid: number, packageType: Partial<PackageType>): Observable<PackageType | null> {
    const index = this.packageTypes.findIndex(p => p.lid === lid);
    if (index !== -1) {
      this.packageTypes[index] = { 
        ...this.packageTypes[index], 
        ...packageType
      };
      return of(this.packageTypes[index]);
    }
    return of(null);
  }

  deletePackageType(lid: number): Observable<boolean> {
    const index = this.packageTypes.findIndex(p => p.lid === lid);
    if (index !== -1) {
      this.packageTypes.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
