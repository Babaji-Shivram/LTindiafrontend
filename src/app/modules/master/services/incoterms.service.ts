import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IncoTerms } from '../models/incoterms.model';

@Injectable({
  providedIn: 'root'
})
export class IncoTermsService {
  private incoTermsList: IncoTerms[] = [
    {
      lid: 1,
      IncoTermCode: 'FOB',
      IncoTermName: 'Free On Board',
      Description: 'Seller delivers goods on board the vessel nominated by buyer. Risk transfers when goods pass the ship\'s rail.',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      IncoTermCode: 'CIF',
      IncoTermName: 'Cost, Insurance and Freight',
      Description: 'Seller pays costs, freight and insurance to bring goods to port of destination. Risk transfers at port of shipment.',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 3,
      IncoTermCode: 'CFR',
      IncoTermName: 'Cost and Freight',
      Description: 'Seller pays costs and freight to bring goods to port of destination. Buyer bears risk from port of shipment.',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 4,
      IncoTermCode: 'EXW',
      IncoTermName: 'Ex Works',
      Description: 'Seller makes goods available at their premises. Buyer bears all costs and risks from seller\'s premises.',
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 5,
      IncoTermCode: 'FCA',
      IncoTermName: 'Free Carrier',
      Description: 'Seller delivers goods to carrier nominated by buyer at named place. Risk transfers when goods are handed to carrier.',
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 6,
      IncoTermCode: 'CPT',
      IncoTermName: 'Carriage Paid To',
      Description: 'Seller pays freight for carriage to named destination. Risk transfers when goods are handed to first carrier.',
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 7,
      IncoTermCode: 'CIP',
      IncoTermName: 'Carriage and Insurance Paid To',
      Description: 'Seller pays freight and insurance to named destination. Risk transfers when goods are handed to first carrier.',
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 8,
      IncoTermCode: 'DAP',
      IncoTermName: 'Delivered at Place',
      Description: 'Seller delivers when goods are placed at buyer\'s disposal at named destination, ready for unloading.',
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 9,
      IncoTermCode: 'DPU',
      IncoTermName: 'Delivered at Place Unloaded',
      Description: 'Seller delivers when goods are unloaded from arriving means of transport at named destination.',
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 10,
      IncoTermCode: 'DDP',
      IncoTermName: 'Delivered Duty Paid',
      Description: 'Seller delivers when goods are placed at buyer\'s disposal, cleared for import at named destination.',
      IsActive: true,
      CreatedDate: new Date('2024-01-19'),
      CreatedBy: 1
    },
    {
      lid: 11,
      IncoTermCode: 'FAS',
      IncoTermName: 'Free Alongside Ship',
      Description: 'Seller delivers when goods are placed alongside vessel at named port of shipment.',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 12,
      IncoTermCode: 'CNF',
      IncoTermName: 'Cost and Freight (CNF)',
      Description: 'Similar to CFR - seller pays costs and freight to destination port. Commonly used term in trade.',
      IsActive: false,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    }
  ];

  constructor() {}

  getAllIncoTerms(): Observable<IncoTerms[]> {
    return of([...this.incoTermsList]);
  }

  getActiveIncoTerms(): Observable<IncoTerms[]> {
    return of(this.incoTermsList.filter(term => term.IsActive));
  }

  getIncoTermById(id: number): Observable<IncoTerms | undefined> {
    return of(this.incoTermsList.find(term => term.lid === id));
  }

  getIncoTermByCode(code: string): Observable<IncoTerms | undefined> {
    return of(this.incoTermsList.find(term => 
      term.IncoTermCode.toLowerCase() === code.toLowerCase()
    ));
  }

  searchIncoTerms(searchTerm: string): Observable<IncoTerms[]> {
    if (!searchTerm.trim()) {
      return this.getAllIncoTerms();
    }

    const filtered = this.incoTermsList.filter(term =>
      term.IncoTermCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.IncoTermName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filtered);
  }

