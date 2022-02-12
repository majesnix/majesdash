import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  User,
  UserDeleteAdmin,
  UserDeleteAvatarAdmin,
  UserResetPasswordAdmin,
  UserUpdateAdmin,
} from '@majesdash/data';

@Component({
  selector: 'majesdash-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {
  @Output() userUpdateEvent = new EventEmitter<UserUpdateAdmin>();
  @Output() userPasswordResetEvent = new EventEmitter<UserResetPasswordAdmin>();
  @Output() userDeleteEvent = new EventEmitter<UserDeleteAdmin>();
  @Output() userDeleteAvatarEvent = new EventEmitter<UserDeleteAvatarAdmin>();
  @Input() user?: User | null;
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
