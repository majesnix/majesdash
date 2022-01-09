import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettingsEntity } from './system-settings.entity';

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSettingsEntity)
    private readonly systemSettingsRepository: Repository<SystemSettingsEntity>
  ) {}

  async findOne() {
    return {
      ...(await this.systemSettingsRepository.find())[0],
    };
  }

  async update({ background }: { background: string }) {
    const systemSettings = (await this.systemSettingsRepository.find())[0];

    systemSettings.background = background;

    return await this.systemSettingsRepository.save(systemSettings);
  }
}
