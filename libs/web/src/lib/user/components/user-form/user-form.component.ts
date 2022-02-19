import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateUserDto } from '@majesdash/data';

@Component({
  selector: 'majesdash-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Output() userCreateEvent = new EventEmitter<ICreateUserDto>();
  hide = true;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
      passwordRepeat: [undefined, [Validators.required]],
      isAdmin: false,
    });
  }

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
