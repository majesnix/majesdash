import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthMiddleware } from '../admin-auth.middleware';
import { AuthMiddleware } from '../auth.middleware';
import { SystemSettingsEntity } from '../system-settings/system-settings.entity';
import { SystemSettingsService } from '../system-settings/system-settings.service';
import { UserSettingsEntity } from '../user-settings/user-settings.entity';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserSettingsEntity,
      SystemSettingsEntity,
    ]),
  ],
  providers: [UserService, SystemSettingsService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST }
      );
    consumer.apply(AdminAuthMiddleware).forRoutes(
      { path: 'users', method: RequestMethod.POST },
      {
        path: 'users',
        method: RequestMethod.DELETE,
      },
      { path: 'users', method: RequestMethod.GET }
    );
  }
}
