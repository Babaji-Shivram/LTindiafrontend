import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface LeadStage {
  id: string;
  stageName: string;
  description: string;
  stageCategory: 'Pipeline' | 'Won' | 'Lost';
  stageColor: string;
  sortOrder: number;
  targetDays?: number;
  requiresApproval: boolean;
  flags: {
    isPipeline: boolean;
    isWon: boolean;
    isLost: boolean;
  };
  isActive: boolean;
  createdDate: Date;
  leadsCount: number;
}

@Component({
  selector: 'app-lead-stages-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title text-gray-900">Lead Stage Master</h1>
          <p class="secondary-text text-gray-600">Manage lead pipeline stages with drag-and-drop ordering</p>
        </div>
        <button class="btn btn-primary" (click)="openStageForm()">
          <span class="material-icons text-sm mr-2">add</span>
          Add Lead Stage
        </button>
      </div>

      <!-- Stage Management Tools -->
      <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Search & Filters -->
          <div class="lg:col-span-2">
            <div class="flex flex-wrap gap-4">
              <div class="flex-1 min-w-64">
                <input
                  type="text"
                  [(ngModel)]="searchTerm"
                  (input)="applyFilters()"
                  placeholder="Search stages by name or description..."
                  class="w-full input-text px-3 py-2 border border-gray-300 rounded">
              </div>
              <select
                [(ngModel)]="categoryFilter"
                (change)="applyFilters()"
                class="input-text px-3 py-2 border border-gray-300 rounded">
                <option value="">All Categories</option>
                <option value="Pipeline">Pipeline Stages</option>
                <option value="Won">Won Stages</option>
                <option value="Lost">Lost Stages</option>
              </select>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex gap-2">
            <button
              (click)="toggleViewMode()"
              class="btn btn-outline flex-1">
              <span class="material-icons text-sm mr-2">{{ viewMode === 'kanban' ? 'view_list' : 'view_kanban' }}</span>
              {{ viewMode === 'kanban' ? 'List View' : 'Kanban View' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Kanban View -->
      <div *ngIf="viewMode === 'kanban'" class="space-y-6">
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="section-header text-gray-900 mb-4">Stage Workflow</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Pipeline Stages -->
            <div class="space-y-4">
              <h4 class="font-medium text-gray-900 flex items-center">
                <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Pipeline Stages
              </h4>
              <div class="space-y-3">
                <div
                  *ngFor="let stage of getPipelineStages(); trackBy: trackByStage"
                  class="stage-card pipeline-stage"
                  [style.border-left-color]="stage.stageColor"
                  draggable="true"
                  (dragstart)="onDragStart($event, stage)"
                  (dragover)="onDragOver($event)"
                  (drop)="onDrop($event, 'pipeline')"
                  (click)="editStage(stage)">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="stage-color-preview" [style.background-color]="stage.stageColor"></div>
                      <div>
                        <div class="font-medium text-gray-900">{{ stage.stageName }}</div>
                        <div class="text-sm text-gray-500">{{ stage.description }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span *ngIf="stage.requiresApproval" class="badge badge-warning">Approval</span>
                      <span class="badge badge-info">{{ stage.leadsCount }} leads</span>
                      <div class="stage-actions">
                        <button class="btn-icon" (click)="editStage(stage); $event.stopPropagation()" title="Edit">
                          <span class="material-icons text-sm">edit</span>
                        </button>
                        <button class="btn-icon" (click)="deleteStage(stage.id); $event.stopPropagation()" title="Delete">
                          <span class="material-icons text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>Order: {{ stage.sortOrder }}</span>
                    <span *ngIf="stage.targetDays">Target: {{ stage.targetDays }} days</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Won Stages -->
            <div class="space-y-4">
              <h4 class="font-medium text-gray-900 flex items-center">
                <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Won Stages
              </h4>
              <div class="space-y-3">
                <div
                  *ngFor="let stage of getWonStages(); trackBy: trackByStage"
                  class="stage-card won-stage"
                  [style.border-left-color]="stage.stageColor"
                  draggable="true"
                  (dragstart)="onDragStart($event, stage)"
                  (click)="editStage(stage)">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="stage-color-preview" [style.background-color]="stage.stageColor"></div>
                      <div>
                        <div class="font-medium text-gray-900">{{ stage.stageName }}</div>
                        <div class="text-sm text-gray-500">{{ stage.description }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-success">{{ stage.leadsCount }} won</span>
                      <div class="stage-actions">
                        <button class="btn-icon" (click)="editStage(stage); $event.stopPropagation()" title="Edit">
                          <span class="material-icons text-sm">edit</span>
                        </button>
                        <button class="btn-icon" (click)="deleteStage(stage.id); $event.stopPropagation()" title="Delete">
                          <span class="material-icons text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lost Stages -->
            <div class="space-y-4">
              <h4 class="font-medium text-gray-900 flex items-center">
                <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Lost Stages
              </h4>
              <div class="space-y-3">
                <div
                  *ngFor="let stage of getLostStages(); trackBy: trackByStage"
                  class="stage-card lost-stage"
                  [style.border-left-color]="stage.stageColor"
                  draggable="true"
                  (dragstart)="onDragStart($event, stage)"
                  (click)="editStage(stage)">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="stage-color-preview" [style.background-color]="stage.stageColor"></div>
                      <div>
                        <div class="font-medium text-gray-900">{{ stage.stageName }}</div>
                        <div class="text-sm text-gray-500">{{ stage.description }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-error">{{ stage.leadsCount }} lost</span>
                      <div class="stage-actions">
                        <button class="btn-icon" (click)="editStage(stage); $event.stopPropagation()" title="Edit">
                          <span class="material-icons text-sm">edit</span>
                        </button>
                        <button class="btn-icon" (click)="deleteStage(stage.id); $event.stopPropagation()" title="Delete">
                          <span class="material-icons text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div *ngIf="viewMode === 'list'" class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Stage</th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Category</th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Order</th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Color</th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Target Days</th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Leads Count</th>
                <th scope="col" class="px-6 py-3 text-left table-header uppercase tracking-wider">Status</th>
                <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let stage of filteredStages; trackBy: trackByStage" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="stage-color-preview mr-3" [style.background-color]="stage.stageColor"></div>
                    <div>
                      <div class="table-cell font-medium text-gray-900">{{ stage.stageName }}</div>
                      <div class="secondary-text text-gray-500">{{ stage.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="badge" [ngClass]="{
                    'badge-info': stage.stageCategory === 'Pipeline',
                    'badge-success': stage.stageCategory === 'Won',
                    'badge-error': stage.stageCategory === 'Lost'
                  }">{{ stage.stageCategory }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap table-cell text-gray-900">{{ stage.sortOrder }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded border border-gray-300" [style.background-color]="stage.stageColor"></div>
                    <span class="ml-2 secondary-text text-gray-500">{{ stage.stageColor }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap table-cell text-gray-900">
                  {{ stage.targetDays || '-' }}
                  <span *ngIf="stage.targetDays" class="secondary-text text-gray-500">days</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="badge badge-gray">{{ stage.leadsCount }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="badge" [ngClass]="{
                    'badge-success': stage.isActive,
                    'badge-gray': !stage.isActive
                  }">{{ stage.isActive ? 'Active' : 'Inactive' }}</span>
                  <span *ngIf="stage.requiresApproval" class="badge badge-warning ml-2">Requires Approval</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button class="btn-icon" (click)="editStage(stage)" title="Edit Stage">
                    <span class="material-icons text-sm">edit</span>
                  </button>
                  <button class="btn-icon" (click)="deleteStage(stage.id)" title="Delete Stage">
                    <span class="material-icons text-sm">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Stage Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-blue-600 text-lg">timeline</span>
              </div>
            </div>
            <div class="ml-4">
              <div class="table-cell font-medium text-gray-900">{{ getPipelineStages().length }}</div>
              <div class="secondary-text text-gray-500">Pipeline Stages</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-green-600 text-lg">check_circle</span>
              </div>
            </div>
            <div class="ml-4">
              <div class="table-cell font-medium text-gray-900">{{ getWonStages().length }}</div>
              <div class="secondary-text text-gray-500">Won Stages</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-red-600 text-lg">cancel</span>
              </div>
            </div>
            <div class="ml-4">
              <div class="table-cell font-medium text-gray-900">{{ getLostStages().length }}</div>
              <div class="secondary-text text-gray-500">Lost Stages</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-yellow-600 text-lg">approval</span>
              </div>
            </div>
            <div class="ml-4">
              <div class="table-cell font-medium text-gray-900">{{ getApprovalStages().length }}</div>
              <div class="secondary-text text-gray-500">Require Approval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stage-card {
      @apply p-4 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200;
      border-left-width: 4px;
    }

    .stage-card:hover {
      @apply shadow-md transform scale-105;
    }

    .pipeline-stage {
      @apply bg-blue-50 border-blue-200;
    }

    .won-stage {
      @apply bg-green-50 border-green-200;
    }

    .lost-stage {
      @apply bg-red-50 border-red-200;
    }

    .stage-color-preview {
      @apply w-4 h-4 rounded-full border border-gray-300 flex-shrink-0;
    }

    .stage-actions {
      @apply flex gap-1 opacity-0 transition-opacity duration-200;
    }

    .stage-card:hover .stage-actions {
      @apply opacity-100;
    }

    .btn-icon {
      @apply p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200;
    }

    .badge {
      @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
    }

    .badge-info { @apply bg-blue-100 text-blue-800; }
    .badge-success { @apply bg-green-100 text-green-800; }
    .badge-error { @apply bg-red-100 text-red-800; }
    .badge-warning { @apply bg-yellow-100 text-yellow-800; }
    .badge-gray { @apply bg-gray-100 text-gray-800; }

    .btn {
      @apply inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium transition-colors duration-200;
    }

    .btn-primary {
      @apply bg-blue-600 text-white hover:bg-blue-700;
    }

    .btn-outline {
      @apply bg-white text-gray-700 border-gray-300 hover:bg-gray-50;
    }
  `]
})
export class LeadStagesListComponent implements OnInit {
  stages: LeadStage[] = [];
  filteredStages: LeadStage[] = [];
  searchTerm = '';
  categoryFilter = '';
  viewMode: 'kanban' | 'list' = 'kanban';
  draggedStage: LeadStage | null = null;

  ngOnInit(): void {
    this.loadStages();
  }

  loadStages(): void {
    // Mock data with comprehensive lead stages
    this.stages = [
      {
        id: 'LS-1',
        stageName: 'New Lead',
        description: 'Fresh leads that need initial qualification',
        stageCategory: 'Pipeline',
        stageColor: '#0079bf',
        sortOrder: 1,
        targetDays: 2,
        requiresApproval: false,
        flags: { isPipeline: true, isWon: false, isLost: false },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 45
      },
      {
        id: 'LS-2',
        stageName: 'Qualified',
        description: 'Leads that meet basic qualification criteria',
        stageCategory: 'Pipeline',
        stageColor: '#00c2e0',
        sortOrder: 2,
        targetDays: 5,
        requiresApproval: false,
        flags: { isPipeline: true, isWon: false, isLost: false },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 32
      },
      {
        id: 'LS-3',
        stageName: 'Proposal Sent',
        description: 'Formal proposal or quote has been submitted',
        stageCategory: 'Pipeline',
        stageColor: '#c9372c',
        sortOrder: 3,
        targetDays: 7,
        requiresApproval: false,
        flags: { isPipeline: true, isWon: false, isLost: false },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 28
      },
      {
        id: 'LS-4',
        stageName: 'Negotiation',
        description: 'Active negotiations on terms and pricing',
        stageCategory: 'Pipeline',
        stageColor: '#8e44ad',
        sortOrder: 4,
        targetDays: 10,
        requiresApproval: false,
        flags: { isPipeline: true, isWon: false, isLost: false },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 15
      },
      {
        id: 'LS-5',
        stageName: 'Approval Pending',
        description: 'Waiting for management approval on terms',
        stageCategory: 'Pipeline',
        stageColor: '#f39c12',
        sortOrder: 5,
        targetDays: 3,
        requiresApproval: true,
        flags: { isPipeline: true, isWon: false, isLost: false },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 8
      },
      {
        id: 'LS-6',
        stageName: 'Won - Contract Signed',
        description: 'Deal successfully closed with signed contract',
        stageCategory: 'Won',
        stageColor: '#27ae60',
        sortOrder: 6,
        requiresApproval: false,
        flags: { isPipeline: false, isWon: true, isLost: false },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 124
      },
      {
        id: 'LS-7',
        stageName: 'Lost - Price',
        description: 'Lost due to pricing concerns',
        stageCategory: 'Lost',
        stageColor: '#95a5a6',
        sortOrder: 7,
        requiresApproval: false,
        flags: { isPipeline: false, isWon: false, isLost: true },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 67
      },
      {
        id: 'LS-8',
        stageName: 'Lost - No Response',
        description: 'Lost due to lack of client response',
        stageCategory: 'Lost',
        stageColor: '#eb5a46',
        sortOrder: 8,
        requiresApproval: false,
        flags: { isPipeline: false, isWon: false, isLost: true },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 43
      },
      {
        id: 'LS-9',
        stageName: 'Lost - Competitor',
        description: 'Lost to competitor offering',
        stageCategory: 'Lost',
        stageColor: '#34495e',
        sortOrder: 9,
        requiresApproval: false,
        flags: { isPipeline: false, isWon: false, isLost: true },
        isActive: true,
        createdDate: new Date('2024-01-15'),
        leadsCount: 29
      }
    ];

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStages = this.stages.filter(stage => {
      const matchesSearch = !this.searchTerm || 
        stage.stageName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        stage.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.categoryFilter || stage.stageCategory === this.categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }

  getPipelineStages(): LeadStage[] {
    return this.filteredStages.filter(stage => stage.stageCategory === 'Pipeline');
  }

  getWonStages(): LeadStage[] {
    return this.filteredStages.filter(stage => stage.stageCategory === 'Won');
  }

  getLostStages(): LeadStage[] {
    return this.filteredStages.filter(stage => stage.stageCategory === 'Lost');
  }

  getApprovalStages(): LeadStage[] {
    return this.stages.filter(stage => stage.requiresApproval);
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'kanban' ? 'list' : 'kanban';
  }

  openStageForm(): void {
    // TODO: Open stage form modal or navigate to form page
    console.log('Opening stage form...');
  }

  editStage(stage: LeadStage): void {
    // TODO: Open edit form with stage data
    console.log('Editing stage:', stage);
  }

  deleteStage(stageId: string): void {
    if (confirm('Are you sure you want to delete this stage? This action cannot be undone.')) {
      this.stages = this.stages.filter(stage => stage.id !== stageId);
      this.applyFilters();
    }
  }

  trackByStage(index: number, stage: LeadStage): string {
    return stage.id;
  }

  // Drag and Drop functionality
  onDragStart(event: DragEvent, stage: LeadStage): void {
    this.draggedStage = stage;
    event.dataTransfer?.setData('text/plain', stage.id);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, category: string): void {
    event.preventDefault();
    
    if (this.draggedStage && this.draggedStage.stageCategory !== category) {
      // Update stage category
      this.draggedStage.stageCategory = category as 'Pipeline' | 'Won' | 'Lost';
      
      // Update flags based on category
      this.draggedStage.flags = {
        isPipeline: category === 'Pipeline',
        isWon: category === 'Won',
        isLost: category === 'Lost'
      };
      
      console.log(`Stage ${this.draggedStage.stageName} moved to ${category}`);
      this.applyFilters();
    }
    
    this.draggedStage = null;
  }
}
