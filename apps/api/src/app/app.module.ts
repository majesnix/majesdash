import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BackendModule } from '@majesdash/backend';

@Module({
  imports: [
    BackendModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'config/images'),
      exclude: ['/api*'],
    }),
  ],
})
export class AppModule {}
