import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ISystemSettings,
  ISystemSettingsUpdate,
  IUserSettings,
  IUserSettingsUpdate,
  TabTarget,
} from '@majesdash/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private userSettingSubject$ = new BehaviorSubject<IUserSettings | undefined>({
    tabTarget: TabTarget.NEW_TAB,
    backgroundName: undefined,
  });
  readonly userSettings$ = this.userSettingSubject$.asObservable();
  private systemSettingsSubject$ = new BehaviorSubject<
    ISystemSettings | undefined
  >({
    background: 'background.png',
    initialized: true,
  });
  readonly systemSettings$ = this.systemSettingsSubject$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private window: Window,
    private router: Router
  ) {}

  getUserSettings() {
    return this.httpClient
      .get<IUserSettings>(`${this.window.location.origin}/api/settings`)
      .subscribe((userSettings) => {
        this.userSettingSubject$.next(userSettings);
      });
  }

  updateUserSettings(settings: IUserSettingsUpdate) {
    const formData = new FormData();
    formData.append('background', settings.background);
    formData.append('tabTarget', settings.tabTarget);
    return this.httpClient
      .post<IUserSettings>(
        `${this.window.location.origin}/api/settings`,
        formData
      )
      .subscribe((userSettings) => {
        this.userSettingSubject$.next(userSettings);
      });
  }

  getSystemSettings() {
    return this.httpClient
      .get<ISystemSettings>(
        `${this.window.location.origin}/api/system-settings`
      )
      .subscribe((systemSettings) => {
        this.systemSettingsSubject$.next(systemSettings);
        if (!systemSettings.initialized) {
          this.router.navigate(['/setup']);
        } else if (this.router.url === '/setup') {
          this.router.navigate(['/login']);
        }
      });
  }

  updateSystemSettings(settings: ISystemSettingsUpdate) {
    const formData = new FormData();
    formData.append('background', settings.background);
    return this.httpClient
      .post<ISystemSettings>(
        `${this.window.location.origin}/api/system-settings`,
        formData
      )
      .subscribe((systemSettings) => {
        this.systemSettingsSubject$.next(systemSettings);
      });
  }

  reset() {
    this.userSettingSubject$.next(undefined);
  }
}
