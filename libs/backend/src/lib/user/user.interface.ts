export interface UserData {
  id: number;
  username: string;
  email: string;
  token: string;
  image?: string;
  isAdmin: boolean;
}

export interface UserRO {
  user: UserData;
}
