import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobStatus } from '../models/job-status.model';

@Injectable({
  providedIn: 'root'
})
export class JobStatusService {
  private jobStatuses: JobStatus[] = [
    {
      lid: 1,
      StatusName: 'Job Created',
      StatusCode: 'CREATED',
      StatusOrder: 1,
      StatusColor: '#3B82F6', // Blue
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      StatusName: 'Documents Received',
      StatusCode: 'DOCS_REC',
      StatusOrder: 2,
      StatusColor: '#8B5CF6', // Purple
      IsActive: true,
      CreatedDate: new Date('2024-01-16'),
      CreatedBy: 1
    },
    {
      lid: 3,
      StatusName: 'Customs Clearance',
      StatusCode: 'CUSTOMS',
      StatusOrder: 3,
      StatusColor: '#F59E0B', // Amber
      IsActive: true,
      CreatedDate: new Date('2024-01-17'),
      CreatedBy: 1
    },
    {
      lid: 4,
      StatusName: 'Goods Dispatched',
      StatusCode: 'DISPATCH',
      StatusOrder: 4,
      StatusColor: '#06B6D4', // Cyan
      IsActive: true,
      CreatedDate: new Date('2024-01-18'),
      CreatedBy: 1
    },
    {
      lid: 5,
      StatusName: 'In Transit',
      StatusCode: 'IN_TRANSIT',
      StatusOrder: 5,
      StatusColor: '#8B5A2B', // Brown
      IsActive: true,
      CreatedDate: new Date('2024-01-19'),
      CreatedBy: 1
    },
    {
      lid: 6,
      StatusName: 'Reached Destination',
      StatusCode: 'ARRIVED',
      StatusOrder: 6,
      StatusColor: '#7C3AED', // Violet
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 7,
      StatusName: 'Delivered',
      StatusCode: 'DELIVERED',
      StatusOrder: 7,
      StatusColor: '#10B981', // Green
      IsActive: true,
      CreatedDate: new Date('2024-01-21'),
      CreatedBy: 1
    },
    {
      lid: 8,
      StatusName: 'Job Completed',
      StatusCode: 'COMPLETED',
      StatusOrder: 8,
      StatusColor: '#059669', // Emerald
      IsActive: true,
      CreatedDate: new Date('2024-01-22'),
      CreatedBy: 1
    },
    {
      lid: 9,
      StatusName: 'On Hold',
      StatusCode: 'ON_HOLD',
      StatusOrder: 9,
      StatusColor: '#DC2626', // Red
      IsActive: true,
      CreatedDate: new Date('2024-01-23'),
      CreatedBy: 1
    },
    {
      lid: 10,
      StatusName: 'Cancelled',
      StatusCode: 'CANCELLED',
      StatusOrder: 10,
      StatusColor: '#6B7280', // Gray
      IsActive: true,
      CreatedDate: new Date('2024-01-24'),
      CreatedBy: 1
    },
    {
      lid: 11,
      StatusName: 'Under Review',
      StatusCode: 'REVIEW',
      StatusOrder: 11,
      StatusColor: '#F97316', // Orange
      IsActive: false,
      CreatedDate: new Date('2024-01-25'),
      CreatedBy: 1,
      ModifiedDate: new Date('2024-02-15'),
      ModifiedBy: 2
    },
    {
      lid: 12,
      StatusName: 'Payment Pending',
      StatusCode: 'PAY_PEND',
      StatusOrder: 12,
      StatusColor: '#EF4444', // Red
      IsActive: true,
      CreatedDate: new Date('2024-01-26'),
      CreatedBy: 1
    }
  ];

  getAllJobStatuses(): Observable<JobStatus[]> {
    return of(this.jobStatuses.sort((a, b) => a.StatusOrder - b.StatusOrder));
  }

  getActiveJobStatuses(): Observable<JobStatus[]> {
    return of(this.jobStatuses
      .filter(status => status.IsActive)
      .sort((a, b) => a.StatusOrder - b.StatusOrder)
    );
  }

  getJobStatusById(lid: number): Observable<JobStatus | undefined> {
    return of(this.jobStatuses.find(status => status.lid === lid));
  }

  getJobStatusByCode(statusCode: string): Observable<JobStatus | undefined> {
    return of(this.jobStatuses.find(status => status.StatusCode === statusCode));
  }

  createJobStatus(jobStatus: Omit<JobStatus, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<JobStatus> {
    const newJobStatus: JobStatus = {
      ...jobStatus,
      lid: Math.max(...this.jobStatuses.map(js => js.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.jobStatuses.push(newJobStatus);
    return of(newJobStatus);
  }

  updateJobStatus(lid: number, jobStatus: Partial<JobStatus>): Observable<JobStatus | null> {
    const index = this.jobStatuses.findIndex(js => js.lid === lid);
    if (index !== -1) {
      this.jobStatuses[index] = { 
        ...this.jobStatuses[index], 
        ...jobStatus, 
        ModifiedDate: new Date(),
        ModifiedBy: 1 // Current user ID
      };
      return of(this.jobStatuses[index]);
    }
    return of(null);
  }

  deleteJobStatus(lid: number): Observable<boolean> {
    const index = this.jobStatuses.findIndex(js => js.lid === lid);
    if (index !== -1) {
      this.jobStatuses.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  toggleJobStatusActive(lid: number): Observable<JobStatus | null> {
    const index = this.jobStatuses.findIndex(js => js.lid === lid);
    if (index !== -1) {
      this.jobStatuses[index].IsActive = !this.jobStatuses[index].IsActive;
      this.jobStatuses[index].ModifiedDate = new Date();
      this.jobStatuses[index].ModifiedBy = 1; // Current user ID
      return of(this.jobStatuses[index]);
    }
    return of(null);
  }

  reorderJobStatuses(statusIds: number[]): Observable<JobStatus[]> {
    statusIds.forEach((id, index) => {
      const statusIndex = this.jobStatuses.findIndex(js => js.lid === id);
      if (statusIndex !== -1) {
        this.jobStatuses[statusIndex].StatusOrder = index + 1;
        this.jobStatuses[statusIndex].ModifiedDate = new Date();
        this.jobStatuses[statusIndex].ModifiedBy = 1; // Current user ID
      }
    });
    return of(this.jobStatuses.sort((a, b) => a.StatusOrder - b.StatusOrder));
  }
}
