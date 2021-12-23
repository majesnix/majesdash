import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from '@majesdash/data-models';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'majesdash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(authenticate: Authenticate) {
    this.authService.login(authenticate).subscribe((data) => {
      localStorage.setItem('token', data.user.token);
      this.router.navigate(['/']);
    });
  }
}
