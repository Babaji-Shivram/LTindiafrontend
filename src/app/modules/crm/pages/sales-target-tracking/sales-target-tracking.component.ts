import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnhancedCrmService, CrmTarget } from '../../services/enhanced-crm.service';
import { EnhancedBarChartComponent } from '../../../../shared/components/enhanced-bar-chart/enhanced-bar-chart.component';

@Component({
  selector: 'app-sales-target-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, EnhancedBarChartComponent],
  template: `
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Sales Target Tracking</h1>
        <p class="text-sm text-gray-600 mt-1">Monitor and manage sales targets and achievements</p>
      </div>
      <div class="flex gap-3">
        <button
          (click)="exportTargets()"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <i class="fas fa-download"></i>
          Export Report
        </button>
        <button
          (click)="showCreateTargetModal = true"
          class="btn-brand-primary px-4 py-2 rounded-lg flex items-center gap-2">
          <i class="fas fa-plus"></i>
          Set Target
        </button>
      </div>
    </div>

    <!-- Performance Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-bullseye text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Targets</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getActiveTargets() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-chart-line text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Average Achievement</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getAverageAchievement() }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-trophy text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Targets Met</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getTargetsMet() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <i class="fas fa-users text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Top Performers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getTopPerformers() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Performance Chart -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Monthly Performance Trend</h3>
          <div class="text-sm text-gray-500">
            Enhanced interactive chart with filtering options
          </div>
        </div>
      </div>
      
      <!-- Enhanced Bar Chart Implementation -->
      <div class="p-6">
        <app-enhanced-bar-chart 
          [chartData]="getChartData()" 
          [title]="'Monthly Performance Trend'"
          [height]="350">
        </app-enhanced-bar-chart>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (ngModelChange)="applyFilters()"
                placeholder="Search targets by user name..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <select
              [(ngModel)]="targetTypeFilter"
              (ngModelChange)="applyFilters()"
              class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Target Types</option>
              <option value="LEADS">Leads</option>
              <option value="ENQUIRIES">Enquiries</option>
              <option value="QUOTES">Quotes</option>
              <option value="CONTRACTS">Contracts</option>
              <option value="REVENUE">Revenue</option>
            </select>
            
            <select
              [(ngModel)]="statusFilter"
              (ngModelChange)="applyFilters()"
              class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="EXPIRED">Expired</option>
            </select>
            
            <input
              type="month"
              [(ngModel)]="monthFilter"
              (ngModelChange)="applyFilters()"
              class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
      </div>
    </div>

    <!-- Targets Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="min-w-full">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achieved</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let target of filteredTargets; trackBy: trackByTargetId" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-user text-blue-600"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ target.userName }}</div>
                    <div class="text-sm text-gray-500">ID: {{ target.userID }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-blue-100 text-blue-800': target.targetType === 'LEADS',
                        'bg-green-100 text-green-800': target.targetType === 'ENQUIRIES',
                        'bg-yellow-100 text-yellow-800': target.targetType === 'QUOTES',
                        'bg-purple-100 text-purple-800': target.targetType === 'CONTRACTS',
                        'bg-red-100 text-red-800': target.targetType === 'REVENUE'
                      }">
                  {{ target.targetType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ target.targetMonth | date:'MMM yyyy' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  <span *ngIf="target.targetType === 'REVENUE'">₹</span>{{ target.targetValue | number:'1.0-0' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  <span *ngIf="target.targetType === 'REVENUE'">₹</span>{{ target.achievedValue | number:'1.0-0' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      [ngClass]="{
                        'bg-red-500': target.achievementPercentage < 50,
                        'bg-yellow-500': target.achievementPercentage >= 50 && target.achievementPercentage < 80,
                        'bg-green-500': target.achievementPercentage >= 80
                      }"
                      [style.width.%]="Math.min(target.achievementPercentage, 100)">
                    </div>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ target.achievementPercentage }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-green-100 text-green-800': target.status === 'ACTIVE',
                        'bg-blue-100 text-blue-800': target.status === 'COMPLETED',
                        'bg-gray-100 text-gray-800': target.status === 'EXPIRED'
                      }">
                  {{ target.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    (click)="viewTarget(target)"
                    class="text-blue-600 hover:text-blue-900 p-1"
                    title="View Details">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    (click)="editTarget(target)"
                    class="text-yellow-600 hover:text-yellow-900 p-1"
                    title="Edit Target">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    (click)="updateProgress(target)"
                    class="text-green-600 hover:text-green-900 p-1"
                    title="Update Progress">
                    <i class="fas fa-chart-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div *ngIf="filteredTargets.length === 0" class="text-center py-12">
          <i class="fas fa-bullseye text-gray-300 text-4xl mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No targets found</h3>
          <p class="text-gray-500 mb-4">{{ searchTerm ? 'Try adjusting your search criteria' : 'Get started by setting your first sales target' }}</p>
          <button
            (click)="showCreateTargetModal = true"
            class="btn-brand-primary px-4 py-2 rounded-lg">
            Set Target
          </button>
        </div>
      </div>
    </div>

    <!-- Create Target Modal -->
    <div *ngIf="showCreateTargetModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full mx-4">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Set New Target</h3>
          <button
            (click)="showCreateTargetModal = false"
            class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form (ngSubmit)="createTarget()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">User</label>
            <select
              [(ngModel)]="newTarget.userID"
              name="userID"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select User</option>
              <option value="USER-001">Alex Johnson</option>
              <option value="USER-002">Priya Sharma</option>
              <option value="USER-003">Raj Patel</option>
              <option value="USER-004">Sarah Wilson</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Target Type</label>
            <select
              [(ngModel)]="newTarget.targetType"
              name="targetType"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Type</option>
              <option value="LEADS">Leads</option>
              <option value="ENQUIRIES">Enquiries</option>
              <option value="QUOTES">Quotes</option>
              <option value="CONTRACTS">Contracts</option>
              <option value="REVENUE">Revenue</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Target Month</label>
            <input
              type="month"
              [(ngModel)]="newTarget.targetMonth"
              name="targetMonth"
              required
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
            <input
              type="number"
              [(ngModel)]="newTarget.targetValue"
              name="targetValue"
              required
              placeholder="Enter target value"
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              (click)="showCreateTargetModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              class="btn-brand-primary px-4 py-2 text-sm font-medium border border-transparent rounded-md">
              Set Target
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .chart-bar {
      transition: height 0.5s ease-in-out;
    }
    
    .progress-bar {
      transition: width 0.3s ease-in-out;
    }
    
    .hover-tooltip {
      @apply absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity;
    }

    .btn-brand-primary {
      background-color: #2c4170;
      color: white;
      transition: all 0.2s ease;
    }

    .btn-brand-primary:hover {
      background-color: #1e2e4a;
    }
  `]
})
export class SalesTargetTrackingComponent implements OnInit {
  targets: CrmTarget[] = [];
  filteredTargets: CrmTarget[] = [];
  
