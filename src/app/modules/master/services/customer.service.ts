import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerList: Customer[] = [
    {
      lid: 1,
      custName: 'Tata Steel Limited',
      email: 'procurement@tatasteel.com',
      address: 'Bombay House, 24 Homi Mody Street, Mumbai',
      contactPerson: 'Rajesh Kumar',
      mobileNo: '+91-9876543210',
      contactNo: '+91-22-66658282',
      website: 'www.tatasteel.com',
      gstNo: '27AAACT2727Q1ZT',
      panNo: 'AAACT2727Q',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      creditLimit: 50000000,
      creditDays: 45,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-15')
    },
    {
      lid: 2,
      custName: 'Reliance Industries Ltd',
      email: 'logistics@ril.com',
      address: '3rd Floor, Maker Chambers IV, Nariman Point, Mumbai',
      contactPerson: 'Priya Sharma',
      mobileNo: '+91-9123456789',
      contactNo: '+91-22-30386000',
      website: 'www.ril.com',
      gstNo: '27AAACR5055K1Z7',
      panNo: 'AAACR5055K',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400021',
      creditLimit: 75000000,
      creditDays: 30,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-16')
    },
    {
      lid: 3,
      custName: 'Adani Ports and SEZ',
      email: 'operations@adaniports.com',
      address: 'Adani Corporate House, Shantigram, S G Highway, Ahmedabad',
      contactPerson: 'Vikram Patel',
      mobileNo: '+91-9988776655',
      contactNo: '+91-79-26565555',
      website: 'www.adaniports.com',
      gstNo: '24AAACA3986B1ZE',
      panNo: 'AAACA3986B',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      pincode: '382421',
      creditLimit: 60000000,
      creditDays: 60,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-17')
    },
    {
      lid: 4,
      custName: 'Container Corporation of India',
      email: 'business@concorindia.com',
      address: 'CONCOR Bhawan, Plot No. 4&5, Sector-9, CBD Belapur, Navi Mumbai',
      contactPerson: 'Anita Singh',
      mobileNo: '+91-9765432198',
      contactNo: '+91-22-27576029',
      website: 'www.concorindia.co.in',
      gstNo: '27AAACC7821L1ZX',
      panNo: 'AAACC7821L',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400614',
      creditLimit: 40000000,
      creditDays: 45,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-18')
    },
    {
      lid: 5,
      custName: 'Maersk Line India',
      email: 'india.bookings@maersk.com',
      address: 'Nirmal Building, Nariman Point, Mumbai',
      contactPerson: 'David Johnson',
      mobileNo: '+91-9345678901',
      contactNo: '+91-22-30726000',
      website: 'www.maersk.com',
      gstNo: '27AABCM3208N1Z1',
      panNo: 'AABCM3208N',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400021',
      creditLimit: 80000000,
      creditDays: 30,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-19')
    },
    {
      lid: 6,
      custName: 'CMA CGM India',
      email: 'bookings@cma-cgm.com',
      address: 'Express Towers, Nariman Point, Mumbai',
      contactPerson: 'Sophie Martin',
      mobileNo: '+91-9234567890',
      contactNo: '+91-22-67596000',
      website: 'www.cma-cgm.com',
      gstNo: '27AADCC8956L1ZP',
      panNo: 'AADCC8956L',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400021',
      creditLimit: 70000000,
      creditDays: 45,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-20')
    },
    {
      lid: 7,
      custName: 'Hindustan Petroleum Corp',
      email: 'logistics@hpcl.co.in',
      address: 'Petroleum House, 17 Jamshedji Tata Road, Mumbai',
      contactPerson: 'Suresh Reddy',
      mobileNo: '+91-9876543211',
      contactNo: '+91-22-22863911',
      website: 'www.hindustanpetroleum.com',
      gstNo: '27AAACH6272J1ZC',
      panNo: 'AAACH6272J',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400020',
      creditLimit: 45000000,
      creditDays: 30,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-21')
    },
    {
      lid: 8,
      custName: 'Larsen & Toubro Limited',
      email: 'procurement@larsentoubro.com',
      address: 'L&T House, Ballard Estate, Mumbai',
      contactPerson: 'Ramesh Gupta',
      mobileNo: '+91-9654321098',
      contactNo: '+91-22-67525656',
      website: 'www.larsentoubro.com',
      gstNo: '27AAACL0004A1ZE',
      panNo: 'AAACL0004A',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      creditLimit: 55000000,
      creditDays: 60,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-22')
    },
    {
      lid: 9,
      custName: 'Essar Shipping Limited',
      email: 'operations@essarshipping.com',
      address: 'Essar House, 11 Keshavrao Khadye Marg, Mumbai',
      contactPerson: 'Kavita Joshi',
      mobileNo: '+91-9543210987',
      contactNo: '+91-22-66017000',
      website: 'www.essarshipping.com',
      gstNo: '27AAACE4452D1ZH',
      panNo: 'AAACE4452D',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400034',
      creditLimit: 35000000,
      creditDays: 45,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-23')
    },
    {
      lid: 10,
      custName: 'JSW Steel Limited',
      email: 'logistics@jswsteel.in',
      address: 'JSW Centre, Bandra Kurla Complex, Mumbai',
      contactPerson: 'Amit Desai',
      mobileNo: '+91-9432109876',
      contactNo: '+91-22-42861000',
      website: 'www.jswsteel.in',
      gstNo: '27AAACJ4226C1ZL',
      panNo: 'AAACJ4226C',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400051',
      creditLimit: 50000000,
      creditDays: 45,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-24')
    },
    {
      lid: 11,
      custName: 'MSC Mediterranean Shipping',
      email: 'india@msc.com',
      address: 'MSC House, Fort, Mumbai',
      contactPerson: 'Marco Rossi',
      mobileNo: '+91-9321098765',
      contactNo: '+91-22-22618700',
      website: 'www.msc.com',
      gstNo: '27AABCM5678P1Z9',
      panNo: 'AABCM5678P',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      creditLimit: 85000000,
      creditDays: 30,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-25')
    },
    {
      lid: 12,
      custName: 'Hapag-Lloyd India',
      email: 'bookings.india@hlag.com',
      address: 'Commercial House, Nariman Point, Mumbai',
      contactPerson: 'Klaus Weber',
      mobileNo: '+91-9210987654',
      contactNo: '+91-22-22874400',
      website: 'www.hapag-lloyd.com',
      gstNo: '27AAHHI9876K1Z2',
      panNo: 'AAHHI9876K',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400021',
      creditLimit: 75000000,
      creditDays: 45,
      bDel: false,
      lUser: 1,
      dEntry: new Date('2024-01-26')
    }
  ];

  constructor() {}

  getAllCustomers(): Observable<Customer[]> {
    return of(this.customerList.filter(customer => !customer.bDel));
  }

  getActiveCustomers(): Observable<Customer[]> {
    return of(this.customerList.filter(customer => !customer.bDel));
  }

  getCustomerById(id: number): Observable<Customer | undefined> {
    return of(this.customerList.find(customer => customer.lid === id && !customer.bDel));
  }

  searchCustomers(searchTerm: string): Observable<Customer[]> {
    if (!searchTerm.trim()) {
      return this.getAllCustomers();
    }

    const filtered = this.customerList.filter(customer =>
      !customer.bDel && (
        customer.custName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.gstNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.panNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return of(filtered);
  }

  getCustomersByCity(city: string): Observable<Customer[]> {
    return of(this.customerList.filter(customer => 
      !customer.bDel && customer.city.toLowerCase() === city.toLowerCase()
    ));
  }

  getCustomersByState(state: string): Observable<Customer[]> {
    return of(this.customerList.filter(customer => 
      !customer.bDel && customer.state.toLowerCase() === state.toLowerCase()
    ));
  }

  createCustomer(customer: Omit<Customer, 'lid' | 'dEntry' | 'lUser' | 'bDel'>): Observable<Customer> {
    const newCustomer: Customer = {
      ...customer,
      lid: Math.max(...this.customerList.map(c => c.lid)) + 1,
      dEntry: new Date(),
      lUser: 1, // Current user ID
      bDel: false
    };

    this.customerList.push(newCustomer);
    return of(newCustomer);
  }

  updateCustomer(id: number, updates: Partial<Customer>): Observable<Customer | null> {
    const index = this.customerList.findIndex(customer => customer.lid === id && !customer.bDel);
    
    if (index === -1) {
      return of(null);
    }

    this.customerList[index] = {
      ...this.customerList[index],
      ...updates,
      lid: id // Ensure ID doesn't change
    };

    return of(this.customerList[index]);
  }

  deleteCustomer(id: number): Observable<boolean> {
    const customer = this.customerList.find(c => c.lid === id);
    
    if (!customer) {
      return of(false);
    }

    // Soft delete
    customer.bDel = true;
    return of(true);
  }

  // Get customers with high credit limits
  getHighValueCustomers(): Observable<Customer[]> {
    return of(this.customerList.filter(customer => 
      !customer.bDel && customer.creditLimit >= 50000000
    ));
  }

  // Get customers by credit days range
  getCustomersByCreditDays(minDays: number, maxDays: number): Observable<Customer[]> {
    return of(this.customerList.filter(customer => 
      !customer.bDel && 
      customer.creditDays >= minDays && 
      customer.creditDays <= maxDays
    ));
  }

  // Get customer statistics
  getCustomerStats(): Observable<{
    totalCustomers: number;
    totalCreditLimit: number;
    averageCreditDays: number;
    topCities: { city: string; count: number }[];
  }> {
    const activeCustomers = this.customerList.filter(c => !c.bDel);
    
    const totalCustomers = activeCustomers.length;
    const totalCreditLimit = activeCustomers.reduce((sum, c) => sum + c.creditLimit, 0);
    const averageCreditDays = activeCustomers.reduce((sum, c) => sum + c.creditDays, 0) / totalCustomers;
    
    // Count customers by city
    const cityCount: { [city: string]: number } = {};
    activeCustomers.forEach(c => {
      cityCount[c.city] = (cityCount[c.city] || 0) + 1;
    });
    
    const topCities = Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return of({
      totalCustomers,
      totalCreditLimit,
      averageCreditDays: Math.round(averageCreditDays),
      topCities
    });
  }
}
