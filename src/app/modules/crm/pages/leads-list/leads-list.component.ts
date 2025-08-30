import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MockCrmService } from '../../services/mock-crm.service';
import { Lead } from '../../models/lead.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {
  leads$!: Observable<Lead[]>;
  filtered$!: Observable<Lead[]>;
  q = ''; stage = 'All'; owner = 'All';

  constructor(private crm: MockCrmService, private router: Router) {}

  ngOnInit() {
    this.leads$ = this.crm.leads$;
    this.filtered$ = this.leads$.pipe(
      map(list => list.filter(l =>
        (!this.q || (l.company + l.contact + (l.email||'') + (l.phone||'') + (l.mobileNo||'') + (l.leadSourceValue||'')).toLowerCase().includes(this.q.toLowerCase())) &&
        (this.stage === 'All' || l.stage === this.stage) &&
        (this.owner === 'All' || l.owner === this.owner)
      ))
    );
  }

  open(id: string){ this.router.navigate(['/crm/leads', id]); }
}
