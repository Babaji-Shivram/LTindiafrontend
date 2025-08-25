import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '@lt-india-erp/shared-ui';

@Component({
  selector: 'app-charge-codes-list',
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
          <mat-card-title>Charge Codes Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Charge Code
          </button>
        </mat-card-header>
        <mat-card-content>
          <ui-data-table
            [data]="chargeCodes"
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
export class ChargeCodesListComponent {
  displayedColumns = ['id', 'code', 'description', 'type', 'actions'];
  chargeCodes = [
    { id: 1, code: 'THC', description: 'Terminal Handling Charges', type: 'Port' },
    { id: 2, code: 'DOC', description: 'Documentation Fee', type: 'Admin' }
  ];
}
