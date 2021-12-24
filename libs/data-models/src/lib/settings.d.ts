import { TabTarget, User } from '..';

export interface SettingsUpdate {
  file: any;
}

export interface Settings {
  customBackground: boolean;
  backgroundName: string;
  tabTarget: TabTarget;
  user: User;
}
