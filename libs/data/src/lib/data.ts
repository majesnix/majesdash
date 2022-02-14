export enum TabTarget {
  NEW_TAB = '_blank',
  SAME_TAB = '_self',
}

export interface IUserSettings {
  background?: string;
  tabTarget: TabTarget;
}

export interface IUserSettingsUpdate extends IUserSettings {
  background?: any;
}

export interface ISystemSettingsUpdate {
  background: Blob;
}

export interface ISystemSettings {
  background: string;
  initialized: boolean;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  settings?: IUserSettings;
}

export interface IUserWithToken extends IUser {
  token: string;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  avatar?: Blob;
  password?: string;
  passwordRepeat?: string;
  isAdmin?: boolean;
}

export interface IAuthenticate {
  emailOrUsername: string;
  password: string;
}

export interface ITile {
  id: number;
  title: string;
  url: string;
  type?: string;
  color?: string;
  icon?: string;
  tags?: ITag[];
  order?: number;
  config?: string;
}

export interface ITag {
  id: string;
  name: string;
}

export interface ICreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  isAdmin?: boolean;
}

export interface IUserUpdateAdmin {
  id: number;
  username?: string;
  email?: string;
  isAdmin?: boolean;
}

export interface IUserResetPasswordAdmin {
  id: number;
}

export interface IUserResetPasswordAdminResponse {
  password: string;
}

export interface IUserDeleteAdmin {
  id: number;
}

export interface IUserDeleteAvatarAdmin {
  id: number;
}
