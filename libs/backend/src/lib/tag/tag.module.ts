import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth.middleware';
import { LoggedInMiddleware } from '../logged-in.middleware';
import { UserModule } from '../user/user.module';
import { TagController } from './tag.controller';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), UserModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [],
})
export class TagModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggedInMiddleware)
      .forRoutes({ path: 'tags', method: RequestMethod.GET });
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'tags', method: RequestMethod.POST },
        { path: 'tags', method: RequestMethod.DELETE },
        { path: 'tags', method: RequestMethod.PUT }
      );
  }
}
