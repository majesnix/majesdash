import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '@majesdash/data';

@Component({
  selector: 'majesdash-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() authenticateEvent = new EventEmitter<Authenticate>();

  loginForm = new FormGroup({
    emailOrUsername: new FormControl('', {
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
      emailOrUsername: this.loginForm.value.emailOrUsername,
      password: this.loginForm.value.password,
    } as Authenticate);
  }
}
