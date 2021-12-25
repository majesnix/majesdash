import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsEntity } from './settings.entity';
import { SettingsService } from './settings.service';
import { AuthMiddleware } from '../auth.middleware';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity, UserEntity]), UserModule],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SettingsController);
  }
}
