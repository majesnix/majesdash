import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticate, IUserSettings, ISystemSettings } from '@majesdash/data';
import { first, Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'majesdash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  userSettings$: Observable<IUserSettings | undefined> =
    this.settingsService.userSettings$;
  systemSettings$: Observable<ISystemSettings | undefined> =
    this.settingsService.systemSettings$;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  login(authenticate: IAuthenticate) {
    this.authService
      .login(authenticate)
      .pipe(first())
      .subscribe({
        next: (user) => {
          localStorage.setItem('token', user.token);
          this.userService.getCurrent();
          this.settingsService.getUserSettings();
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = true;
          this.cdRef.detectChanges();
        },
      });
  }
}
