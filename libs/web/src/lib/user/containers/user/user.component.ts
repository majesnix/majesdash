import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICreateUserDto,
  IUser,
  IUserDeleteAdmin,
  IUserDeleteAvatarAdmin,
  IUserResetPasswordAdmin,
  IUserUpdateAdmin,
} from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'majesdash-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUser | undefined> = this.userService.user$;
  selectedUser$: Observable<IUser | undefined> = this.userService.selectedUser$;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.getCurrent();
    }
  }

  create(user: ICreateUserDto) {
    this.userService.create(user).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
    });
  }

  update(user: IUserUpdateAdmin) {
    this.userService.update(user);
  }

  resetPassword(event: IUserResetPasswordAdmin) {
    this.userService.resetPassword(event.id);
  }

  deleteAvatar(event: IUserDeleteAvatarAdmin) {
    this.userService.deleteAvatar(event.id);
  }

  delete(event: IUserDeleteAdmin) {
    this.userService.delete(event.id);
  }
}
