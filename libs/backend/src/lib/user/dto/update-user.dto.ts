import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  readonly password?: string;
  @ApiProperty({ required: false })
  readonly passwordRepeat?: string;
  @ApiProperty({ required: false })
  readonly image?: string;
}
