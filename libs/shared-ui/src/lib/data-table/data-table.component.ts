import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions';
}

export interface TableAction {
  label: string;
  icon: string;
  action: string;
  color?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'ui-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  template: `
    <div class="data-table-container">
      <!-- Table Header -->
      <div class="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div class="flex items-center space-x-4">
          <h2 class="text-lg font-heading font-semibold text-gray-900">{{ title }}</h2>
          <span *ngIf="selection.selected.length > 0" 
                class="text-sm text-gray-500">
            {{ selection.selected.length }} selected
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Search -->
          <mat-form-field appearance="outline" class="search-field">
            <mat-icon matPrefix>search</mat-icon>
            <input matInput 
                   placeholder="Search..." 
                   [(ngModel)]="searchValue"
                   (input)="applyFilter($event)">
          </mat-form-field>

          <!-- Actions -->
          <button *ngFor="let action of headerActions"
                  mat-raised-button
                  [color]="action.color || 'primary'"
                  (click)="onHeaderAction(action.action)">
            <mat-icon>{{ action.icon }}</mat-icon>
            {{ action.label }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex items-center justify-center p-8">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <!-- Table -->
      <div *ngIf="!loading" class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Selection Column -->
          <ng-container matColumnDef="select" *ngIf="selectable">
            <th mat-header-cell *matHeaderCellDef class="w-12">
              <mat-checkbox (change)="$event ? toggleAllRows() : null"
                            [checked]="selection.hasValue() && isAllSelected()"
                            [indeterminate]="selection.hasValue() && !isAllSelected()">
              </mat-checkbox>
            </th>
            <td mat-cell *matCellDef="let row" class="w-12">
              <mat-checkbox (click)="$event.stopPropagation()"
                            (change)="$event ? selection.toggle(row) : null"
                            [checked]="selection.isSelected(row)">
              </mat-checkbox>
            </td>
          </ng-container>

          <!-- Data Columns -->
          <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
            <th mat-header-cell *matHeaderCellDef 
                [mat-sort-header]="column.sortable ? column.key : null"
                [style.width]="column.width">
              {{ column.label }}
            </th>
            <td mat-cell *matCellDef="let element" [style.width]="column.width">
              <ng-container [ngSwitch]="column.type">
                <!-- Text -->
                <span *ngSwitchCase="'text'">{{ element[column.key] }}</span>
                
                <!-- Number -->
                <span *ngSwitchCase="'number'" class="font-mono">
                  {{ element[column.key] | number }}
                </span>
                
                <!-- Date -->
                <span *ngSwitchCase="'date'">
                  {{ element[column.key] | date:'short' }}
                </span>
                
                <!-- Boolean -->
                <mat-icon *ngSwitchCase="'boolean'" 
                          [class]="element[column.key] ? 'text-green-500' : 'text-red-500'">
                  {{ element[column.key] ? 'check_circle' : 'cancel' }}
                </mat-icon>
                
                <!-- Actions -->
                <div *ngSwitchCase="'actions'" class="flex items-center space-x-1">
                  <button *ngFor="let action of rowActions"
                          mat-icon-button
                          [color]="action.color"
                          (click)="onRowAction(action.action, element)"
                          [matTooltip]="action.label">
                    <mat-icon class="text-lg">{{ action.icon }}</mat-icon>
                  </button>
                </div>
                
                <!-- Default -->
                <span *ngSwitchDefault>{{ element[column.key] }}</span>
              </ng-container>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"
              (click)="onRowClick(row)"
              class="hover:bg-gray-50 cursor-pointer transition-colors duration-150"></tr>
        </table>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && dataSource.data.length === 0" 
           class="flex flex-col items-center justify-center p-12 text-gray-500">
        <mat-icon class="text-6xl mb-4 text-gray-300">inbox</mat-icon>
        <h3 class="text-lg font-medium mb-2">No data found</h3>
        <p class="text-sm">{{ emptyMessage || 'No records match your search criteria.' }}</p>
      </div>

      <!-- Paginator -->
      <mat-paginator *ngIf="!loading && dataSource.data.length > 0"
                     [pageSizeOptions]="pageSizeOptions"
                     [pageSize]="pageSize"
                     showFirstLastButtons
                     class="border-t border-gray-200">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .data-table-container {
      @apply bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden;
    }
    
    .search-field {
      width: 250px;
    }
    
    .search-field ::ng-deep .mat-mdc-form-field-wrapper {
      padding-bottom: 0;
    }
    
    .search-field ::ng-deep .mat-mdc-text-field-wrapper {
      height: 40px;
    }
    
    .mat-mdc-table {
      background: transparent;
    }
    
    .mat-mdc-header-row {
      background-color: #F9FAFB;
      height: 48px;
    }
    
    .mat-mdc-row {
      height: 40px;
      border-bottom: 1px solid #E5E7EB;
    }
    
    .mat-mdc-header-cell {
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #E5E7EB;
    }
    
    .mat-mdc-cell {
      color: #1F2937;
    }
  `]
})
export class DataTableComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() loading: boolean = false;
  @Input() selectable: boolean = false;
  @Input() headerActions: TableAction[] = [];
  @Input() rowActions: TableAction[] = [];
  @Input() emptyMessage: string = '';
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];

  @Output() rowClick = new EventEmitter<any>();
  @Output() headerActionClick = new EventEmitter<string>();
  @Output() rowActionClick = new EventEmitter<{action: string, row: any}>();
  @Output() selectionChange = new EventEmitter<any[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  searchValue: string = '';

  get displayedColumns(): string[] {
    const columns = this.columns.map(col => col.key);
    if (this.selectable) {
      columns.unshift('select');
    }
    return columns;
  }

  ngOnInit() {
    this.dataSource.data = this.data;
    this.selection.changed.subscribe(() => {
      this.selectionChange.emit(this.selection.selected);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onHeaderAction(action: string) {
    this.headerActionClick.emit(action);
  }

  onRowAction(action: string, row: any) {
    this.rowActionClick.emit({ action, row });
  }
}