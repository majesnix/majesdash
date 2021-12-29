import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth.middleware';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsEntity } from './user-settings.entity';
import { UserSettingsService } from './user-settings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSettingsEntity, UserEntity]),
    UserModule,
  ],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
  exports: [UserSettingsService],
})
export class SettingsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserSettingsController);
  }
}
