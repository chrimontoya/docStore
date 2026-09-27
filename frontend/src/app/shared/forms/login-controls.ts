import {Control} from '../classes/control.class';
import {Validators} from '@angular/forms';

export const loginControls: Control[] = [
  new Control({
    name: 'name',
    label: $localize`:@@login.name:Name`,
    placeholder: $localize`:@@login.name.placeholder:Name`,
    order: 1,
    validators: [Validators.required],
  }),
  new Control({
    name: 'email',
    label: $localize`:@@login.email:Email`,
    placeholder: $localize`:@@login.email.placeholder:Email`,
    order: 2,
    validators: [Validators.required],
  }),
  new Control({
    name: 'password',
    label: $localize`:@@login.password:Password`,
    placeholder: $localize`:@@login.password.placeholder:Password`,
    order: 3,
    type: "password",
    validators: [Validators.required],
  }),
  new Control({
    name: 're-password',
    label: $localize`:@@login.confirmPassword:Confirm password`,
    placeholder: $localize`:@@login.confirmPassword.placeholder:Confirm password`,
    order: 4,
    type: "password",
    validators: [Validators.required],
  }),
];
