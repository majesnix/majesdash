import { ITag } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty } from 'class-validator';

export class TagDto implements Omit<ITag, 'id'> {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: string;

  @IsBooleanString()
  @ApiProperty()
  hidden?: string;

  @ApiProperty({ required: false })
  readonly color?: string;

  @ApiProperty({ type: 'file', required: false })
  readonly icon?: any;

  @ApiProperty({ required: false })
  readonly order?: number;
}
