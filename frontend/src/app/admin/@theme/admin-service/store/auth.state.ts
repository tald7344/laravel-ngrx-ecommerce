import {User} from '../../../pages/register/model/user';

export interface AuthState {
  user: User;
  error: string;
}

export const initialState: AuthState = {
  user: undefined,
  error: undefined
};
