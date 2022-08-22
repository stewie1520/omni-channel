export class CreateLoginEmailUserInDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(param: {firstName: string, lastName: string, email: string, password: string}) {
    this.firstName = param.firstName;
    this.lastName = param.lastName;
    this.email = param.email;
    this.password = param.password;
  }
}
