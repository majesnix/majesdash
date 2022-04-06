import { ITag } from '@majesdash/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTagDto implements Omit<ITag, 'id'> {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly color: string;

  @ApiProperty({ type: 'file', required: false })
  readonly icon?: any;
}