  getIncoTermsByStatus(isActive: boolean): Observable<IncoTerms[]> {
    return of(this.incoTermsList.filter(term => term.IsActive === isActive));
  }

  createIncoTerm(incoTerm: Omit<IncoTerms, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<IncoTerms> {
    const newIncoTerm: IncoTerms = {
      ...incoTerm,
      lid: Math.max(...this.incoTermsList.map(t => t.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };

    this.incoTermsList.push(newIncoTerm);
    return of(newIncoTerm);
  }

  updateIncoTerm(id: number, updates: Partial<IncoTerms>): Observable<IncoTerms | null> {
    const index = this.incoTermsList.findIndex(term => term.lid === id);
    
    if (index === -1) {
      return of(null);
    }

    this.incoTermsList[index] = {
      ...this.incoTermsList[index],
      ...updates,
      lid: id // Ensure ID doesn't change
    };

    return of(this.incoTermsList[index]);
  }

  toggleIncoTermStatus(id: number): Observable<IncoTerms | null> {
    const incoTerm = this.incoTermsList.find(term => term.lid === id);
    
    if (!incoTerm) {
      return of(null);
    }

    return this.updateIncoTerm(id, { IsActive: !incoTerm.IsActive });
  }

  deleteIncoTerm(id: number): Observable<boolean> {
    const index = this.incoTermsList.findIndex(term => term.lid === id);
    
    if (index === -1) {
      return of(false);
    }

    this.incoTermsList.splice(index, 1);
    return of(true);
  }

  // Get terms categorized by usage type
  getIncoTermsByCategory(): Observable<{
    seaWaterway: IncoTerms[];
    anyTransport: IncoTerms[];
    deprecated: IncoTerms[];
  }> {
    const seaWaterway = this.incoTermsList.filter(term => 
      ['FOB', 'CIF', 'CFR', 'FAS'].includes(term.IncoTermCode) && term.IsActive
    );
    
    const anyTransport = this.incoTermsList.filter(term => 
      ['EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'].includes(term.IncoTermCode) && term.IsActive
    );
    
    const deprecated = this.incoTermsList.filter(term => !term.IsActive);

    return of({
      seaWaterway,
      anyTransport,
      deprecated
    });
  }

  // Get risk transfer information
  getRiskTransferInfo(incoTermCode: string): Observable<{
    riskTransferPoint: string;
    sellerResponsibilities: string[];
    buyerResponsibilities: string[];
  } | null> {
    const riskInfo: { [key: string]: any } = {
      'FOB': {
        riskTransferPoint: 'When goods pass ship\'s rail at port of shipment',
        sellerResponsibilities: ['Deliver goods on board vessel', 'Export clearance', 'Loading costs'],
        buyerResponsibilities: ['Freight costs', 'Insurance', 'Import clearance', 'Unloading at destination']
      },
      'CIF': {
        riskTransferPoint: 'When goods pass ship\'s rail at port of shipment',
        sellerResponsibilities: ['Deliver goods on board vessel', 'Freight to destination', 'Marine insurance', 'Export clearance'],
        buyerResponsibilities: ['Import clearance', 'Unloading at destination', 'Risk during transit']
      },
      'EXW': {
        riskTransferPoint: 'At seller\'s premises when goods are made available',
        sellerResponsibilities: ['Make goods available at premises'],
        buyerResponsibilities: ['All transport costs', 'All insurance', 'Export and import clearance', 'Loading and unloading']
      },
      'DDP': {
        riskTransferPoint: 'At named destination when goods are ready for unloading',
        sellerResponsibilities: ['All transport costs', 'Insurance', 'Export and import clearance', 'Duties and taxes'],
        buyerResponsibilities: ['Unloading at destination']
      }
    };

    return of(riskInfo[incoTermCode.toUpperCase()] || null);
  }
}
