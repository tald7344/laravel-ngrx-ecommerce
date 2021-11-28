import {UserAuth} from './user-auth';

export interface TokenRespones {
    access_token: string;
    expires_in: number;
    token_type: string;
    me: UserAuth;
}
