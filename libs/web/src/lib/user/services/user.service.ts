import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User, UserUpdate } from '@majesdash/data';
import { ENVIRONMENT, Environment } from '@majesdash/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject$ = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.userSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) public env: Environment
  ) {}

  getUser() {
    return this.httpClient
      .get<{ user: User }>(`${this.env.base_url}/api/user`)
      .pipe(
        tap(({ user }) => {
          this.userSubject$.next(user);
        })
      )
      .subscribe();
  }

  updateUser(user: UserUpdate) {
    const formData = new FormData();
    if (user.profilepic) {
      formData.append('profilepic', user.profilepic);
    }
    formData.append('user', JSON.stringify(user));
    return this.httpClient
      .post<{ user: User }>(`${this.env.base_url}/api/user`, formData)
      .pipe(
        tap(({ user }) => {
          this.userSubject$.next(user);
        })
      )
      .subscribe();
  }

  reset() {
    this.userSubject$.next(undefined);
  }
}
