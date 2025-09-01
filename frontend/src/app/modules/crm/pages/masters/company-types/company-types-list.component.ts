import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeadCreationService } from '../../../services/lead-creation.service';
import { CompanyType } from '../../../interfaces/lead-creation.interface';

@Component({
  selector: 'app-company-types-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './company-types-list.component.html',
  styleUrls: ['./company-types-list.component.css']
})
export class CompanyTypesListComponent implements OnInit {
  companyTypes$!: Observable<CompanyType[]>;
  searchTerm = '';

  constructor(
    private leadCreationService: LeadCreationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCompanyTypes();
  }

  loadCompanyTypes() {
    this.companyTypes$ = this.leadCreationService.getCompanyTypes();
  }

  onAddNew() {
    this.router.navigate(['/crm/masters/company-types/new']);
  }

  onEdit(companyType: CompanyType) {
    this.router.navigate(['/crm/masters/company-types/edit', companyType.companyTypeId]);
  }

  onView(companyType: CompanyType) {
    this.router.navigate(['/crm/masters/company-types', companyType.companyTypeId]);
  }

  onDelete(companyType: CompanyType) {
    if (confirm(`Are you sure you want to delete company type "${companyType.companyTypeName}"?`)) {
      // TODO: Implement delete functionality
      console.log('Delete company type:', companyType);
    }
  }

  onToggleStatus(companyType: CompanyType) {
    // TODO: Implement toggle status
    console.log('Toggle status for company type:', companyType);
  }
}
