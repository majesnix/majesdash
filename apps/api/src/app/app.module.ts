import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TagEntity } from './tag/tag.entity';
import { TagModule } from './tag/tag.module';
import { TileEntity } from './tile/tile.entity';
import { TileModule } from './tile/tile.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { SettingsEntity } from './settings/settings.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './config/db.sql',
      entities: [TileEntity, UserEntity, TagEntity, SettingsEntity],
      synchronize: true,
    }),
    TileModule,
    TagModule,
    UserModule,
    SettingsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'config/images'),
    }),
  ],
})
export class AppModule {}
