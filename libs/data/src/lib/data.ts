export interface SettingsUpdate {
  background: any;
  settings: Partial<Settings>;
}

export interface SystemSettingsUpdate {
  background: any;
}

export interface SystemSettings {
  background: any;
}

export interface Settings {
  customBackground: boolean;
  backgroundName?: string;
  tabTarget: TabTarget;
  user?: User;
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
}

export interface UserUpdate {
  profilepic?: any;
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
  colour: string;
  url: string;
  icon: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}
