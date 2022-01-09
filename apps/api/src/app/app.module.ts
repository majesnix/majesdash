import { BackendModule } from '@majesdash/backend';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    BackendModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './client'),
      exclude: ['/api*'],
    }),
  ],
})
export class AppModule {}
