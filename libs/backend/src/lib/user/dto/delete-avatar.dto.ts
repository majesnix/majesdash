import { IUserDeleteAvatar } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteAvatarDto implements IUserDeleteAvatar {
  @ApiProperty({ required: true })
  id!: number;
}
