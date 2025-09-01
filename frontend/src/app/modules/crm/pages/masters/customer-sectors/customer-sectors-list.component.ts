import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable, map, startWith, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LeadCreationService } from '../../../services/lead-creation.service';
import { CustomerSector } from '../../../interfaces/lead-creation.interface';

@Component({
  selector: 'app-customer-sectors-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-sectors-list.component.html',
  styleUrls: ['./customer-sectors-list.component.css']
})
export class CustomerSectorsListComponent implements OnInit {
  sectors$!: Observable<CustomerSector[]>;
  searchTerm = '';
  private searchControl = new FormControl('');

  constructor(
    private leadCreationService: LeadCreationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSectors();
  }

  loadSectors() {
    const allSectors$ = this.leadCreationService.getCustomerSectors();
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => value || '')
    );

    this.sectors$ = combineLatest([allSectors$, search$]).pipe(
      map(([sectors, searchTerm]) => {
        if (!searchTerm.trim()) {
          return sectors;
        }
        const search = searchTerm.toLowerCase();
        return sectors.filter(sector => 
          sector.sectorName.toLowerCase().includes(search)
        );
      })
    );

    // Sync with ngModel
    this.searchControl.valueChanges.subscribe(value => {
      this.searchTerm = value || '';
    });
  }

  onAddNew() {
    this.router.navigate(['/crm/masters/customer-sectors/new']);
  }

  onEdit(sector: CustomerSector) {
    this.router.navigate(['/crm/masters/customer-sectors/edit', sector.sectorId]);
  }

  onView(sector: CustomerSector) {
    this.router.navigate(['/crm/masters/customer-sectors', sector.sectorId]);
  }

  onDelete(sector: CustomerSector) {
    if (confirm(`Are you sure you want to delete sector "${sector.sectorName}"?`)) {
      // TODO: Implement delete functionality
      console.log('Delete sector:', sector);
    }
  }

  onToggleStatus(sector: CustomerSector) {
    // TODO: Implement toggle status
    console.log('Toggle status for sector:', sector);
  }
}
