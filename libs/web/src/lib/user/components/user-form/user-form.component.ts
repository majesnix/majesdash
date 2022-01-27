import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '@majesdash/data';

@Component({
  selector: 'majesdash-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Output() userCreateEvent = new EventEmitter<CreateUserDto>();
  hide = true;

  userForm = new FormGroup({
    username: new FormControl(undefined, {
      validators: [Validators.required],
    }),
    email: new FormControl(undefined, {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(undefined, {
      validators: [Validators.required],
    }),
    passwordRepeat: new FormControl(undefined, {
      validators: [Validators.required],
    }),
    isAdmin: new FormControl(false),
  });

  create() {
    this.userCreateEvent.emit({
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      passwordRepeat: this.userForm.value.passwordRepeat,
      isAdmin: this.userForm.value.isAdmin,
    });
  }
}
