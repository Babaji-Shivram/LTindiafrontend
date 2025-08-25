import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '@lt-india-erp/shared-ui';

@Component({
  selector: 'app-parties-list',
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
          <mat-card-title>Parties Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Party
          </button>
        </mat-card-header>
        <mat-card-content>
          <ui-data-table
            [data]="parties"
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
export class PartiesListComponent {
  displayedColumns = ['id', 'name', 'type', 'contact', 'actions'];
  parties = [
    { id: 1, name: 'ABC Corporation', type: 'Customer', contact: 'contact@abc.com' },
    { id: 2, name: 'XYZ Suppliers', type: 'Vendor', contact: 'info@xyz.com' }
  ];
}
