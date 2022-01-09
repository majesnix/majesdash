import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  SettingsUpdate,
  SystemSettings,
  SystemSettingsUpdate,
  TabTarget,
  UserSettings,
} from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private userSettingSubject$ = new BehaviorSubject<UserSettings | undefined>({
    customBackground: false,
    tabTarget: TabTarget.NEW_TAB,
    backgroundName: undefined,
  });
  readonly userSettings$ = this.userSettingSubject$.asObservable();
  private systemSettingsSubject$ = new BehaviorSubject<
    SystemSettings | undefined
  >({
    background: 'background.png',
  });
  readonly systemSettings$ = this.systemSettingsSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router
  ) {}

  getUserSettings() {
    return this.httpClient
      .get<{ settings: UserSettings }>(
        `${this.window.location.origin}/api/settings`
      )
      .pipe(
        tap(({ settings }) => {
          this.userSettingSubject$.next(settings);
        })
      )
      .subscribe();
  }

  updateUserSettings(settings: SettingsUpdate) {
    const formData = new FormData();
    formData.append('background', settings.background);
    formData.append('settings', JSON.stringify(settings.settings));
    return this.httpClient
      .post<{ settings: UserSettings }>(
        `${this.window.location.origin}/api/settings`,
        formData
      )
      .pipe(
        tap(({ settings }) => {
          this.userSettingSubject$.next(settings);
        })
      )
      .subscribe();
  }

  getSystemSettings() {
    return this.httpClient
      .get<{ settings: SystemSettings }>(
        `${this.window.location.origin}/api/system-settings`
      )
      .pipe(
        tap(({ settings }) => {
          this.systemSettingsSubject$.next(settings);
          if (!settings.initialized) {
            this.router.navigate(['/setup']);
          } else if (this.router.url === '/setup') {
            this.router.navigate(['/login']);
          }
        })
      )
      .subscribe();
  }

  updateSystemSettings(settings: SystemSettingsUpdate) {
    const formData = new FormData();
    formData.append('background', settings.background);
    return this.httpClient
      .post<{ settings: SystemSettings }>(
        `${this.window.location.origin}/api/system-settings`,
        formData
      )
      .pipe(
        tap(({ settings }) => {
          this.systemSettingsSubject$.next(settings);
        })
      )
      .subscribe();
  }

  reset() {
    this.userSettingSubject$.next(undefined);
  }
}
