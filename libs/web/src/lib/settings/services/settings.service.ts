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
  private userSettingSubject$ = new BehaviorSubject<IUserSettings>({
    tabTarget: TabTarget.NEW_TAB,
    background: undefined,
  });
  readonly userSettings$ = this.userSettingSubject$.asObservable();
  private systemSettingsSubject$ = new BehaviorSubject<ISystemSettings>({
    background: 'background.png',
    initialized: true,
    weatherWidget: false,
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
    formData.append('weatherWidget', settings.weatherWidget.toString());
    settings.weatherWidgetApiKey &&
      formData.append('weatherWidgetApiKey', settings.weatherWidgetApiKey);
    settings.weatherWidgetTown &&
      formData.append('weatherWidgetTown', settings.weatherWidgetTown);

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
    this.userSettingSubject$.next({
      tabTarget: TabTarget.NEW_TAB,
      background: undefined,
    });
  }
}
