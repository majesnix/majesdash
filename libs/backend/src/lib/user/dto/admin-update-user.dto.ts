import { IUserUpdateAdmin } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';

export class AdminUpdateUserDto implements IUserUpdateAdmin {
  @ApiProperty({ required: true })
  id!: number;
  @ApiProperty({ required: false })
  username: string | null | undefined;
  @ApiProperty({ required: false })
  email: string | null | undefined;
  @ApiProperty({ required: false })
  isAdmin: boolean | null | undefined;
}
