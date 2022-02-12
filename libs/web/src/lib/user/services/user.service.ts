import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CreateUserDto,
  User,
  UserDeleteAvatarAdminResponse,
  UserResetPasswordAdminResponse,
  UserUpdate,
  UserUpdateAdmin,
  UserUpdateAdminResponse,
} from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject$ = new BehaviorSubject<User | undefined>(undefined);
  readonly user$ = this.userSubject$.asObservable();

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  readonly users$ = this.usersSubject$.asObservable();

  private selectedUserSubject$ = new BehaviorSubject<User | undefined>(
    undefined
  );
  readonly selectedUser$ = this.selectedUserSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router
  ) {}

  create(user: CreateUserDto) {
    return this.httpClient.post(`${this.window.location.origin}/api/users`, {
      user,
    });
  }

  getCurrent() {
    return this.httpClient
      .get<{ user: User }>(`${this.window.location.origin}/api/user`)
      .pipe(
        tap(({ user }) => {
          this.userSubject$.next(user);
        })
      )
      .subscribe();
  }

  updateCurrent(user: UserUpdate) {
    const formData = new FormData();
    if (user.avatar) {
      formData.append('avatar', user.avatar);
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

  update(user: UserUpdateAdmin) {
    return this.httpClient
      .put<UserUpdateAdminResponse>(
        `${this.window.location.origin}/api/users`,
        {
          user,
        }
      )
      .pipe(
        tap(() => {
          this.router.navigate(['/users']);
        })
      )
      .subscribe();
  }

  resetPassword(id: number) {
    return this.httpClient
      .put<UserResetPasswordAdminResponse>(
        `${this.window.location.origin}/api/users/resetPassword`,
        {
          id,
        }
      )
      .subscribe((data) => {
        this.window.alert(`New password: ${data.password}`);
      });
  }

  deleteAvatar(id: number) {
    return this.httpClient
      .put<UserDeleteAvatarAdminResponse>(
        `${this.window.location.origin}/api/users/deleteAvatar`,
        {
          id,
        }
      )
      .subscribe(({ user }) => {
        this.selectedUserSubject$.next({ ...user, image: undefined });
        if (this.userSubject$.value?.id === id) {
          this.userSubject$.next({ ...user, image: undefined });
        }
      });
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.window.location.origin}/api/users/${id}`)
      .subscribe({
        complete: () => {
          this.usersSubject$.next(
            this.usersSubject$.value.filter((user) => user.id !== id)
          );
        },
      });
  }

  getAll() {
    return this.httpClient
      .get<User[]>(`${this.window.location.origin}/api/users`)
      .pipe(
        tap((users) => {
          this.usersSubject$.next(users);
        })
      )
      .subscribe();
  }

  selectUser(id: number) {
    this.selectedUserSubject$.next(
      this.usersSubject$.value.find((user) => user.id === id)
    );
    this.router.navigate(['/users/edit']);
  }

  deselectUser() {
    this.selectedUserSubject$.next(undefined);
  }

  reset() {
    this.userSubject$.next(undefined);
  }
}
