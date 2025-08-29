import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DesignationMaster, DesignationFilter, DesignationDropdown } from '../models/designation.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  private designations: DesignationMaster[] = [
    {
      lid: 1,
      DesignationName: 'Chief Executive Officer',
      DesignationCode: 'CEO',
      DepartmentId: 1,
      DepartmentName: 'Executive',
      Description: 'Chief Executive Officer responsible for overall company operations',
      Level: 5,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-01-15'),
      dUpdatedDate: new Date('2024-01-15')
    },
    {
      lid: 2,
      DesignationName: 'Chief Financial Officer',
      DesignationCode: 'CFO',
      DepartmentId: 2,
      DepartmentName: 'Finance',
      Description: 'Chief Financial Officer responsible for financial operations',
      Level: 5,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-01-15'),
      dUpdatedDate: new Date('2024-01-15')
    },
    {
      lid: 3,
      DesignationName: 'IT Manager',
      DesignationCode: 'ITMGR',
      DepartmentId: 3,
      DepartmentName: 'Information Technology',
      Description: 'Manager responsible for IT operations and systems',
      Level: 3,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-01-20'),
      dUpdatedDate: new Date('2024-01-20')
    },
    {
      lid: 4,
      DesignationName: 'HR Manager',
      DesignationCode: 'HRMGR',
      DepartmentId: 4,
      DepartmentName: 'Human Resources',
      Description: 'Manager responsible for human resources and employee relations',
      Level: 3,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-01-25'),
      dUpdatedDate: new Date('2024-01-25')
    },
    {
      lid: 5,
      DesignationName: 'Operations Manager',
      DesignationCode: 'OPSMGR',
      DepartmentId: 5,
      DepartmentName: 'Operations',
      Description: 'Manager responsible for daily operations and logistics',
      Level: 3,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-02-01'),
      dUpdatedDate: new Date('2024-02-01')
    },
    {
      lid: 6,
      DesignationName: 'Senior Software Engineer',
      DesignationCode: 'SSE',
      DepartmentId: 3,
      DepartmentName: 'Information Technology',
      Description: 'Senior software engineer responsible for system development',
      Level: 2,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-02-05'),
      dUpdatedDate: new Date('2024-02-05')
    },
    {
      lid: 7,
      DesignationName: 'Senior Accountant',
      DesignationCode: 'SRACC',
      DepartmentId: 2,
      DepartmentName: 'Finance',
      Description: 'Senior accountant responsible for financial reporting',
      Level: 2,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-02-10'),
      dUpdatedDate: new Date('2024-02-10')
    },
    {
      lid: 8,
      DesignationName: 'Sales Executive',
      DesignationCode: 'SLSEXE',
      DepartmentId: 6,
      DepartmentName: 'Sales',
      Description: 'Sales executive responsible for client acquisition',
      Level: 1,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-02-15'),
      dUpdatedDate: new Date('2024-02-15')
    },
    {
      lid: 9,
      DesignationName: 'QA Analyst',
      DesignationCode: 'QAA',
      DepartmentId: 3,
      DepartmentName: 'Information Technology',
      Description: 'Quality assurance analyst for testing and validation',
      Level: 1,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-02-20'),
      dUpdatedDate: new Date('2024-02-20')
    },
    {
      lid: 10,
      DesignationName: 'Documentation Specialist',
      DesignationCode: 'DOCSPEC',
      DepartmentId: 5,
      DepartmentName: 'Operations',
      Description: 'Specialist responsible for documentation and compliance',
      Level: 1,
      IsActive: true,
      bDel: false,
      nAddedBy: 1,
      nUpdatedBy: 1,
      dAddedDate: new Date('2024-02-25'),
      dUpdatedDate: new Date('2024-02-25')
    }
  ];

  getAllDesignations(): Observable<DesignationMaster[]> {
    return of(this.designations.filter(d => !d.bDel)).pipe(delay(500));
  }

  getDesignationById(id: number): Observable<DesignationMaster | undefined> {
    const designation = this.designations.find(d => d.lid === id && !d.bDel);
    return of(designation).pipe(delay(300));
  }

  getFilteredDesignations(filter: DesignationFilter): Observable<DesignationMaster[]> {
    let filtered = this.designations.filter(d => !d.bDel);

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(d => 
        d.DesignationName.toLowerCase().includes(searchLower) ||
        d.DesignationCode.toLowerCase().includes(searchLower) ||
        (d.DepartmentName && d.DepartmentName.toLowerCase().includes(searchLower)) ||
        (d.Description && d.Description.toLowerCase().includes(searchLower))
      );
    }

    if (filter.departmentId !== undefined) {
      filtered = filtered.filter(d => d.DepartmentId === filter.departmentId);
    }

    if (filter.level !== undefined) {
      filtered = filtered.filter(d => d.Level === filter.level);
    }

    if (filter.isActive !== undefined) {
      filtered = filtered.filter(d => d.IsActive === filter.isActive);
    }

    return of(filtered).pipe(delay(500));
  }

  getDesignationsByDepartment(departmentId: number): Observable<DesignationMaster[]> {
    const filtered = this.designations.filter(d => 
      d.DepartmentId === departmentId && d.IsActive && !d.bDel
    );
    return of(filtered).pipe(delay(300));
  }

  getDesignationDropdown(): Observable<DesignationDropdown[]> {
    const dropdown = this.designations
      .filter(d => d.IsActive && !d.bDel)
      .map(d => ({
        value: d.lid,
        label: d.DesignationName,
        departmentName: d.DepartmentName,
        level: d.Level
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return of(dropdown).pipe(delay(300));
  }

  createDesignation(designation: Partial<DesignationMaster>): Observable<DesignationMaster> {
    const newDesignation: DesignationMaster = {
      lid: Math.max(...this.designations.map(d => d.lid)) + 1,
      DesignationName: designation.DesignationName || '',
      DesignationCode: designation.DesignationCode || '',
      DepartmentId: designation.DepartmentId || 0,
      DepartmentName: designation.DepartmentName,
      Description: designation.Description,
      Level: designation.Level || 1,
      IsActive: designation.IsActive !== undefined ? designation.IsActive : true,
      bDel: false,
      nAddedBy: 1, // Current user ID
      nUpdatedBy: 1,
      dAddedDate: new Date(),
      dUpdatedDate: new Date()
    };

    this.designations.push(newDesignation);
    return of(newDesignation).pipe(delay(1000));
  }

  updateDesignation(id: number, designation: Partial<DesignationMaster>): Observable<DesignationMaster> {
    const index = this.designations.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.designations[index] = {
        ...this.designations[index],
        ...designation,
        lid: id, // Ensure ID doesn't change
        nUpdatedBy: 1, // Current user ID
        dUpdatedDate: new Date()
      };
      return of(this.designations[index]).pipe(delay(1000));
    }
    throw new Error('Designation not found');
  }

  deleteDesignation(id: number): Observable<boolean> {
    const index = this.designations.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.designations[index].bDel = true;
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  activateDesignation(id: number): Observable<boolean> {
    const index = this.designations.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.designations[index].IsActive = true;
      this.designations[index].nUpdatedBy = 1;
      this.designations[index].dUpdatedDate = new Date();
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  deactivateDesignation(id: number): Observable<boolean> {
    const index = this.designations.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.designations[index].IsActive = false;
      this.designations[index].nUpdatedBy = 1;
      this.designations[index].dUpdatedDate = new Date();
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  // Helper methods
  getDesignationName(designId: number): string {
    const designation = this.designations.find(d => d.lid === designId && !d.bDel);
    return designation ? designation.DesignationName : `Designation ${designId}`;
  }

  getLevelName(level: number): string {
    const levels: { [key: number]: string } = {
      1: 'Junior',
      2: 'Senior', 
      3: 'Manager',
      4: 'Director',
      5: 'Executive'
    };
    return levels[level] || `Level ${level}`;
  }

  // Statistics
  getDesignationsCount(): number {
    return this.designations.filter(d => !d.bDel).length;
  }

  getActiveDesignationsCount(): number {
    return this.designations.filter(d => d.IsActive && !d.bDel).length;
  }

  getInactiveDesignationsCount(): number {
    return this.designations.filter(d => !d.IsActive && !d.bDel).length;
  }
}
