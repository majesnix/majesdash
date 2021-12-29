import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { SettingsEntity } from '../settings/settings.entity';

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

  @OneToOne(() => SettingsEntity, {
    cascade: true,
  })
  @JoinColumn()
  settings: SettingsEntity;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
}
