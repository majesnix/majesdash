import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CreateUserDto,
  User,
  UserDeleteAdmin,
  UserDeleteAvatarAdmin,
  UserResetPasswordAdmin,
  UserUpdateAdmin,
} from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'majesdash-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<User | undefined> = this.userService.user$;
  selectedUser$: Observable<User | undefined> = this.userService.selectedUser$;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.getCurrent();
    }
  }

  create(user: CreateUserDto) {
    this.userService.create(user).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
    });
  }

  update(user: UserUpdateAdmin) {
    this.userService.update(user);
  }

  resetPassword(event: UserResetPasswordAdmin) {
    this.userService.resetPassword(event.id);
  }

  deleteAvatar(event: UserDeleteAvatarAdmin) {
    this.userService.deleteAvatar(event.id);
  }

  delete(event: UserDeleteAdmin) {
    this.userService.delete(event.id);
  }
}
