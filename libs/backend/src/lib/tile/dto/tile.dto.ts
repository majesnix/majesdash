import { ITile } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class TileDto implements Omit<ITile, 'id'> {
  @IsNotEmpty()
  @ApiProperty()
  readonly title!: string;
  @IsNotEmpty()
  @ApiProperty()
  readonly type!: string;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly url!: string;
  @ApiProperty({ required: false })
  readonly tag?: string;
  @ApiProperty({ required: false })
  readonly tagId?: string;
  @ApiProperty({ required: false })
  readonly config?: string;
  @ApiProperty({ required: false })
  readonly color?: string;
  @ApiProperty({ required: false })
  readonly order?: number;
  @ApiProperty({ type: 'file', required: false })
  readonly icon?: any;
}
