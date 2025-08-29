import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobType } from '../models/job-type.model';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  private jobTypes: JobType[] = [
    {
      lid: 1,
      JobTypeName: 'Sea Freight Import',
      JobTypeCode: 'SFI001',
      ServiceType: 'Import',
      Description: 'Sea freight import services including customs clearance and delivery',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      JobTypeName: 'Sea Freight Export',
      JobTypeCode: 'SFE001',
      ServiceType: 'Export',
      Description: 'Sea freight export services including pickup and customs documentation',
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 3,
      JobTypeName: 'Air Freight Import',
      JobTypeCode: 'AFI001',
      ServiceType: 'Import',
      Description: 'Air freight import services for time-sensitive cargo',
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 4,
      JobTypeName: 'Air Freight Export',
      JobTypeCode: 'AFE001',
      ServiceType: 'Export',
      Description: 'Air freight export services for urgent shipments',
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 5,
      JobTypeName: 'Road Transport Import',
      JobTypeCode: 'RTI001',
      ServiceType: 'Import',
      Description: 'Road transport services for imported goods',
      IsActive: true,
      CreatedDate: new Date('2024-01-19'),
      CreatedBy: 1
    },
    {
      lid: 6,
      JobTypeName: 'Road Transport Export',
      JobTypeCode: 'RTE001',
      ServiceType: 'Export',
      Description: 'Road transport services for export consignments',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 7,
      JobTypeName: 'Customs Clearance Import',
      JobTypeCode: 'CCI001',
      ServiceType: 'Import',
      Description: 'Dedicated customs clearance services for imports',
      IsActive: true,
      CreatedDate: new Date('2024-01-21'),
      CreatedBy: 1
    },
    {
      lid: 8,
      JobTypeName: 'Customs Clearance Export',
      JobTypeCode: 'CCE001',
      ServiceType: 'Export',
      Description: 'Dedicated customs clearance services for exports',
      IsActive: true,
      CreatedDate: new Date('2024-01-22'),
      CreatedBy: 1
    },
    {
      lid: 9,
      JobTypeName: 'Warehousing Import',
      JobTypeCode: 'WHI001',
      ServiceType: 'Import',
      Description: 'Warehousing and storage services for imported goods',
      IsActive: false,
      CreatedDate: new Date('2024-01-23'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-15'),
      ModifiedBy: 2
    },
    {
      lid: 10,
      JobTypeName: 'Door-to-Door Export',
      JobTypeCode: 'DDE001',
      ServiceType: 'Export',
      Description: 'Complete door-to-door export services',
      IsActive: true,
      CreatedDate: new Date('2024-01-24'),
      CreatedBy: 1
    },
    {
      lid: 11,
      JobTypeName: 'LCL Consolidation Import',
      JobTypeCode: 'LCI001',
      ServiceType: 'Import',
      Description: 'Less than Container Load consolidation for imports',
      IsActive: true,
      CreatedDate: new Date('2024-01-25'),
      CreatedBy: 1
    },
    {
      lid: 12,
      JobTypeName: 'FCL Container Export',
      JobTypeCode: 'FCE001',
      ServiceType: 'Export',
      Description: 'Full Container Load services for exports',
      IsActive: true,
      CreatedDate: new Date('2024-01-26'),
      CreatedBy: 1
    }
  ];

  getAllJobTypes(): Observable<JobType[]> {
    return of(this.jobTypes);
  }

  getJobTypesByService(serviceType: string): Observable<JobType[]> {
    return of(this.jobTypes.filter(jobType => jobType.ServiceType === serviceType));
  }

  getActiveJobTypes(): Observable<JobType[]> {
    return of(this.jobTypes.filter(jobType => jobType.IsActive));
  }

  getJobTypeById(lid: number): Observable<JobType | undefined> {
    return of(this.jobTypes.find(jobType => jobType.lid === lid));
  }

  createJobType(jobType: Omit<JobType, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<JobType> {
    const newJobType: JobType = {
      ...jobType,
      lid: Math.max(...this.jobTypes.map(jt => jt.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.jobTypes.push(newJobType);
    return of(newJobType);
  }

  updateJobType(lid: number, jobType: Partial<JobType>): Observable<JobType | null> {
    const index = this.jobTypes.findIndex(jt => jt.lid === lid);
    if (index !== -1) {
      this.jobTypes[index] = { 
        ...this.jobTypes[index], 
        ...jobType, 
        ModifiedDate: new Date(),
        ModifiedBy: 1 // Current user ID
      };
      return of(this.jobTypes[index]);
    }
    return of(null);
  }

  deleteJobType(lid: number): Observable<boolean> {
    const index = this.jobTypes.findIndex(jt => jt.lid === lid);
    if (index !== -1) {
      this.jobTypes.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  toggleJobTypeStatus(lid: number): Observable<JobType | null> {
    const index = this.jobTypes.findIndex(jt => jt.lid === lid);
    if (index !== -1) {
      this.jobTypes[index].IsActive = !this.jobTypes[index].IsActive;
      this.jobTypes[index].ModifiedDate = new Date();
      this.jobTypes[index].ModifiedBy = 1; // Current user ID
      return of(this.jobTypes[index]);
    }
    return of(null);
  }
}
