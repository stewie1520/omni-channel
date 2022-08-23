import { inject, injectable } from "inversify";
import { AccountService } from "~/core/application/service/account.service";
import type { CreateLoginEmailStudentInDto } from "~/models/user/web/dtos/create-login-email-student.in.dto";
import type { CreateLoginEmailStudentOutDto } from "~/models/user/web/dtos/create-login-email-user.out.dto";
import type { VerifyLoginByEmailInDto } from "~/models/user/web/dtos/verify-login-by-email.in.dto";
import type { VerifyLoginByEmailOutDto } from "~/models/user/web/dtos/verify-login-by-email.out.dto";
import { HttpNotFoundResponse } from "~/models/http-response";
import * as yup from "yup";
import { WebController } from "~/libs/web-controller/web-controller";

@injectable()
export class StudentController extends WebController {
  constructor(@inject(AccountService) private accountService: AccountService) {
    super();
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return this.accountService.checkEmailTaken(email);
  }

  async createByEmail(
    dto: CreateLoginEmailStudentInDto
  ): Promise<CreateLoginEmailStudentOutDto> {
    const validationSchema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    await this.validate(dto, validationSchema);
    return this.accountService.createStudentByEmail(dto);
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

    const accountStudent = await this.accountService.verifyStudentByEmail(dto);
    if (!accountStudent) {
      throw new HttpNotFoundResponse("Student not found", { email: dto.email });
    }

    return {
      id: accountStudent.student.id.toString(),
      email: accountStudent.email,
      firstName: accountStudent.student.firstName,
      lastName: accountStudent.student.lastName,
    };
  }
}
