import { IUserResetPassword } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';

export class UserResetPasswordDto implements IUserResetPassword {
  @ApiProperty({ required: true })
  id!: number;
}
