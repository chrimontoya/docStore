import {TemplateRef} from '@angular/core';
import {Action} from '../../shared/classes/action.interface';

export interface DialogTemplateData<T> {
  title: string;
  data: T;
  templateRef: TemplateRef<{$implicit: T}>;
  actions?: Action<T>[];
}
