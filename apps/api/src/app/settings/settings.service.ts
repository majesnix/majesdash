import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { UpdateSettingsDto } from './dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>
  ) {}

  async getSettings(): Promise<SettingsEntity> {
    return await this.settingsRepository.find()[0];
  }

  async update(dto: UpdateSettingsDto): Promise<SettingsEntity> {
    const toUpdate = await this.settingsRepository.find()[0];

    toUpdate.backgroundImage = dto.backgroundImage;

    const updated = Object.assign(toUpdate, dto);
    return await this.settingsRepository.save(updated);
  }
}
