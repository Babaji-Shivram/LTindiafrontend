import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private customers: Customer[] = [
    {
      lid: 1,
      custName: 'ABC Industries Ltd',
      email: 'contact@abcindustries.com',
      address: '123 Industrial Estate, Andheri East, Mumbai, Maharashtra',
      contactPerson: 'Rajesh Mehta',
      mobileNo: '+91 98765 43210',
      contactNo: '+91 22 2345 6789',
      website: 'www.abcindustries.com',
      gstNo: '27ABCPD1234E1Z5',
      panNo: 'ABCPD1234E',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400069',
      creditLimit: 500000,
      creditDays: 30,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-15')
    },
    {
      lid: 2,
      custName: 'XYZ Logistics Pvt Ltd',
      email: 'vendor@xyzlogistics.com',
      address: '456 Transport Nagar, Whitefield, Bangalore, Karnataka',
      contactPerson: 'Suresh Kumar',
      mobileNo: '+91 98765 43211',
      contactNo: '+91 80 2345 6789',
      website: 'www.xyzlogistics.com',
      gstNo: '29XYZPV5678F1A2',
      panNo: 'XYZPV5678F',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560066',
      creditLimit: 200000,
      creditDays: 15,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-20')
    },
    {
      lid: 3,
      custName: 'Global Shipping Supplies',
      email: 'supplies@globalshipping.com',
      address: '789 Port Area, Kandla, Gandhidham, Gujarat',
      contactPerson: 'Priya Sharma',
      mobileNo: '+91 98765 43212',
      contactNo: '+91 2836 234567',
      website: 'www.globalshipping.com',
      gstNo: '24GLBSP9012G1B3',
      panNo: 'GLBSP9012G',
      city: 'Gandhidham',
      state: 'Gujarat',
      country: 'India',
      pincode: '370201',
      creditLimit: 150000,
      creditDays: 45,
      bDel: true,
      lUser: 1,
      dEntry: new Date('2024-02-01')
    },
    {
      lid: 4,
      custName: 'Coastal Freight Agents',
      email: 'agents@coastalfreight.com',
      address: '321 Marine Drive, Fort, Mumbai, Maharashtra',
      contactPerson: 'Anil Desai',
      mobileNo: '+91 98765 43213',
      contactNo: '+91 22 6789 0123',
      website: 'www.coastalfreight.com',
      gstNo: '27CSTFR3456H1C4',
      panNo: 'CSTFR3456H',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      creditLimit: 100000,
      creditDays: 0,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-02-10')
    }
  ];

  getAllCustomers(): Observable<Customer[]> {
    return of(this.customers.filter(customer => !customer.bDel));
  }

  getCustomerById(lid: number): Observable<Customer | undefined> {
    return of(this.customers.find(customer => customer.lid === lid && !customer.bDel));
  }

  createCustomer(customer: Omit<Customer, 'lid' | 'dEntry' | 'lUser'>): Observable<Customer> {
    const newCustomer: Customer = {
      ...customer,
      lid: Math.max(...this.customers.map(c => c.lid)) + 1,
      dEntry: new Date(),
      lUser: 1 // Current user ID
    };
    this.customers.push(newCustomer);
    return of(newCustomer);
  }

  updateCustomer(lid: number, customer: Partial<Customer>): Observable<Customer | null> {
    const index = this.customers.findIndex(c => c.lid === lid);
    if (index !== -1) {
      this.customers[index] = { 
        ...this.customers[index], 
        ...customer,
        lUser: 1 // Current user ID
      };
      return of(this.customers[index]);
    }
    return of(null);
  }

  deleteCustomer(lid: number): Observable<boolean> {
    const index = this.customers.findIndex(c => c.lid === lid);
    if (index !== -1) {
      this.customers[index].bDel = true;
      this.customers[index].lUser = 1; // Current user ID
      return of(true);
    }
    return of(false);
  }
}
