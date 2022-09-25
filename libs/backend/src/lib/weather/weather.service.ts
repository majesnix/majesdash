import { OpenWeatherResponse } from '@majesdash/data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '../http/http.service';
import { SystemSettingsEntity } from '../system-settings/system-settings.entity';

@Injectable()
export class WeatherService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(SystemSettingsEntity)
    private readonly systemSettingsRepository: Repository<SystemSettingsEntity>
  ) {}

  async getWeather() {
    const [{ weatherWidgetApiKey, weatherWidgetTown }] =
      await this.systemSettingsRepository.find();
    const weather: OpenWeatherResponse = await this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherWidgetTown}&APPID=${weatherWidgetApiKey}`
      )
      .then((res) => res.json());
    return weather;
  }
}
