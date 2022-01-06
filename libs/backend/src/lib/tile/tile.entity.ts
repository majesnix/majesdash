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
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  color?: string;

  @Column()
  icon!: string;

  @Column()
  @IsUrl()
  url!: string;

  @Column({ default: 0 })
  order?: number;

  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable()
  tags!: TagEntity[];

  @Column()
  config!: string;
}
