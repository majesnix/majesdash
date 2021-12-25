import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TagEntity } from '../tag/tag.entity';

@Entity('tile')
export class TileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  applicationName!: string;

  @Column()
  applicationType!: string;

  @Column()
  colour!: string;

  @Column()
  url!: string;

  @Column()
  icon!: string;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags!: TagEntity[];
}
