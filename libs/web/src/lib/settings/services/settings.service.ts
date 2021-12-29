import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Settings,
  SettingsUpdate,
  SystemSettings,
  SystemSettingsUpdate,
  TabTarget,
} from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject$ = new BehaviorSubject<Settings | undefined>({
    customBackground: false,
    tabTarget: TabTarget.NEW_TAB,
    backgroundName: undefined,
  });
  settings$ = this.settingsSubject$.asObservable();
  private systemSettingsSubject$ = new BehaviorSubject<
    SystemSettings | undefined
  >({
    background: 'background.png',
  });
  systemSettings$ = this.systemSettingsSubject$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getUserSettings() {
    return this.httpClient
      .get<{ settings: Settings }>('http://localhost:3333/api/settings')
      .pipe(
        tap(({ settings }) => {
          this.settingsSubject$.next(settings);
        })
      )
      .subscribe();
  }

  updateUserSettings(settings: SettingsUpdate) {
    const formData = new FormData();
    formData.append('background', settings.background);
    formData.append('settings', JSON.stringify(settings.settings));
    return this.httpClient
      .post<{ settings: Settings }>(
        'http://localhost:3333/api/settings',
        formData
      )
      .pipe(
        tap(({ settings }) => {
          this.settingsSubject$.next(settings);
        })
      )
      .subscribe();
  }

  getSystemSettings() {
    return this.httpClient
      .get<{ settings: SystemSettings }>(
        'http://localhost:3333/api/system-settings'
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
        'http://localhost:3333/api/system-settings',
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
    this.settingsSubject$.next(undefined);
  }
}
