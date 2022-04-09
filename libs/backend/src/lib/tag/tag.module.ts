import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth.middleware';
import { TileEntity } from '../tile/tile.entity';
import { UserModule } from '../user/user.module';
import { TagController } from './tag.controller';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TileEntity]), UserModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [],
})
export class TagModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'tags', method: RequestMethod.POST },
        { path: 'tags', method: RequestMethod.DELETE },
        { path: 'tags', method: RequestMethod.PUT }
      );
  }
}
