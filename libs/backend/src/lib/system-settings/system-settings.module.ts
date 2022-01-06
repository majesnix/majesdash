import {
  MiddlewareConsumer,
  Module,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminAuthMiddleware } from '../admin-auth.middleware';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { SystemSettingsController } from './system-settings.controller';
import { SystemSettingsEntity } from './system-settings.entity';
import { SystemSettingsService } from './system-settings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemSettingsEntity, UserEntity]),
    UserModule,
  ],
  providers: [SystemSettingsService],
  controllers: [SystemSettingsController],
  exports: [SystemSettingsService],
})
export class SystemSettingsModule implements OnModuleInit {
  constructor(
    @InjectRepository(SystemSettingsEntity)
    private readonly systemSettingsRepository: Repository<SystemSettingsEntity>
  ) {}
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes({ path: 'system-settings', method: RequestMethod.POST });
  }

  // init db with systemsettings
  async onModuleInit() {
    if (!(await this.systemSettingsRepository.find()).length) {
      const systemSettings = new SystemSettingsEntity();
      systemSettings.id = 1;
      this.systemSettingsRepository.save(systemSettings);
    }
  }
}
