import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: false })
  readonly email?: string;
  @ApiProperty({ required: false })
  readonly username?: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly password!: string;
}
