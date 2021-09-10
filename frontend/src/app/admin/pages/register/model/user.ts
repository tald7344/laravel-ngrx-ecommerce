export class User {
  constructor(private email: string,
              public accessToken: string,
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
