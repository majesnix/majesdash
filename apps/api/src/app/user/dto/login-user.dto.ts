import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  readonly email?: string;
  readonly username?: string;

  @IsNotEmpty()
  readonly password!: string;
}
