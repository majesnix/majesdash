import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto, User, UserUpdate } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject$ = new BehaviorSubject<User | undefined>(undefined);
  readonly user$ = this.userSubject$.asObservable();

  constructor(private httpClient: HttpClient, private window: Window) {}

  create(user: CreateUserDto) {
    return this.httpClient.post(
      `${this.window.location.origin}/api/users`,
      {
        user
      }
    );
  }

  getUser() {
    return this.httpClient
      .get<{ user: User }>(`${this.window.location.origin}/api/user`)
      .pipe(
        tap(({ user }) => {
          this.userSubject$.next(user);
        })
      )
      .subscribe();
  }

  updateUser(user: UserUpdate) {
    const formData = new FormData();
    if (user.profilePic) {
      formData.append('profilePic', user.profilePic);
    }
    formData.append('user', JSON.stringify(user));
    return this.httpClient
      .post<{ user: User }>(`${this.window.location.origin}/api/user`, formData)
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
