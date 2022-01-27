import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto, User } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'majesdash-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<User | undefined> = this.userService.user$;
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
}
