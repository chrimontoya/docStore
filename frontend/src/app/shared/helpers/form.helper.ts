import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Control} from '../classes/control.class';

type DynamicControls = Record<string, FormControl>;

export function createFormGroup(
  controls: readonly Control[],
  validators: ValidatorFn[] = [],
): FormGroup<DynamicControls> {
  const formControls: DynamicControls = {};

  controls.forEach(control => {
    formControls[control.name] = new FormControl(control.defaultValue, control.validators);
  });

  return new FormGroup(formControls, {validators});
}
