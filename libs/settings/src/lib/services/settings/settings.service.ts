import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings, SettingsUpdate } from '@majesdash/data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject$ = new BehaviorSubject<Settings | undefined>({
    customBackground: false,
    tabTarget: 0,
    user: undefined,
    backgroundName: undefined,
  });
  settings$ = this.settingsSubject$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getSettings() {
    return this.httpClient
      .get<{ settings: Settings }>('http://localhost:3333/api/settings')
      .pipe(
        tap(({ settings }) => {
          this.settingsSubject$.next(settings);
        })
      );
  }

  updateSettings(settings: SettingsUpdate) {
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
      );
  }
}
