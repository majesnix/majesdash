import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

const optionalBooleanMapper = new Map([
  ['undefined', undefined],
  ['true', true],
  ['false', false],
]);

export class SystemSettingsUpdateDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => optionalBooleanMapper.get(value))
  weatherWidget: string;
  @ApiProperty()
  weatherWidgetApiKey: string;
  @ApiProperty()
  weatherWidgetTown: string;
}
