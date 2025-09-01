import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DepartmentMaster } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departments: DepartmentMaster[] = [
    {
      lid: 1,
      DepartmentName: 'Information Technology',
      DepartmentCode: 'IT',
      DepartmentHead: 'John Smith',
      Description: 'Manages all IT infrastructure, software development, and technical support',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 2,
      DepartmentName: 'Human Resources',
      DepartmentCode: 'HR',
      DepartmentHead: 'Sarah Johnson',
      Description: 'Handles recruitment, employee relations, benefits, and compliance',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 3,
      DepartmentName: 'Finance & Accounting',
      DepartmentCode: 'FIN',
      DepartmentHead: 'Michael Chen',
      Description: 'Manages financial planning, accounting, budgeting, and financial reporting',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      DepartmentName: 'Operations',
      DepartmentCode: 'OPS',
      DepartmentHead: 'Emily Davis',
      Description: 'Oversees day-to-day operations, logistics, and process management',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 5,
      DepartmentName: 'Sales & Marketing',
      DepartmentCode: 'SAL',
      DepartmentHead: 'David Wilson',
      Description: 'Handles sales activities, marketing campaigns, and customer relations',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 6,
      DepartmentName: 'Quality Assurance',
      DepartmentCode: 'QA',
      DepartmentHead: 'Lisa Thompson',
      Description: 'Ensures quality standards, testing procedures, and compliance monitoring',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 7,
      DepartmentName: 'Research & Development',
      DepartmentCode: 'RND',
      DepartmentHead: 'Robert Lee',
      Description: 'Focuses on innovation, product development, and research initiatives',
      IsActive: true,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    },
    {
      lid: 8,
      DepartmentName: 'Customer Support',
      DepartmentCode: 'CS',
      DepartmentHead: 'Anna Martinez',
      Description: 'Provides customer service, technical support, and issue resolution',
      IsActive: false,
      CreatedDate: new Date('2024-01-01'),
      CreatedBy: 1
    }
  ];

  constructor() {}

  getDepartments(): Observable<DepartmentMaster[]> {
    return of([...this.departments]);
  }

  getDepartmentById(id: number): Observable<DepartmentMaster | undefined> {
    const department = this.departments.find(d => d.lid === id);
    return of(department);
  }

  getActiveDepartments(): Observable<DepartmentMaster[]> {
    return of(this.departments.filter(d => d.IsActive));
  }

  createDepartment(department: Partial<DepartmentMaster>): Observable<DepartmentMaster> {
    const newDepartment: DepartmentMaster = {
      lid: Math.max(...this.departments.map(d => d.lid), 0) + 1,
      DepartmentName: department.DepartmentName || '',
      DepartmentCode: department.DepartmentCode || '',
      DepartmentHead: department.DepartmentHead || '',
      Description: department.Description || '',
      IsActive: department.IsActive ?? true,
      CreatedDate: new Date(),
      CreatedBy: 1
    };
    
    this.departments.push(newDepartment);
    return of(newDepartment);
  }

  updateDepartment(id: number, department: Partial<DepartmentMaster>): Observable<DepartmentMaster | null> {
    const index = this.departments.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.departments[index] = {
        ...this.departments[index],
        ...department,
        ModifiedDate: new Date(),
        ModifiedBy: 1
      };
      return of(this.departments[index]);
    }
    return of(null);
  }

  deleteDepartment(id: number): Observable<boolean> {
    const index = this.departments.findIndex(d => d.lid === id);
    if (index !== -1) {
      this.departments.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Check if department code is unique
  isDepartmentCodeUnique(code: string, excludeId?: number): Observable<boolean> {
    const existingDepartment = this.departments.find(d => 
      d.DepartmentCode.toLowerCase() === code.toLowerCase() && 
      (excludeId ? d.lid !== excludeId : true)
    );
    return of(!existingDepartment);
  }

  // Get departments for dropdown
  getDepartmentsForDropdown(): Observable<any[]> {
    return of(this.departments
      .filter(department => department.IsActive)
      .map(department => ({
        id: department.lid,
        code: department.DepartmentCode,
        name: department.DepartmentName,
        head: department.DepartmentHead,
        isActive: department.IsActive
      }))
    );
  }
}
