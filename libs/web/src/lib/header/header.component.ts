import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@majesdash/data';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'majesdash-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.userService.reset();
    this.router.navigate(['/']);
  }
}
