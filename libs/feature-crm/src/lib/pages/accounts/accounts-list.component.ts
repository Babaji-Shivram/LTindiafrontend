import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '@lt-india-erp/shared-ui';

@Component({
  selector: 'app-accounts-list',
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
          <mat-card-title>Accounts Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Account
          </button>
        </mat-card-header>
        <mat-card-content>
          <ui-data-table
            [data]="accounts"
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
export class AccountsListComponent {
  displayedColumns = ['id', 'name', 'type', 'industry', 'revenue', 'actions'];
  accounts = [
    { id: 1, name: 'ABC Corporation', type: 'Enterprise', industry: 'Manufacturing', revenue: '$2M' },
    { id: 2, name: 'XYZ Logistics', type: 'SMB', industry: 'Transportation', revenue: '$500K' }
  ];
}
