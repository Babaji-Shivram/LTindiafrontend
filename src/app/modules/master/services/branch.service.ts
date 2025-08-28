import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private branches: Branch[] = [
    {
      lid: 1,
      BranchName: 'Head Office - Mumbai',
      BranchCode: 'HO001',
      BranchAddress: '123 Business Park, Andheri East',
      BranchCity: 'Mumbai',
      BranchState: 'Maharashtra',
      BranchCountry: 'India',
      BranchPinCode: '400069',
      BranchPhone: '+91 22 2345 6789',
      BranchEmail: 'ho@ltindia.com',
      BranchManager: 'Rajesh Kumar',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      BranchName: 'Chennai Branch',
      BranchCode: 'BR002',
      BranchAddress: '456 Port Road, Guindy',
      BranchCity: 'Chennai',
      BranchState: 'Tamil Nadu',
      BranchCountry: 'India',
      BranchPinCode: '600032',
      BranchPhone: '+91 44 2345 6789',
      BranchEmail: 'chennai@ltindia.com',
      BranchManager: 'Suresh Babu',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 3,
      BranchName: 'Delhi Regional Office',
      BranchCode: 'RO003',
      BranchAddress: '789 Commercial Complex, Connaught Place',
      BranchCity: 'Delhi',
      BranchState: 'Delhi',
      BranchCountry: 'India',
      BranchPinCode: '110001',
      BranchPhone: '+91 11 2345 6789',
      BranchEmail: 'delhi@ltindia.com',
      BranchManager: 'Priya Sharma',
      IsActive: false,
      CreatedDate: new Date('2024-02-01'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-15'),
      ModifiedBy: 2
    }
  ];

  getAllBranches(): Observable<Branch[]> {
    return of(this.branches);
  }

  getBranchById(lid: number): Observable<Branch | undefined> {
    return of(this.branches.find(branch => branch.lid === lid));
  }

  createBranch(branch: Omit<Branch, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<Branch> {
    const newBranch: Branch = {
      ...branch,
      lid: Math.max(...this.branches.map(b => b.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.branches.push(newBranch);
    return of(newBranch);
  }

  updateBranch(lid: number, branch: Partial<Branch>): Observable<Branch | null> {
    const index = this.branches.findIndex(b => b.lid === lid);
    if (index !== -1) {
      this.branches[index] = { 
        ...this.branches[index], 
        ...branch, 
        ModifiedDate: new Date(),
        ModifiedBy: 1 // Current user ID
      };
      return of(this.branches[index]);
    }
    return of(null);
  }

  deleteBranch(lid: number): Observable<boolean> {
    const index = this.branches.findIndex(b => b.lid === lid);
    if (index !== -1) {
      this.branches.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
