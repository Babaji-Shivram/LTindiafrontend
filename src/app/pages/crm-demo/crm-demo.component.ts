import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LeadData {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: string;
  value: number;
  lastActivity: Date;
  nextAction: string;
  assignedTo: string;
  type: 'enquiry' | 'lead' | 'visit' | 'referral';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  canConvert?: boolean;
  visitDate?: Date;
  visitPurpose?: string;
  temperature: 'cold' | 'warm' | 'hot';
  daysInStage: number;
  probability: number;
  tags: string[];
  lastContact: Date;
  followUpDate: Date;
}

@Component({
  selector: 'app-crm-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="crm-demo-container">
      <!-- Header -->
      <div class="demo-header">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">🚀 Unified Lead Management</h1>
        <p class="text-gray-600 mb-6">Single hub for Enquiries, Leads, and Pipeline Management</p>
        
        <!-- View Switcher -->
        <div class="view-switcher mb-6">
          <button 
            *ngFor="let view of viewModes" 
            (click)="currentView = view.key"
            [class]="'px-4 py-2 mx-1 rounded-lg font-medium ' + 
                    (currentView === view.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')">
            {{view.icon}} {{view.label}}
          </button>
        </div>
      </div>

      <!-- Dashboard View -->
      <div *ngIf="currentView === 'dashboard'" class="dashboard-view">
        <!-- Smart Action Bar -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <button (click)="showNewLeadForm()" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>Quick Add</span>
              </button>
              <button (click)="showImportDialog()" 
                      class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/>
                </svg>
                <span>Import</span>
              </button>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm text-gray-600">Next Follow-ups:</span>
              <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {{getOverdueCount()}} Overdue
              </span>
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                {{getTodayFollowups()}} Today
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Enhanced KPI Cards with Actions -->
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Active Pipeline</p>
                <p class="text-3xl font-bold text-blue-600">{{getCountByStage('prospect') + getCountByStage('qualified')}}</p>
                <p class="text-xs text-gray-500 mt-1">{{getProspectConversionRate()}}% qualification rate</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <span class="text-2xl">�</span>
              </div>
            </div>
            <div class="mt-4">
              <button (click)="currentView = 'pipeline'" class="text-blue-600 text-sm hover:underline">View Pipeline →</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Hot Leads</p>
                <p class="text-3xl font-bold text-red-600">{{getHotLeadsCount()}}</p>
                <p class="text-xs text-gray-500 mt-1">High priority opportunities</p>
              </div>
              <div class="bg-red-100 p-3 rounded-full">
                <span class="text-2xl">🔥</span>
              </div>
            </div>
            <div class="mt-4">
              <button (click)="filterByTemperature('hot')" class="text-red-600 text-sm hover:underline">Take Action →</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Expected Revenue</p>
                <p class="text-3xl font-bold text-green-600">₹{{getWeightedPipeline() | number:'1.0-0'}}</p>
                <p class="text-xs text-gray-500 mt-1">Probability weighted</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <span class="text-2xl">💰</span>
              </div>
            </div>
            <div class="mt-4">
              <button (click)="currentView = 'analytics'" class="text-green-600 text-sm hover:underline">View Forecast →</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">This Month</p>
                <p class="text-3xl font-bold text-purple-600">₹{{getMonthlyWon() | number:'1.0-0'}}</p>
                <p class="text-xs text-gray-500 mt-1">{{getMonthlyWonCount()}} deals closed</p>
              </div>
              <div class="bg-purple-100 p-3 rounded-full">
                <span class="text-2xl">🎉</span>
              </div>
            </div>
            <div class="mt-4">
              <button (click)="showWonDeals()" class="text-purple-600 text-sm hover:underline">View Details →</button>
            </div>
          </div>
        </div>

        <!-- Smart Insights Panel -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4">🧠 Smart Insights & Actions</h3>
            <div class="space-y-4">
              <div class="flex items-start p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <span class="text-2xl mr-3">⚠️</span>
                <div class="flex-1">
                  <p class="font-medium text-amber-800">Urgent Follow-up Required</p>
                  <p class="text-sm text-amber-600">Anita Desai (Healthcare Systems) - In negotiation for 12 days</p>
                  <div class="mt-2 flex space-x-2">
                    <button class="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700">Call Now</button>
                    <button class="px-3 py-1 bg-amber-200 text-amber-800 text-sm rounded hover:bg-amber-300">Schedule</button>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start p-4 bg-green-50 border border-green-200 rounded-lg">
                <span class="text-2xl mr-3">🎯</span>
                <div class="flex-1">
                  <p class="font-medium text-green-800">High Conversion Opportunity</p>
                  <p class="text-sm text-green-600">Kavita Shah (Import Solutions) - 80% probability, referred customer</p>
                  <div class="mt-2 flex space-x-2">
                    <button class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Send Proposal</button>
                    <button class="px-3 py-1 bg-green-200 text-green-800 text-sm rounded hover:bg-green-300">View Details</button>
                  </div>
                </div>
              </div>

              <div class="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span class="text-2xl mr-3">💡</span>
                <div class="flex-1">
                  <p class="font-medium text-blue-800">Visit Conversion Ready</p>
                  <p class="text-sm text-blue-600">Deepak Agarwal (Export House) - Visit completed, ready to qualify</p>
                  <div class="mt-2 flex space-x-2">
                    <button (click)="convertToLead(getLeadById(6))" class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Convert to Lead</button>
                    <button class="px-3 py-1 bg-blue-200 text-blue-800 text-sm rounded hover:bg-blue-300">Add Notes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4">📊 Pipeline Health</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Conversion Rate</span>
                  <span class="font-medium">68%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 68%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Avg Deal Size</span>
                  <span class="font-medium">₹2.8L</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Sales Velocity</span>
                  <span class="font-medium">16 days</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: 82%"></div>
                </div>
              </div>

              <div class="pt-4 border-t">
                <p class="text-sm text-gray-600 mb-2">Pipeline Distribution</p>
                <div class="space-y-2">
                  <div *ngFor="let stage of pipelineStages" class="flex justify-between text-xs">
                    <span>{{stage.name}}</span>
                    <span class="font-medium">{{getCountByStage(stage.key)}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">🎯 Recent Activities</h3>
          <div class="space-y-3">
            <div *ngFor="let activity of recentActivities" class="flex items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-2xl mr-3">{{activity.icon}}</span>
              <div>
                <p class="font-medium">{{activity.title}}</p>
                <p class="text-sm text-gray-600">{{activity.description}}</p>
              </div>
              <span class="ml-auto text-sm text-gray-500">{{activity.time}}</span>
            </div>
          </div>
        </div>

        <!-- Workflow Explanation -->
        <div class="bg-blue-50 rounded-lg shadow-md p-6 mt-6">
          <h3 class="text-lg font-semibold mb-4 text-blue-800">🔄 Unified Workflow Process</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-4">
              <h4 class="font-medium text-blue-700 mb-2">1. Entry Points</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• <span class="text-yellow-600">Enquiries</span> - Initial requests</li>
                <li>• <span class="text-purple-600">Visits</span> - Field interactions</li>
                <li>• <span class="text-blue-600">Direct Leads</span> - Qualified prospects</li>
              </ul>
            </div>
            <div class="bg-white rounded-lg p-4">
              <h4 class="font-medium text-green-700 mb-2">2. Conversion Process</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Enquiry → Lead (Qualify)</li>
                <li>• Visit → Lead (Convert)</li>
                <li>• Lead → Opportunity (Advance)</li>
              </ul>
            </div>
            <div class="bg-white rounded-lg p-4">
              <h4 class="font-medium text-purple-700 mb-2">3. Pipeline Stages</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Qualified → Proposal</li>
                <li>• Proposal → Negotiation</li>
                <li>• Negotiation → Won/Lost</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Pipeline View (Kanban) -->
      <div *ngIf="currentView === 'pipeline'" class="pipeline-view">
        <!-- Pipeline Header with New Lead Button -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Sales Pipeline</h2>
          <button (click)="showNewLeadForm()" 
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            <span>New Lead</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div *ngFor="let stage of pipelineStages" class="bg-gray-100 rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-4 text-center">
              {{stage.icon}} {{stage.name}} ({{getLeadsByStage(stage.key).length}})
            </h3>
            <div class="space-y-3">
              <div *ngFor="let lead of getLeadsByStage(stage.key)" 
                   class="bg-white rounded-lg p-4 shadow-sm border-l-4"
                   [style.border-left-color]="stage.color">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-gray-800">{{lead.name}}</h4>
                  <div class="flex items-center space-x-1">
                    <span class="text-xs px-2 py-1 rounded-full" 
                          [ngClass]="getTypeClass(lead.type)">
                      {{lead.type | titlecase}}
                    </span>
                    <span class="text-xs px-2 py-1 rounded-full" 
                          [ngClass]="getTemperatureClass(lead.temperature)">
                      {{lead.temperature}}
                    </span>
                  </div>
                </div>
                <p class="text-sm text-gray-600">{{lead.company}}</p>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm font-medium text-green-600">₹{{lead.value | number:'1.0-0'}}</p>
                  <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {{lead.probability}}% prob
                  </span>
                </div>
                
                <!-- Priority & Days in Stage -->
                <div class="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span class="px-2 py-1 rounded" [ngClass]="getPriorityClass(lead.priority)">
                    {{lead.priority | titlecase}}
                  </span>
                  <span>{{lead.daysInStage}} days</span>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1 mb-2">
                  <span *ngFor="let tag of lead.tags.slice(0, 2)" 
                        class="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {{tag}}
                  </span>
                  <span *ngIf="lead.tags.length > 2" class="text-xs text-gray-400">
                    +{{lead.tags.length - 2}}
                  </span>
                </div>
                
                <!-- Visit specific info -->
                <div *ngIf="lead.type === 'visit'" class="mt-2 text-xs text-gray-500 bg-purple-50 p-2 rounded">
                  <p>📅 {{lead.visitDate | date:'MMM dd, yyyy'}}</p>
                  <p>🎯 {{lead.visitPurpose}}</p>
                </div>

                <!-- Next Action -->
                <div class="text-xs text-gray-600 mb-3 bg-gray-50 p-2 rounded">
                  <p class="font-medium">Next: {{lead.nextAction}}</p>
                  <p>Due: {{lead.followUpDate | date:'MMM dd'}}</p>
                </div>

                <div class="flex justify-between items-center mt-3">
                  <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{{lead.source}}</span>
                  <div class="flex space-x-1">
                    <button class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300" 
                            title="View Details">
                      👁️
                    </button>
                    <button *ngIf="lead.canConvert" 
                            (click)="convertToLead(lead)"
                            class="text-xs bg-green-200 text-green-700 px-2 py-1 rounded hover:bg-green-300"
                            title="Convert to Lead">
                      🔄
                    </button>
                    <button *ngIf="!lead.canConvert && lead.stage !== 'won'" 
                            class="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300"
                            title="Advance Stage">
                      ➡️
                    </button>
                    <button class="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded hover:bg-purple-300"
                            title="Quick Action">
                      ⚡
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Convert to Table View Button -->
        <div class="mt-6 text-center">
          <button (click)="currentView = 'table'" 
                  class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Switch to Table View
          </button>
        </div>
      </div>

      <!-- Table View -->
  <div *ngIf="currentView === 'allDeals'" class="table-view">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Filters with New Lead Button -->
          <div class="p-4 bg-gray-50 border-b">
            <div class="flex flex-wrap gap-4 items-center">
              <select [(ngModel)]="selectedStageFilter" class="px-3 py-2 border rounded-lg">
                <option value="">All Stages</option>
                <option *ngFor="let stage of pipelineStages" [value]="stage.key">{{stage.name}}</option>
              </select>
              <select [(ngModel)]="selectedTypeFilter" class="px-3 py-2 border rounded-lg">
                <option value="">All Types</option>
                <option value="enquiry">Enquiries</option>
                <option value="lead">Leads</option>
                <option value="visit">Visits</option>
              </select>
              <input type="text" [(ngModel)]="searchTerm" placeholder="Search leads..." 
                     class="px-3 py-2 border rounded-lg flex-1 min-w-64">
              <button (click)="showNewLeadForm()" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>New Lead</span>
              </button>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr *ngFor="let lead of getFilteredLeads()" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          [ngClass]="getTypeClass(lead.type)">
                      {{lead.type | titlecase}}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p class="font-medium text-gray-900">{{lead.name}}</p>
                      <p class="text-sm text-gray-500">{{lead.email}}</p>
                      <div *ngIf="lead.type === 'visit'" class="text-xs text-gray-400 mt-1">
                        Visit: {{lead.visitDate | date:'MMM dd'}} - {{lead.visitPurpose}}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{lead.company}}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          [ngClass]="getStageClass(lead.stage)">
                      {{getStageLabel(lead.stage)}}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ₹{{lead.value | number:'1.0-0'}}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{lead.source}}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{lead.assignedTo}}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-900">View</button>
                      <button *ngIf="lead.canConvert" 
                              (click)="convertToLead(lead)"
                              class="text-green-600 hover:text-green-900">Convert</button>
                      <button *ngIf="lead.type === 'lead'" 
                              class="text-purple-600 hover:text-purple-900">Visit</button>
                      <button *ngIf="lead.type === 'lead'" 
                              class="text-orange-600 hover:text-orange-900">Quote</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Convert to Pipeline View Button -->
        <div class="mt-6 text-center">
          <button (click)="currentView = 'pipeline'" 
                  class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Switch to Pipeline View
          </button>
        </div>
      </div>

      <!-- Analytics View -->
      <div *ngIf="currentView === 'analytics'" class="analytics-view">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Conversion Funnel -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4">📊 Conversion Funnel</h3>
            <div class="space-y-4">
              <div *ngFor="let stage of pipelineStages" class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-8 mr-4">
                  <div class="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                       [style.width.%]="getFunnelPercentage(stage.key)">
                    {{getCountByStage(stage.key)}}
                  </div>
                </div>
                <span class="text-sm font-medium text-gray-700 min-w-20">{{stage.name}}</span>
              </div>
            </div>
          </div>

          <!-- Source Analysis -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4">📈 Lead Sources</h3>
            <div class="space-y-3">
              <div *ngFor="let source of getSourceAnalysis()" class="flex justify-between items-center">
                <span class="text-gray-700">{{source.name}}</span>
                <div class="flex items-center">
                  <div class="w-24 bg-gray-200 rounded-full h-4 mr-3">
                    <div class="bg-green-600 h-4 rounded-full" [style.width.%]="source.percentage"></div>
                  </div>
                  <span class="text-sm font-medium">{{source.count}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h3 class="text-lg font-semibold mb-4">⚡ Performance Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <p class="text-2xl font-bold text-blue-600">24%</p>
                <p class="text-sm text-gray-600">Conversion Rate</p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <p class="text-2xl font-bold text-green-600">₹2.3L</p>
                <p class="text-sm text-gray-600">Avg Deal Size</p>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <p class="text-2xl font-bold text-orange-600">18 days</p>
                <p class="text-sm text-gray-600">Avg Sales Cycle</p>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <p class="text-2xl font-bold text-purple-600">₹8.7L</p>
                <p class="text-sm text-gray-600">Monthly Target</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grouped By Stage View -->
      <div *ngIf="currentView==='groupStage'" class="grouped-stage-view bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Grouped by Stage</h2>
          <div class="text-sm text-gray-500">Total Active Value: ₹{{getVisibleTotalValue() | number:'1.0-0'}}</div>
        </div>
        <div>
          <div *ngFor="let stage of pipelineStages">
            <div class="flex items-center justify-between px-6 py-3 bg-gray-100 border-b cursor-pointer" (click)="toggleStageGroup(stage.key)">
              <div class="flex items-center gap-3">
                <span class="text-xs px-2 py-1 rounded-full font-medium" [ngClass]="getStageClass(stage.key)">{{stage.name}}</span>
                <span class="text-sm text-gray-600">Count {{getLeadsByStage(stage.key).length}}</span>
                <span class="text-sm text-gray-600">Sum ₹{{getStageValueSum(stage.key) | number:'1.0-0'}}</span>
                <span class="text-sm text-gray-600">Avg Prob {{getStageAvgProbability(stage.key)}}%</span>
              </div>
              <button class="text-xs text-gray-600 hover:text-gray-800">{{ stageGroupExpanded[stage.key] ? '▾' : '▸' }}</button>
            </div>
            <div *ngIf="stageGroupExpanded[stage.key]" class="overflow-x-auto">
              <table class="w-full">
                <tbody class="divide-y divide-gray-200">
                  <tr *ngFor="let lead of getLeadsByStage(stage.key)" class="hover:bg-gray-50">
                    <td class="px-6 py-3 w-52">
                      <div class="font-medium text-gray-800">{{lead.name}}</div>
                      <div class="text-xs text-gray-500">{{lead.company}}</div>
                    </td>
                    <td class="px-6 py-3 w-28 text-xs"><span class="px-2 py-1 rounded-full" [ngClass]="getTypeClass(lead.type)">{{lead.type}}</span></td>
                    <td class="px-6 py-3 w-24 text-green-600 font-medium text-sm">₹{{lead.value | number:'1.0-0'}}</td>
                    <td class="px-6 py-3 w-24 text-xs">{{lead.assignedTo}}</td>
                    <td class="px-6 py-3 w-32 text-xs">Prob {{lead.probability}}%</td>
                    <td class="px-6 py-3 w-32 text-xs">{{lead.daysInStage}} days</td>
                    <td class="px-6 py-3 w-48 text-xs">Next: {{lead.nextAction}}</td>
                    <td class="px-6 py-3 w-40 text-right text-xs">
                      <button *ngIf="getNextStage(lead)" (click)="advanceStage(lead)" class="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Advance →</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Grouped By User View -->
      <div *ngIf="currentView==='groupUser'" class="grouped-user-view bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Grouped by Owner</h2>
          <div class="text-sm text-gray-500">Total Active Value: ₹{{getVisibleTotalValue() | number:'1.0-0'}}</div>
        </div>
        <div>
          <div *ngFor="let rep of getReps()">
            <div class="flex items-center justify-between px-6 py-3 bg-gray-100 border-b cursor-pointer" (click)="toggleRepGroup(rep)">
              <div class="flex items-center gap-3">
                <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">{{rep}}</span>
                <span class="text-sm text-gray-600">Count {{getLeadsByRep(rep).length}}</span>
                <span class="text-sm text-gray-600">Sum ₹{{getRepValueSum(rep) | number:'1.0-0'}}</span>
                <span class="text-sm text-gray-600">Avg Prob {{getRepAvgProbability(rep)}}%</span>
              </div>
              <button class="text-xs text-gray-600 hover:text-gray-800">{{ repGroupExpanded[rep] ? '▾' : '▸' }}</button>
            </div>
            <div *ngIf="repGroupExpanded[rep]" class="overflow-x-auto">
              <table class="w-full">
                <tbody class="divide-y divide-gray-200">
                  <tr *ngFor="let lead of getLeadsByRep(rep)" class="hover:bg-gray-50">
                    <td class="px-6 py-3 w-52">
                      <div class="font-medium text-gray-800">{{lead.name}}</div>
                      <div class="text-xs text-gray-500">{{lead.company}}</div>
                    </td>
                    <td class="px-6 py-3 w-32 text-xs"><span class="px-2 py-1 rounded-full" [ngClass]="getStageClass(lead.stage)">{{getStageLabel(lead.stage)}}</span></td>
                    <td class="px-6 py-3 w-24 text-green-600 font-medium text-sm">₹{{lead.value | number:'1.0-0'}}</td>
                    <td class="px-6 py-3 w-24 text-xs">Prob {{lead.probability}}%</td>
                    <td class="px-6 py-3 w-32 text-xs">{{lead.daysInStage}} days</td>
                    <td class="px-6 py-3 w-40 text-xs">Next: {{lead.nextAction}}</td>
                    <td class="px-6 py-3 w-40 text-right text-xs">
                      <button *ngIf="getNextStage(lead)" (click)="advanceStage(lead)" class="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Advance →</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Notice -->
      <div class="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg">
        <p class="text-sm font-medium">🧪 Demo Mode - This is a prototype for management review</p>
      </div>
    </div>
  `,
  styles: [`
    .crm-demo-container {
      padding: 2rem;
      background-color: #f8fafc;
      min-height: 100vh;
    }
    
    .view-switcher {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .crm-demo-container {
        padding: 1rem;
      }
      
      .view-switcher {
        justify-content: center;
      }
    }
  `]
})
export class CrmDemoComponent implements OnInit {
  currentView: string = 'dashboard';
  selectedStageFilter: string = '';
  selectedTypeFilter: string = '';
  searchTerm: string = '';
  showNewLeadModal: boolean = false;

  viewModes = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'pipeline', label: 'Pipeline', icon: '🔄' },
  { key: 'allDeals', label: 'All Deals', icon: '📋' },
  { key: 'groupStage', label: 'Group: Stage', icon: '🧱' },
  { key: 'groupUser', label: 'Group: Owner', icon: '👤' },
    { key: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  pipelineStages = [
    { key: 'prospect', name: 'Prospects', icon: '�', color: '#6B7280' },
    { key: 'qualified', name: 'Qualified', icon: '✅', color: '#10B981' },
    { key: 'proposal', name: 'Proposal', icon: '📄', color: '#F59E0B' },
    { key: 'negotiation', name: 'Negotiation', icon: '🤝', color: '#EF4444' },
    { key: 'won', name: 'Won', icon: '🎉', color: '#8B5CF6' }
  ];

  sampleLeads: LeadData[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      company: 'Tech Solutions Pvt Ltd',
      email: 'rajesh@techsolutions.com',
      phone: '+91 98765 43210',
      stage: 'prospect',
      source: 'Website',
      value: 250000,
      lastActivity: new Date(),
      nextAction: 'Initial qualification call',
      assignedTo: 'Amit Sharma',
      type: 'enquiry',
      canConvert: true,
      priority: 'medium',
      temperature: 'warm',
      daysInStage: 2,
      probability: 25,
      tags: ['logistics', 'mid-market'],
      lastContact: new Date('2025-09-01'),
      followUpDate: new Date('2025-09-03')
    },
    {
      id: 2,
      name: 'Priya Patel',
      company: 'Manufacturing Co',
      email: 'priya@manufacturing.com',
      phone: '+91 87654 32109',
      stage: 'qualified',
      source: 'Referral',
      value: 180000,
      lastActivity: new Date(),
      nextAction: 'Send detailed proposal',
      assignedTo: 'Neha Singh',
      type: 'lead',
      canConvert: false,
      priority: 'high',
      temperature: 'hot',
      daysInStage: 5,
      probability: 65,
      tags: ['manufacturing', 'enterprise'],
      lastContact: new Date('2025-09-02'),
      followUpDate: new Date('2025-09-04')
    },
    {
      id: 3,
      name: 'Suresh Gupta',
      company: 'Retail Chain Ltd',
      email: 'suresh@retailchain.com',
      phone: '+91 76543 21098',
      stage: 'proposal',
      source: 'Cold Call',
      value: 320000,
      lastActivity: new Date(),
      nextAction: 'Schedule product demo',
      assignedTo: 'Rahul Verma',
      type: 'lead',
      canConvert: false,
      priority: 'high',
      temperature: 'hot',
      daysInStage: 8,
      probability: 75,
      tags: ['retail', 'multi-location'],
      lastContact: new Date('2025-09-01'),
      followUpDate: new Date('2025-09-05')
    },
    {
      id: 4,
      name: 'Anita Desai',
      company: 'Healthcare Systems',
      email: 'anita@healthcare.com',
      phone: '+91 65432 10987',
      stage: 'negotiation',
      source: 'Trade Show',
      value: 450000,
      lastActivity: new Date(),
      nextAction: 'Finalize contract terms',
      assignedTo: 'Amit Sharma',
      type: 'lead',
      canConvert: false,
      priority: 'urgent',
      temperature: 'hot',
      daysInStage: 12,
      probability: 85,
      tags: ['healthcare', 'compliance'],
      lastContact: new Date('2025-09-02'),
      followUpDate: new Date('2025-09-03')
    },
    {
      id: 5,
      name: 'Vikram Singh',
      company: 'Logistics Express',
      email: 'vikram@logistics.com',
      phone: '+91 54321 09876',
      stage: 'won',
      source: 'Website',
      value: 280000,
      lastActivity: new Date(),
      nextAction: 'Project kickoff meeting',
      assignedTo: 'Neha Singh',
      type: 'lead',
      canConvert: false,
      priority: 'medium',
      temperature: 'hot',
      daysInStage: 1,
      probability: 100,
      tags: ['logistics', 'implementation'],
      lastContact: new Date('2025-09-02'),
      followUpDate: new Date('2025-09-10')
    },
    // Smart Visit Integration
    {
      id: 6,
      name: 'Deepak Agarwal',
      company: 'Export House Ltd',
      email: 'deepak@export.com',
      phone: '+91 98888 12345',
      stage: 'prospect',
      source: 'Field Visit',
      value: 150000,
      lastActivity: new Date(),
      nextAction: 'Convert to qualified lead',
      assignedTo: 'Amit Sharma',
      type: 'visit',
      canConvert: true,
      visitDate: new Date('2025-09-01'),
      visitPurpose: 'Product demonstration',
      priority: 'medium',
      temperature: 'warm',
      daysInStage: 1,
      probability: 40,
      tags: ['export', 'first-meeting'],
      lastContact: new Date('2025-09-01'),
      followUpDate: new Date('2025-09-04')
    },
    // Referral with high probability
    {
      id: 7,
      name: 'Kavita Shah',
      company: 'Import Solutions',
      email: 'kavita@import.com',
      phone: '+91 99999 67890',
      stage: 'qualified',
      source: 'Customer Referral',
      value: 380000,
      lastActivity: new Date(),
      nextAction: 'Technical requirements call',
      assignedTo: 'Neha Singh',
      type: 'referral',
      canConvert: false,
      priority: 'high',
      temperature: 'hot',
      daysInStage: 3,
      probability: 80,
      tags: ['import', 'referred', 'urgent'],
      lastContact: new Date('2025-08-30'),
      followUpDate: new Date('2025-09-03')
    }
  ];

  recentActivities = [
    { icon: '�', title: 'Visit converted to Lead', description: 'Deepak Agarwal - Export House Ltd', time: '5 mins ago' },
    { icon: '�📞', title: 'Call completed', description: 'Rajesh Kumar - Tech Solutions', time: '12 mins ago' },
    { icon: '📧', title: 'Proposal sent', description: 'Priya Patel - Manufacturing Co', time: '25 mins ago' },
    { icon: '🏢', title: 'Visit scheduled', description: 'Site visit for Suresh Gupta', time: '1 hour ago' },
    { icon: '💰', title: 'Deal won', description: 'Vikram Singh - ₹2.8L deal closed', time: '2 hours ago' },
    { icon: '🔄', title: 'Enquiry qualified', description: 'Converted enquiry to qualified lead', time: '3 hours ago' }
  ];

  ngOnInit() {
    // Initialize component
  }

  // Group expansion states
  stageGroupExpanded: {[key:string]:boolean} = {};
  repGroupExpanded: {[key:string]:boolean} = {};

  constructor(){
    // default expand all groups
    this.pipelineStages.forEach(s=> this.stageGroupExpanded[s.key]=true);
  }

  getCountByStage(stage: string): number {
    return this.sampleLeads.filter(lead => lead.stage === stage).length;
  }

  getTotalValue(): number {
    return this.sampleLeads
      .filter(lead => lead.stage !== 'won' && lead.stage !== 'lost')
      .reduce((sum, lead) => sum + lead.value, 0);
  }

  getLeadsByStage(stage: string): LeadData[] {
    return this.sampleLeads.filter(lead => lead.stage === stage);
  }

  getFilteredLeads(): LeadData[] {
    let filtered = this.sampleLeads;
    
    if (this.selectedStageFilter) {
      filtered = filtered.filter(lead => lead.stage === this.selectedStageFilter);
    }
    
    if (this.selectedTypeFilter) {
      filtered = filtered.filter(lead => lead.type === this.selectedTypeFilter);
    }
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(term) ||
        lead.company.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }

  // Summary helpers
  getVisibleTotalValue(): number { return this.getFilteredLeads().reduce((s,l)=> s + l.value, 0); }
  getStageValueSum(stage:string): number { return this.getLeadsByStage(stage).reduce((s,l)=> s + l.value, 0); }
  getStageAvgProbability(stage:string): number { const list = this.getLeadsByStage(stage); return list.length? Math.round(list.reduce((s,l)=> s + l.probability,0)/list.length):0; }
  getRepValueSum(rep:string): number { return this.getLeadsByRep(rep).reduce((s,l)=> s + l.value, 0); }
  getRepAvgProbability(rep:string): number { const list = this.getLeadsByRep(rep); return list.length? Math.round(list.reduce((s,l)=> s + l.probability,0)/list.length):0; }

  // Group toggles
  toggleStageGroup(stage:string){ this.stageGroupExpanded[stage] = !this.stageGroupExpanded[stage]; }
  toggleRepGroup(rep:string){ this.repGroupExpanded[rep] = !this.repGroupExpanded[rep]; }
  getReps(): string[]{ return Array.from(new Set(this.sampleLeads.map(l=> l.assignedTo))).sort(); }
  getLeadsByRep(rep:string){ return this.sampleLeads.filter(l=> l.assignedTo===rep); }

  // Workflow & stage advancement (simple linear for demo)
  private orderedStageKeys = ['prospect','qualified','proposal','negotiation','won'];
  getNextStage(lead: LeadData): string | null {
    if(lead.stage==='won' || lead.stage==='lost') return null;
    const idx = this.orderedStageKeys.indexOf(lead.stage);
    if(idx===-1 || idx===this.orderedStageKeys.length-1) return null;
    return this.orderedStageKeys[idx+1];
  }
  advanceStage(lead: LeadData){
    const next = this.getNextStage(lead);
    if(!next) return;
    // Simulate guard checks: prevent skipping if probability below threshold for negotiation->won
    if(next==='won' && lead.probability < 70){
      alert('⚠️ Cannot mark Won yet. Increase probability or complete required checklist.');
      return;
    }
    lead.stage = next as any;
    // Adjust probability heuristically
    const map: any = { prospect:25, qualified:50, proposal:65, negotiation:85, won:100 };
    lead.probability = map[next] ?? lead.probability;
    lead.daysInStage = 0;
    this.recentActivities.unshift({ icon:'➡️', title:`Stage advanced to ${next}`, description:`${lead.name} – ${lead.company}`, time:'Just now'});
  }

  getStageClass(stage: string): string {
    const classes = {
      'enquiry': 'bg-blue-100 text-blue-800',
      'qualified': 'bg-green-100 text-green-800',
      'proposal': 'bg-yellow-100 text-yellow-800',
      'negotiation': 'bg-red-100 text-red-800',
      'won': 'bg-purple-100 text-purple-800',
      'lost': 'bg-gray-100 text-gray-800'
    };
    return classes[stage as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getStageLabel(stage: string): string {
    const labels = {
      'enquiry': 'Enquiry',
      'qualified': 'Qualified',
      'proposal': 'Proposal',
      'negotiation': 'Negotiation',
      'won': 'Won',
      'lost': 'Lost'
    };
    return labels[stage as keyof typeof labels] || stage;
  }

  getFunnelPercentage(stage: string): number {
    const total = this.sampleLeads.length;
    const count = this.getCountByStage(stage);
    return total > 0 ? (count / total) * 100 : 0;
  }

  getSourceAnalysis() {
    const sources = this.sampleLeads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as {[key: string]: number});

    const total = this.sampleLeads.length;
    
    return Object.entries(sources).map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
    })).sort((a, b) => b.count - a.count);
  }

  // Enhanced UX Methods
  getOverdueCount(): number {
    const today = new Date();
    return this.sampleLeads.filter(lead => 
      new Date(lead.followUpDate) < today && lead.stage !== 'won' && lead.stage !== 'lost'
    ).length;
  }

  getTodayFollowups(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.sampleLeads.filter(lead => {
      const followUp = new Date(lead.followUpDate);
      followUp.setHours(0, 0, 0, 0);
      return followUp >= today && followUp < tomorrow;
    }).length;
  }

  getProspectConversionRate(): number {
    const prospects = this.getCountByStage('prospect');
    const qualified = this.getCountByStage('qualified');
    return prospects > 0 ? Math.round((qualified / (prospects + qualified)) * 100) : 0;
  }

  getHotLeadsCount(): number {
    return this.sampleLeads.filter(lead => 
      lead.temperature === 'hot' && lead.stage !== 'won' && lead.stage !== 'lost'
    ).length;
  }

  getWeightedPipeline(): number {
    return this.sampleLeads
      .filter(lead => lead.stage !== 'won' && lead.stage !== 'lost')
      .reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  }

  getMonthlyWon(): number {
    return this.sampleLeads
      .filter(lead => lead.stage === 'won')
      .reduce((sum, lead) => sum + lead.value, 0);
  }

  getMonthlyWonCount(): number {
    return this.getCountByStage('won');
  }

  getLeadById(id: number): LeadData | undefined {
    return this.sampleLeads.find(lead => lead.id === id);
  }

  showImportDialog() {
    alert('📊 Import Dialog would open here!\n\nSupported formats:\n• CSV/Excel files\n• LinkedIn Sales Navigator\n• Trade show attendee lists\n• Website form submissions');
  }

  filterByTemperature(temp: string) {
    this.currentView = 'table';
    // In real implementation, this would set a temperature filter
    alert(`🔥 Filtered view showing all ${temp} leads!\n\nThis would show leads requiring immediate attention based on engagement level and buying signals.`);
  }

  showWonDeals() {
    alert('🎉 Won Deals Report!\n\nThis month:\n• 1 deal closed (₹2.8L)\n• Average deal size: ₹2.8L\n• Sales cycle: 15 days\n• Top performer: Neha Singh');
  }

  // Workflow Methods
  showNewLeadForm() {
    alert('🚀 Quick Add Options:\n\n• 📞 Phone Enquiry\n• 🌐 Web Form Lead\n• 🏢 Walk-in Visitor\n• 👥 Referral\n• 📧 Email Enquiry\n• 📱 Social Media Lead\n\nSmart form auto-populates based on source type!');
  }

  convertToLead(item: LeadData | undefined) {
    if (!item) return;
    
    const convertType = item.type === 'enquiry' ? 'Enquiry' : item.type === 'visit' ? 'Visit' : 'Prospect';
    const result = confirm(`🔄 Convert ${convertType} to Qualified Lead?\n\n${item.name} - ${item.company}\nValue: ₹${item.value.toLocaleString()}\nProbability: ${item.probability}%\n\nThis will move them to the qualified stage.`);
    
    if (result) {
      // Simulate conversion with enhanced workflow
      item.type = 'lead';
      item.stage = 'qualified';
      item.canConvert = false;
      item.nextAction = 'Send detailed proposal';
      item.probability = 65;
      item.temperature = 'hot';
      item.daysInStage = 0;
      item.tags.push('converted');
      
      // Show success with next steps
      alert(`✅ ${convertType} Successfully Converted!\n\n${item.name} is now a qualified lead.\n\nNext Actions:\n• 📧 Send welcome email\n• 📋 Schedule needs assessment\n• 📄 Prepare proposal template\n• 📅 Set follow-up reminder`);
      
      // Add to recent activities
      this.recentActivities.unshift({
        icon: '🔄',
        title: `${convertType} converted to Qualified Lead`,
        description: `${item.name} - ${item.company} (₹${item.value.toLocaleString()})`,
        time: 'Just now'
      });
    }
  }

  getTypeClass(type: string): string {
    const classes = {
      'enquiry': 'bg-yellow-100 text-yellow-800',
      'lead': 'bg-blue-100 text-blue-800',
      'visit': 'bg-purple-100 text-purple-800',
      'referral': 'bg-green-100 text-green-800'
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getTemperatureClass(temperature: string): string {
    const classes = {
      'cold': 'bg-blue-100 text-blue-800',
      'warm': 'bg-yellow-100 text-yellow-800',
      'hot': 'bg-red-100 text-red-800'
    };
    return classes[temperature as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getPriorityClass(priority: string): string {
    const classes = {
      'low': 'bg-gray-100 text-gray-700',
      'medium': 'bg-blue-100 text-blue-700',
      'high': 'bg-orange-100 text-orange-700',
      'urgent': 'bg-red-100 text-red-700'
    };
    return classes[priority as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }
}
