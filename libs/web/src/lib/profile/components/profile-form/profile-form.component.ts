import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserUpdate } from '@majesdash/data';

@Component({
  selector: 'majesdash-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Output() userUpdateEvent = new EventEmitter<UserUpdate>();
  hide = true;

  userForm = new FormGroup({
    profilePic: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
    password: new FormControl(undefined),
    passwordRepeat: new FormControl(undefined),
  });

  update() {
    this.userUpdateEvent.emit({
      profilePic: this.userForm.value.profilePic,
      password: this.userForm.value.password,
      passwordRepeat: this.userForm.value.passwordRepeat,
    });
  }
}
