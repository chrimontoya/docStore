export interface Action<T> {
  id: number;
  label: string;
  color?: 'primary' | 'accent' | 'warn';
  icon?: string;
  disabled?: boolean;
  action: (data: T) => void;
}
