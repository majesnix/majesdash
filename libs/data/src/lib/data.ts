export interface SettingsUpdate {
  background: any;
  settings: Partial<Settings>;
}

export interface Settings {
  customBackground: boolean;
  backgroundName?: string;
  tabTarget: TabTarget;
  user?: User;
}

export enum TabTarget {
  NEW_TAB = 0,
  SAME_TAB,
}

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  image?: string;
  isAdmin: boolean;
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
