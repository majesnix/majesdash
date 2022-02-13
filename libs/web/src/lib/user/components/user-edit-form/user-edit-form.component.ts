import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IUser,
  IUserDeleteAdmin,
  IUserDeleteAvatarAdmin,
  IUserResetPasswordAdmin,
  IUserUpdateAdmin,
} from '@majesdash/data';

@Component({
  selector: 'majesdash-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {
  @Output() userUpdateEvent = new EventEmitter<IUserUpdateAdmin>();
  @Output() userPasswordResetEvent = new EventEmitter<IUserResetPasswordAdmin>();
  @Output() userDeleteEvent = new EventEmitter<IUserDeleteAdmin>();
  @Output() userDeleteAvatarEvent = new EventEmitter<IUserDeleteAvatarAdmin>();
  @Input() user?: IUser | null;
  hide = true;

  userForm = new FormGroup({
    username: new FormControl(undefined, {
      validators: [Validators.required],
    }),
    email: new FormControl(this.user?.email ?? undefined, {
      validators: [Validators.required, Validators.email],
    }),
    isAdmin: new FormControl(this.user?.isAdmin ?? false),
  });

  ngOnInit(): void {
    this.userForm.controls['username'].setValue(this.user?.username);
    this.userForm.controls['email'].setValue(this.user?.email);
    this.userForm.controls['isAdmin'].setValue(this.user?.isAdmin);
  }

  update() {
    if (this.user) {
      this.userUpdateEvent.emit({
        id: this.user.id,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        isAdmin: this.userForm.value.isAdmin,
      });
    }
  }

  resetPassword() {
    if (this.user) {
      this.userPasswordResetEvent.emit({
        id: this.user.id,
      });
    }
  }

  deleteAvatar() {
    if (this.user) {
      this.userDeleteAvatarEvent.emit({
        id: this.user.id,
      });
    }
  }

  delete() {
    if (this.user) {
      this.userDeleteEvent.emit({
        id: this.user.id,
      });
    }
  }
}
