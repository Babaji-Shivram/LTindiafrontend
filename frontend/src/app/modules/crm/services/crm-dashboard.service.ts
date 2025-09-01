import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardKPI {
  title: string;
  count: number;
  color: string;
  icon: string;
  emoji: string;
  route: string;
  bgColor: string;
  trend?: number; // percentage change
}

export interface FilterOptions {
  month: string;
  companySearch: string;
  salesPerson: string;
}

export interface CustomerOnBoard {
  sl: number;
  customer: string;
  createdBy: string;
  onBoardDate: string;
}

export interface VisitData {
  sl: number;
  company: string;
  visitCategory: string;
  notes: string;
  visitDate: string;
  createdBy: string;
}

export interface TargetMonthLead {
  sl: number;
  companyName: string;
  leadRefNo: string;
  leadOwner: string;
  targetMonths: string;
  remark: string;
}

export interface VolumeSummary {
  sl: number;
  customerName: string;
  noOfJobs: number;
  noOfContainer: number;
  noOfLCL: number;
  noOfAirShipment: number;
}

export interface ContractExpiry {
  sl: number;
  companyName: string;
  leadRefNo: string;
  leadOwner: string;
  expiryDate: string;
  remark: string;
}

export interface FollowupLead {
  sl: number;
  companyName: string;
  leadRefNo: string;
  leadOwner: string;
  followupDate: string;
  followupBy: string;
  remark: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrmDashboardService {

  constructor() { }

  getKPIData(): Observable<DashboardKPI[]> {
    const kpiData: DashboardKPI[] = [
      {
        title: 'Lead',
        count: 145,
        color: '#10b981',
        bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        icon: 'Lead.png',
        emoji: '📊',
        route: '/crm/leads',
        trend: 12.5
      },
      {
        title: 'Lead Approved',
        count: 89,
        color: '#3b82f6',
        bgColor: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        icon: 'LeadApproved.jpg',
        emoji: '✅',
        route: '/crm/leads?status=approved',
        trend: 8.3
      },
      {
        title: 'Quote',
        count: 67,
        color: '#f59e0b',
        bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        icon: 'Quote.png',
        emoji: '💰',
        route: '/crm/quotes',
        trend: -2.1
      },
      {
        title: 'Contract Approval',
        count: 23,
        color: '#8b5cf6',
        bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        icon: 'ContractApproval.png',
        emoji: '📋',
        route: '/crm/contracts',
        trend: 15.7
      },
      {
        title: 'Rejected',
        count: 12,
        color: '#ef4444',
        bgColor: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        icon: 'LeadRejected.png',
        emoji: '⚪',
        route: '/crm/leads?status=rejected',
        trend: -5.2
      }
    ];

    return of(kpiData).pipe(delay(500)); // Simulate API delay
  }

  getCustomerOnBoardData(filters?: FilterOptions): Observable<CustomerOnBoard[]> {
    const data: CustomerOnBoard[] = [
      { sl: 1, customer: 'Maersk Line India Pvt Ltd', createdBy: 'John Doe', onBoardDate: '15/08/2025' },
      { sl: 2, customer: 'Hapag Lloyd AG', createdBy: 'Jane Smith', onBoardDate: '12/08/2025' },
      { sl: 3, customer: 'MSC India Pvt Ltd', createdBy: 'Mike Johnson', onBoardDate: '10/08/2025' },
      { sl: 4, customer: 'CMA CGM India Pvt Ltd', createdBy: 'Sarah Wilson', onBoardDate: '08/08/2025' },
      { sl: 5, customer: 'Evergreen Marine Corp', createdBy: 'John Doe', onBoardDate: '05/08/2025' },
      { sl: 6, customer: 'COSCO Shipping Lines', createdBy: 'Jane Smith', onBoardDate: '03/08/2025' },
      { sl: 7, customer: 'Yang Ming Marine Transport', createdBy: 'Mike Johnson', onBoardDate: '01/08/2025' },
      { sl: 8, customer: 'Hyundai Merchant Marine', createdBy: 'Sarah Wilson', onBoardDate: '28/07/2025' }
    ];

    return of(data).pipe(delay(300));
  }

  getVisitsData(filters?: FilterOptions): Observable<VisitData[]> {
    const data: VisitData[] = [
      { 
        sl: 1, 
        company: 'Maersk Line India Pvt Ltd', 
        visitCategory: 'Initial Meeting', 
        notes: 'Discussed export requirements for automotive parts to Europe. Potential volume 50 containers per month. Client interested in long-term partnership.', 
        visitDate: '20/08/2025', 
        createdBy: 'John Doe' 
      },
      { 
        sl: 2, 
        company: 'Hapag Lloyd AG', 
        visitCategory: 'Follow-up', 
        notes: 'Rate negotiation for bulk cargo shipments. Competitor analysis completed. Proposed 15% discount for annual contract.', 
        visitDate: '18/08/2025', 
        createdBy: 'Jane Smith' 
      },
      { 
        sl: 3, 
        company: 'MSC India Pvt Ltd', 
        visitCategory: 'Contract Review', 
        notes: 'Annual contract renewal discussion. Service quality feedback positive. Requested additional services for LCL consolidation.', 
        visitDate: '15/08/2025', 
        createdBy: 'Mike Johnson' 
      },
      { 
        sl: 4, 
        company: 'CMA CGM India Pvt Ltd', 
        visitCategory: 'New Service', 
        notes: 'Introduction of new LCL consolidation service to West Africa routes. Client showed interest in trial shipments.', 
        visitDate: '12/08/2025', 
        createdBy: 'Sarah Wilson' 
      },
      { 
        sl: 5, 
        company: 'Evergreen Marine Corp', 
        visitCategory: 'Issue Resolution', 
        notes: 'Resolved delivery delay issues and process improvement discussion. Implemented new tracking system for better visibility.', 
        visitDate: '10/08/2025', 
        createdBy: 'John Doe' 
      }
    ];

    return of(data).pipe(delay(300));
  }

  getTargetLeadsData(filters?: FilterOptions): Observable<TargetMonthLead[]> {
    const data: TargetMonthLead[] = [
      { sl: 1, companyName: 'Tata Motors Export Division', leadRefNo: 'LD2025001', leadOwner: 'John Doe', targetMonths: 'Sep-Oct 2025', remark: 'High potential automotive export client with projected 100+ containers monthly' },
      { sl: 2, companyName: 'Bajaj Auto International', leadRefNo: 'LD2025002', leadOwner: 'Jane Smith', targetMonths: 'Oct-Nov 2025', remark: 'Motorcycle export to Southeast Asia markets, established relationship' },
      { sl: 3, companyName: 'Mahindra Logistics', leadRefNo: 'LD2025003', leadOwner: 'Mike Johnson', targetMonths: 'Sep 2025', remark: 'Container transportation services for domestic and international routes' },
      { sl: 4, companyName: 'Reliance Industries Export', leadRefNo: 'LD2025004', leadOwner: 'Sarah Wilson', targetMonths: 'Nov-Dec 2025', remark: 'Petrochemical products export to Middle East and Europe' },
      { sl: 5, companyName: 'Wipro Global Trade', leadRefNo: 'LD2025005', leadOwner: 'John Doe', targetMonths: 'Oct 2025', remark: 'IT equipment export to US and European markets' }
    ];

    return of(data).pipe(delay(300));
  }

  getVolumeSummaryData(filters?: FilterOptions): Observable<VolumeSummary[]> {
    const data: VolumeSummary[] = [
      { sl: 1, customerName: 'Maersk Line India Pvt Ltd', noOfJobs: 125, noOfContainer: 450, noOfLCL: 89, noOfAirShipment: 23 },
      { sl: 2, customerName: 'Hapag Lloyd AG', noOfJobs: 98, noOfContainer: 356, noOfLCL: 67, noOfAirShipment: 18 },
      { sl: 3, customerName: 'MSC India Pvt Ltd', noOfJobs: 87, noOfContainer: 298, noOfLCL: 54, noOfAirShipment: 15 },
      { sl: 4, customerName: 'CMA CGM India Pvt Ltd', noOfJobs: 76, noOfContainer: 267, noOfLCL: 45, noOfAirShipment: 12 },
      { sl: 5, customerName: 'Evergreen Marine Corp', noOfJobs: 65, noOfContainer: 234, noOfLCL: 38, noOfAirShipment: 9 },
      { sl: 6, customerName: 'COSCO Shipping Lines', noOfJobs: 54, noOfContainer: 198, noOfLCL: 32, noOfAirShipment: 7 },
      { sl: 7, customerName: 'Yang Ming Marine Transport', noOfJobs: 43, noOfContainer: 156, noOfLCL: 28, noOfAirShipment: 5 }
    ];

    return of(data).pipe(delay(300));
  }

  getContractExpiryData(filters?: FilterOptions): Observable<ContractExpiry[]> {
    const data: ContractExpiry[] = [
      { sl: 1, companyName: 'Maersk Line India Pvt Ltd', leadRefNo: 'CNT2024012', leadOwner: 'John Doe', expiryDate: '30/11/2025', remark: 'High value contract renewal required, priority client' },
      { sl: 2, companyName: 'Hapag Lloyd AG', leadRefNo: 'CNT2024008', leadOwner: 'Jane Smith', expiryDate: '15/12/2025', remark: 'Rate revision discussion pending, competitive market pressure' },
      { sl: 3, companyName: 'MSC India Pvt Ltd', leadRefNo: 'CNT2024015', leadOwner: 'Mike Johnson', expiryDate: '20/11/2025', remark: 'Service enhancement required, customer satisfaction metrics below target' },
      { sl: 4, companyName: 'CMA CGM India Pvt Ltd', leadRefNo: 'CNT2024022', leadOwner: 'Sarah Wilson', expiryDate: '10/12/2025', remark: 'Volume commitment increase needed for better rates' },
      { sl: 5, companyName: 'Evergreen Marine Corp', leadRefNo: 'CNT2024009', leadOwner: 'John Doe', expiryDate: '25/11/2025', remark: 'Multi-year contract proposal under consideration' }
    ];

    return of(data).pipe(delay(300));
  }

  getFollowupLeadsData(filters?: FilterOptions): Observable<FollowupLead[]> {
    const data: FollowupLead[] = [
      { sl: 1, companyName: 'Tata Steel Export Division', leadRefNo: 'FU2025001', leadOwner: 'John Doe', followupDate: '05/09/2025', followupBy: 'John Doe', remark: 'Proposal submission pending, awaiting management approval' },
      { sl: 2, companyName: 'Infosys Global Logistics', leadRefNo: 'FU2025002', leadOwner: 'Jane Smith', followupDate: '08/09/2025', followupBy: 'Jane Smith', remark: 'Technical clarification required for IT equipment transportation' },
      { sl: 3, companyName: 'L&T Construction Export', leadRefNo: 'FU2025003', leadOwner: 'Mike Johnson', followupDate: '10/09/2025', followupBy: 'Mike Johnson', remark: 'Heavy equipment transportation quote preparation in progress' },
      { sl: 4, companyName: 'Asian Paints International', leadRefNo: 'FU2025004', leadOwner: 'Sarah Wilson', followupDate: '12/09/2025', followupBy: 'Sarah Wilson', remark: 'Hazmat certification discussion and compliance requirements' },
      { sl: 5, companyName: 'Dr Reddys Pharma Export', leadRefNo: 'FU2025005', leadOwner: 'John Doe', followupDate: '15/09/2025', followupBy: 'John Doe', remark: 'Cold chain logistics requirement analysis and cost estimation' }
    ];

    return of(data).pipe(delay(300));
  }

  getSalesPersonList(): Observable<{value: string, label: string}[]> {
    const salesPersons = [
      { value: '', label: 'All Sales Persons' },
      { value: 'john-doe', label: 'John Doe' },
      { value: 'jane-smith', label: 'Jane Smith' },
      { value: 'mike-johnson', label: 'Mike Johnson' },
      { value: 'sarah-wilson', label: 'Sarah Wilson' },
      { value: 'david-brown', label: 'David Brown' },
      { value: 'lisa-davis', label: 'Lisa Davis' }
    ];

    return of(salesPersons).pipe(delay(200));
  }

  // Method to export data to Excel format (future implementation)
  exportToExcel(data: any[], filename: string): void {
    console.log(`Exporting ${data.length} records to ${filename}.xlsx`);
    // Future implementation with ExcelJS or similar library
  }

  // Method to refresh dashboard data (future implementation with real API)
  refreshDashboard(filters: FilterOptions): Observable<any> {
    console.log('Refreshing dashboard with filters:', filters);
    return of({ success: true, message: 'Dashboard refreshed successfully' }).pipe(delay(1000));
  }
}
