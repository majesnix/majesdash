import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { Settings } from '@majesdash/data';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async findOne(id: number): Promise<SettingsEntity> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['settings'],
    });

    return user.settings;
  }

  /**
   * Creates or Updates user settings
   * @param id User id
   * @param customBackground has a background been uploaded and should be set
   * @returns User Settings + User Entity
   */
  async createOrUpdate(
    id: number,
    filename?: string,
    userSettings?: Settings
  ): Promise<SettingsEntity> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['settings'],
    });

    user.settings.customBackground = !!filename;
    user.settings.backgroundName = filename;
    user.settings.tabTarget = userSettings.tabTarget;

    await this.usersRepository.save(user);

    return user.settings;
  }
}
