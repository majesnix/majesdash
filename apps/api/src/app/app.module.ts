import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {
  BackendModule,
} from '@majesdash/backend';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BackendModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'config/images'),
      exclude: ['/api*'],
    }),
  ],
})
export class AppModule {}
