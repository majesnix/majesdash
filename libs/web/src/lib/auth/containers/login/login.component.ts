import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate, Settings, SystemSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'majesdash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;
  systemSettings$!: Observable<SystemSettings | undefined>;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settings$ = this.settingsService.settings$;
    if (localStorage.getItem('token')) {
      this.settingsService.getSettings().subscribe();
    }

    this.systemSettings$ = this.settingsService.systemSettings$;
    this.settingsService.getSystemSettings().subscribe();
  }

  login(authenticate: Authenticate) {
    this.authService.login(authenticate).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.user.token);
        this.userService.getUser().subscribe();
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = true;
        this.cdRef.detectChanges();
      },
    });
  }
}
