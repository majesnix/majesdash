import { Settings } from '@majesdash/data';
import { SettingsEntity } from '../settings/settings.entity';

export interface UserData {
  id: number;
  username: string;
  email: string;
  token: string;
  image?: string;
  isAdmin: boolean;
  settings?: SettingsEntity;
}

export interface UserRO {
  user: UserData;
}
