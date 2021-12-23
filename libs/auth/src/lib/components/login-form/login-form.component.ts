import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '@majesdash/data-models';

@Component({
  selector: 'majesdash-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() authenticateEvent = new EventEmitter<Authenticate>();

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
  });

  login() {
    this.authenticateEvent.emit({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    } as Authenticate);
  }
}
