import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenWeatherResponse } from '@majesdash/data';
import { BehaviorSubject, mergeMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherSubject$ = new BehaviorSubject<
    OpenWeatherResponse | undefined
  >(undefined);
  readonly weather$ = this.weatherSubject$.asObservable();

  constructor(private http: HttpClient, private window: Window) {
    // get first data instant and update every 15 minutes
    timer(0, 15 * 60 * 1000)
      .pipe(
        mergeMap(() =>
          this.http.get<OpenWeatherResponse>(
            `${this.window.location.origin}/api/weather`
          )
        )
      )
      .subscribe((weather) => this.weatherSubject$.next(weather));
  }
}
