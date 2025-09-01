import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [
    {
      lid: 1,
      DocumentName: 'Bill of Lading',
      DocumentCode: 'BOL',
      DocumentType: 'Both',
      IsMandatory: true,
      ValidityDays: 90,
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      DocumentName: 'Commercial Invoice',
      DocumentCode: 'CI',
      DocumentType: 'Both',
      IsMandatory: true,
      ValidityDays: 30,
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 3,
      DocumentName: 'Packing List',
      DocumentCode: 'PL',
      DocumentType: 'Both',
      IsMandatory: true,
      ValidityDays: 30,
      IsActive: true,
      CreatedDate: new Date('2024-02-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      DocumentName: 'Certificate of Origin',
      DocumentCode: 'COO',
      DocumentType: 'Export',
      IsMandatory: false,
      ValidityDays: 180,
      IsActive: true,
      CreatedDate: new Date('2024-02-05'),
      CreatedBy: 1
    },
    {
      lid: 5,
      DocumentName: 'Import License',
      DocumentCode: 'IL',
      DocumentType: 'Import',
      IsMandatory: true,
      ValidityDays: 365,
      IsActive: true,
      CreatedDate: new Date('2024-02-10'),
      CreatedBy: 1
    },
    {
      lid: 6,
      DocumentName: 'Export License',
      DocumentCode: 'EL',
      DocumentType: 'Export',
      IsMandatory: false,
      ValidityDays: 365,
      IsActive: false,
      CreatedDate: new Date('2024-02-15'),
      CreatedBy: 1
    },
    {
      lid: 7,
      DocumentName: 'Phytosanitary Certificate',
      DocumentCode: 'PC',
      DocumentType: 'Export',
      IsMandatory: false,
      ValidityDays: 14,
      IsActive: true,
      CreatedDate: new Date('2024-02-20'),
      CreatedBy: 1
    },
    {
      lid: 8,
      DocumentName: 'Insurance Certificate',
      DocumentCode: 'IC',
      DocumentType: 'Both',
      IsMandatory: false,
      ValidityDays: 365,
      IsActive: true,
      CreatedDate: new Date('2024-02-25'),
      CreatedBy: 1
    }
  ];

  getAllDocuments(): Observable<Document[]> {
    return of(this.documents);
  }

  getDocumentById(lid: number): Observable<Document | undefined> {
    return of(this.documents.find(doc => doc.lid === lid));
  }

  createDocument(document: Omit<Document, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<Document> {
    const newDocument: Document = {
      ...document,
      lid: Math.max(...this.documents.map(d => d.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.documents.push(newDocument);
    return of(newDocument);
  }

  updateDocument(lid: number, document: Partial<Document>): Observable<Document | null> {
    const index = this.documents.findIndex(d => d.lid === lid);
    if (index !== -1) {
      this.documents[index] = { 
        ...this.documents[index], 
        ...document
      };
      return of(this.documents[index]);
    }
    return of(null);
  }

  deleteDocument(lid: number): Observable<boolean> {
    const index = this.documents.findIndex(d => d.lid === lid);
    if (index !== -1) {
      this.documents.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
