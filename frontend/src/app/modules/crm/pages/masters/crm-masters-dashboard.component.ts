import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface MasterDataCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  count?: number;
}

@Component({
  selector: 'app-crm-masters-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './crm-masters-dashboard.component.html',
  styleUrls: ['./crm-masters-dashboard.component.css']
})
export class CrmMastersDashboardComponent {
  
  masterDataCards: MasterDataCard[] = [
    {
      title: 'Customer Sectors',
      description: 'Manage industry sectors and customer categories',
      icon: 'category',
      route: '/crm/masters/customer-sectors',
      count: 8
    },
    {
      title: 'Company Types',
      description: 'Manage different types of companies (Private, Public, etc.)',
      icon: 'business',
      route: '/crm/masters/company-types',
      count: 5
    },
    {
      title: 'Business Categories',
      description: 'Manage business categories and classifications',
      icon: 'apartment',
      route: '/crm/masters/business-categories',
      count: 12
    },
    {
      title: 'Contact Roles',
      description: 'Manage contact person roles and designations',
      icon: 'person',
      route: '/crm/masters/contact-roles',
      count: 10
    },
    {
      title: 'Lead Sources',
      description: 'Manage sources where leads come from',
      icon: 'source',
      route: '/crm/masters/lead-sources',
      count: 8
    },
    {
      title: 'Services',
      description: 'Manage available services and offerings',
      icon: 'build',
      route: '/crm/masters/services',
      count: 15
    }
  ];

  constructor(private router: Router) {}

  navigateToMaster(route: string) {
    this.router.navigate([route]);
  }
}
