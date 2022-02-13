import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICreateUserDto,
  IUser,
  IUserResetPasswordAdminResponse,
  IUserUpdate,
  IUserUpdateAdmin,
  IUserUpdateAdminResponse,
} from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject$ = new BehaviorSubject<IUser | undefined>(undefined);
  readonly user$ = this.userSubject$.asObservable();

  private usersSubject$ = new BehaviorSubject<IUser[]>([]);
  readonly users$ = this.usersSubject$.asObservable();

  private selectedUserSubject$ = new BehaviorSubject<IUser | undefined>(
    undefined
  );
  readonly selectedUser$ = this.selectedUserSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router
  ) {}

  create(user: ICreateUserDto) {
    return this.httpClient.post(`${this.window.location.origin}/api/users`, {
      ...user,
    });
  }

  getCurrent() {
    return this.httpClient
      .get<IUser>(`${this.window.location.origin}/api/user`)
      .pipe(
        tap((user) => {
          this.userSubject$.next(user);
        })
      )
      .subscribe();
  }

  updateCurrent(user: IUserUpdate) {
    const formData = new FormData();

    user.avatar && formData.append('avatar', user.avatar);
    user.password && formData.append('password', user.password);
    user.passwordRepeat &&
      formData.append('passwordRepeat', user.passwordRepeat);

    return this.httpClient
      .post<IUser>(`${this.window.location.origin}/api/user`, formData)
      .subscribe((user) => {
        this.userSubject$.next(user);
      });
  }

  update(user: IUserUpdateAdmin) {
    return this.httpClient
      .put<IUserUpdateAdminResponse>(
        `${this.window.location.origin}/api/users`,
        { ...user }
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
      .put<IUserResetPasswordAdminResponse>(
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
      .put<IUser>(`${this.window.location.origin}/api/users/deleteAvatar`, {
        id,
      })
      .subscribe((user) => {
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
      .get<IUser[]>(`${this.window.location.origin}/api/users`)
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
