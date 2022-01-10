export interface SettingsUpdate {
  background: Blob;
  settings: Partial<UserSettings>;
}

export interface SystemSettingsUpdate {
  background: Blob;
}

export interface SystemSettings {
  background: string;
  initialized?: boolean;
}

export interface UserSettings {
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
  settings?: UserSettings;
}

export interface UserUpdate {
  profilePic?: Blob;
  password?: string;
  passwordRepeat?: string;
}

export interface Authenticate {
  emailOrUsername: string;
  password: string;
}

export interface Tile {
  id: number;
  title: string;
  type: string;
  color: string;
  url: string;
  icon: string;
  tags?: Tag[];
  order: number;
  config: string;
}

export interface CreateTileDto {
  title: string;
  type: string;
  url: string;
  color: string;
  icon?: Blob;
  tags?: Tag[];
  order: number;
  config: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  isAdmin?: boolean;
}
