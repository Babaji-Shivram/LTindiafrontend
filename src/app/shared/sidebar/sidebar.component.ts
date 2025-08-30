import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div [class]="sidebarClasses">
      <!-- Logo Section -->
      <div [class]="'border-b border-gray-100' + (isCollapsed ? ' p-4' : ' p-6')">
        <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' justify-between')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <button (click)="toggleSidebar()" 
                    class="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all duration-200 flex-shrink-0" 
                    style="background-color: #2c4170;">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z"/>
              </svg>
            </button>
            <div [class]="isCollapsed ? 'hidden' : 'block'">
              <h1 class="text-xs font-semibold text-gray-900">Live Tracking ERP</h1>
              <p class="text-xs text-gray-500">Enterprise System</p>
            </div>
          </div>
          <!-- Hamburger Menu Button (only when expanded) -->
          <button (click)="toggleSidebar()" 
                  [class]="isCollapsed ? 'hidden' : 'flex'"
                  class="items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav [class]="'flex-1 space-y-1 overflow-y-auto' + (isCollapsed ? ' px-2 py-4' : ' p-4')">
        <!-- Dashboard -->
        <a routerLink="/dashboard" 
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: false}"
           [class]="'nav-item group' + (isCollapsed ? ' justify-center' : '')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            <span [class]="isCollapsed ? 'hidden' : 'block'">Home</span>
          </div>
        </a>

        <!-- Identity Management -->
        <div class="space-y-1">
          <button (click)="toggleIdentityMenu()" 
                  [class]="'nav-item group w-full' + (isCollapsed ? ' justify-center' : ' justify-between')"
                  [class.active]="isIdentityActive()">
            <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              <span [class]="isCollapsed ? 'hidden' : 'block'">Identity</span>
            </div>
            <svg *ngIf="!isCollapsed" 
                 class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                 [class.rotate-180]="isIdentityMenuOpen"
                 fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          
          <!-- Identity Submenu -->
          <div *ngIf="isIdentityMenuOpen && !isCollapsed" class="ml-8 space-y-1">
            <a routerLink="/identity/users" 
               routerLinkActive="active"
               class="sub-nav-item">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"/>
                </svg>
                <span>Users</span>
              </div>
            </a>
            <a routerLink="/identity/roles" 
               routerLinkActive="active"
               class="sub-nav-item">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
                <span>Roles</span>
              </div>
            </a>
          </div>
        </div>

        <!-- CRM -->
        <div class="space-y-1">
          <button (click)="toggleCrmMenu()" 
                  [class]="'nav-item group w-full' + (isCollapsed ? ' justify-center' : ' justify-between')"
                  [class.active]="isCrmActive()">
            <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
              </svg>
              <span [class]="isCollapsed ? 'hidden' : 'block'">CRM</span>
            </div>
            <svg *ngIf="!isCollapsed" 
                 class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                 [class.rotate-180]="isCrmMenuOpen"
                 fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          
          <!-- CRM Submenu -->
          <div *ngIf="isCrmMenuOpen && !isCollapsed" class="ml-8 space-y-1">
            <a routerLink="/crm/leads" 
               routerLinkActive="active"
               class="sub-nav-item">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Leads</span>
              </div>
            </a>
            <a routerLink="/crm/board" 
               routerLinkActive="active"
               class="sub-nav-item">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm6 6V6h6v3h-6zm-2 0H6v3h2V9zm2 5h6v-2h-6v2zm-2 0v-2H6v2h2z"/>
                </svg>
                <span>Board</span>
              </div>
            </a>
            <a routerLink="/crm/approvals" 
               routerLinkActive="active"
               class="sub-nav-item">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Approvals</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Masters -->
        <div class="space-y-1">
          <button (click)="toggleMastersMenu()" 
                  [class]="'nav-item group w-full' + (isCollapsed ? ' justify-center' : ' justify-between')"
                  [class.active]="isMastersActive()">
            <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              <span [class]="isCollapsed ? 'hidden' : 'block'">Masters</span>
            </div>
            <svg *ngIf="!isCollapsed" 
                 class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                 [class.rotate-180]="isMastersMenuOpen"
                 fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          
          <!-- Masters Categories -->
          <div *ngIf="isMastersMenuOpen && !isCollapsed" class="ml-8 space-y-2">
            <!-- Geography -->
            <div class="space-y-1">
              <button (click)="toggleMasterCategory('geography')" 
                      class="sub-category-header">
                <div class="flex items-center space-x-2">
                  <span class="text-blue-600">🌍</span>
                  <span>Geography</span>
                </div>
                <svg class="w-3 h-3 transition-transform duration-200"
                     [class.rotate-180]="expandedMasterCategories['geography']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div *ngIf="expandedMasterCategories['geography']" class="ml-6 space-y-1">
                <a routerLink="/masters/countries" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🌍</span>
                    <span>Countries</span>
                  </div>
                </a>
                <a routerLink="/masters/states" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🗺️</span>
                    <span>States</span>
                  </div>
                </a>
                <a routerLink="/masters/cities" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🏙️</span>
                    <span>Cities</span>
                  </div>
                </a>
                <a routerLink="/masters/ports" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">⚓</span>
                    <span>Ports</span>
                  </div>
                </a>
                <a routerLink="/masters/branches" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🏪</span>
                    <span>Branches</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Finance -->
            <div class="space-y-1">
              <button (click)="toggleMasterCategory('finance')" 
                      class="sub-category-header">
                <div class="flex items-center space-x-2">
                  <span class="text-green-600">💱</span>
                  <span>Finance</span>
                </div>
                <svg class="w-3 h-3 transition-transform duration-200"
                     [class.rotate-180]="expandedMasterCategories['finance']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div *ngIf="expandedMasterCategories['finance']" class="ml-6 space-y-1">
                <a routerLink="/masters/currencies" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">💱</span>
                    <span>Currencies</span>
                  </div>
                </a>
                <a routerLink="/masters/tax-rate" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📊</span>
                    <span>Tax Rates</span>
                  </div>
                </a>
                <a routerLink="/masters/expenses" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">💰</span>
                    <span>Expense Categories</span>
                  </div>
                </a>
                <a routerLink="/masters/payment-terms" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">💳</span>
                    <span>Payment Terms</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Organizational -->
            <div class="space-y-1">
              <button (click)="toggleMasterCategory('organizational')" 
                      class="sub-category-header">
                <div class="flex items-center space-x-2">
                  <span class="text-gray-600">🏢</span>
                  <span>Organizational</span>
                </div>
                <svg class="w-3 h-3 transition-transform duration-200"
                     [class.rotate-180]="expandedMasterCategories['organizational']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div *ngIf="expandedMasterCategories['organizational']" class="ml-6 space-y-1">
                <a routerLink="/masters/departments" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🏢</span>
                    <span>Departments</span>
                  </div>
                </a>
                <a routerLink="/masters/divisions" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🏛️</span>
                    <span>Divisions</span>
                  </div>
                </a>
                <a routerLink="/masters/designations" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">👔</span>
                    <span>Designations</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Business -->
            <div class="space-y-1">
              <button (click)="toggleMasterCategory('business')" 
                      class="sub-category-header">
                <div class="flex items-center space-x-2">
                  <span class="text-red-600">🤝</span>
                  <span>Business</span>
                </div>
                <svg class="w-3 h-3 transition-transform duration-200"
                     [class.rotate-180]="expandedMasterCategories['business']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div *ngIf="expandedMasterCategories['business']" class="ml-6 space-y-1">
                <a routerLink="/masters/customers" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🤝</span>
                    <span>Customers</span>
                  </div>
                </a>
                <a routerLink="/masters/customer-sectors" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🏭</span>
                    <span>Customer Sectors</span>
                  </div>
                </a>
                <a routerLink="/masters" routerLinkActive="active" class="sub-nav-item" title="Coming Soon - Under Development">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📦</span>
                    <span>Commodities</span>
                    <span class="ml-auto text-xs text-gray-400">(Soon)</span>
                  </div>
                </a>
                <a routerLink="/masters" routerLinkActive="active" class="sub-nav-item" title="Coming Soon - Under Development">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🚢</span>
                    <span>Vessels</span>
                    <span class="ml-auto text-xs text-gray-400">(Soon)</span>
                  </div>
                </a>
                <a routerLink="/masters/vehicles" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🚛</span>
                    <span>Vehicles</span>
                  </div>
                </a>
                <a routerLink="/masters" routerLinkActive="active" class="sub-nav-item" title="Coming Soon - Under Development">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📋</span>
                    <span>Container Types</span>
                    <span class="ml-auto text-xs text-gray-400">(Soon)</span>
                  </div>
                </a>
                <a routerLink="/masters/cfs" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🏭</span>
                    <span>CFS Facilities</span>
                  </div>
                </a>
                <a routerLink="/masters" routerLinkActive="active" class="sub-nav-item" title="Coming Soon - Under Development">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">⚙️</span>
                    <span>Services</span>
                    <span class="ml-auto text-xs text-gray-400">(Soon)</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Operational -->
            <div class="space-y-1">
              <button (click)="toggleMasterCategory('operational')" 
                      class="sub-category-header">
                <div class="flex items-center space-x-2">
                  <span class="text-purple-600">📏</span>
                  <span>Operational</span>
                </div>
                <svg class="w-3 h-3 transition-transform duration-200"
                     [class.rotate-180]="expandedMasterCategories['operational']"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div *ngIf="expandedMasterCategories['operational']" class="ml-6 space-y-1">
                <a routerLink="/masters/job-types" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🚛</span>
                    <span>Job Types</span>
                  </div>
                </a>
                <a routerLink="/masters/job-status" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📊</span>
                    <span>Job Status</span>
                  </div>
                </a>
                <a routerLink="/masters/uom" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📏</span>
                    <span>Units of Measure</span>
                  </div>
                </a>
                <a routerLink="/masters/incoterms" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🌐</span>
                    <span>Incoterms</span>
                  </div>
                </a>
                <a routerLink="/masters/document-type" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📄</span>
                    <span>Document Types</span>
                  </div>
                </a>
                <a routerLink="/masters/package-types" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">📦</span>
                    <span>Package Types</span>
                  </div>
                </a>
                <a routerLink="/masters/status" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🔄</span>
                    <span>Status Codes</span>
                  </div>
                </a>
                <a routerLink="/masters/hsn-code" routerLinkActive="active" class="sub-nav-item">
                  <div class="flex items-center space-x-2">
                    <span class="w-4 h-4 text-center">🔢</span>
                    <span>HSN Codes</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Reports -->
        <a routerLink="/reports" 
           routerLinkActive="active"
           [class]="'nav-item group' + (isCollapsed ? ' justify-center' : '')">
          <div [class]="'flex items-center' + (isCollapsed ? ' justify-center' : ' space-x-3')">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2v1a2 2 0 002 2v1a2 2 0 002 2v1a2 2 0 002 2v1h2a2 2 0 002-2V8a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2v-1a2 2 0 002-2v-1a2 2 0 002-2v-1a2 2 0 002-2V8a2 2 0 00-2-2z" clip-rule="evenodd"/>
            </svg>
            <span [class]="isCollapsed ? 'hidden' : 'block'">Reports</span>
          </div>
        </a>
      </nav>

      <!-- User Section -->
      <!-- Removed user section content -->
    </div>
  `,
  styles: [`
    .nav-item {
      @apply flex items-center px-3 py-2.5 text-xs font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer;
      min-height: 40px;
    }
    
    .nav-item.active {
      @apply text-white shadow-sm;
      background-color: #2c4170;
    }
    
    .sub-nav-item {
      @apply flex items-center w-full space-x-2 px-3 py-2 text-xs text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200;
      min-height: 36px;
    }
    
    .sub-nav-item.active {
      @apply text-white;
      background-color: #2c4170;
    }
    
    .sub-category-header {
      @apply flex items-center justify-between w-full px-2 py-1.5 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-all duration-200;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleCollapsed = new EventEmitter<void>();

  isIdentityMenuOpen = true; // Default open for better UX
  isCrmMenuOpen = false; // Default closed
  isMastersMenuOpen = false; // Default closed to reduce clutter
  expandedMasterCategories: { [key: string]: boolean } = {
    geography: false,
    finance: false,
    organizational: false,
    business: false,
    operational: false
  };

  constructor(private router: Router) {}

  get sidebarClasses(): string {
    return `flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 shadow-sm ${
      this.isCollapsed ? 'w-20' : 'w-64'
    }`;
  }

  toggleSidebar() {
    this.toggleCollapsed.emit();
  }

  toggleIdentityMenu() {
    if (!this.isCollapsed) {
      this.isIdentityMenuOpen = !this.isIdentityMenuOpen;
    }
  }

  toggleMastersMenu() {
    if (!this.isCollapsed) {
      this.isMastersMenuOpen = !this.isMastersMenuOpen;
    }
  }

  toggleCrmMenu() {
    if (!this.isCollapsed) {
      this.isCrmMenuOpen = !this.isCrmMenuOpen;
    }
  }

  toggleMasterCategory(categoryKey: string) {
    this.expandedMasterCategories[categoryKey] = !this.expandedMasterCategories[categoryKey];
  }

  isIdentityActive(): boolean {
    return this.router.url.startsWith('/identity');
  }

  isCrmActive(): boolean {
    return this.router.url.startsWith('/crm');
  }

  isMastersActive(): boolean {
    return this.router.url.startsWith('/masters');
  }
}