import { TabTarget } from '@majesdash/data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-settings')
export class UserSettingsEntity {
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
