import { BackendModule } from '@majesdash/backend';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    BackendModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './config/web/images'),
      exclude: ['/api*'],
      serveRoot: '/images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './client'),
    }),
  ],
})
export class AppModule {}
