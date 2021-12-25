import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsEntity } from './settings/settings.entity';
import { SettingsModule } from './settings/settings.module';
import { TagEntity } from './tag/tag.entity';
import { TagModule } from './tag/tag.module';
import { TileEntity } from './tile/tile.entity';
import { TileModule } from './tile/tile.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

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
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendModule {}
