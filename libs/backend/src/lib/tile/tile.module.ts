import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth.middleware';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { TileController } from './tile.controller';
import { TileEntity } from './tile.entity';
import { TileService } from './tile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TileEntity, UserEntity, TagEntity]),
    UserModule,
  ],
  providers: [TileService],
  controllers: [TileController],
})
export class TileModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'tiles', method: RequestMethod.POST },
        { path: 'tiles', method: RequestMethod.DELETE },
        { path: 'tiles', method: RequestMethod.PUT }
      );
  }
}
