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

interface Opportunity {
  id: number;
  name: string;
  accountName: string;
  contactPerson: string;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  serviceType: 'Ocean Freight' | 'Air Freight' | 'Land Transport' | 'Warehousing' | 'Customs' | 'Full Service';
  value: number;
  probability: number;
  expectedCloseDate: string;
  origin: string;
  destination: string;
  frequency: 'One-time' | 'Monthly' | 'Quarterly' | 'Annual' | 'Ongoing';
  assignedTo: string;
  createdDate: string;
  lastActivity: string;
}

@Component({
  selector: 'app-opportunities-list',
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
          <h1 class="text-lg font-semibold text-gray-900 mb-1">Opportunities</h1>
          <p class="text-xs text-gray-600">Track and manage shipping deals in your sales pipeline</p>
        </div>
        <button style="background-color: #243C70;" 
                class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
          <mat-icon class="text-sm mr-1">add</mat-icon>
          Add Opportunity
        </button>
      </div>

      <!-- Pipeline Stats -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-1">Prospecting</p>
            <p class="text-lg font-bold text-blue-600">{{ getStageCount('Prospecting') }}</p>
            <p class="text-xs text-gray-500">\${{ getStageValue('Prospecting') }}K</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-1">Qualification</p>
            <p class="text-lg font-bold text-yellow-600">{{ getStageCount('Qualification') }}</p>
            <p class="text-xs text-gray-500">\${{ getStageValue('Qualification') }}K</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-1">Proposal</p>
            <p class="text-lg font-bold text-purple-600">{{ getStageCount('Proposal') }}</p>
            <p class="text-xs text-gray-500">\${{ getStageValue('Proposal') }}K</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-1">Negotiation</p>
            <p class="text-lg font-bold text-orange-600">{{ getStageCount('Negotiation') }}</p>
            <p class="text-xs text-gray-500">\${{ getStageValue('Negotiation') }}K</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-1">Closed Won</p>
            <p class="text-lg font-bold text-green-600">{{ getStageCount('Closed Won') }}</p>
            <p class="text-xs text-gray-500">\${{ getStageValue('Closed Won') }}K</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-md">
            <input type="text" 
                   placeholder="Search opportunities..." 
                   [(ngModel)]="searchTerm"
                   class="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
            <mat-icon class="absolute left-2.5 top-2 text-gray-400 text-sm">search</mat-icon>
          </div>
          
          <select [(ngModel)]="stageFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Stages</option>
            <option value="Prospecting">Prospecting</option>
            <option value="Qualification">Qualification</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
          </select>

          <select [(ngModel)]="serviceFilter" 
                  class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
            <option value="">All Services</option>
            <option value="Ocean Freight">Ocean Freight</option>
            <option value="Air Freight">Air Freight</option>
            <option value="Land Transport">Land Transport</option>
            <option value="Warehousing">Warehousing</option>
            <option value="Full Service">Full Service</option>
          </select>
        </div>
      </div>

      <!-- Opportunities Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let opportunity of getFilteredOpportunities()" class="hover:bg-gray-50">
                <td class="px-3 py-2">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ opportunity.name }}</div>
                    <div class="text-xs text-gray-500">{{ opportunity.frequency }}</div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ opportunity.accountName }}</div>
                    <div class="text-xs text-gray-500">{{ opportunity.contactPerson }}</div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <span [class]="getServiceBadge(opportunity.serviceType)">{{ opportunity.serviceType }}</span>
                </td>
                <td class="px-3 py-2">
                  <div class="text-xs text-gray-900">
                    <div>{{ opportunity.origin }}</div>
                    <div class="text-gray-500">→ {{ opportunity.destination }}</div>
                  </div>
                </td>
                <td class="px-3 py-2">
                  <span [class]="getStageBadge(opportunity.stage)">{{ opportunity.stage }}</span>
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-900">\${{ opportunity.value }}K</td>
                <td class="px-3 py-2">
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div class="bg-blue-600 h-2 rounded-full" [style.width.%]="opportunity.probability"></div>
                    </div>
                    <span class="text-xs text-gray-600">{{ opportunity.probability }}%</span>
                  </div>
                </td>
                <td class="px-3 py-2 text-xs text-gray-500">{{ opportunity.expectedCloseDate }}</td>
                <td class="px-3 py-2">
                  <div class="flex items-center space-x-2">
                    <button class="p-1 rounded hover:bg-blue-50 transition-colors" 
                            style="color: #243C70;" title="Edit">
                      <mat-icon class="text-sm">edit</mat-icon>
                    </button>
                    <button class="p-1 rounded hover:bg-green-50 transition-colors text-green-600" title="Move Stage">
                      <mat-icon class="text-sm">arrow_forward</mat-icon>
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
          <mat-icon>description</mat-icon>
          <span>Generate Quote</span>
        </button>
        <button mat-menu-item>
          <mat-icon>email</mat-icon>
          <span>Send Proposal</span>
        </button>
        <button mat-menu-item>
          <mat-icon>event</mat-icon>
          <span>Schedule Meeting</span>
        </button>
        <button mat-menu-item>
          <mat-icon>delete</mat-icon>
          <span>Delete</span>
        </button>
      </mat-menu>
    </div>
  `
})
export class OpportunitiesListComponent implements OnInit {
  searchTerm = '';
  stageFilter = '';
  serviceFilter = '';

  opportunities: Opportunity[] = [
    {
      id: 1,
      name: 'Q1 Container Shipments',
      accountName: 'Global Trade Corp',
      contactPerson: 'John Smith',
      stage: 'Proposal',
      serviceType: 'Ocean Freight',
      value: 450,
      probability: 75,
      expectedCloseDate: '2024-02-15',
      origin: 'Shanghai, China',
      destination: 'Los Angeles, USA',
      frequency: 'Monthly',
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-01-15',
      lastActivity: '2024-01-22'
    },
    {
      id: 2,
      name: 'Electronics Air Freight',
      accountName: 'Pacific Imports Ltd',
      contactPerson: 'Maria Garcia',
      stage: 'Negotiation',
      serviceType: 'Air Freight',
      value: 180,
      probability: 85,
      expectedCloseDate: '2024-02-10',
      origin: 'Tokyo, Japan',
      destination: 'San Francisco, USA',
      frequency: 'Ongoing',
      assignedTo: 'Mike Chen',
      createdDate: '2024-01-12',
      lastActivity: '2024-01-23'
    },
    {
      id: 3,
      name: 'European Distribution',
      accountName: 'Euro Logistics',
      contactPerson: 'Hans Mueller',
      stage: 'Qualification',
      serviceType: 'Full Service',
      value: 650,
      probability: 60,
      expectedCloseDate: '2024-03-01',
      origin: 'Hamburg, Germany',
      destination: 'Multiple EU Cities',
      frequency: 'Quarterly',
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-01-10',
      lastActivity: '2024-01-20'
    },
    {
      id: 4,
      name: 'Automotive Parts Contract',
      accountName: 'Auto Components Inc',
      contactPerson: 'Robert Wilson',
      stage: 'Prospecting',
      serviceType: 'Land Transport',
      value: 320,
      probability: 40,
      expectedCloseDate: '2024-02-28',
      origin: 'Detroit, USA',
      destination: 'Toronto, Canada',
      frequency: 'Monthly',
      assignedTo: 'David Park',
      createdDate: '2024-01-18',
      lastActivity: '2024-01-19'
    },
    {
      id: 5,
      name: 'Warehouse & Distribution',
      accountName: 'Warehouse Solutions',
      contactPerson: 'Emma Thompson',
      stage: 'Closed Won',
      serviceType: 'Warehousing',
      value: 280,
      probability: 100,
      expectedCloseDate: '2024-01-25',
      origin: 'London, UK',
      destination: 'Birmingham, UK',
      frequency: 'Annual',
      assignedTo: 'Mike Chen',
      createdDate: '2024-01-05',
      lastActivity: '2024-01-25'
    }
  ];

  ngOnInit() {}

  getStageCount(stage: string): number {
    return this.opportunities.filter(opp => opp.stage === stage).length;
  }

  getStageValue(stage: string): number {
    return this.opportunities
      .filter(opp => opp.stage === stage)
      .reduce((sum, opp) => sum + opp.value, 0);
  }

  getFilteredOpportunities(): Opportunity[] {
    return this.opportunities.filter(opp => {
      const matchesSearch = !this.searchTerm || 
        opp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.accountName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStage = !this.stageFilter || opp.stage === this.stageFilter;
      const matchesService = !this.serviceFilter || opp.serviceType === this.serviceFilter;
      
      return matchesSearch && matchesStage && matchesService;
    });
  }

  getStageBadge(stage: string): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    switch (stage) {
      case 'Prospecting': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Qualification': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Proposal': return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'Negotiation': return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Closed Won': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Closed Lost': return `${baseClasses} bg-red-100 text-red-800`;
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
      case 'Full Service': return `${baseClasses} bg-indigo-100 text-indigo-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}