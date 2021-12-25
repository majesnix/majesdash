import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TileController } from './tile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TileEntity } from './tile.entity';
import { UserEntity } from '../user/user.entity';
import { TileService } from './tile.service';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from '../auth.middleware';
import { TagEntity } from '../tag/tag.entity';

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
      .forRoutes({ path: 'tiles', method: RequestMethod.POST });
  }
}
