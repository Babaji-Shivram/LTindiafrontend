import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
      lid: 1,
      VehicleNumber: 'MH-01-AB-1234',
      VehicleType: 'Truck',
      Capacity: 10.5,
      DriverName: 'Rajesh Kumar',
      DriverMobile: '+91-9876543210',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      VehicleNumber: 'TN-09-CD-5678',
      VehicleType: 'Container',
      Capacity: 25.0,
      DriverName: 'Suresh Babu',
      DriverMobile: '+91-9876543211',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 3,
      VehicleNumber: 'KA-05-EF-9012',
      VehicleType: 'Trailer',
      Capacity: 40.0,
      DriverName: 'Mahesh Reddy',
      DriverMobile: '+91-9876543212',
      IsActive: true,
      CreatedDate: new Date('2024-02-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      VehicleNumber: 'GJ-01-GH-3456',
      VehicleType: 'Van',
      Capacity: 3.5,
      DriverName: 'Amit Patel',
      DriverMobile: '+91-9876543213',
      IsActive: true,
      CreatedDate: new Date('2024-02-05'),
      CreatedBy: 1
    },
    {
      lid: 5,
      VehicleNumber: 'DL-02-IJ-7890',
      VehicleType: 'Truck',
      Capacity: 15.0,
      DriverName: 'Ramesh Singh',
      DriverMobile: '+91-9876543214',
      IsActive: false,
      CreatedDate: new Date('2024-02-10'),
      CreatedBy: 1
    },
    {
      lid: 6,
      VehicleNumber: 'WB-03-KL-2345',
      VehicleType: 'Container',
      Capacity: 30.0,
      DriverName: 'Biswajit Das',
      DriverMobile: '+91-9876543215',
      IsActive: true,
      CreatedDate: new Date('2024-02-15'),
      CreatedBy: 1
    },
    {
      lid: 7,
      VehicleNumber: 'AP-07-MN-6789',
      VehicleType: 'Pickup',
      Capacity: 2.0,
      DriverName: 'Venkat Rao',
      DriverMobile: '+91-9876543216',
      IsActive: true,
      CreatedDate: new Date('2024-02-20'),
      CreatedBy: 1
    },
    {
      lid: 8,
      VehicleNumber: 'RJ-14-OP-0123',
      VehicleType: 'Trailer',
      Capacity: 45.0,
      DriverName: 'Mohan Sharma',
      DriverMobile: '+91-9876543217',
      IsActive: true,
      CreatedDate: new Date('2024-02-25'),
      CreatedBy: 1
    }
  ];

  getAllVehicles(): Observable<Vehicle[]> {
    return of(this.vehicles);
  }

  getVehicleById(lid: number): Observable<Vehicle | undefined> {
    return of(this.vehicles.find(vehicle => vehicle.lid === lid));
  }

  createVehicle(vehicle: Omit<Vehicle, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<Vehicle> {
    const newVehicle: Vehicle = {
      ...vehicle,
      lid: Math.max(...this.vehicles.map(v => v.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.vehicles.push(newVehicle);
    return of(newVehicle);
  }

  updateVehicle(lid: number, vehicle: Partial<Vehicle>): Observable<Vehicle | null> {
    const index = this.vehicles.findIndex(v => v.lid === lid);
    if (index !== -1) {
      this.vehicles[index] = { 
        ...this.vehicles[index], 
        ...vehicle
      };
      return of(this.vehicles[index]);
    }
    return of(null);
  }

  deleteVehicle(lid: number): Observable<boolean> {
    const index = this.vehicles.findIndex(v => v.lid === lid);
    if (index !== -1) {
      this.vehicles.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
