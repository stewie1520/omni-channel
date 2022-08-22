export class VerifyLoginByEmailInDto {
  email: string;
  password: string;
  rememberMe: boolean;

  constructor(param: {email: string, password: string, rememberMe: boolean}) {
    this.email = param.email;
    this.password = param.password;
    this.rememberMe = param.rememberMe;
  }
}
