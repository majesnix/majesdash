import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTileDto {
  @IsNotEmpty()
  readonly applicationName!: string;

  @IsNotEmpty()
  readonly applicationType!: string;

  @IsUrl()
  readonly url!: string;

  readonly tags!: string[];
  readonly config?: string;
  readonly type?: string;
  readonly color?: string;
  readonly icon?: string;
}
