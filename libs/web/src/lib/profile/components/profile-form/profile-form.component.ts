import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IUserUpdate } from '@majesdash/data';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'majesdash-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Output() userUpdateEvent = new EventEmitter<IUserUpdate>();
  hide = true;

  profileForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
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
