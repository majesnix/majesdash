import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTileDto {
  @IsNotEmpty()
  readonly title!: string;

  @IsNotEmpty()
  readonly type!: string;

  @IsUrl()
  readonly url!: string;

  readonly icon?: Blob;
  readonly tags!: string[];
  readonly config?: string;
  readonly color?: string;
  readonly order?: string;
}
