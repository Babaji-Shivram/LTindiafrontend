import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadCreationService } from '../../../../crm/services/lead-creation.service';
import { BusinessCategory } from '../../../../crm/interfaces/lead-creation.interface';

export interface BusinessCategoryExtended extends BusinessCategory {
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-business-categories-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="business-categories-container">
      <!-- Header -->
      <div class="header-section">
        <div class="header-content">
          <div class="header-text">
            <h1 class="page-title">Business Categories</h1>
            <p class="page-description">Manage business categories used in lead classification</p>
          </div>
          <button class="btn-primary" (click)="createBusinessCategory()">
            <span class="material-icons">add</span>
            Add Business Category
          </button>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="search-section">
        <div class="search-bar">
          <span class="material-icons search-icon">search</span>
          <input
            type="text"
            placeholder="Search business categories..."
            [(ngModel)]="searchTerm"
            (input)="onSearch()"
            class="search-input"
          />
        </div>
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
      </div>

      <!-- Table -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of filteredBusinessCategories; trackBy: trackByCategory">
              <td class="category-name">
                <div class="name-cell">
                  <span class="material-icons category-icon">category</span>
                  <span class="name-text">{{category.businessCategoryName}}</span>
                </div>
              </td>
              <td class="description-cell">
                <span [title]="category.description">
                  {{category.description || 'No description'}}
                </span>
              </td>
              <td>
                <span class="status-badge" 
                      [class.active]="category.isActive" 
                      [class.inactive]="!category.isActive">
                  {{category.isActive ? 'Active' : 'Inactive'}}
                </span>
              </td>
              <td>{{formatDate(category.createdAt)}}</td>
              <td>{{formatDate(category.updatedAt)}}</td>
              <td>
                <div class="action-buttons">
                  <button 
                    class="action-btn edit-btn" 
                    (click)="editBusinessCategory(category)"
                    title="Edit">
                    <span class="material-icons">edit</span>
                  </button>
                  <button 
                    class="action-btn toggle-btn"
                    [class.activate]="!category.isActive"
                    [class.deactivate]="category.isActive"
                    (click)="toggleStatus(category)"
                    [title]="category.isActive ? 'Deactivate' : 'Activate'">
                    <span class="material-icons">
                      {{category.isActive ? 'toggle_on' : 'toggle_off'}}
                    </span>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    (click)="deleteBusinessCategory(category)"
                    title="Delete">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div *ngIf="filteredBusinessCategories.length === 0" class="empty-state">
          <span class="material-icons empty-icon">category</span>
          <h3>No Business Categories Found</h3>
          <p>{{getEmptyStateMessage()}}</p>
          <button class="btn-primary" (click)="createBusinessCategory()">
            <span class="material-icons">add</span>
            Add First Business Category
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .business-categories-container {
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .search-bar {
      flex: 1;
      position: relative;
      max-width: 400px;
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

    .category-name .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .category-icon {
      color: #3b82f6;
      background: #eff6ff;
      padding: 6px;
      border-radius: 6px;
      font-size: 18px;
    }

    .name-text {
      font-weight: 600;
      color: #1e293b;
    }

    .description-cell {
      max-width: 300px;
    }

    .description-cell span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

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
      .business-categories-container {
        padding: 16px;
      }

      .header-content {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .search-section {
        flex-direction: column;
        gap: 16px;
      }

      .search-bar {
        max-width: none;
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
export class BusinessCategoriesListComponent implements OnInit {
  businessCategories: BusinessCategoryExtended[] = [];
  filteredBusinessCategories: BusinessCategoryExtended[] = [];
  searchTerm: string = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';

  constructor(
    private router: Router,
    private leadCreationService: LeadCreationService
  ) {}

  ngOnInit() {
    this.loadBusinessCategories();
  }

  loadBusinessCategories() {
    this.leadCreationService.getBusinessCategories().subscribe({
      next: (categories) => {
        // Transform to extended interface
        this.businessCategories = categories.map(category => ({
          ...category,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading business categories:', error);
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

  applyFilters() {
    let filtered = [...this.businessCategories];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(category =>
        category.businessCategoryName.toLowerCase().includes(searchLower) ||
        (category.description && category.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (this.statusFilter === 'active') {
      filtered = filtered.filter(category => category.isActive);
    } else if (this.statusFilter === 'inactive') {
      filtered = filtered.filter(category => !category.isActive);
    }

    this.filteredBusinessCategories = filtered;
  }

  createBusinessCategory() {
    // Navigate to create form
    this.router.navigate(['/masters/crm/business-categories/create']);
  }

  editBusinessCategory(category: BusinessCategoryExtended) {
    // Navigate to edit form
    this.router.navigate(['/masters/crm/business-categories/edit', category.businessCategoryId]);
  }

  toggleStatus(category: BusinessCategoryExtended) {
    const action = category.isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} "${category.businessCategoryName}"?`)) {
      // Update status
      category.isActive = !category.isActive;
      category.updatedAt = new Date();
      console.log(`${action} business category:`, category);
    }
  }

  deleteBusinessCategory(category: BusinessCategoryExtended) {
    if (confirm(`Are you sure you want to delete "${category.businessCategoryName}"? This action cannot be undone.`)) {
      // Delete category
      this.businessCategories = this.businessCategories.filter(c => c.businessCategoryId !== category.businessCategoryId);
      this.applyFilters();
      console.log('Delete business category:', category);
    }
  }

  trackByCategory(index: number, category: BusinessCategoryExtended): number {
    return category.businessCategoryId;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTotalCount(): number {
    return this.businessCategories.length;
  }

  getActiveCount(): number {
    return this.businessCategories.filter(c => c.isActive).length;
  }

  getInactiveCount(): number {
    return this.businessCategories.filter(c => !c.isActive).length;
  }

  getEmptyStateMessage(): string {
    if (this.searchTerm.trim()) {
      return `No business categories match "${this.searchTerm}". Try adjusting your search terms.`;
    }
    
    if (this.statusFilter === 'active') {
      return 'No active business categories found. Create one to get started.';
    }
    
    if (this.statusFilter === 'inactive') {
      return 'No inactive business categories found.';
    }
    
    return 'Start by creating your first business category to organize leads effectively.';
  }
}
