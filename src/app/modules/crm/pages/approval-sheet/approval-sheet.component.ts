import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-approval-sheet',
  standalone: true,
  imports: [],
  templateUrl: './approval-sheet.component.html',
  styleUrls: ['./approval-sheet.component.css']
})
export class ApprovalSheetComponent implements OnInit {
  leadId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.leadId = this.route.snapshot.paramMap.get('id');
  }

  onReject() {
    console.log('Approval rejected');
    this.router.navigate(['/crm/approvals']);
  }

  onApprove() {
    console.log('Approval approved');
    this.router.navigate(['/crm/approvals']);
  }
}
