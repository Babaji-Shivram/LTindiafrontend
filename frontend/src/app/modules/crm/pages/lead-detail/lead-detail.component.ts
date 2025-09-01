import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockCrmService } from '../../services/mock-crm.service';
import { Lead } from '../../models/lead.model';

interface ServiceRequirement {
  serviceName: string;
  location: string;
  description?: string;
  timeline?: string;
}

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {
  lead: Lead | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crm: MockCrmService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lead = this.crm.getById(id);
    }
  }

  goBack() {
    this.router.navigate(['/crm/leads']);
  }

  editLead() {
    if (this.lead) {
      this.router.navigate(['/crm/leads/edit', this.lead.id]);
    }
  }

  // Helper methods for displaying extended Lead data
  getCompanyAddress(): string {
    // In a real app, this would come from the lead data
    return 'Address not available in current data model';
  }

  getRegistrationNumber(): string {
    // In a real app, this would come from the lead data
    return 'Registration number not available';
  }

  getCustomerSector(): string {
    // In a real app, this would come from the lead data
    return 'Sector not specified';
  }

  getAnnualTurnover(): string {
    // In a real app, this would come from the lead data
    return 'Turnover not specified';
  }

  getEmployeeCount(): string {
    // In a real app, this would come from the lead data
    return 'Employee count not specified';
  }

  getAssignedBranch(): string {
    // In a real app, this would come from the lead data
    return 'Branch not specified';
  }

  getExpectedClosure(): string {
    // In a real app, this would come from the lead data
    return 'Closure date not set';
  }

  getServiceRequirements(): ServiceRequirement[] {
    // In a real app, this would come from the lead data
    // For now, return mock data based on lead type
    if (!this.lead) return [];
    
    // Mock service requirements based on lead source
    const mockServices: ServiceRequirement[] = [];
    
    if (this.lead.leadSourceValue?.toLowerCase().includes('logistics')) {
      mockServices.push(
        {
          serviceName: 'Ocean Freight',
          location: 'Mumbai to Singapore',
          description: 'Container shipping services',
          timeline: '15-20 days'
        },
        {
          serviceName: 'Customs Clearance',
          location: 'Mumbai Port',
          description: 'Import/Export clearance',
          timeline: '2-3 days'
        }
      );
    } else if (this.lead.leadSourceValue?.toLowerCase().includes('trade')) {
      mockServices.push(
        {
          serviceName: 'Trade Finance',
          location: 'Multiple locations',
          description: 'Letter of Credit services',
          timeline: 'As required'
        }
      );
    }
    
    return mockServices;
  }

  getAdditionalNotes(): string {
    // In a real app, this would come from the lead data
    return '';
  }

  trackByService(index: number, service: ServiceRequirement): string {
    return service.serviceName + service.location;
  }
}
