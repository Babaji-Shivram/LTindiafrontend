export interface Customer {
  lid: number;               // Primary Key (Customer ID)
  custName: string;          // Customer Name
  email: string;             // Email Address
  address: string;           // Customer Address
  contactPerson: string;     // Contact Person Name
  mobileNo: string;          // Mobile Number
  contactNo: string;         // Landline Number
  website: string;           // Website URL
  gstNo: string;             // GST Number
  panNo: string;             // PAN Number
  city: string;              // City
  state: string;             // State
  country: string;           // Country
  pincode: string;           // PIN Code
  creditLimit: number;       // Credit Limit
  creditDays: number;        // Credit Days
  bDel: boolean;             // Deletion Flag
  lUser: number;             // Created By User
  dEntry: Date;              // Entry Date
}
