export interface Vehicle {
  lid: number;                  // Primary Key
  VehicleNumber: string;        // Vehicle Number
  VehicleType: string;          // Vehicle Type
  Capacity: number;             // Capacity
  DriverName: string;           // Driver Name
  DriverMobile: string;         // Driver Mobile
  IsActive: boolean;            // Active Status
  CreatedDate: Date;            // Created Date
  CreatedBy: number;            // Created By User ID
}
