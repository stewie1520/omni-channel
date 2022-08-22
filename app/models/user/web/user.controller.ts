import { inject, injectable } from "inversify";
import { AccountService } from "~/core/application/service/account.service";
import { CreateLoginEmailUserInDto } from "~/models/user/web/dtos/create-login-email-user.in.dto";
import { CreateLoginEmailUserOutDto } from "~/models/user/web/dtos/create-login-email-user.out.dto";
import { VerifyLoginByEmailInDto } from "~/models/user/web/dtos/verify-login-by-email.in.dto";
import { VerifyLoginByEmailOutDto } from "~/models/user/web/dtos/verify-login-by-email.out.dto";

@injectable()
export class UserController {
  constructor(@inject(AccountService) private accountService: AccountService) {

  }

  async checkEmailExists(email: string): Promise<boolean> {
    return this.accountService.checkEmailTaken(email);
  }

  async createUserByEmail(dto: CreateLoginEmailUserInDto): Promise<CreateLoginEmailUserOutDto> {
    return this.accountService.createUserByEmail(dto);
  }

  async verifyLoginByEmail(dto: VerifyLoginByEmailInDto): Promise<VerifyLoginByEmailOutDto> {
    const user = await this.accountService.verifyLoginByEmail(dto);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const { password, ...userWithNoPassword } = user;
    return userWithNoPassword;
  }
}
