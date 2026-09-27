import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const samePasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const rePassword = control.get('re-password')?.value;

  if (!password || !rePassword || password === rePassword) {
    return null;
  }

  return {samePassword: true};
};
