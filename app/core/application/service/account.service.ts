import { inject, injectable } from "inversify";
import invariant from "tiny-invariant";
import type {
  CreateLoginEmailStudentRequestDto,
  CreateLoginEmailStudentResponseDto,
} from "~/core/application/dtos/create-login-email-student.dto";
import type { HashService } from "~/core/application/service/hash.service";
import { HASH_SERVICE } from "~/core/application/service/hash.service";
import { AccountRepository } from "~/core/application/store/account.repository";
import { UniqueIdentifier } from "~/core/domain/entities/unique-identifier";
import { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";
import type { AccountDto } from "../dtos/account.dto";
import type {
  CreateLoginEmailAccountRequestDto,
  CreateLoginEmailAccountResponseDto,
} from "../dtos/create-login-email-account.dto";
import type {
  VerifyLoginEmailAccountRequestDto,
  VerifyLoginEmailAccountResponseDto,
} from "../dtos/verify-login-email-account.dto";
import { StudentRepository } from "../store/student.repository";

@injectable()
export class AccountService {
  constructor(
    @inject(AccountRepository) private accountRepository: AccountRepository,
    @inject(StudentRepository) private studentRepository: StudentRepository,
    @inject(HASH_SERVICE) private hashService: HashService
  ) {}

  async checkEmailTaken(email: string): Promise<boolean> {
    return this.accountRepository.isEmailTaken(email);
  }

  async findById(id: string): Promise<AccountDto | null> {
    const account = await this.accountRepository.getById(id);
    if (!account) return null;

    return {
      createdAt: account.createdAt,
      email: account.email,
      id: account.id.toString(),
      provider: account.provider,
      updatedAt: account.updatedAt,
      idOnProvider: account.idOnProvider ?? undefined,
      firstName: account.firstName,
      lastName: account.lastName,
    };
  }

  async createByEmail(
    dto: CreateLoginEmailAccountRequestDto
  ): Promise<CreateLoginEmailAccountResponseDto> {
    const hashedPassword = await this.hashService.hash(dto.password);

    const account = await this.accountRepository.createByEmail({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      id: new UniqueIdentifier().toString(),
    });

    return {
      id: account.id.toString(),
    };
  }

  async verifyByEmail(
    request: VerifyLoginEmailAccountRequestDto
  ): Promise<VerifyLoginEmailAccountResponseDto | null> {
    const account = await this.accountRepository.getByEmail(request.email);

    if (!account || !account.password) {
      return null;
    }

    const isValid = await this.hashService.compare(
      request.password,
      account.password
    );

    if (!isValid) {
      return null;
    }

    return {
      id: account.id.toString(),
      createdAt: account.createdAt,
      email: account.email,
      updatedAt: account.updatedAt,
      firstName: account.firstName,
      lastName: account.lastName,
    };
  }

  async createStudentByEmail(
    dto: CreateLoginEmailStudentRequestDto
  ): Promise<CreateLoginEmailStudentResponseDto> {
    const hashedPassword = await this.hashService.hash(dto.password);

    const account = await this.accountRepository.createByEmail({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      id: new UniqueIdentifier().toString(),
    });

    const student = await this.studentRepository.createNewStudentWithAccount(
      {
        firstName: dto.firstName,
        avatarUrl: dto.avatarUrl,
        lastName: dto.lastName,
      },
      account
    );

    return {
      id: student.id.toString(),
    };
  }

  async sendOTP(id: string): Promise<{ otpId: string; expiredAt: Date }> {
    const account = await this.accountRepository.getById(id);
    if (!account) throw new Error("Account not found");
    if (account.provider !== AccountProviderEnum.Mail)
      throw new Error("Invalid provider");

    const otp = Math.floor(Math.random() * 9000 + 1000).toString();
    console.log("OTP: ", otp);
    const otpHashed = await this.hashService.hash(otp);

    invariant(process.env.OTP_TTL, "OTP_TTL is not defined");

    const otpResult = await this.accountRepository.generateOTP(
      account,
      { name: "email", id: account.email },
      otpHashed,
      parseInt(process.env.OTP_TTL)
    );

    return otpResult;
  }
}
