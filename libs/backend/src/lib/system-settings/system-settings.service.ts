import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettingsUpdateDto } from './dto/system-settings-update.dto';
import { SystemSettingsEntity } from './system-settings.entity';

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSettingsEntity)
    private readonly systemSettingsRepository: Repository<SystemSettingsEntity>
  ) {}

  async findOne() {
    return (await this.systemSettingsRepository.find())[0];
  }

  async update(systemSettingsData: SystemSettingsUpdateDto, filename?: string) {
    const [systemSettings] = await this.systemSettingsRepository.find();

    const useWeatherWidget = JSON.parse(systemSettingsData.weatherWidget);
    if (filename) {
      systemSettings.background = filename;
    }
    systemSettings.weatherWidget = useWeatherWidget;
    if (useWeatherWidget) {
      systemSettings.weatherWidgetApiKey =
        systemSettingsData.weatherWidgetApiKey;
      systemSettings.weatherWidgetTown = systemSettingsData.weatherWidgetTown;
    } else {
      systemSettings.weatherWidgetApiKey = null;
      systemSettings.weatherWidgetTown = null;
    }

    return await this.systemSettingsRepository.save(systemSettings);
  }
}
