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
}

export interface Authenticate {
  emailOrUsername: string;
  password: string;
}
