import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '@lt-india-erp/shared-ui';

@Component({
  selector: 'app-leads-list',
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
          <mat-card-title>Leads Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Lead
          </button>
        </mat-card-header>
        <mat-card-content>
          <ui-data-table
            [data]="leads"
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
export class LeadsListComponent {
  displayedColumns = ['id', 'name', 'company', 'status', 'source', 'actions'];
  leads = [
    { id: 1, name: 'John Doe', company: 'ABC Corp', status: 'New', source: 'Website' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Ltd', status: 'Qualified', source: 'Referral' }
  ];
}
