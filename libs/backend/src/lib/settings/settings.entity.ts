import { TabTarget } from '@majesdash/data';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
