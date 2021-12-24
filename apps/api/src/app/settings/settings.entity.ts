import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

enum TabTarget {
  NEW_TAB = 0,
  SAME_TAB,
}

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

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;
}
