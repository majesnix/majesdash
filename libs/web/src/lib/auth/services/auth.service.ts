import { Injectable } from '@angular/core';
import { Authenticate, User } from '@majesdash/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(authenticate: Authenticate): Observable<{ user: User }> {
    return this.httpClient
      .post<{ user: User }>('http://localhost:3333/api/users/login', {
        user: this.isEmail(authenticate.emailOrUsername)
          ? {
              email: authenticate.emailOrUsername,
              password: authenticate.password,
            }
          : {
              username: authenticate.emailOrUsername,
              password: authenticate.password,
            },
      })
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
