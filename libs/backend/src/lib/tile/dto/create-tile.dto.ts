import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTileDto {
  @IsNotEmpty()
  readonly applicationName!: string;

  @IsNotEmpty()
  readonly applicationType!: string;

  @IsUrl()
  readonly url!: string;

  readonly colour!: string;
  readonly icon!: string;
  readonly tags!: string[];
}
