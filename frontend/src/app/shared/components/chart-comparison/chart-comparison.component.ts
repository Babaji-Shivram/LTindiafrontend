import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnhancedBarChartComponent } from '../enhanced-bar-chart/enhanced-bar-chart.component';
import { PerformanceDashboardComponent } from '../performance-dashboard/performance-dashboard.component';

@Component({
  selector: 'app-chart-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule, EnhancedBarChartComponent, PerformanceDashboardComponent],
  template: `
    <div class="chart-comparison-container">
      <!-- Chart Selector -->
      <div class="chart-selector-tabs">
        <button 
          class="tab-button"
          [class.active]="selectedView === 'original'"
          (click)="selectedView = 'original'">
          <span class="material-icons">bar_chart</span>
          Original Chart
        </button>
        <button 
          class="tab-button"
          [class.active]="selectedView === 'enhanced'"
          (click)="selectedView = 'enhanced'">
          <span class="material-icons">analytics</span>
          Enhanced Charts
        </button>
        <button 
          class="tab-button"
          [class.active]="selectedView === 'alternative'"
          (click)="selectedView = 'alternative'">
          <span class="material-icons">dashboard</span>
          Alternative Views
        </button>
      </div>

      <!-- Original Chart View -->
      <div *ngIf="selectedView === 'original'" class="chart-view">
        <div class="chart-header">
          <h3>Monthly Performance Trend - Original</h3>
          <p class="chart-description">Current implementation with simple CSS bars</p>
        </div>
        
        <div class="original-chart-container">
          <div class="monthly-performance">
            <h4>Monthly Performance Trend</h4>
            <div class="performance-chart">
              <div *ngFor="let month of originalData" class="chart-row">
                <span class="month-label">{{ month.month }}</span>
                <div class="chart-bars">
                  <div class="bar-container">
                    <div class="bar target-bar" [style.width.%]="(month.target / maxValue) * 100">
                      <span class="bar-value">{{ month.target }}</span>
                    </div>
                  </div>
                  <div class="bar-container">
                    <div class="bar achieved-bar" [style.width.%]="(month.achieved / maxValue) * 100">
                      <span class="bar-value">{{ month.achieved }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="legend">
              <div class="legend-item">
                <span class="legend-color target"></span>
                <span>Target</span>
              </div>
              <div class="legend-item">
                <span class="legend-color achieved"></span>
                <span>Achieved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Chart View -->
      <div *ngIf="selectedView === 'enhanced'" class="chart-view">
        <div class="chart-header">
          <h3>Monthly Performance Trend - Enhanced</h3>
          <p class="chart-description">Interactive charts with multiple visualization modes</p>
        </div>
        
        <app-enhanced-bar-chart [chartData]="enhancedData"></app-enhanced-bar-chart>
      </div>

      <!-- Alternative Views -->
      <div *ngIf="selectedView === 'alternative'" class="chart-view">
        <div class="chart-header">
          <h3>Monthly Performance Trend - Alternative Views</h3>
          <p class="chart-description">Donut, Area, Heatmap, Gauge, and Radar charts</p>
        </div>
        
        <app-performance-dashboard [chartData]="performanceData"></app-performance-dashboard>
      </div>

      <!-- Comparison Summary -->
      <div class="comparison-summary">
        <h4>Chart Comparison Summary</h4>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h5>Original Chart</h5>
            <ul>
              <li>✓ Simple implementation</li>
              <li>✓ Fast loading</li>
              <li>✗ Limited interactivity</li>
              <li>✗ Basic visual appeal</li>
              <li>✗ No data insights</li>
            </ul>
          </div>
          
          <div class="comparison-card">
            <h5>Enhanced Charts</h5>
            <ul>
              <li>✓ Interactive controls</li>
              <li>✓ Multiple chart types</li>
              <li>✓ Professional design</li>
              <li>✓ Data filtering</li>
              <li>✓ Performance analytics</li>
            </ul>
          </div>
          
          <div class="comparison-card">
            <h5>Alternative Views</h5>
            <ul>
              <li>✓ Unique visualizations</li>
              <li>✓ Comprehensive metrics</li>
              <li>✓ Executive dashboards</li>
              <li>✓ Multi-dimensional analysis</li>
              <li>✓ KPI monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-comparison-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    /* Tab Navigation */
    .chart-selector-tabs {
      display: flex;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .tab-button {
      flex: 1;
      padding: 16px 20px;
      border: none;
      background: transparent;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
      border-bottom: 3px solid transparent;
    }

    .tab-button:hover {
      background: #e2e8f0;
      color: #475569;
    }

    .tab-button.active {
      background: white;
      color: #2c4170;
      border-bottom-color: #2c4170;
    }

    /* Chart Views */
    .chart-view {
      padding: 24px;
    }

    .chart-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .chart-header h3 {
      margin: 0 0 8px 0;
      color: #1e293b;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .chart-description {
      margin: 0;
      color: #64748b;
      font-size: 0.875rem;
    }

    /* Original Chart Styles */
    .original-chart-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .monthly-performance h4 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 20px;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .performance-chart {
      margin-bottom: 16px;
    }

    .chart-row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      gap: 12px;
    }

    .month-label {
      width: 40px;
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .chart-bars {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bar-container {
      position: relative;
      height: 20px;
      background: #f1f5f9;
      border-radius: 4px;
    }

    .bar {
      height: 100%;
      border-radius: 4px;
      position: relative;
      transition: width 0.3s ease;
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .target-bar {
      background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
    }

    .achieved-bar {
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    }

    .bar-value {
      color: white;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .legend {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 16px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      color: #64748b;
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 2px;
    }

    .legend-color.target {
      background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
    }

    .legend-color.achieved {
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    }

    /* Comparison Summary */
    .comparison-summary {
      background: #f8fafc;
      padding: 24px;
      border-top: 1px solid #e2e8f0;
    }

    .comparison-summary h4 {
      text-align: center;
      color: #1e293b;
      margin: 0 0 20px 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .comparison-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .comparison-card h5 {
      margin: 0 0 12px 0;
      color: #1e293b;
      font-size: 1rem;
      font-weight: 600;
    }

    .comparison-card ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .comparison-card li {
      padding: 6px 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    .comparison-card li:not(:last-child) {
      border-bottom: 1px solid #f1f5f9;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .chart-selector-tabs {
        flex-direction: column;
      }

      .tab-button {
        flex: none;
        justify-content: flex-start;
        border-bottom: 1px solid #e2e8f0;
        border-left: 3px solid transparent;
      }

      .tab-button.active {
        border-bottom-color: #e2e8f0;
        border-left-color: #2c4170;
      }

      .chart-view {
        padding: 16px;
      }

      .comparison-summary {
        padding: 16px;
      }

      .comparison-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ChartComparisonComponent {
  @Input() title = 'Monthly Performance Trend';
  
  selectedView: 'original' | 'enhanced' | 'alternative' = 'original';
  
  originalData = [
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

  enhancedData = this.originalData.map(item => ({
    label: item.month,
    target: item.target,
    achieved: item.achieved
  }));

  performanceData = this.originalData.map(item => ({
    period: item.month,
    target: item.target,
    achieved: item.achieved
  }));

  get maxValue(): number {
    return Math.max(...this.originalData.map(d => Math.max(d.target, d.achieved)));
  }
}
