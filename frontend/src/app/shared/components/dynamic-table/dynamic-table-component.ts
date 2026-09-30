import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {TableAction, TableColumn, TableConfig} from '../../classes/table.class';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatSort, MatSortHeader} from '@angular/material/sort';

@Component({
  imports: [
    MatTableModule,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatSortHeader,
    MatSort,
  ],
  selector: 'app-dynamic-table-component',
  styleUrl: './dynamic-table-component.scss',
  templateUrl: './dynamic-table-component.html',
})
export class DynamicTableComponent<T> implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource();
  @Input() config!: TableConfig<T>;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  get displayedColumns(): string[] {
    return [...this.config.columns.map(column => column.label), ...this.config.actions ? ['actions'] : []];
  }

  getValue(row: T, column: TableColumn<T>): any {
    if (!column.field) {
      return null;
    }

    return row[column.field];
  }

  getSortId(column: TableColumn<T>): string {
    return column.sortable && column.field
      ? String(column.field)
      : '';
  }

  formatValue(row: T, column: TableColumn<T>): string {
    const value = this.getValue(row, column);

    if (column.formatter) {
      return column.formatter(value, row);
    }

    return value ?? '';
  }

  onAction(action: TableAction<any>,row: any) {
    action.action(row);
  }
}
