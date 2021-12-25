import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate, Settings } from '@majesdash/data';
import { SettingsService } from '@majesdash/settings';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'majesdash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe();
    this.settings$ = this.settingsService.settings$;
    this.settings$.subscribe();
  }

  login(authenticate: Authenticate) {
    this.authService.login(authenticate).subscribe((data) => {
      localStorage.setItem('token', data.user.token);
      this.router.navigate(['/']);
    });
  }
}
