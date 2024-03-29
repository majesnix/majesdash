import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSettingsEntity } from './system-settings/system-settings.entity';
import { SystemSettingsModule } from './system-settings/system-settings.module';
import { TagEntity } from './tag/tag.entity';
import { TagModule } from './tag/tag.module';
import { TileEntity } from './tile/tile.entity';
import { TileModule } from './tile/tile.module';
import { UserSettingsEntity } from './user-settings/user-settings.entity';
import { SettingsModule } from './user-settings/user-settings.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.CI ? ':memory:' : './config/db.sql',
      entities: [
        SystemSettingsEntity,
        TagEntity,
        TileEntity,
        UserEntity,
        UserSettingsEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
      logging: ['error'],
      maxQueryExecutionTime: 500,
    }),
    TagModule,
    TileModule,
    UserModule,
    SettingsModule,
    SystemSettingsModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendModule {}
