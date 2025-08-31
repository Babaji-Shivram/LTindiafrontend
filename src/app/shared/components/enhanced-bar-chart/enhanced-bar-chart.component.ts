import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChartDataPoint {
  label: string;
  target: number;
  achieved: number;
  month?: string;
}

@Component({
  selector: 'app-enhanced-bar-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chart-container">
      <!-- Chart Header -->
      <div class="chart-header">
        <h3 class="chart-title">{{ title }}</h3>
        <div class="chart-controls">
          <select [(ngModel)]="selectedYear" (change)="onYearChange()" class="year-select">
            <option *ngFor="let year of availableYears" [value]="year">{{ year }}</option>
          </select>
          <select [(ngModel)]="selectedType" (change)="onTypeChange()" class="type-select">
            <option value="all">All Types</option>
            <option value="revenue">Revenue</option>
            <option value="leads">Leads</option>
            <option value="customers">Customers</option>
          </select>
          <div class="view-toggle">
            <button 
              class="toggle-btn" 
              [class.active]="chartType === 'stacked'"
              (click)="setChartType('stacked')">
              <span class="material-icons">bar_chart</span>
            </button>
            <button 
              class="toggle-btn" 
              [class.active]="chartType === 'line'"
              (click)="setChartType('line')">
              <span class="material-icons">show_chart</span>
            </button>
            <button 
              class="toggle-btn" 
              [class.active]="chartType === 'comparison'"
              (click)="setChartType('comparison')">
              <span class="material-icons">compare_arrows</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Stacked Bar Chart -->
      <div *ngIf="chartType === 'stacked'" class="stacked-chart">
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color target-color"></div>
            <span>Target</span>
          </div>
          <div class="legend-item">
            <div class="legend-color achieved-color"></div>
            <span>Achieved</span>
          </div>
        </div>
        
        <div class="chart-grid">
          <div *ngFor="let point of chartData" class="bar-group">
            <div class="bar-container">
              <div class="target-indicator" [style.height.px]="getTargetHeight(point.target)">
                <span class="target-label">{{ point.target | number }}</span>
              </div>
              <div class="stacked-bar" [style.height.px]="getTargetHeight(point.target)">
                <div 
                  class="achieved-bar" 
                  [style.height.%]="getAchievedPercentage(point.achieved, point.target)"
                  [title]="'Achieved: ' + point.achieved + ' / Target: ' + point.target">
                </div>
              </div>
            </div>
            <div class="bar-label">{{ point.label }}</div>
          </div>
        </div>
      </div>

      <!-- Line Chart -->
      <div *ngIf="chartType === 'line'" class="line-chart">
        <svg class="chart-svg" viewBox="0 0 800 300">
          <!-- Grid lines -->
          <g class="grid-lines">
            <line *ngFor="let line of getGridLines()" 
                  [attr.x1]="line.x1" [attr.y1]="line.y1" 
                  [attr.x2]="line.x2" [attr.y2]="line.y2" 
                  class="grid-line"></line>
          </g>
          
          <!-- Target line -->
          <polyline 
            [attr.points]="getTargetLinePoints()" 
            class="target-line"
            fill="none"></polyline>
          
          <!-- Achieved line -->
          <polyline 
            [attr.points]="getAchievedLinePoints()" 
            class="achieved-line"
            fill="none"></polyline>
          
          <!-- Data points -->
          <g class="data-points">
            <circle *ngFor="let point of getTargetPoints(); let i = index"
                    [attr.cx]="point.x" [attr.cy]="point.y" r="4"
                    class="target-point"
                    [title]="'Target: ' + chartData[i].target">
            </circle>
            <circle *ngFor="let point of getAchievedPoints(); let i = index"
                    [attr.cx]="point.x" [attr.cy]="point.y" r="4"
                    class="achieved-point"
                    [title]="'Achieved: ' + chartData[i].achieved">
            </circle>
          </g>
        </svg>
      </div>

      <!-- Comparison Chart -->
      <div *ngIf="chartType === 'comparison'" class="comparison-chart">
        <div *ngFor="let point of chartData" class="comparison-bar-group">
          <div class="month-label">{{ point.label }}</div>
          <div class="comparison-bars">
            <div class="bar-pair">
              <div class="target-bar">
                <div class="bar-fill target-fill" [style.width.%]="(point.target / getMaxValue()) * 100">
                  <span class="bar-value">{{ point.target }}</span>
                </div>
                <span class="bar-label">Target</span>
              </div>
              <div class="achieved-bar-comp">
                <div class="bar-fill achieved-fill" [style.width.%]="(point.achieved / getMaxValue()) * 100">
                  <span class="bar-value">{{ point.achieved }}</span>
                </div>
                <span class="bar-label">Achieved</span>
              </div>
            </div>
            <div class="performance-indicator">
              <span class="performance-value" [class]="getPerformanceClass(point.achieved, point.target)">
                {{ ((point.achieved / point.target) * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Summary -->
      <div class="chart-summary">
        <div class="summary-stats">
          <div class="stat-item">
            <span class="stat-label">Total Target</span>
            <span class="stat-value">{{ getTotalTarget() | number }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Achieved</span>
            <span class="stat-value">{{ getTotalAchieved() | number }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Overall Performance</span>
            <span class="stat-value" [class]="getOverallPerformanceClass()">
              {{ getOverallPerformance() }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .chart-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .chart-controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .year-select, .type-select {
      padding: 6px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      background: white;
    }

    .view-toggle {
      display: flex;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      overflow: hidden;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 8px;
      border: none;
      background: white;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
    }

    .toggle-btn.active {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
    }

    .toggle-btn:hover:not(.active) {
      background: #f3f4f6;
    }

    /* Stacked Chart Styles */
    .stacked-chart {
      margin-bottom: 24px;
    }

    .chart-legend {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      justify-content: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.875rem;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .target-color {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
    }

    .achieved-color {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
    }

    .chart-grid {
      display: flex;
      gap: 8px;
      height: 250px;
      align-items: flex-end;
      padding: 20px 0;
    }

    .bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .bar-container {
      position: relative;
      height: 200px;
      width: 40px;
      display: flex;
      align-items: flex-end;
    }

    .target-indicator {
      position: absolute;
      right: -20px;
      top: 0;
      font-size: 0.75rem;
      color: #6b7280;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    .stacked-bar {
      width: 100%;
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      border-radius: 4px 4px 0 0;
      position: relative;
      display: flex;
      align-items: flex-end;
    }

    .achieved-bar {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      border-radius: 4px 4px 0 0;
      transition: height 0.3s ease;
    }

    .bar-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-align: center;
    }

    /* Line Chart Styles */
    .line-chart {
      height: 300px;
      margin-bottom: 24px;
    }

    .chart-svg {
      width: 100%;
      height: 100%;
    }

    .grid-line {
      stroke: #f3f4f6;
      stroke-width: 1;
    }

    .target-line {
      stroke: #2c4170;
      stroke-width: 3;
      stroke-dasharray: 5,5;
    }

    .achieved-line {
      stroke: #059669;
      stroke-width: 3;
    }

    .target-point {
      fill: #2c4170;
      stroke: white;
      stroke-width: 2;
    }

    .achieved-point {
      fill: #059669;
      stroke: white;
      stroke-width: 2;
    }

    /* Comparison Chart Styles */
    .comparison-chart {
      margin-bottom: 24px;
    }

    .comparison-bar-group {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 16px;
      margin-bottom: 16px;
      align-items: center;
    }

    .month-label {
      font-weight: 500;
      color: #374151;
      text-align: right;
    }

    .comparison-bars {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 16px;
      align-items: center;
    }

    .bar-pair {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .target-bar, .achieved-bar-comp {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bar-fill {
      height: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      min-width: 60px;
      position: relative;
    }

    .target-fill {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
    }

    .achieved-fill {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: white;
    }

    .bar-value {
      font-size: 0.75rem;
      font-weight: 500;
    }

    .bar-label {
      font-size: 0.75rem;
      color: #6b7280;
      min-width: 60px;
    }

    .performance-indicator {
      text-align: center;
    }

    .performance-value {
      font-size: 0.875rem;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .performance-value.good {
      background: #d1fae5;
      color: #065f46;
    }

    .performance-value.average {
      background: #fef3c7;
      color: #d97706;
    }

    .performance-value.poor {
      background: #fee2e2;
      color: #dc2626;
    }

    /* Chart Summary */
    .chart-summary {
      border-top: 1px solid #e5e7eb;
      padding-top: 16px;
    }

    .summary-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-label {
      display: block;
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 4px;
    }

    .stat-value {
      display: block;
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }

    .stat-value.good {
      color: #059669;
    }

    .stat-value.average {
      color: #d97706;
    }

    .stat-value.poor {
      color: #dc2626;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .chart-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .chart-controls {
        justify-content: center;
      }

      .comparison-bar-group {
        grid-template-columns: 60px 1fr;
        gap: 12px;
      }

      .summary-stats {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }
  `]
})
export class EnhancedBarChartComponent implements OnInit {
  @Input() title = 'Monthly Performance Trend';
  @Input() chartData: ChartDataPoint[] = [];
  @Input() height = 300;

  chartType: 'stacked' | 'line' | 'comparison' = 'stacked';
  selectedYear = '2024';
  selectedType = 'all';
  availableYears = ['2024', '2023', '2022'];

  ngOnInit() {
    if (this.chartData.length === 0) {
      this.loadSampleData();
    }
  }

  loadSampleData() {
    this.chartData = [
      { label: 'Jan', target: 2133, achieved: 1890 },
      { label: 'Feb', target: 2133, achieved: 1950 },
      { label: 'Mar', target: 2133, achieved: 1820 },
      { label: 'Apr', target: 2133, achieved: 1780 },
      { label: 'May', target: 2133, achieved: 1850 },
      { label: 'Jun', target: 2133, achieved: 1900 },
      { label: 'Jul', target: 2133, achieved: 1200 },
      { label: 'Aug', target: 2133, achieved: 1650 },
      { label: 'Sep', target: 2133, achieved: 1400 },
      { label: 'Oct', target: 2133, achieved: 2000 },
      { label: 'Nov', target: 2133, achieved: 2050 },
      { label: 'Dec', target: 2133, achieved: 1980 }
    ];
  }

  setChartType(type: 'stacked' | 'line' | 'comparison') {
    this.chartType = type;
  }

  onYearChange() {
    // Implement year filter logic
    console.log('Year changed to:', this.selectedYear);
  }

  onTypeChange() {
    // Implement type filter logic
    console.log('Type changed to:', this.selectedType);
  }

  getTargetHeight(target: number): number {
    const maxValue = Math.max(...this.chartData.map(d => Math.max(d.target, d.achieved)));
    return (target / maxValue) * 180;
  }

  getAchievedPercentage(achieved: number, target: number): number {
    return Math.min((achieved / target) * 100, 100);
  }

  getMaxValue(): number {
    return Math.max(...this.chartData.map(d => Math.max(d.target, d.achieved)));
  }

  getPerformanceClass(achieved: number, target: number): string {
    const percentage = (achieved / target) * 100;
    if (percentage >= 90) return 'good';
    if (percentage >= 70) return 'average';
    return 'poor';
  }

  getTotalTarget(): number {
    return this.chartData.reduce((sum, item) => sum + item.target, 0);
  }

  getTotalAchieved(): number {
    return this.chartData.reduce((sum, item) => sum + item.achieved, 0);
  }

  getOverallPerformance(): number {
    const totalTarget = this.getTotalTarget();
    const totalAchieved = this.getTotalAchieved();
    return Math.round((totalAchieved / totalTarget) * 100);
  }

  getOverallPerformanceClass(): string {
    const performance = this.getOverallPerformance();
    if (performance >= 90) return 'good';
    if (performance >= 70) return 'average';
    return 'poor';
  }

  // Line chart helper methods
  getGridLines() {
    const lines = [];
    for (let i = 0; i <= 5; i++) {
      const y = 50 + (i * 40);
      lines.push({ x1: 50, y1: y, x2: 750, y2: y });
    }
    return lines;
  }

  getTargetLinePoints(): string {
    const maxValue = this.getMaxValue();
    return this.chartData.map((point, index) => {
      const x = 50 + (index * 60);
      const y = 250 - ((point.target / maxValue) * 200);
      return `${x},${y}`;
    }).join(' ');
  }

  getAchievedLinePoints(): string {
    const maxValue = this.getMaxValue();
    return this.chartData.map((point, index) => {
      const x = 50 + (index * 60);
      const y = 250 - ((point.achieved / maxValue) * 200);
      return `${x},${y}`;
    }).join(' ');
  }

  getTargetPoints() {
    const maxValue = this.getMaxValue();
    return this.chartData.map((point, index) => ({
      x: 50 + (index * 60),
      y: 250 - ((point.target / maxValue) * 200)
    }));
  }

  getAchievedPoints() {
    const maxValue = this.getMaxValue();
    return this.chartData.map((point, index) => ({
      x: 50 + (index * 60),
      y: 250 - ((point.achieved / maxValue) * 200)
    }));
  }
}
