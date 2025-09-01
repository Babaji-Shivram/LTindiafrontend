import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PerformanceData {
  period: string;
  target: number;
  achieved: number;
  variance?: number;
  trend?: 'up' | 'down' | 'stable';
}

@Component({
  selector: 'app-performance-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="performance-dashboard">
      <!-- Chart Type Selector -->
      <div class="chart-selector">
        <button 
          *ngFor="let type of chartTypes" 
          [class]="'chart-type-btn ' + (selectedChart === type.id ? 'active' : '')"
          (click)="selectChart(type.id)">
          <span class="material-icons">{{ type.icon }}</span>
          <span>{{ type.name }}</span>
        </button>
      </div>

      <!-- Donut Chart -->
      <div *ngIf="selectedChart === 'donut'" class="chart-wrapper">
        <h3 class="chart-title">Performance Overview</h3>
        <div class="donut-chart-container">
          <svg class="donut-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" stroke-width="20"/>
            <circle 
              cx="100" cy="100" r="80" 
              fill="none" 
              stroke="url(#gradient1)" 
              stroke-width="20"
              [attr.stroke-dasharray]="getCircumference()"
              [attr.stroke-dashoffset]="getStrokeDashoffset()"
              transform="rotate(-90 100 100)"
              class="progress-circle"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#2c4170"/>
                <stop offset="100%" style="stop-color:#059669"/>
              </linearGradient>
            </defs>
            <text x="100" y="95" text-anchor="middle" class="donut-percentage">
              {{ getOverallPerformance() }}%
            </text>
            <text x="100" y="115" text-anchor="middle" class="donut-label">
              Achieved
            </text>
          </svg>
          <div class="donut-stats">
            <div class="stat-card">
              <span class="stat-label">Total Target</span>
              <span class="stat-value">{{ getTotalTarget() | number }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Total Achieved</span>
              <span class="stat-value achieved">{{ getTotalAchieved() | number }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Variance</span>
              <span class="stat-value" [class]="getVarianceClass()">
                {{ getVariance() > 0 ? '+' : '' }}{{ getVariance() | number }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Area Chart -->
      <div *ngIf="selectedChart === 'area'" class="chart-wrapper">
        <h3 class="chart-title">Performance Trend</h3>
        <div class="area-chart-container">
          <svg class="area-svg" viewBox="0 0 800 300">
            <!-- Background Grid -->
            <defs>
              <pattern id="grid" width="80" height="50" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" stroke-width="1"/>
              </pattern>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#2c4170; stop-opacity:0.3"/>
                <stop offset="100%" style="stop-color:#2c4170; stop-opacity:0.1"/>
              </linearGradient>
              <linearGradient id="achievedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#059669; stop-opacity:0.3"/>
                <stop offset="100%" style="stop-color:#059669; stop-opacity:0.1"/>
              </linearGradient>
            </defs>
            
            <rect width="800" height="300" fill="url(#grid)"/>
            
            <!-- Target Area -->
            <path [attr.d]="getTargetAreaPath()" fill="url(#areaGradient)"/>
            
            <!-- Achieved Area -->
            <path [attr.d]="getAchievedAreaPath()" fill="url(#achievedGradient)"/>
            
            <!-- Target Line -->
            <path [attr.d]="getTargetLinePath()" fill="none" stroke="#2c4170" stroke-width="3"/>
            
            <!-- Achieved Line -->
            <path [attr.d]="getAchievedLinePath()" fill="none" stroke="#059669" stroke-width="3"/>
            
            <!-- Data Points -->
            <g class="data-points">
              <circle *ngFor="let point of getDataPoints('target')"
                      [attr.cx]="point.x" [attr.cy]="point.y" r="5"
                      fill="#2c4170" stroke="white" stroke-width="2">
              </circle>
              <circle *ngFor="let point of getDataPoints('achieved')"
                      [attr.cx]="point.x" [attr.cy]="point.y" r="5"
                      fill="#059669" stroke="white" stroke-width="2">
              </circle>
            </g>
            
            <!-- X-axis labels -->
            <g class="x-labels">
              <text *ngFor="let point of chartData; let i = index"
                    [attr.x]="60 + (i * 60)"
                    y="290"
                    text-anchor="middle"
                    class="axis-label">
                {{ point.period }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Heatmap Chart -->
      <div *ngIf="selectedChart === 'heatmap'" class="chart-wrapper">
        <h3 class="chart-title">Performance Heatmap</h3>
        <div class="heatmap-container">
          <div class="heatmap-grid">
            <div class="heatmap-labels">
              <div class="label-item">Target</div>
              <div class="label-item">Achieved</div>
              <div class="label-item">Performance</div>
            </div>
            <div class="heatmap-months">
              <div *ngFor="let point of chartData" class="month-column">
                <div class="month-header">{{ point.period }}</div>
                <div class="heatmap-cells">
                  <div class="heatmap-cell" 
                       [class]="getHeatmapClass(point.target, 'target')"
                       [title]="'Target: ' + point.target">
                    {{ point.target }}
                  </div>
                  <div class="heatmap-cell" 
                       [class]="getHeatmapClass(point.achieved, 'achieved')"
                       [title]="'Achieved: ' + point.achieved">
                    {{ point.achieved }}
                  </div>
                  <div class="heatmap-cell" 
                       [class]="getPerformanceHeatmapClass(point.achieved, point.target)"
                       [title]="'Performance: ' + ((point.achieved / point.target) * 100).toFixed(1) + '%'">
                    {{ ((point.achieved / point.target) * 100).toFixed(0) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="heatmap-legend">
            <span>Low</span>
            <div class="legend-gradient"></div>
            <span>High</span>
          </div>
        </div>
      </div>

      <!-- Gauge Chart -->
      <div *ngIf="selectedChart === 'gauge'" class="chart-wrapper">
        <h3 class="chart-title">Performance Gauge</h3>
        <div class="gauge-container">
          <div class="gauge-chart">
            <svg class="gauge-svg" viewBox="0 0 200 120">
              <!-- Background Arc -->
              <path d="M 20 100 A 80 80 0 0 1 180 100" 
                    fill="none" stroke="#e5e7eb" stroke-width="10"/>
              
              <!-- Progress Arc -->
              <path [attr.d]="getGaugeArcPath()" 
                    fill="none" stroke="url(#gaugeGradient)" stroke-width="10" stroke-linecap="round"/>
              
              <!-- Gauge Needle -->
              <line [attr.x1]="100" [attr.y1]="100" 
                    [attr.x2]="getNeedleEnd().x" [attr.y2]="getNeedleEnd().y"
                    stroke="#374151" stroke-width="3" stroke-linecap="round"/>
              <circle cx="100" cy="100" r="5" fill="#374151"/>
              
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#dc2626"/>
                  <stop offset="50%" style="stop-color:#d97706"/>
                  <stop offset="100%" style="stop-color:#059669"/>
                </linearGradient>
              </defs>
              
              <!-- Gauge Labels -->
              <text x="100" y="85" text-anchor="middle" class="gauge-value">
                {{ getOverallPerformance() }}%
              </text>
              <text x="100" y="110" text-anchor="middle" class="gauge-label">
                Overall Performance
              </text>
            </svg>
          </div>
          
          <div class="gauge-indicators">
            <div class="indicator poor">
              <span class="indicator-color"></span>
              <span>Poor (0-60%)</span>
            </div>
            <div class="indicator average">
              <span class="indicator-color"></span>
              <span>Average (60-85%)</span>
            </div>
            <div class="indicator good">
              <span class="indicator-color"></span>
              <span>Good (85-100%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Radar Chart -->
      <div *ngIf="selectedChart === 'radar'" class="chart-wrapper">
        <h3 class="chart-title">Multi-Metric Analysis</h3>
        <div class="radar-container">
          <svg class="radar-svg" viewBox="0 0 300 300">
            <!-- Radar Grid -->
            <g class="radar-grid">
              <circle cx="150" cy="150" r="40" fill="none" stroke="#f3f4f6" stroke-width="1"/>
              <circle cx="150" cy="150" r="80" fill="none" stroke="#f3f4f6" stroke-width="1"/>
              <circle cx="150" cy="150" r="120" fill="none" stroke="#f3f4f6" stroke-width="1"/>
              
              <!-- Radar Lines -->
              <line x1="150" y1="150" x2="150" y2="30" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="150" y1="150" x2="254" y2="90" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="150" y1="150" x2="254" y2="210" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="150" y1="150" x2="150" y2="270" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="150" y1="150" x2="46" y2="210" stroke="#f3f4f6" stroke-width="1"/>
              <line x1="150" y1="150" x2="46" y2="90" stroke="#f3f4f6" stroke-width="1"/>
            </g>
            
            <!-- Radar Data -->
            <polygon [attr.points]="getRadarPoints()" 
                     fill="rgba(44, 65, 112, 0.2)" 
                     stroke="#2c4170" 
                     stroke-width="2"/>
            
            <!-- Radar Labels -->
            <text x="150" y="25" text-anchor="middle" class="radar-label">Target Achievement</text>
            <text x="265" y="95" text-anchor="start" class="radar-label">Consistency</text>
            <text x="265" y="215" text-anchor="start" class="radar-label">Growth</text>
            <text x="150" y="285" text-anchor="middle" class="radar-label">Quality</text>
            <text x="35" y="215" text-anchor="end" class="radar-label">Efficiency</text>
            <text x="35" y="95" text-anchor="end" class="radar-label">Innovation</text>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .performance-dashboard {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    /* Chart Selector */
    .chart-selector {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .chart-type-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      font-size: 0.875rem;
    }

    .chart-type-btn.active {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border-color: #2c4170;
    }

    .chart-type-btn:hover:not(.active) {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .chart-wrapper {
      margin-bottom: 24px;
    }

    .chart-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
      text-align: center;
    }

    /* Donut Chart */
    .donut-chart-container {
      display: flex;
      align-items: center;
      gap: 40px;
      justify-content: center;
    }

    .donut-svg {
      width: 200px;
      height: 200px;
    }

    .progress-circle {
      transition: stroke-dashoffset 0.5s ease;
    }

    .donut-percentage {
      font-size: 24px;
      font-weight: bold;
      fill: #111827;
    }

    .donut-label {
      font-size: 12px;
      fill: #6b7280;
    }

    .donut-stats {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .stat-value {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }

    .stat-value.achieved {
      color: #059669;
    }

    .stat-value.positive {
      color: #059669;
    }

    .stat-value.negative {
      color: #dc2626;
    }

    /* Area Chart */
    .area-chart-container {
      height: 300px;
    }

    .area-svg {
      width: 100%;
      height: 100%;
    }

    .axis-label {
      font-size: 12px;
      fill: #6b7280;
    }

    /* Heatmap Chart */
    .heatmap-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .heatmap-grid {
      display: flex;
      overflow-x: auto;
    }

    .heatmap-labels {
      display: flex;
      flex-direction: column;
      min-width: 100px;
      margin-right: 16px;
    }

    .label-item {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
      font-size: 0.875rem;
      color: #6b7280;
      border-bottom: 1px solid #f3f4f6;
    }

    .label-item:first-child {
      height: 30px;
      border-bottom: none;
    }

    .heatmap-months {
      display: flex;
      gap: 2px;
    }

    .month-column {
      display: flex;
      flex-direction: column;
      min-width: 80px;
    }

    .month-header {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .heatmap-cells {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .heatmap-cell {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .heatmap-cell:hover {
      opacity: 0.8;
    }

    .heatmap-cell.low {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      color: #dc2626;
    }

    .heatmap-cell.medium {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      color: #d97706;
    }

    .heatmap-cell.high {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      color: #065f46;
    }

    .heatmap-cell.excellent {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
    }

    .heatmap-legend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .legend-gradient {
      width: 100px;
      height: 8px;
      background: linear-gradient(90deg, #fee2e2 0%, #fef3c7 33%, #d1fae5 66%, #2c4170 100%);
      border-radius: 4px;
    }

    /* Gauge Chart */
    .gauge-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .gauge-chart {
      position: relative;
    }

    .gauge-svg {
      width: 200px;
      height: 120px;
    }

    .gauge-value {
      font-size: 18px;
      font-weight: bold;
      fill: #111827;
    }

    .gauge-label {
      font-size: 10px;
      fill: #6b7280;
    }

    .gauge-indicators {
      display: flex;
      gap: 16px;
    }

    .indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
    }

    .indicator-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .indicator.poor .indicator-color {
      background: #dc2626;
    }

    .indicator.average .indicator-color {
      background: #d97706;
    }

    .indicator.good .indicator-color {
      background: #059669;
    }

    /* Radar Chart */
    .radar-container {
      display: flex;
      justify-content: center;
    }

    .radar-svg {
      width: 300px;
      height: 300px;
    }

    .radar-label {
      font-size: 10px;
      fill: #6b7280;
      font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .donut-chart-container {
        flex-direction: column;
        gap: 20px;
      }

      .gauge-indicators {
        flex-direction: column;
        gap: 8px;
        align-items: center;
      }
    }
  `]
})
export class PerformanceDashboardComponent implements OnInit {
  @Input() chartData: PerformanceData[] = [];
  
  selectedChart = 'donut';
  chartTypes = [
    { id: 'donut', name: 'Donut', icon: 'donut_large' },
    { id: 'area', name: 'Area', icon: 'area_chart' },
    { id: 'heatmap', name: 'Heatmap', icon: 'grid_on' },
    { id: 'gauge', name: 'Gauge', icon: 'speed' },
    { id: 'radar', name: 'Radar', icon: 'radar' }
  ];

  ngOnInit() {
    if (this.chartData.length === 0) {
      this.loadSampleData();
    }
  }

  loadSampleData() {
    this.chartData = [
      { period: 'Jan', target: 2133, achieved: 1890 },
      { period: 'Feb', target: 2133, achieved: 1950 },
      { period: 'Mar', target: 2133, achieved: 1820 },
      { period: 'Apr', target: 2133, achieved: 1780 },
      { period: 'May', target: 2133, achieved: 1850 },
      { period: 'Jun', target: 2133, achieved: 1900 },
      { period: 'Jul', target: 2133, achieved: 1200 },
      { period: 'Aug', target: 2133, achieved: 1650 },
      { period: 'Sep', target: 2133, achieved: 1400 },
      { period: 'Oct', target: 2133, achieved: 2000 },
      { period: 'Nov', target: 2133, achieved: 2050 },
      { period: 'Dec', target: 2133, achieved: 1980 }
    ];
  }

  selectChart(chartId: string) {
    this.selectedChart = chartId;
  }

  getTotalTarget(): number {
    return this.chartData.reduce((sum, item) => sum + item.target, 0);
  }

  getTotalAchieved(): number {
    return this.chartData.reduce((sum, item) => sum + item.achieved, 0);
  }

  getOverallPerformance(): number {
    return Math.round((this.getTotalAchieved() / this.getTotalTarget()) * 100);
  }

  getVariance(): number {
    return this.getTotalAchieved() - this.getTotalTarget();
  }

  getVarianceClass(): string {
    const variance = this.getVariance();
    return variance >= 0 ? 'positive' : 'negative';
  }

  // Donut chart methods
  getCircumference(): number {
    return 2 * Math.PI * 80;
  }

  getStrokeDashoffset(): number {
    const circumference = this.getCircumference();
    const progress = this.getOverallPerformance() / 100;
    return circumference - (progress * circumference);
  }

  // Area chart methods
  getMaxValue(): number {
    return Math.max(...this.chartData.map(d => Math.max(d.target, d.achieved)));
  }

  getTargetAreaPath(): string {
    const maxValue = this.getMaxValue();
    let path = `M 60 250`;
    
    this.chartData.forEach((point, index) => {
      const x = 60 + (index * 60);
      const y = 250 - ((point.target / maxValue) * 200);
      if (index === 0) {
        path += ` L ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    path += ` L ${60 + ((this.chartData.length - 1) * 60)} 250 Z`;
    return path;
  }

  getAchievedAreaPath(): string {
    const maxValue = this.getMaxValue();
    let path = `M 60 250`;
    
    this.chartData.forEach((point, index) => {
      const x = 60 + (index * 60);
      const y = 250 - ((point.achieved / maxValue) * 200);
      if (index === 0) {
        path += ` L ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    path += ` L ${60 + ((this.chartData.length - 1) * 60)} 250 Z`;
    return path;
  }

  getTargetLinePath(): string {
    const maxValue = this.getMaxValue();
    let path = '';
    
    this.chartData.forEach((point, index) => {
      const x = 60 + (index * 60);
      const y = 250 - ((point.target / maxValue) * 200);
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  }

  getAchievedLinePath(): string {
    const maxValue = this.getMaxValue();
    let path = '';
    
    this.chartData.forEach((point, index) => {
      const x = 60 + (index * 60);
      const y = 250 - ((point.achieved / maxValue) * 200);
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  }

  getDataPoints(type: 'target' | 'achieved') {
    const maxValue = this.getMaxValue();
    return this.chartData.map((point, index) => ({
      x: 60 + (index * 60),
      y: 250 - ((point[type] / maxValue) * 200)
    }));
  }

  // Heatmap methods
  getHeatmapClass(value: number, type: 'target' | 'achieved'): string {
    const maxValue = this.getMaxValue();
    const percentage = (value / maxValue) * 100;
    
    if (percentage < 25) return 'low';
    if (percentage < 50) return 'medium';
    if (percentage < 75) return 'high';
    return 'excellent';
  }

  getPerformanceHeatmapClass(achieved: number, target: number): string {
    const percentage = (achieved / target) * 100;
    
    if (percentage < 60) return 'low';
    if (percentage < 80) return 'medium';
    if (percentage < 95) return 'high';
    return 'excellent';
  }

  // Gauge methods
  getGaugeArcPath(): string {
    const performance = this.getOverallPerformance();
    const angle = (performance / 100) * 160; // 160 degrees for semi-circle
    const startAngle = 200; // Start at 200 degrees
    const endAngle = startAngle + angle;
    
    const startX = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
    const startY = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
    const endX = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
    const endY = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 80 ? 1 : 0;
    
    return `M ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }

  getNeedleEnd() {
    const performance = this.getOverallPerformance();
    const angle = 200 + (performance / 100) * 160;
    const radians = (angle * Math.PI) / 180;
    
    return {
      x: 100 + 70 * Math.cos(radians),
      y: 100 + 70 * Math.sin(radians)
    };
  }

  // Radar methods
  getRadarPoints(): string {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    const metrics = [
      this.getOverallPerformance(), // Target Achievement
      85, // Consistency
      78, // Growth
      92, // Quality
      88, // Efficiency
      75  // Innovation
    ];
    
    const points = metrics.map((value, index) => {
      const angle = (index * 60) - 90; // 60 degrees apart, starting from top
      const normalizedValue = (value / 100) * radius;
      const x = centerX + normalizedValue * Math.cos((angle * Math.PI) / 180);
      const y = centerY + normalizedValue * Math.sin((angle * Math.PI) / 180);
      return `${x},${y}`;
    });
    
    return points.join(' ');
  }
}
