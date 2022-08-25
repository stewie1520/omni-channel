import { inject, injectable } from "inversify";
import * as yup from "yup";

import { AccountService } from "~/core/application/service/account.service";
import { WebController } from "~/libs/web-controller/web-controller";
import { HttpNotFoundResponse } from "~/models/http-response";
import type { CreateLoginEmailAccountInDto } from "./dtos/create-login-email-account.in.dto";
import type { CreateLoginEmailAccountOutDto } from "./dtos/create-login-email-account.out.dto";
import type { VerifyLoginByEmailInDto } from "./dtos/verify-login-by-email.in.dto";
import type { VerifyLoginByEmailOutDto } from "./dtos/verify-login-by-email.out.dto";

@injectable()
export class AccountController extends WebController {
  constructor(@inject(AccountService) private accountService: AccountService) {
    super();
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return this.accountService.checkEmailTaken(email);
  }

  async createByEmail(
    dto: CreateLoginEmailAccountInDto
  ): Promise<CreateLoginEmailAccountOutDto> {
    const validationSchema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    await this.validate(dto, validationSchema);
    return this.accountService.createByEmail(dto);
  }

  async verifyLoginByEmail(
    dto: VerifyLoginByEmailInDto
  ): Promise<VerifyLoginByEmailOutDto> {
    const validationSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
      rememberMe: yup.boolean(),
    });

    await this.validate(dto, validationSchema);

    const account = await this.accountService.verifyByEmail(dto);

    if (!account) {
      throw new HttpNotFoundResponse("Account not found", { email: dto.email });
    }

    return account;
  }
}
