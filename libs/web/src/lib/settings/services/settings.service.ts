import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  SettingsUpdate,
  SystemSettings,
  SystemSettingsUpdate,
  TabTarget,
  UserSettings,
} from '@majesdash/data';
import { ENVIRONMENT, Environment } from '@majesdash/environment';
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
  userSettings$ = this.userSettingSubject$.asObservable();
  private systemSettingsSubject$ = new BehaviorSubject<
    SystemSettings | undefined
  >({
    background: 'background.png',
  });
  systemSettings$ = this.systemSettingsSubject$.asObservable();

  constructor(private httpClient: HttpClient,
    @Inject(ENVIRONMENT) public env: Environment) {}

  getUserSettings() {
    return this.httpClient
      .get<{ settings: UserSettings }>(`${this.env.base_url}/api/settings`)
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
        `${this.env.base_url}/api/settings`,
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
        `${this.env.base_url}/api/system-settings`
      )
      .pipe(
        tap(({ settings }) => {
          this.systemSettingsSubject$.next(settings);
        })
      )
      .subscribe();
  }

  updateSystemSettings(settings: SystemSettingsUpdate) {
    const formData = new FormData();
    formData.append('background', settings.background);
    return this.httpClient
      .post<{ settings: SystemSettings }>(
        `${this.env.base_url}/api/system-settings`,
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
