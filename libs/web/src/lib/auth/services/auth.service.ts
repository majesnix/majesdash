import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate, User } from '@majesdash/data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private window: Window) {}

  login(authenticate: Authenticate) {
    return this.httpClient.post<{ user: User }>(
      `${this.window.location.origin}/api/users/login`,
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
