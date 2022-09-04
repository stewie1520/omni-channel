export class VerifyLoginByEmailOutDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(param: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    this.id = param.id;
    this.firstName = param.firstName;
    this.lastName = param.lastName;
    this.email = param.email;
  }
}
