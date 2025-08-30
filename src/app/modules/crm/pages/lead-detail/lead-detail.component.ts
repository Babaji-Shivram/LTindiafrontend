import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockCrmService } from '../../services/mock-crm.service';
import { Lead } from '../../models/lead.model';

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
      this.router.navigate(['/crm/leads', this.lead.id, 'edit']);
    }
  }
}
