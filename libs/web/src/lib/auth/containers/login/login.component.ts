import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate, Settings, SystemSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService
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
    this.authService.login(authenticate).subscribe((data) => {
      localStorage.setItem('token', data.user.token);
      this.router.navigate(['/']);
    });
  }
}
