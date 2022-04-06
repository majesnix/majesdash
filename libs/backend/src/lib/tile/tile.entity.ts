import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => TagEntity, (tag) => tag.tiles)
  @JoinColumn({ name: 'tagId' })
  @Exclude()
  tag?: TagEntity;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  tagId?: number;

  @Column()
  @ApiProperty()
  config!: string;

  @CreateDateColumn({ name: 'created_at', select: false, update: false })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at!: Date;
}
