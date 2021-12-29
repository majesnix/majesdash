import { UserSettingsEntity } from '../user-settings/user-settings.entity';

export interface UserData {
  id: number;
  username: string;
  email: string;
  token: string;
  image?: string;
  isAdmin: boolean;
  settings?: UserSettingsEntity;
}

export interface UserRO {
  user: UserData;
}
