import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '@lt-india-erp/shared-ui';

@Component({
  selector: 'app-tax-rates-list',
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
          <mat-card-title>Tax Rates Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Add Tax Rate
          </button>
        </mat-card-header>
        <mat-card-content>
          <ui-data-table
            [data]="taxRates"
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
export class TaxRatesListComponent {
  displayedColumns = ['id', 'name', 'rate', 'type', 'actions'];
  taxRates = [
    { id: 1, name: 'GST', rate: '18%', type: 'Goods and Services Tax' },
    { id: 2, name: 'IGST', rate: '18%', type: 'Integrated GST' }
  ];
}
