import { Component, OnInit } from '@angular/core';
import { AuthService } from '@majesdash/auth';
import { User } from '@majesdash/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'majesdash-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    if (localStorage.getItem('token')) {
      this.authService.getUserInfo().subscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
