import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly username!: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly email!: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly password!: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly passwordRepeat!: string;

  @ApiProperty({ required: false })
  readonly isAdmin?: boolean;
}
