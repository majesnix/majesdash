import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUserUpdate } from '@majesdash/data';

@Component({
  selector: 'majesdash-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Output() userUpdateEvent = new EventEmitter<IUserUpdate>();
  hide = true;

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      avatar: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      password: '',
      passwordRepeat: '',
    });
  }

  update() {
    this.userUpdateEvent.emit({
      avatar: this.profileForm.value.avatar,
      password: this.profileForm.value.password,
      passwordRepeat: this.profileForm.value.passwordRepeat,
    });
  }
}
