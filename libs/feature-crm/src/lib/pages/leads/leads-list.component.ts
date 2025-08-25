import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

interface Lead {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  source: 'Website' | 'Referral' | 'Trade Show' | 'Cold Call' | 'LinkedIn';
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Lost';
  serviceType: 'Ocean Freight' | 'Air Freight' | 'Land Transport' | 'Warehousing' | 'Customs';
  estimatedValue: number;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  createdDate: string;
  lastContact: string;
  notes: string;
}

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule
  ],
  template: `
    <div class="p-4 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-lg font-semibold text-gray-900 mb-1">Leads Management</h1>
          <p class="text-xs text-gray-600">Track and manage potential shipping clients</p>
        </div>
        <button style="background-color: #243C70;" 
                class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
          <mat-icon class="text-sm mr-1">add</mat-icon>
          Add Lead
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">Total Leads</p>
              <p class="text-xl font-bold text-gray-900">{{ getTotalLeads() }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-blue-600 text-lg">people</mat-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">Qualified</p>
              <p class="text-xl font-bold text-gray-900">{{ getQualifiedLeads() }}</p>
            </div>
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-green-600 text-lg">check_circle</mat-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">In Proposal</p>
              <p class="text-xl font-bold text-gray-900">{{ getProposalLeads() }}</p>
            </div>
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-yellow-600 text-lg">description</mat-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 mb-1">Est. Value</p>
              <p class="text-xl font-bold text-gray-900">${{ getTotalValue() }}K</p>
            </div>
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <mat-icon class="text-purple-600 text-lg">attach_money</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-md">
            <input type="text" 
                   placeholder="Search leads..." 
                   [(ngModel)]="searchTerm"
                   class="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
            <mat-icon class="absolute left-2.5 top-2 text-gray-400 text-sm">search</mat-icon>
          </div>
          
          <select [(ngModel)]="statusFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
          </select>

          <select [(ngModel)]="serviceFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Services</option>
            <option value="Ocean Freight">Ocean Freight</option>
            <option value="Air Freight">Air Freight</option>
            <option value="Land Transport">Land Transport</option>
            <option value="Warehousing">Warehousing</option>
            <option value="Customs">Customs</option>
          </select>
        </div>
      </div>

      <!-- Leads Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let lead of getFilteredLeads()" class="hover:bg-gray-50">
                <td class="px-3 py-2">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ lead.companyName }}</div>
                    <div class="text-xs text-gray-500">{{ lead.source }}</div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ lead.contactPerson }}</div>
                    <div class="text-xs text-gray-500">{{ lead.email }}</div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <span [class]="getServiceBadge(lead.serviceType)">{{ lead.serviceType }}</span>
                </td>
                <td class="px-3 py-2">
                  <span [class]="getStatusBadge(lead.status)">{{ lead.status }}</span>
                </td>
                <td class="px-3 py-2 text-xs text-gray-900">\${{ lead.estimatedValue }}K</td>
                <td class="px-3 py-2">
                  <span [class]="getPriorityBadge(lead.priority)">{{ lead.priority }}</span>
                </td>
                <td class="px-3 py-2 text-xs text-gray-500">{{ lead.assignedTo }}</td>
                <td class="px-3 py-2">
                  <div class="flex items-center space-x-2">
                    <button class="p-1 rounded hover:bg-blue-50 transition-colors" 
                            style="color: #243C70;" title="Edit">
                      <mat-icon class="text-sm">edit</mat-icon>
                    </button>
                    <button class="p-1 rounded hover:bg-green-50 transition-colors text-green-600" title="Convert">
                      <mat-icon class="text-sm">trending_up</mat-icon>
                    </button>
                    <button [matMenuTriggerFor]="actionMenu" 
                            class="p-1 rounded hover:bg-gray-50 transition-colors text-gray-600">
                      <mat-icon class="text-sm">more_vert</mat-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Menu -->
      <mat-menu #actionMenu="matMenu">
        <button mat-menu-item>
          <mat-icon>visibility</mat-icon>
          <span>View Details</span>
        </button>
        <button mat-menu-item>
          <mat-icon>email</mat-icon>
          <span>Send Email</span>
        </button>
        <button mat-menu-item>
          <mat-icon>phone</mat-icon>
          <span>Schedule Call</span>
        </button>
        <button mat-menu-item>
          <mat-icon>delete</mat-icon>
          <span>Delete</span>
        </button>
      </mat-menu>
    </div>
  `
})
export class LeadsListComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  serviceFilter = '';

  leads: Lead[] = [
    {
      id: 1,
      companyName: 'Global Trade Corp',
      contactPerson: 'John Smith',
      email: 'john@globaltrade.com',
      phone: '+1-555-0123',
      source: 'Website',
      status: 'New',
      serviceType: 'Ocean Freight',
      estimatedValue: 150,
      priority: 'High',
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-01-15',
      lastContact: '2024-01-15',
      notes: 'Interested in regular shipments from Asia to US'
    },
    {
      id: 2,
      companyName: 'Pacific Imports Ltd',
      contactPerson: 'Maria Garcia',
      email: 'maria@pacificimports.com',
      phone: '+1-555-0124',
      source: 'Referral',
      status: 'Qualified',
      serviceType: 'Air Freight',
      estimatedValue: 85,
      priority: 'Medium',
      assignedTo: 'Mike Chen',
      createdDate: '2024-01-12',
      lastContact: '2024-01-18',
      notes: 'Time-sensitive electronics shipments'
    },
    {
      id: 3,
      companyName: 'Euro Logistics',
      contactPerson: 'Hans Mueller',
      email: 'hans@eurologistics.de',
      phone: '+49-123-456789',
      source: 'Trade Show',
      status: 'Proposal',
      serviceType: 'Land Transport',
      estimatedValue: 200,
      priority: 'High',
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-01-10',
      lastContact: '2024-01-20',
      notes: 'Cross-border trucking services needed'
    },
    {
      id: 4,
      companyName: 'Asian Exports Inc',
      contactPerson: 'Li Wei',
      email: 'li@asianexports.com',
      phone: '+86-138-0013-8000',
      source: 'LinkedIn',
      status: 'Negotiation',
      serviceType: 'Ocean Freight',
      estimatedValue: 300,
      priority: 'High',
      assignedTo: 'David Park',
      createdDate: '2024-01-08',
      lastContact: '2024-01-22',
      notes: 'Large volume container shipments'
    },
    {
      id: 5,
      companyName: 'Warehouse Solutions',
      contactPerson: 'Emma Thompson',
      email: 'emma@warehousesol.com',
      phone: '+44-20-7946-0958',
      source: 'Cold Call',
      status: 'Contacted',
      serviceType: 'Warehousing',
      estimatedValue: 120,
      priority: 'Medium',
      assignedTo: 'Mike Chen',
      createdDate: '2024-01-14',
      lastContact: '2024-01-16',
      notes: '3PL warehousing and distribution services'
    }
  ];

  ngOnInit() {}

  getTotalLeads(): number {
    return this.leads.length;
  }

  getQualifiedLeads(): number {
    return this.leads.filter(lead => lead.status === 'Qualified' || lead.status === 'Proposal' || lead.status === 'Negotiation').length;
  }

  getProposalLeads(): number {
    return this.leads.filter(lead => lead.status === 'Proposal').length;
  }

  getTotalValue(): number {
    return this.leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  }

  getFilteredLeads(): Lead[] {
    return this.leads.filter(lead => {
      const matchesSearch = !this.searchTerm || 
        lead.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.contactPerson.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || lead.status === this.statusFilter;
      const matchesService = !this.serviceFilter || lead.serviceType === this.serviceFilter;
      
      return matchesSearch && matchesStatus && matchesService;
    });
  }

  getStatusBadge(status: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'New': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Contacted': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Qualified': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Proposal': return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Negotiation': return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Lost': return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getServiceBadge(service: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (service) {
      case 'Ocean Freight': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Air Freight': return `${baseClasses} bg-sky-100 text-sky-800`;
      case 'Land Transport': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Warehousing': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Customs': return `${baseClasses} bg-purple-100 text-purple-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getPriorityBadge(priority: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (priority) {
      case 'High': return `${baseClasses} bg-red-100 text-red-800`;
      case 'Medium': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Low': return `${baseClasses} bg-green-100 text-green-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}