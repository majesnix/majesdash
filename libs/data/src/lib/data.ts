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
  background?: any;
  weatherWidget: boolean;
  weatherWidgetApiKey?: string;
  weatherWidgetTown?: string;
}

export interface ISystemSettings {
  background: string;
  initialized: boolean;
  weatherWidget: boolean;
  weatherWidgetApiKey?: string;
  weatherWidgetTown?: string;
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
  tag?: string;
  tagId?: string;
  order?: number;
  config?: string;
}

export interface ITag {
  id: number;
  name: string;
  color?: string;
  icon?: string;
  order?: number;
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
  username: string | null | undefined;
  email: string | null | undefined;
  isAdmin: boolean | null | undefined;
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

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OpenWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IGetTileParams {
  admin?: boolean;
  tag?: number | string;
}
