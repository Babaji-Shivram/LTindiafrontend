import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  route?: string;
}

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'user' | 'system' | 'data';
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div>
          <h1 class="welcome-title">Good {{ getTimeOfDay() }}, Admin!</h1>
          <p class="welcome-subtitle">Here's what's happening with your ERP system today.</p>
        </div>
        <div class="welcome-actions">
          <button mat-raised-button color="primary" routerLink="/masters/parties">
            <mat-icon>add</mat-icon>
            Quick Add Party
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card *ngFor="let card of dashboardCards" 
                  class="stats-card"
                  [class]="'stats-card-' + card.color"
                  [routerLink]="card.route"
                  [style.cursor]="card.route ? 'pointer' : 'default'">
          <div class="stats-content">
            <div class="stats-info">
              <h3 class="stats-title">{{ card.title }}</h3>
              <p class="stats-value">{{ card.value }}</p>
              <div *ngIf="card.trend" class="stats-trend">
                <mat-icon [class]="card.trend.isPositive ? 'trend-up' : 'trend-down'">
                  {{ card.trend.isPositive ? 'trending_up' : 'trending_down' }}
                </mat-icon>
                <span>{{ card.trend.value }}% from last month</span>
              </div>
            </div>
            <div class="stats-icon">
              <mat-icon>{{ card.icon }}</mat-icon>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Recent Activity -->
        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
            <mat-card-subtitle>Latest system activities</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div *ngFor="let activity of recentActivities" class="activity-item">
                <div class="activity-icon">
                  <mat-icon [class]="'activity-icon-' + activity.type">{{ activity.icon }}</mat-icon>
                </div>
                <div class="activity-content">
                  <h4 class="activity-title">{{ activity.title }}</h4>
                  <p class="activity-description">{{ activity.description }}</p>
                  <span class="activity-time">{{ getRelativeTime(activity.timestamp) }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All Activities</button>
          </mat-card-actions>
        </mat-card>

        <!-- Quick Actions -->
        <mat-card class="quick-actions-card">
          <mat-card-header>
            <mat-card-title>Quick Actions</mat-card-title>
            <mat-card-subtitle>Frequently used features</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="quick-actions-grid">
              <button mat-stroked-button 
                      class="quick-action-btn"
                      routerLink="/identity/users">
                <mat-icon>person_add</mat-icon>
                <span>Add User</span>
              </button>
              <button mat-stroked-button 
                      class="quick-action-btn"
                      routerLink="/masters/parties">
                <mat-icon>business</mat-icon>
                <span>Add Party</span>
              </button>
              <button mat-stroked-button 
                      class="quick-action-btn"
                      routerLink="/masters/ports">
                <mat-icon>location_on</mat-icon>
                <span>Add Port</span>
              </button>
              <button mat-stroked-button 
                      class="quick-action-btn"
                      routerLink="/crm/leads">
                <mat-icon>person_add</mat-icon>
                <span>Add Lead</span>
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- System Status -->
        <mat-card class="system-status-card">
          <mat-card-header>
            <mat-card-title>System Status</mat-card-title>
            <mat-card-subtitle>Current system health</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="status-items">
              <div class="status-item">
                <div class="status-info">
                  <span class="status-label">Database</span>
                  <span class="status-value">Operational</span>
                </div>
                <div class="status-indicator status-success"></div>
              </div>
              <div class="status-item">
                <div class="status-info">
                  <span class="status-label">API Services</span>
                  <span class="status-value">Operational</span>
                </div>
                <div class="status-indicator status-success"></div>
              </div>
              <div class="status-item">
                <div class="status-info">
                  <span class="status-label">Background Jobs</span>
                  <span class="status-value">Running</span>
                </div>
                <div class="status-indicator status-success"></div>
              </div>
              <div class="status-item">
                <div class="status-info">
                  <span class="status-label">Storage</span>
                  <span class="status-value">78% Used</span>
                </div>
                <mat-progress-bar mode="determinate" value="78" class="status-progress"></mat-progress-bar>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .welcome-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #243C70 0%, #1A2B52 100%);
      border-radius: 12px;
      color: white;
    }

    .welcome-title {
      font-family: 'Roboto Slab', serif;
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .welcome-subtitle {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
    }

    .welcome-actions button {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stats-card {
      padding: 1.5rem;
      border-radius: 12px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stats-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .stats-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .stats-info {
      flex: 1;
    }

    .stats-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6B7280;
      margin: 0 0 0.5rem 0;
    }

    .stats-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 0.5rem 0;
    }

    .stats-trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .trend-up {
      color: #10B981;
    }

    .trend-down {
      color: #EF4444;
    }

    .stats-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stats-card-primary .stats-icon {
      background: #243C70;
      color: white;
    }

    .stats-card-accent .stats-icon {
      background: #F6B801;
      color: white;
    }

    .stats-card-success .stats-icon {
      background: #10B981;
      color: white;
    }

    .stats-card-info .stats-icon {
      background: #3B82F6;
      color: white;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .activity-card {
      grid-row: span 2;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: #F9FAFB;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon-user {
      background: #DBEAFE;
      color: #3B82F6;
    }

    .activity-icon-system {
      background: #D1FAE5;
      color: #10B981;
    }

    .activity-icon-data {
      background: #FEF3C7;
      color: #F59E0B;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 0.25rem 0;
    }

    .activity-description {
      font-size: 0.875rem;
      color: #6B7280;
      margin: 0 0 0.5rem 0;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #9CA3AF;
    }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .quick-action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      height: auto;
      min-height: 80px;
    }

    .status-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .status-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .status-value {
      font-size: 0.75rem;
      color: #6B7280;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .status-success {
      background: #10B981;
    }

    .status-progress {
      width: 100px;
      height: 4px;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .activity-card {
        grid-row: span 1;
      }
    }

    @media (max-width: 640px) {
      .dashboard-container {
        padding: 1rem;
      }
      
      .welcome-section {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .quick-actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  dashboardCards: DashboardCard[] = [
    {
      title: 'Total Users',
      value: 156,
      icon: 'people',
      color: 'primary',
      trend: { value: 12, isPositive: true },
      route: '/identity/users'
    },
    {
      title: 'Active Parties',
      value: 1247,
      icon: 'business',
      color: 'accent',
      trend: { value: 8, isPositive: true },
      route: '/masters/parties'
    },
    {
      title: 'Open Leads',
      value: 89,
      icon: 'trending_up',
      color: 'success',
      trend: { value: 15, isPositive: true },
      route: '/crm/leads'
    },
    {
      title: 'System Health',
      value: '99.9%',
      icon: 'health_and_safety',
      color: 'info'
    }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: '1',
      title: 'New user registered',
      description: 'John Doe has been added to the system',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'user',
      icon: 'person_add'
    },
    {
      id: '2',
      title: 'Data export completed',
      description: 'Party master data export finished successfully',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: 'system',
      icon: 'download'
    },
    {
      id: '3',
      title: 'New party added',
      description: 'ABC Trading Company has been registered',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'data',
      icon: 'business'
    },
    {
      id: '4',
      title: 'System backup completed',
      description: 'Daily backup process finished successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'system',
      icon: 'backup'
    }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  }

  getRelativeTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return timestamp.toLocaleDateString();
  }
}