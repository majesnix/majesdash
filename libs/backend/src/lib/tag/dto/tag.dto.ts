import { ITag } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TagDto implements Omit<ITag, 'id'> {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: string;

  @ApiProperty()
  readonly hidden?: boolean;

  @ApiProperty({ required: false })
  readonly color?: string;

  @ApiProperty({ type: 'file', required: false })
  readonly icon?: any;

  @ApiProperty({ required: false })
  readonly order?: number;
}
