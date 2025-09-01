import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvals-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './approvals-list.component.html',
  styleUrls: ['./approvals-list.component.css']
})
export class ApprovalsListComponent {
  
  approvals = [
    { id: 'L-1003', company: 'Zen Traders', trigger: 'High Deal Value', owner: 'Alex', value: 620000 }
  ];

  constructor(private router: Router) {}

  openApproval(id: string) {
    this.router.navigate(['/crm/approvals', id]);
  }
}
