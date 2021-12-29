import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSettingsEntity } from '../user-settings/user-settings.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: null })
  image: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => UserSettingsEntity, {
    cascade: true,
  })
  @JoinColumn()
  settings: UserSettingsEntity;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
}
