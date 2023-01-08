import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthMiddleware } from '../admin-auth.middleware';
import { AuthMiddleware } from '../auth.middleware';
import { LoggedInMiddleware } from '../logged-in.middleware';
import { SystemSettingsEntity } from '../system-settings/system-settings.entity';
import { SystemSettingsService } from '../system-settings/system-settings.service';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { TileController } from './tile.controller';
import { TileEntity } from './tile.entity';
import { TileService } from './tile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TileEntity,
      UserEntity,
      TagEntity,
      SystemSettingsEntity,
    ]),
    UserModule,
  ],
  providers: [TileService, SystemSettingsService],
  controllers: [TileController],
})
export class TileModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggedInMiddleware)
      .forRoutes({ path: 'tiles', method: RequestMethod.GET });
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'tiles', method: RequestMethod.POST },
        { path: 'tiles', method: RequestMethod.DELETE },
        { path: 'tiles', method: RequestMethod.PUT }
      );
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes({ path: 'tiles/all', method: RequestMethod.GET });
  }
}
