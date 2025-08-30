import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Lead, LeadStageMS, LeadSourceMS, CompanyMS, CompanyTypeMS, BusinessCategoryMS, RoleMS, LeadFormData } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class MockCrmService {
  private leadsSubject = new BehaviorSubject<Lead[]>([
    { 
      id: 'L-1001', 
      companyID: 'C-1001',
      company: 'Acme Exports', 
      contact: 'Priya N', 
      email: 'priya@acme.com', 
      mobileNo: '+91-98765-43210',
      leadStageID: 'LS-1',
      stage: 'New', 
      leadSourceID: 'LSR-1',
      leadSourceValue: 'Website Contact Form',
      owner: 'Alex', 
      value: 250000, 
      nextFollowUp: '2025-09-02', 
      createdOn: '2025-08-20',
      isEnquiry: true,
      companyTypeID: 'CT-1'
    },
    { 
      id: 'L-1002', 
      companyID: 'C-1002',
      company: 'Marina Logistics', 
      contact: 'Ravi K', 
      email: 'ravi@marina.com',
      phone: '+91-98765', 
      mobileNo: '+91-98765-12345',
      leadStageID: 'LS-3',
      stage: 'Proposal', 
      leadSourceID: 'LSR-2',
      leadSourceValue: 'Trade Show Chennai',
      owner: 'Dana', 
      value: 180000, 
      nextFollowUp: '2025-08-31', 
      createdOn: '2025-08-18',
      isQuote: true,
      companyTypeID: 'CT-2'
    },
    { 
      id: 'L-1003', 
      companyID: 'C-1003',
      company: 'Zen Traders', 
      contact: 'Ishita S', 
      email: 'ishita@zen.com', 
      mobileNo: '+91-99887-66554',
      leadStageID: 'LS-5',
      stage: 'Approval Pending', 
      leadSourceID: 'LSR-3',
      leadSourceValue: 'Referral - Existing Client',
      owner: 'Alex', 
      value: 620000, 
      nextFollowUp: '2025-09-03', 
      createdOn: '2025-08-22',
      isKYC: true,
      companyTypeID: 'CT-1'
    },
  ]);

  // Mock master data
  private _leadStages: LeadStageMS[] = [
    { leadStageID: 'LS-1', stageName: 'New', stageOrder: 1, isActive: true },
    { leadStageID: 'LS-2', stageName: 'Qualified', stageOrder: 2, isActive: true },
    { leadStageID: 'LS-3', stageName: 'Proposal', stageOrder: 3, isActive: true },
    { leadStageID: 'LS-4', stageName: 'Negotiation', stageOrder: 4, isActive: true },
    { leadStageID: 'LS-5', stageName: 'Approval Pending', stageOrder: 5, isActive: true },
    { leadStageID: 'LS-6', stageName: 'Won', stageOrder: 6, isActive: true },
    { leadStageID: 'LS-7', stageName: 'Lost', stageOrder: 7, isActive: true },
    { leadStageID: 'LS-8', stageName: 'On Hold', stageOrder: 8, isActive: true },
    { leadStageID: 'LS-9', stageName: 'Rejected', stageOrder: 9, isActive: true }
  ];

  private _leadSources: LeadSourceMS[] = [
    { leadSourceID: 'LSR-1', sourceName: 'Website', isActive: true },
    { leadSourceID: 'LSR-2', sourceName: 'Trade Show', isActive: true },
    { leadSourceID: 'LSR-3', sourceName: 'Referral', isActive: true },
    { leadSourceID: 'LSR-4', sourceName: 'Cold Call', isActive: true },
    { leadSourceID: 'LSR-5', sourceName: 'Email Campaign', isActive: true },
    { leadSourceID: 'LSR-6', sourceName: 'Social Media', isActive: true },
    { leadSourceID: 'LSR-7', sourceName: 'Partner', isActive: true }
  ];

  private _companies: CompanyMS[] = [
    { companyID: 'C-1001', companyName: 'Acme Exports', companyCode: 'ACM001', isActive: true },
    { companyID: 'C-1002', companyName: 'Marina Logistics', companyCode: 'MAR002', isActive: true },
    { companyID: 'C-1003', companyName: 'Zen Traders', companyCode: 'ZEN003', isActive: true },
    { companyID: 'C-1004', companyName: 'Alpha Logistics', companyCode: 'ALP004', isActive: true },
    { companyID: 'C-1005', companyName: 'Beta Shipping Co', companyCode: 'BSC005', isActive: true }
  ];

  private _companyTypes: CompanyTypeMS[] = [
    { companyTypeID: 'CT-1', typeName: 'Importer', isActive: true },
    { companyTypeID: 'CT-2', typeName: 'Exporter', isActive: true },
    { companyTypeID: 'CT-3', typeName: 'Freight Forwarder', isActive: true },
    { companyTypeID: 'CT-4', typeName: 'Logistics Provider', isActive: true }
  ];

  private _businessCategories: BusinessCategoryMS[] = [
    { businessCategoryID: 'BC-1', categoryName: 'Manufacturing', isActive: true },
    { businessCategoryID: 'BC-2', categoryName: 'Technology', isActive: true },
    { businessCategoryID: 'BC-3', categoryName: 'Retail', isActive: true },
    { businessCategoryID: 'BC-4', categoryName: 'Healthcare', isActive: true }
  ];

  private _roles: RoleMS[] = [
    { roleId: 'R-1', roleName: 'Decision Maker', isActive: true },
    { roleId: 'R-2', roleName: 'Influencer', isActive: true },
    { roleId: 'R-3', roleName: 'User', isActive: true },
    { roleId: 'R-4', roleName: 'Gatekeeper', isActive: true }
  ];

  leads$ = this.leadsSubject.asObservable();

  getById(id: string) { return this.leadsSubject.value.find((l: any) => l.id === id); }
  
  upsert(lead: Lead) {
    const arr = this.leadsSubject.value.slice();
    const idx = arr.findIndex((x: any) => x.id === lead.id);
    if (idx >= 0) arr[idx] = lead; else arr.unshift(lead);
    this.leadsSubject.next(arr);
  }

  updateLeadStage(leadId: string, newStage: any): Observable<Lead> {
    const currentLeads = this.leadsSubject.value;
    const leadIndex = currentLeads.findIndex((lead: any) => lead.id === leadId);
    
    if (leadIndex !== -1) {
      const leadStage = this._leadStages.find(ls => ls.stageName === newStage);
      const updatedLead = { 
        ...currentLeads[leadIndex], 
        stage: newStage,
        leadStageID: leadStage?.leadStageID || 'LS-1'
      };
      
      const updatedLeads = [...currentLeads];
      updatedLeads[leadIndex] = updatedLead;
      
      this.leadsSubject.next(updatedLeads);
      return of(updatedLead);
    }
    
    throw new Error(`Lead with ID ${leadId} not found`);
  }

  createLead(formData: LeadFormData): Observable<Lead> {
    const company = this._companies.find(c => c.companyID === formData.companyID);
    const leadStage = this._leadStages.find(ls => ls.leadStageID === formData.leadStageID);
    
    const newLead: Lead = {
      id: 'L-' + (Date.now().toString().slice(-4)),
      companyID: formData.companyID,
      company: company?.companyName || 'Unknown Company',
      contact: formData.contact,
      email: formData.email,
      mobileNo: formData.mobileNo,
      leadStageID: formData.leadStageID,
      stage: leadStage?.stageName as any || 'New',
      leadSourceID: formData.leadSourceID,
      leadSourceValue: formData.leadSourceValue,
      value: formData.value,
      nextFollowUp: formData.nextFollowUp,
      createdOn: new Date().toISOString(),
      companyTypeID: formData.companyTypeID,
      businessCategoryID: formData.businessCategoryID,
      roleId: formData.roleId
    };

    this.upsert(newLead);
    return of(newLead);
  }

  // Master data services - structured for future API integration
  
  // CRM_GetLeadStageMS equivalent
  getLeadStages(): Observable<LeadStageMS[]> {
    return of(this._leadStages.filter(ls => ls.isActive));
  }

  // CRM_GetLeadSourceMS equivalent
  getLeadSources(): Observable<LeadSourceMS[]> {
    return of(this._leadSources.filter(ls => ls.isActive));
  }

  // CRM_searchCompany equivalent
  searchCompanies(searchTerm: string = ''): Observable<CompanyMS[]> {
    const filtered = this._companies
      .filter(c => c.isActive)
      .filter(c => !searchTerm || 
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.companyCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return of(filtered);
  }

  // CRM_GetCompanyTypeMS equivalent
  getCompanyTypes(): Observable<CompanyTypeMS[]> {
    return of(this._companyTypes.filter(ct => ct.isActive));
  }

  // CRM_GetBusinessCategoryMS equivalent
  getBusinessCategories(): Observable<BusinessCategoryMS[]> {
    return of(this._businessCategories.filter(bc => bc.isActive));
  }

  // CRM_GetRoleMS equivalent
  getRoles(): Observable<RoleMS[]> {
    return of(this._roles.filter(r => r.isActive));
  }

  // Board utilities
  getLeadCountByStage(stageId: string): number {
    return this.leadsSubject.value.filter((lead: any) => lead.leadStageID === stageId).length;
  }

  getOverdueLeadsCount(stageId: string, dayThreshold: number = 7): number {
    const now = new Date();
    return this.leadsSubject.value.filter((lead: any) => {
      if (lead.leadStageID !== stageId || !lead.createdOn) return false;
      const createdDate = new Date(lead.createdOn);
      const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff > dayThreshold;
    }).length;
  }
}
