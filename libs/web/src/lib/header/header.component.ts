import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@majesdash/data';
import { ENVIRONMENT, Environment } from '@majesdash/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { SettingsService } from '../settings/services/settings.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'majesdash-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User | undefined>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router,
    @Inject(ENVIRONMENT) public env: Environment
  ) {
    this.user$ = this.userService.user$;
  }

  logout(): void {
    this.authService.logout();
    this.userService.reset();
    this.settingsService.reset();
    this.router.navigate(['/']);
  }
}
