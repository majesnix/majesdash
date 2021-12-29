export interface SettingsUpdate {
  background: Blob;
  settings: Partial<Settings>;
}

export interface SystemSettingsUpdate {
  background: Blob;
}

export interface SystemSettings {
  background: string;
}

export interface Settings {
  customBackground: boolean;
  backgroundName?: string;
  tabTarget: TabTarget;
}

export enum TabTarget {
  NEW_TAB = '_blank',
  SAME_TAB = '_self',
}

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  image?: string;
  isAdmin: boolean;
  settings?: Settings;
}

export interface UserUpdate {
  profilepic?: Blob;
  password?: string;
  passwordRepeat?: string;
}

export interface Authenticate {
  emailOrUsername: string;
  password: string;
}

export interface Tile {
  id: number;
  applicationName: string;
  applicationType: string;
  color: string;
  url: string;
  icon: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}
