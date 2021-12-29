import { TabTarget } from '@majesdash/data';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  customBackground!: boolean;

  @Column({ nullable: true })
  backgroundName!: string;

  @Column({
    type: 'simple-enum',
    enum: TabTarget,
    default: TabTarget.NEW_TAB,
  })
  tabTarget!: TabTarget;
}
