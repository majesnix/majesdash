import { IUserUpdateAdmin } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';

export class AdminUpdateUserDto implements IUserUpdateAdmin {
  @ApiProperty({ required: true })
  id!: number;
  @ApiProperty({ required: false })
  username?: string;
  @ApiProperty({ required: false })
  email?: string;
  @ApiProperty({ required: false })
  isAdmin?: boolean;
}
