import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UserSettingsDto } from './dto';
import { UserSettingsEntity } from './user-settings.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async findOne(id: number): Promise<UserSettingsEntity> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['settings'],
    });

    return user.settings;
  }

  async createOrUpdate(
    id: number,
    userSettings?: UserSettingsDto,
    filename?: string
  ): Promise<UserSettingsEntity> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['settings'],
    });

    user.settings.backgroundName = filename;
    user.settings.tabTarget = userSettings.tabTarget;

    await this.usersRepository.save(user);

    return user.settings;
  }
}