  // Filters
  searchTerm = '';
  targetTypeFilter = '';
  statusFilter = '';
  monthFilter = '';
  
  // Chart data
  selectedYear = '2024';
  selectedTargetType = '';
  chartData: any[] = [];
  
  // Modal states
  showCreateTargetModal = false;
  
  // New target form
  newTarget: Partial<CrmTarget> = {
    targetValue: 0
  };
  
  // Math reference for template
  Math = Math;

  constructor(
    private enhancedCrmService: EnhancedCrmService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTargets();
    this.generateChartData();
  }

  loadTargets() {
    this.enhancedCrmService.getTargets().subscribe((targets: CrmTarget[]) => {
      this.targets = targets;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTargets = this.targets.filter(target => {
      const matchesSearch = !this.searchTerm || 
        target.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.targetTypeFilter || target.targetType === this.targetTypeFilter;
      const matchesStatus = !this.statusFilter || target.status === this.statusFilter;
      
      const matchesMonth = !this.monthFilter || 
        target.targetMonth.toISOString().substring(0, 7) === this.monthFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesMonth;
    });
  }

  generateChartData() {
    // Use realistic sales data similar to what was shown in the screenshot
    const monthlyData = [
      { month: 'Jan', target: 2133, achieved: 1890 },
      { month: 'Feb', target: 2133, achieved: 1950 },
      { month: 'Mar', target: 2133, achieved: 1820 },
      { month: 'Apr', target: 2133, achieved: 1780 },
      { month: 'May', target: 2133, achieved: 1850 },
      { month: 'Jun', target: 2133, achieved: 1900 },
      { month: 'Jul', target: 2133, achieved: 1200 },
      { month: 'Aug', target: 2133, achieved: 1650 },
      { month: 'Sep', target: 2133, achieved: 1400 },
      { month: 'Oct', target: 2133, achieved: 2000 },
      { month: 'Nov', target: 2133, achieved: 2050 },
      { month: 'Dec', target: 2133, achieved: 1980 }
    ];
    
    this.chartData = monthlyData.map(item => ({
      label: item.month,
      target: item.target,
      achieved: item.achieved,
      targetPercentage: 100,
      achievedPercentage: (item.achieved / item.target) * 100
    }));
  }

  getChartData() {
    // Convert the chartData to the format expected by EnhancedBarChartComponent
    return this.chartData.map(item => ({
      label: item.label,
      target: item.target,
      achieved: item.achieved
    }));
  }

  updateChart() {
    this.generateChartData();
  }

  createTarget() {
    if (this.newTarget.userID && this.newTarget.targetType && this.newTarget.targetValue) {
      // Set userName based on userID
      const userNames: Record<string, string> = {
        'USER-001': 'Alex Johnson',
        'USER-002': 'Priya Sharma',
        'USER-003': 'Raj Patel',
        'USER-004': 'Sarah Wilson'
      };
      
      this.newTarget.userName = userNames[this.newTarget.userID] || 'Unknown User';
      
      this.enhancedCrmService.createTarget(this.newTarget).subscribe((target: CrmTarget) => {
        this.loadTargets();
        this.showCreateTargetModal = false;
        this.resetNewTarget();
      });
    }
  }

  resetNewTarget() {
    this.newTarget = {
      targetValue: 0
    };
  }

  viewTarget(target: CrmTarget) {
    // Implement view target details
    console.log('Viewing target:', target);
  }

  editTarget(target: CrmTarget) {
    this.router.navigate(['/crm/targets', target.targetID, 'edit']);
  }

  updateProgress(target: CrmTarget) {
    // Implement progress update functionality
    console.log('Updating progress for target:', target);
  }

  exportTargets() {
    // Implement export functionality
    console.log('Exporting targets...');
  }

  // Summary calculations
  getActiveTargets(): number {
    return this.targets.filter(t => t.status === 'ACTIVE').length;
  }

  getAverageAchievement(): number {
    if (this.targets.length === 0) return 0;
    const total = this.targets.reduce((sum, t) => sum + t.achievementPercentage, 0);
    return Math.round(total / this.targets.length);
  }

  getTargetsMet(): number {
    return this.targets.filter(t => t.achievementPercentage >= 100).length;
  }

  getTopPerformers(): number {
    return this.targets.filter(t => t.achievementPercentage >= 80).length;
  }

  trackByTargetId(index: number, target: CrmTarget): string {
    return target.targetID;
  }
}
