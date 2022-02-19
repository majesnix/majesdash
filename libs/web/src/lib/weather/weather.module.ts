import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherComponent } from './containers/weather/weather.component';

@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule],
  exports: [WeatherComponent],
})
export class WeatherModule {}
