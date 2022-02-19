import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticate, ISystemSettings, IUserSettings } from '@majesdash/data';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'majesdash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  userSettings$: Observable<IUserSettings> = this.settingsService.userSettings$;
  systemSettings$: Observable<ISystemSettings> =
    this.settingsService.systemSettings$;
  error = false;
  authServiceSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  login(authenticate: IAuthenticate) {
    this.authServiceSubscription = this.authService
      .login(authenticate)
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

  ngOnDestroy(): void {
    this.authServiceSubscription?.unsubscribe();
  }
}
