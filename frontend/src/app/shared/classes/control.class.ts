import {ValidatorFn} from '@angular/forms';

export class Control {
  name: string = 'none';
  type: 'text' | 'password' = 'text';
  label: string = 'none';
  appearance: 'outline' | 'fill' = 'outline';
  order: number = 0;
  placeholder: string = '';
  defaultValue: any = undefined;
  validators: ValidatorFn[] = [];

  constructor(options: Partial<Control> = {}) {
    Object.assign(this, options);
  }
}
