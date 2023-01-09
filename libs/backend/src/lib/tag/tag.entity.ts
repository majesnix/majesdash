import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TileEntity } from '../tile/tile.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @ApiProperty()
  name!: string;

  @Column({ default: false })
  @ApiProperty()
  hidden?: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  color?: string;

  @Column({ nullable: true })
  @ApiProperty()
  icon?: string;

  @Column({ default: 0 })
  @ApiProperty()
  order?: number;

  @OneToMany(() => TileEntity, (tile) => tile.tag)
  tiles: TileEntity[];

  @CreateDateColumn({ name: 'created_at', select: false, update: false })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at!: Date;
}
