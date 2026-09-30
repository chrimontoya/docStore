import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {createFormGroup} from '../../../../shared/helpers/form.helper';
import {loginControls} from '../../../../shared/forms/login-controls';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDivider} from '@angular/material/list';
import {MatCard} from '@angular/material/card';
import {samePasswordValidator} from '../../../../shared/validators/password.validator';
import {AuthService} from '../../services/auth.service';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatCheckbox,
    MatDivider,
    MatCard,
  ],
  selector: 'app-login-component',
  styleUrl: './login-component.scss',
  templateUrl: './login-component.html',
})
export default class LoginComponent {
  authService = inject(AuthService);
  controls = loginControls;
  form: FormGroup = createFormGroup(this.controls, [samePasswordValidator]);
  keepLoggedIn = new FormControl({value: false, disabled: true});

  login() {
    if (this.form.valid) {

      const {email, password} = this.form.getRawValue();

      this.authService.login(email, password)
        .subscribe({
          next: result => {
            if (result.accessToken){
              this.authService.setToken(result.accessToken);
            }
          }
        });
    }
  }
}
