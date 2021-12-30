import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Authenticate, User } from '@majesdash/data';
import { ENVIRONMENT, Environment } from '@majesdash/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient,
    @Inject(ENVIRONMENT) public env: Environment) {}

  login(authenticate: Authenticate) {
    return this.httpClient.post<{ user: User }>(
      `${this.env.base_url}/api/users/login`,
      {
        user: this.isEmail(authenticate.emailOrUsername)
          ? {
              email: authenticate.emailOrUsername,
              password: authenticate.password,
            }
          : {
              username: authenticate.emailOrUsername,
              password: authenticate.password,
            },
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  private isEmail(value: string) {
    return new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(value);
  }
}
