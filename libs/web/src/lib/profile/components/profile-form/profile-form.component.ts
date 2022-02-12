import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserUpdate } from '@majesdash/data';

@Component({
  selector: 'majesdash-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Output() userUpdateEvent = new EventEmitter<UserUpdate>();
  hide = true;

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      profilePic: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      password: [''],
      passwordRepeat: [''],
    });
  }

  update() {
    this.userUpdateEvent.emit({
      profilePic: this.profileForm.value.profilePic,
      password: this.profileForm.value.password,
      passwordRepeat: this.profileForm.value.passwordRepeat,
    });
  }
}
