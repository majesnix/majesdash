import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth.middleware';
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
export class SystemSettingsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'system-settings', method: RequestMethod.POST });
  }
}
