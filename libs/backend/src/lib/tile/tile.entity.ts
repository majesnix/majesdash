import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from '../tag/tag.entity';

@Entity('tile')
export class TileEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  title!: string;

  @Column({ nullable: true })
  @ApiProperty()
  type?: string;

  @Column({ nullable: true })
  @ApiProperty()
  color?: string;

  @Column({ nullable: true })
  @ApiProperty()
  icon?: string;

  @Column()
  @IsUrl()
  @ApiProperty()
  url!: string;

  @Column({ default: 0 })
  @ApiProperty()
  order?: number;

  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable()
  @ApiProperty()
  tags!: TagEntity[];

  @Column()
  @ApiProperty()
  config!: string;
}
