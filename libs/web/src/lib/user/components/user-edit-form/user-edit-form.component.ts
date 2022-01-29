import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserUpdateAdmin } from '@majesdash/data';

@Component({
  selector: 'majesdash-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent {
  @Output() userUpdateEvent = new EventEmitter<UserUpdateAdmin>();
  @Input() user?: User | null;
  hide = true;

  userForm = new FormGroup({
    username: new FormControl(this.user?.username ?? undefined, {
      validators: [Validators.required],
    }),
    email: new FormControl(this.user?.email ?? undefined, {
      validators: [Validators.required, Validators.email],
    }),
    isAdmin: new FormControl(this.user?.isAdmin ?? false),
  });

  update() {
    if (this.user) {
      this.userUpdateEvent.emit({
        id: this.user.id,
        email: this.userForm.value.email,
        isAdmin: this.userForm.value.isAdmin,
      });
    }
  }
}
