import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TableRow {
  id: number;
  customer: string;
  contact: string;
  status: string;
  value: number;
  lastActivity: string;
}

interface KanbanCard {
  id: number;
  company: string;
  contact: string;
  value: number;
  probability: number;
  temperature: 'cold' | 'warm' | 'hot';
  priority: 'low' | 'medium' | 'high';
  daysInStage: number;
}

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-demo.component.html',
  styleUrls: ['./theme-demo.component.scss']
})
export class ThemeDemoComponent {
  selectedDensity: 'compact' | 'comfortable' | 'spacious' = 'comfortable';
  drawerOpen = false;
  activeTab: 'summary' | 'activities' | 'qualification' = 'summary';
  loadingButton = '';

  colorTokens = [
    { name: 'Primary', var: '--color-primary', value: '#2d4170', use: 'Brand, CTAs, Links' },
    { name: 'Success', var: '--color-success', value: '#28a745', use: 'Confirmations, Success states' },
    { name: 'Warning', var: '--color-warning', value: '#ffc107', use: 'Warnings, Attention needed' },
    { name: 'Danger', var: '--color-danger', value: '#dc3545', use: 'Errors, Destructive actions' },
    { name: 'Info', var: '--color-info', value: '#17a2b8', use: 'Information, Tips' },
    { name: 'Foreground', var: '--color-fg', value: '#111', use: 'Primary text' },
    { name: 'Foreground Muted', var: '--color-fg-muted', value: '#666', use: 'Secondary text' },
    { name: 'Border', var: '--color-border', value: '#eee', use: 'Dividers, Input borders' },
    { name: 'Background', var: '--color-bg', value: '#ffffff', use: 'Page background' },
    { name: 'Card', var: '--color-card', value: '#f7f7f9', use: 'Card backgrounds' }
  ];

  spacingTokens = [
    { name: 'space-1', value: '4px' },
    { name: 'space-2', value: '8px' },
    { name: 'space-3', value: '12px' },
    { name: 'space-4', value: '16px' },
    { name: 'space-5', value: '24px' },
    { name: 'space-6', value: '32px' }
  ];

  radiusTokens = [
    { name: 'radius-xs', value: '6px' },
    { name: 'radius-sm', value: '10px' },
    { name: 'radius-md', value: '14px' },
    { name: 'radius-lg', value: '16px' }
  ];

  tableData: TableRow[] = [
    { id: 1, customer: 'Acme Shipping Ltd', contact: 'John Smith', status: 'Active', value: 45000, lastActivity: '2 hours ago' },
    { id: 2, customer: 'Global Logistics Inc', contact: 'Sarah Johnson', status: 'Prospect', value: 78000, lastActivity: '1 day ago' },
    { id: 3, customer: 'Maritime Solutions', contact: 'Mike Chen', status: 'Active', value: 92000, lastActivity: '3 hours ago' },
    { id: 4, customer: 'Ocean Freight Co', contact: 'Lisa Wong', status: 'Inactive', value: 34000, lastActivity: '1 week ago' },
    { id: 5, customer: 'Port Authority Ltd', contact: 'David Brown', status: 'Active', value: 156000, lastActivity: '30 mins ago' },
    { id: 6, customer: 'Cargo Express', contact: 'Emma Davis', status: 'Prospect', value: 67000, lastActivity: '2 days ago' },
    { id: 7, customer: 'Shipping Masters', contact: 'Tom Wilson', status: 'Active', value: 89000, lastActivity: '5 hours ago' },
    { id: 8, customer: 'Fleet Management Inc', contact: 'Anna Taylor', status: 'Active', value: 123000, lastActivity: '1 hour ago' },
    { id: 9, customer: 'Container Services', contact: 'Chris Miller', status: 'Prospect', value: 45000, lastActivity: '3 days ago' },
    { id: 10, customer: 'Dock Operations Ltd', contact: 'Rachel Green', status: 'Active', value: 78000, lastActivity: '4 hours ago' },
    { id: 11, customer: 'Vessel Tracking Co', contact: 'Mark Thompson', status: 'Inactive', value: 34000, lastActivity: '2 weeks ago' },
    { id: 12, customer: 'Freight Forwarders', contact: 'Kelly White', status: 'Active', value: 145000, lastActivity: '15 mins ago' },
    { id: 13, customer: 'Supply Chain Solutions', contact: 'James Garcia', status: 'Prospect', value: 67000, lastActivity: '1 day ago' },
    { id: 14, customer: 'International Shipping', contact: 'Maria Rodriguez', status: 'Active', value: 98000, lastActivity: '2 hours ago' },
    { id: 15, customer: 'Logistics Network', contact: 'Peter Kim', status: 'Active', value: 87000, lastActivity: '6 hours ago' },
    { id: 16, customer: 'Transport Solutions', contact: 'Susan Lee', status: 'Prospect', value: 54000, lastActivity: '4 days ago' },
    { id: 17, customer: 'Cargo Handlers', contact: 'Robert Clark', status: 'Active', value: 76000, lastActivity: '3 hours ago' },
    { id: 18, customer: 'Port Services', contact: 'Jennifer Hall', status: 'Inactive', value: 43000, lastActivity: '1 month ago' },
    { id: 19, customer: 'Maritime Tech', contact: 'Andrew Young', status: 'Active', value: 134000, lastActivity: '45 mins ago' },
    { id: 20, customer: 'Ocean Carriers', contact: 'Michelle Turner', status: 'Prospect', value: 89000, lastActivity: '2 days ago' }
  ];

  kanbanCard: KanbanCard = {
    id: 1,
    company: 'Acme Shipping Ltd',
    contact: 'John Smith - VP Operations',
    value: 245000,
    probability: 75,
    temperature: 'hot',
    priority: 'high',
    daysInStage: 12
  };

  setTableDensity(density: 'compact' | 'comfortable' | 'spacious') {
    this.selectedDensity = density;
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  setActiveTab(tab: 'summary' | 'activities' | 'qualification') {
    this.activeTab = tab;
  }

  simulateLoading(buttonType: string) {
    this.loadingButton = buttonType;
    setTimeout(() => {
      this.loadingButton = '';
    }, 2000);
  }

  getTemperatureColor(temperature: string): string {
    switch (temperature) {
      case 'hot': return '#dc3545';
      case 'warm': return '#ffc107';
      case 'cold': return '#17a2b8';
      default: return '#6c757d';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  }

  getColorAbbreviation(colorName: string): string {
    return colorName.split(' ').map(word => word[0]).join('').toUpperCase();
  }
}
