import {UserAuth} from './user-auth';

export class User {

  constructor(private email: string,
              public accessToken: string,
              public authUser: UserAuth,
              private expiresIn: number,
              private tokenType: string) {
              }

  // Get ExpiresIn
  get getExpireIn() {
    return this.expiresIn;
  }

  // get token
  get getToken() {
    return this.accessToken;
  }
}
