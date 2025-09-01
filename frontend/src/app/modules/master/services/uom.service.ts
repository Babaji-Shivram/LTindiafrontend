import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { UOM } from '../models/uom.model';

@Injectable({
  providedIn: 'root'
})
export class UOMService {
  private uomList: UOM[] = [
    // Weight Units
    {
      lid: 1,
      UOMName: 'Kilogram',
      UOMCode: 'KG',
      UOMType: 'Weight',
      ConversionFactor: 1.0, // Base unit for weight
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      UOMName: 'Gram',
      UOMCode: 'GM',
      UOMType: 'Weight',
      ConversionFactor: 0.001, // 1 gram = 0.001 kg
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 3,
      UOMName: 'Metric Ton',
      UOMCode: 'MT',
      UOMType: 'Weight',
      ConversionFactor: 1000.0, // 1 MT = 1000 kg
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 4,
      UOMName: 'Pound',
      UOMCode: 'LB',
      UOMType: 'Weight',
      ConversionFactor: 0.453592, // 1 lb = 0.453592 kg
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 5,
      UOMName: 'Ounce',
      UOMCode: 'OZ',
      UOMType: 'Weight',
      ConversionFactor: 0.0283495, // 1 oz = 0.0283495 kg
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },

    // Volume Units
    {
      lid: 6,
      UOMName: 'Liter',
      UOMCode: 'LTR',
      UOMType: 'Volume',
      ConversionFactor: 1.0, // Base unit for volume
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 7,
      UOMName: 'Milliliter',
      UOMCode: 'ML',
      UOMType: 'Volume',
      ConversionFactor: 0.001, // 1 ml = 0.001 liter
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 8,
      UOMName: 'Cubic Meter',
      UOMCode: 'CBM',
      UOMType: 'Volume',
      ConversionFactor: 1000.0, // 1 cbm = 1000 liters
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 9,
      UOMName: 'Gallon',
      UOMCode: 'GAL',
      UOMType: 'Volume',
      ConversionFactor: 3.78541, // 1 gallon = 3.78541 liters
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 10,
      UOMName: 'Barrel',
      UOMCode: 'BBL',
      UOMType: 'Volume',
      ConversionFactor: 158.987, // 1 barrel = 158.987 liters
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },

    // Length Units
    {
      lid: 11,
      UOMName: 'Meter',
      UOMCode: 'MTR',
      UOMType: 'Length',
      ConversionFactor: 1.0, // Base unit for length
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 12,
      UOMName: 'Centimeter',
      UOMCode: 'CM',
      UOMType: 'Length',
      ConversionFactor: 0.01, // 1 cm = 0.01 meter
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 13,
      UOMName: 'Kilometer',
      UOMCode: 'KM',
      UOMType: 'Length',
      ConversionFactor: 1000.0, // 1 km = 1000 meters
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 14,
      UOMName: 'Foot',
      UOMCode: 'FT',
      UOMType: 'Length',
      ConversionFactor: 0.3048, // 1 ft = 0.3048 meters
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 15,
      UOMName: 'Inch',
      UOMCode: 'IN',
      UOMType: 'Length',
      ConversionFactor: 0.0254, // 1 inch = 0.0254 meters
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },

    // Quantity Units
    {
      lid: 16,
      UOMName: 'Pieces',
      UOMCode: 'PCS',
      UOMType: 'Quantity',
      ConversionFactor: 1.0, // Base unit for quantity
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 17,
      UOMName: 'Each',
      UOMCode: 'EA',
      UOMType: 'Quantity',
      ConversionFactor: 1.0, // Same as pieces
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 18,
      UOMName: 'Dozen',
      UOMCode: 'DOZ',
      UOMType: 'Quantity',
      ConversionFactor: 12.0, // 1 dozen = 12 pieces
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 19,
      UOMName: 'Gross',
      UOMCode: 'GRS',
      UOMType: 'Quantity',
      ConversionFactor: 144.0, // 1 gross = 144 pieces
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 20,
      UOMName: 'Carton',
      UOMCode: 'CTN',
      UOMType: 'Quantity',
      ConversionFactor: 1.0, // Variable, depends on contents
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },

    // Area Units
    {
      lid: 21,
      UOMName: 'Square Meter',
      UOMCode: 'SQM',
      UOMType: 'Area',
      ConversionFactor: 1.0, // Base unit for area
      IsActive: true,
      CreatedDate: new Date('2024-01-19'),
      CreatedBy: 1
    },
    {
      lid: 22,
      UOMName: 'Square Foot',
      UOMCode: 'SQFT',
      UOMType: 'Area',
      ConversionFactor: 0.092903, // 1 sqft = 0.092903 sqm
      IsActive: true,
      CreatedDate: new Date('2024-01-19'),
      CreatedBy: 1
    },

    // Container/Packaging Units
    {
      lid: 23,
      UOMName: 'Twenty Foot Equivalent',
      UOMCode: 'TEU',
      UOMType: 'Container',
      ConversionFactor: 1.0, // Base unit for containers
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 24,
      UOMName: 'Forty Foot Equivalent',
      UOMCode: 'FEU',
      UOMType: 'Container',
      ConversionFactor: 2.0, // 1 FEU = 2 TEU
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 25,
      UOMName: 'Pallet',
      UOMCode: 'PLT',
      UOMType: 'Packaging',
      ConversionFactor: 1.0, // Base unit for pallets
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    }
  ];

  constructor() {}

