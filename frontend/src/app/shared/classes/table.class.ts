export interface TableColumn<T> {
  id: string;
  label: string;

  field?: keyof T;

  type?: 'text' | 'date' | 'number' | 'boolean' | 'actions';

  formatter?: (value: any, row: T) => string;

  sortable?: boolean;

  width?: string;

  align?: 'left' | 'center' | 'right';
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];

  selectable?: boolean;

  sortable?: boolean;

  filterable?: boolean;

  pagination?: boolean;

  pageSize?: number;

  emptyMessage?: string;
}
