import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '../http/http.module';
import { SystemSettingsEntity } from '../system-settings/system-settings.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  providers: [WeatherService],
  controllers: [WeatherController],
  imports: [HttpModule, TypeOrmModule.forFeature([SystemSettingsEntity])],
})
export class WeatherModule {}
