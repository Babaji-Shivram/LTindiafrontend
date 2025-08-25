import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '@lt-india-erp/shared-ui';

@Component({
  selector: 'app-opportunities-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DataTableComponent
  ],
  template: `
    <div class="p-6">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Opportunities Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Opportunity
          </button>
        </mat-card-header>
        <mat-card-content>
          <ui-data-table
            [data]="opportunities"
            [columns]="displayedColumns">
          </ui-data-table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    mat-card-header {
      display: flex;
      align-items: center;
    }
  `]
})
export class OpportunitiesListComponent {
  displayedColumns = ['id', 'name', 'account', 'value', 'stage', 'actions'];
  opportunities = [
    { id: 1, name: 'Q1 Shipping Contract', account: 'ABC Corp', value: '$50,000', stage: 'Proposal' },
    { id: 2, name: 'Annual Logistics Deal', account: 'XYZ Ltd', value: '$120,000', stage: 'Negotiation' }
  ];
}
