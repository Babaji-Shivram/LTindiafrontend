import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'template';
  sortable?: boolean;
  searchable?: boolean;
  template?: (row: any) => string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="data-table">
      <div *ngIf="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Loading...</span>
      </div>
      
      <div *ngIf="!loading" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th *ngFor="let column of columns" 
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ column.label }}
              </th>
              <th *ngIf="showActions" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let row of paginatedData" class="hover:bg-gray-50">
              <td *ngFor="let column of columns" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span *ngIf="column.type !== 'template'" [innerHTML]="getCellValue(row, column)"></span>
                <span *ngIf="column.type === 'template'" [innerHTML]="column.template ? column.template(row) : ''"></span>
              </td>
              <td *ngIf="showActions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <ng-container *ngTemplateOutlet="actionTemplate; context: { $implicit: row }"></ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .data-table {
      @apply bg-white shadow-sm rounded-lg overflow-hidden;
    }
  `]
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() loading = false;
  @Input() pageSize = 10;
  @Input() showActions = false;
  @Input() actionTemplate?: TemplateRef<any>;

  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  currentPage = 1;

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  getCellValue(row: any, column: TableColumn): string {
    const value = row[column.key];
    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    return value || '';
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onActionClick(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }
}