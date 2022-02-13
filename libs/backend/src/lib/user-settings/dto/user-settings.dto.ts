import { IUserSettingsUpdate, TabTarget } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSettingsDto implements IUserSettingsUpdate {
  @ApiProperty({ type: 'file' })
  background?: any;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  tabTarget: TabTarget;
}
