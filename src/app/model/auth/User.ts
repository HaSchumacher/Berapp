import { User as FireBaseUser } from '@firebase/auth-types';

export interface User extends FireBaseUser {
  data: UserData;
}

export interface UserData {
  superadmin: boolean;
  name: string;
  permissions: Permissions;
}

export type Permissions = Record<string, string>;