  getAllUOMs(): Observable<UOM[]> {
    return of([...this.uomList]);
  }

  getActiveUOMs(): Observable<UOM[]> {
    return of(this.uomList.filter(uom => uom.IsActive));
  }

  getUOMById(id: number): Observable<UOM | undefined> {
    return of(this.uomList.find(uom => uom.lid === id));
  }

  getUOMByCode(code: string): Observable<UOM | undefined> {
    return of(this.uomList.find(uom => 
      uom.UOMCode.toLowerCase() === code.toLowerCase()
    ));
  }

  getUOMsByType(type: string): Observable<UOM[]> {
    return of(this.uomList.filter(uom => 
      uom.UOMType.toLowerCase() === type.toLowerCase() && uom.IsActive
    ));
  }

  searchUOMs(searchTerm: string): Observable<UOM[]> {
    if (!searchTerm.trim()) {
      return this.getAllUOMs();
    }

    const filtered = this.uomList.filter(uom =>
      uom.UOMName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uom.UOMCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uom.UOMType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filtered);
  }

  getUOMsByStatus(isActive: boolean): Observable<UOM[]> {
    return of(this.uomList.filter(uom => uom.IsActive === isActive));
  }

  createUOM(uom: Omit<UOM, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<UOM> {
    const newUOM: UOM = {
      ...uom,
      lid: Math.max(...this.uomList.map(u => u.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };

    this.uomList.push(newUOM);
    return of(newUOM);
  }

  updateUOM(id: number, updates: Partial<UOM>): Observable<UOM | null> {
    const index = this.uomList.findIndex(uom => uom.lid === id);
    
    if (index === -1) {
      return of(null);
    }

    this.uomList[index] = {
      ...this.uomList[index],
      ...updates,
      lid: id // Ensure ID doesn't change
    };

    return of(this.uomList[index]);
  }

  toggleUOMStatus(id: number): Observable<UOM | null> {
    const uom = this.uomList.find(u => u.lid === id);
    
    if (!uom) {
      return of(null);
    }

    return this.updateUOM(id, { IsActive: !uom.IsActive });
  }

  deleteUOM(id: number): Observable<boolean> {
    const index = this.uomList.findIndex(uom => uom.lid === id);
    
    if (index === -1) {
      return of(false);
    }

    this.uomList.splice(index, 1);
    return of(true);
  }

  // Get UOMs categorized by type
  getUOMsByCategory(): Observable<{
    weight: UOM[];
    volume: UOM[];
    length: UOM[];
    quantity: UOM[];
    area: UOM[];
    container: UOM[];
    packaging: UOM[];
  }> {
    const weight = this.uomList.filter(uom => uom.UOMType === 'Weight' && uom.IsActive);
    const volume = this.uomList.filter(uom => uom.UOMType === 'Volume' && uom.IsActive);
    const length = this.uomList.filter(uom => uom.UOMType === 'Length' && uom.IsActive);
    const quantity = this.uomList.filter(uom => uom.UOMType === 'Quantity' && uom.IsActive);
    const area = this.uomList.filter(uom => uom.UOMType === 'Area' && uom.IsActive);
    const container = this.uomList.filter(uom => uom.UOMType === 'Container' && uom.IsActive);
    const packaging = this.uomList.filter(uom => uom.UOMType === 'Packaging' && uom.IsActive);

    return of({
      weight,
      volume,
      length,
      quantity,
      area,
      container,
      packaging
    });
  }

  // Convert between units of the same type
  convertUnits(fromUOMCode: string, toUOMCode: string, value: number): Observable<number | null> {
    const fromUOM = this.uomList.find(uom => uom.UOMCode === fromUOMCode);
    const toUOM = this.uomList.find(uom => uom.UOMCode === toUOMCode);

    if (!fromUOM || !toUOM || fromUOM.UOMType !== toUOM.UOMType) {
      return of(null);
    }

    // Convert to base unit first, then to target unit
    const baseValue = value * (fromUOM.ConversionFactor || 1);
    const convertedValue = baseValue / (toUOM.ConversionFactor || 1);

    return of(convertedValue);
  }

  // Get base unit for a given type
  getBaseUOMForType(type: string): Observable<UOM | null> {
    const baseUOMs: { [key: string]: string } = {
      'Weight': 'KG',
      'Volume': 'LTR',
      'Length': 'MTR',
      'Quantity': 'PCS',
      'Area': 'SQM',
      'Container': 'TEU',
      'Packaging': 'PLT'
    };

    const baseCode = baseUOMs[type];
    if (!baseCode) {
      return of(null);
    }

    return this.getUOMByCode(baseCode).pipe(
      map(uom => uom || null)
    );
  }

  // Get common UOMs for logistics
  getLogisticsUOMs(): Observable<UOM[]> {
    const commonCodes = ['KG', 'MT', 'CBM', 'PCS', 'CTN', 'PLT', 'TEU', 'FEU'];
    const logisticsUOMs = this.uomList.filter(uom => 
      commonCodes.includes(uom.UOMCode) && uom.IsActive
    );

    return of(logisticsUOMs);
  }

  // Get shipping-specific UOMs
  getShippingUOMs(): Observable<UOM[]> {
    const shippingCodes = ['TEU', 'FEU', 'CBM', 'MT', 'KG'];
    const shippingUOMs = this.uomList.filter(uom => 
      shippingCodes.includes(uom.UOMCode) && uom.IsActive
    );

    return of(shippingUOMs);
  }
}
