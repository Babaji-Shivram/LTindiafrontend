import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DivisionMaster } from '../models/division.model';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private mockDivisions: DivisionMaster[] = [
    {
      lid: 1,
      DivisionName: 'Import Operations',
      DivisionCode: 'IMP',
      Description: 'Handles all import-related operations and documentation',
      DivisionHead: 'John Smith',
      IsActive: true,
      bDel: false,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-10'),
      ModifiedBy: 1
    },
    {
      lid: 2,
      DivisionName: 'Export Operations',
      DivisionCode: 'EXP',
      Description: 'Manages export procedures and customs clearance',
      DivisionHead: 'Sarah Johnson',
      IsActive: true,
      bDel: false,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-12'),
      ModifiedBy: 1
    },
    {
      lid: 3,
      DivisionName: 'Customs Brokerage',
      DivisionCode: 'CUS',
      Description: 'Specialized in customs documentation and compliance',
      DivisionHead: 'Michael Brown',
      IsActive: true,
      bDel: false,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-05'),
      ModifiedBy: 1
    },
    {
      lid: 4,
      DivisionName: 'Freight Forwarding',
      DivisionCode: 'FF',
      Description: 'Coordinates freight movement and logistics',
      DivisionHead: 'Lisa Davis',
      IsActive: true,
      bDel: false,
      CreatedDate: new Date('2024-01-25'),
      CreatedBy: 1
    },
    {
      lid: 5,
      DivisionName: 'Documentation',
      DivisionCode: 'DOC',
      Description: 'Handles all trade documentation and paperwork',
      DivisionHead: 'Robert Wilson',
      IsActive: false,
      bDel: false,
      CreatedDate: new Date('2024-01-30'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-03-01'),
      ModifiedBy: 2
    }
  ];

  getDivisions(): Observable<DivisionMaster[]> {
    return of(this.mockDivisions.filter(division => !division.bDel));
  }

  getDivisionById(id: number): Observable<DivisionMaster | undefined> {
    const division = this.mockDivisions.find(d => d.lid === id && !d.bDel);
    return of(division);
  }

  createDivision(division: Omit<DivisionMaster, 'lid' | 'CreatedDate' | 'ModifiedDate'>): Observable<DivisionMaster> {
    const newDivision: DivisionMaster = {
      ...division,
      lid: Math.max(...this.mockDivisions.map(d => d.lid)) + 1,
      CreatedDate: new Date(),
      ModifiedDate: new Date()
    };
    this.mockDivisions.push(newDivision);
    return of(newDivision);
  }

  updateDivision(id: number, division: Partial<DivisionMaster>): Observable<DivisionMaster | null> {
    const index = this.mockDivisions.findIndex(d => d.lid === id && !d.bDel);
    if (index !== -1) {
      this.mockDivisions[index] = {
        ...this.mockDivisions[index],
        ...division,
        ModifiedDate: new Date()
      };
      return of(this.mockDivisions[index]);
    }
    return of(null);
  }

  deleteDivision(id: number): Observable<boolean> {
    const index = this.mockDivisions.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.mockDivisions[index].bDel = true;
      return of(true);
    }
    return of(false);
  }

  // Additional methods based on the operations you mentioned
  getActiveDivisions(): Observable<DivisionMaster[]> {
    return of(this.mockDivisions.filter(division => division.IsActive && !division.bDel));
  }

  getDivisionDropdownOptions(): Observable<{value: number, label: string}[]> {
    const activeDivisions = this.mockDivisions.filter(d => d.IsActive && !d.bDel);
    const options = activeDivisions.map(d => ({
      value: d.lid,
      label: `${d.DivisionCode} - ${d.DivisionName}`
    }));
    return of(options);
  }

  getUsersByDivisionId(divisionId: number): Observable<any[]> {
    // Mock implementation - in real app would call backend
    const mockUsers = [
      { id: 1, name: 'User 1', divisionId },
      { id: 2, name: 'User 2', divisionId }
    ];
    return of(mockUsers);
  }
}
