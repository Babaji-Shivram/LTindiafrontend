import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadCreationService } from '../../../../crm/services/lead-creation.service';
import { Service } from '../../../../crm/interfaces/lead-creation.interface';

export interface ServiceExtended extends Service {
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="services-container">
      <!-- Header -->
      <div class="header-section">
        <div class="header-content">
          <div class="header-text">
            <h1 class="page-title">Services</h1>
            <p class="page-description">Manage services offered for lead requirements</p>
          </div>
          <button class="btn-primary" (click)="createService()">
            <span class="material-icons">add</span>
            Add Service
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="search-section">
        <div class="search-bar">
          <span class="material-icons search-icon">search</span>
          <input
            type="text"
            placeholder="Search services..."
            [(ngModel)]="searchTerm"
            (input)="onSearch()"
            class="search-input"
          />
        </div>
        <div class="filter-section">
          <div class="filter-buttons">
            <button 
              class="filter-btn"
              [class.active]="statusFilter === 'all'"
              (click)="setStatusFilter('all')">
              All ({{getTotalCount()}})
            </button>
            <button 
              class="filter-btn"
              [class.active]="statusFilter === 'active'"
              (click)="setStatusFilter('active')">
              Active ({{getActiveCount()}})
            </button>
            <button 
              class="filter-btn"
              [class.active]="statusFilter === 'inactive'"
              (click)="setStatusFilter('inactive')">
              Inactive ({{getInactiveCount()}})
            </button>
          </div>
          <div class="type-filter">
            <select [(ngModel)]="typeFilter" (change)="onTypeFilterChange()" class="type-select">
              <option value="all">All Types</option>
              <option value="IMPORT">Import</option>
              <option value="EXPORT">Export</option>
              <option value="DOMESTIC">Domestic</option>
              <option value="WAREHOUSE">Warehouse</option>
              <option value="TRANSPORT">Transport</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Service Code</th>
              <th>Service Type</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let service of filteredServices; trackBy: trackByService">
              <td class="service-name">
                <div class="name-cell">
                  <span class="material-icons service-icon" [class]="getServiceIconClass(service.serviceType)">
                    {{getServiceIcon(service.serviceType)}}
                  </span>
                  <span class="name-text">{{service.serviceName}}</span>
                </div>
              </td>
              <td class="service-code">
                <span class="code-badge">{{service.serviceCode}}</span>
              </td>
              <td>
                <span class="type-badge" [class]="getTypeClass(service.serviceType)">
                  {{service.serviceType}}
                </span>
              </td>
              <td>
                <span class="status-badge" 
                      [class.active]="service.isActive" 
                      [class.inactive]="!service.isActive">
                  {{service.isActive ? 'Active' : 'Inactive'}}
                </span>
              </td>
              <td>{{formatDate(service.createdAt)}}</td>
              <td>{{formatDate(service.updatedAt)}}</td>
              <td>
                <div class="action-buttons">
                  <button 
                    class="action-btn edit-btn" 
                    (click)="editService(service)"
                    title="Edit">
                    <span class="material-icons">edit</span>
                  </button>
                  <button 
                    class="action-btn toggle-btn"
                    [class.activate]="!service.isActive"
                    [class.deactivate]="service.isActive"
                    (click)="toggleStatus(service)"
                    [title]="service.isActive ? 'Deactivate' : 'Activate'">
                    <span class="material-icons">
                      {{service.isActive ? 'toggle_on' : 'toggle_off'}}
                    </span>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    (click)="deleteService(service)"
                    title="Delete">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div *ngIf="filteredServices.length === 0" class="empty-state">
          <span class="material-icons empty-icon">business_center</span>
          <h3>No Services Found</h3>
          <p>{{getEmptyStateMessage()}}</p>
          <button class="btn-primary" (click)="createService()">
            <span class="material-icons">add</span>
            Add First Service
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .services-container {
      padding: 24px;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .header-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-text {
      flex: 1;
    }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .page-description {
      color: #64748b;
      margin: 0;
      font-size: 16px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }

    .search-section {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
    }

    .search-bar {
      position: relative;
      max-width: 400px;
      margin-bottom: 16px;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
      font-size: 20px;
    }

    .search-input {
      width: 100%;
      padding: 12px 12px 12px 44px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .filter-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .filter-buttons {
      display: flex;
      gap: 8px;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
      transition: all 0.2s ease;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .filter-btn:hover:not(.active) {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .type-filter {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .type-select {
      padding: 8px 12px;
      border: 2px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      background: white;
      color: #64748b;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .type-select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background: #f8fafc;
      padding: 16px;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }

    .data-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 14px;
    }

    .data-table tr:hover {
      background-color: #f8fafc;
    }

    .service-name .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .service-icon {
      padding: 6px;
      border-radius: 6px;
      font-size: 18px;
    }

    .service-icon.import { color: #059669; background: #d1fae5; }
    .service-icon.export { color: #dc2626; background: #fef2f2; }
    .service-icon.domestic { color: #3b82f6; background: #eff6ff; }
    .service-icon.warehouse { color: #f59e0b; background: #fef3c7; }
    .service-icon.transport { color: #8b5cf6; background: #f3e8ff; }

    .name-text {
      font-weight: 600;
      color: #1e293b;
    }

    .code-badge {
      padding: 4px 8px;
      background: #f1f5f9;
      border-radius: 6px;
      font-family: monospace;
      font-size: 12px;
      font-weight: 600;
      color: #475569;
    }

    .type-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .type-badge.import { background: #d1fae5; color: #065f46; }
    .type-badge.export { background: #fef2f2; color: #991b1b; }
    .type-badge.domestic { background: #eff6ff; color: #1e40af; }
    .type-badge.warehouse { background: #fef3c7; color: #92400e; }
    .type-badge.transport { background: #f3e8ff; color: #6b21a8; }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge.active {
      background: #dcfce7;
      color: #166534;
    }

    .status-badge.inactive {
      background: #fef2f2;
      color: #dc2626;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 6px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-btn .material-icons {
      font-size: 16px;
    }

    .edit-btn:hover {
      background: #eff6ff;
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .toggle-btn.activate:hover {
      background: #dcfce7;
      border-color: #22c55e;
      color: #22c55e;
    }

    .toggle-btn.deactivate:hover {
      background: #fef3c7;
      border-color: #f59e0b;
      color: #f59e0b;
    }

    .delete-btn:hover {
      background: #fef2f2;
      border-color: #ef4444;
      color: #ef4444;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
    }

    .empty-icon {
      font-size: 64px;
      color: #cbd5e1;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #475569;
      font-size: 20px;
      font-weight: 600;
    }

    .empty-state p {
      margin: 0 0 24px 0;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .services-container {
        padding: 16px;
      }

      .header-content {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .search-bar {
        max-width: none;
      }

      .filter-section {
        flex-direction: column;
        gap: 16px;
      }

      .filter-buttons {
        justify-content: center;
      }

      .data-table {
        font-size: 12px;
      }

      .data-table th,
      .data-table td {
        padding: 12px 8px;
      }

      .action-buttons {
        flex-direction: column;
        gap: 4px;
      }
    }
  `]
})
export class ServicesListComponent implements OnInit {
  services: ServiceExtended[] = [];
  filteredServices: ServiceExtended[] = [];
  searchTerm: string = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  typeFilter: 'all' | 'IMPORT' | 'EXPORT' | 'DOMESTIC' | 'WAREHOUSE' | 'TRANSPORT' = 'all';

  constructor(
    private router: Router,
    private leadCreationService: LeadCreationService
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.leadCreationService.getAvailableServices().subscribe({
      next: (services: Service[]) => {
        // Transform to extended interface
        this.services = services.map(service => ({
          ...service,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('Error loading services:', error);
      }
    });
  }

  onSearch() {
    this.applyFilters();
  }

  setStatusFilter(filter: 'all' | 'active' | 'inactive') {
    this.statusFilter = filter;
    this.applyFilters();
  }

  onTypeFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.services];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.serviceName.toLowerCase().includes(searchLower) ||
        service.serviceCode.toLowerCase().includes(searchLower) ||
        service.serviceType.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (this.statusFilter === 'active') {
      filtered = filtered.filter(service => service.isActive);
    } else if (this.statusFilter === 'inactive') {
      filtered = filtered.filter(service => !service.isActive);
    }

    // Apply type filter
    if (this.typeFilter !== 'all') {
      filtered = filtered.filter(service => service.serviceType === this.typeFilter);
    }

    this.filteredServices = filtered;
  }

  createService() {
    // Navigate to create form
    this.router.navigate(['/masters/crm/services/create']);
  }

  editService(service: ServiceExtended) {
    // Navigate to edit form
    this.router.navigate(['/masters/crm/services/edit', service.serviceId]);
  }

  toggleStatus(service: ServiceExtended) {
    const action = service.isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} "${service.serviceName}"?`)) {
      // Update status
      service.isActive = !service.isActive;
      service.updatedAt = new Date();
      console.log(`${action} service:`, service);
    }
  }

  deleteService(service: ServiceExtended) {
    if (confirm(`Are you sure you want to delete "${service.serviceName}"? This action cannot be undone.`)) {
      // Delete service
      this.services = this.services.filter(s => s.serviceId !== service.serviceId);
      this.applyFilters();
      console.log('Delete service:', service);
    }
  }

  trackByService(index: number, service: ServiceExtended): number {
    return service.serviceId;
  }

  getServiceIcon(type: string): string {
    switch (type) {
      case 'IMPORT': return 'input';
      case 'EXPORT': return 'output';
      case 'DOMESTIC': return 'home';
      case 'WAREHOUSE': return 'warehouse';
      case 'TRANSPORT': return 'local_shipping';
      default: return 'business_center';
    }
  }

  getServiceIconClass(type: string): string {
    return type.toLowerCase();
  }

  getTypeClass(type: string): string {
    return type.toLowerCase();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTotalCount(): number {
    return this.services.length;
  }

  getActiveCount(): number {
    return this.services.filter(s => s.isActive).length;
  }

  getInactiveCount(): number {
    return this.services.filter(s => !s.isActive).length;
  }

  getEmptyStateMessage(): string {
    if (this.searchTerm.trim()) {
      return `No services match "${this.searchTerm}". Try adjusting your search terms.`;
    }
    
    if (this.statusFilter === 'active') {
      return 'No active services found. Create one to get started.';
    }
    
    if (this.statusFilter === 'inactive') {
      return 'No inactive services found.';
    }

    if (this.typeFilter !== 'all') {
      return `No ${this.typeFilter.toLowerCase()} services found.`;
    }
    
    return 'Start by creating your first service to define lead requirements.';
  }
}
