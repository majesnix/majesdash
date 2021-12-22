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

  @Column()
  backgroundImage!: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;
}
