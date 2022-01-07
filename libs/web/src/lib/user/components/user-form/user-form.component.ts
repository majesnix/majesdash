import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserUpdate } from '@majesdash/data';

@Component({
  selector: 'majesdash-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Output() userUpdateEvent = new EventEmitter<UserUpdate>();
  hide = true;

  userForm = new FormGroup({
    profilepic: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
    password: new FormControl(undefined),
    passwordRepeat: new FormControl(undefined),
  });

  update() {
    this.userUpdateEvent.emit({
      profilepic: this.userForm.value.profilepic,
      password: this.userForm.value.password,
      passwordRepeat: this.userForm.value.passwordRepeat,
    });
  }
}
