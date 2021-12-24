import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async findOne(id: number): Promise<SettingsEntity> {
    const user = await this.usersRepository.findOne(id);

    const settings = await this.settingsRepository.findOne({
      where: { user },
      relations: ['user'],
    });

    if (settings.user) {
      delete settings.user.passwordHash;
    }
    return settings;
  }

  /**
   * Creates or Updates user settings
   * @param id User id
   * @param customBackground has a background been uploaded and should be set
   * @returns User Settings + User Entity
   */
  async createOrUpdate(
    id: number,
    customBackground = false,
    fileName?: string
  ): Promise<SettingsEntity> {
    const user = await this.usersRepository.findOne(id);
    let settings = await this.settingsRepository.findOne(id, {
      relations: ['user'],
    });
    if (settings) {
      settings.customBackground = customBackground;
      settings.backgroundName = fileName;
    } else {
      settings = new SettingsEntity();
      settings.customBackground = customBackground;
      settings.user = user;
      settings.backgroundName = fileName;
    }
    await this.settingsRepository.save(settings);
    await this.usersRepository.save({ ...user, settings });

    if (settings.user) {
      delete settings.user.passwordHash;
    }

    return settings;
  }
}
