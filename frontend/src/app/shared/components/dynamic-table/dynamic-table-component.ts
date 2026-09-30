import { Component, Input } from '@angular/core';
import {TableAction, TableColumn, TableConfig} from '../../classes/table.class';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';

@Component({
  imports: [
    MatTableModule,
    MatIconButton,
    MatTooltip,
    MatIcon,
  ],
  selector: 'app-dynamic-table-component',
  styleUrl: './dynamic-table-component.scss',
  templateUrl: './dynamic-table-component.html',
})
export class DynamicTableComponent<T> {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource();
  @Input() config!: TableConfig<T>;

  get displayedColumns(): string[] {
    return [...this.config.columns.map(column => column.label), ...this.config.actions ? ['actions'] : []];
  }

  getValue(row: T, column: TableColumn<T>): any {
    if (!column.field) {
      return null;
    }

    return row[column.field];
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
