import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthenticate, IUserWithToken } from '@majesdash/data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private window: Window) {}

  login(authenticate: IAuthenticate) {
    return this.httpClient.post<IUserWithToken>(
      `${this.window.location.origin}/api/users/login`,
      this.isEmail(authenticate.emailOrUsername)
        ? {
            email: authenticate.emailOrUsername,
            password: authenticate.password,
          }
        : {
            username: authenticate.emailOrUsername,
            password: authenticate.password,
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
