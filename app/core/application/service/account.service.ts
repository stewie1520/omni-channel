import { inject, injectable } from "inversify";
import type {
  CreateLoginEmailStudentRequestDto,
  CreateLoginEmailStudentResponseDto,
} from "~/core/application/dtos/create-login-email-student.dto";
import type { HashService } from "~/core/application/service/hash.service";
import { HASH_SERVICE } from "~/core/application/service/hash.service";
import { AccountRepository } from "~/core/application/store/account.repository";
import { UniqueIdentifier } from "~/core/domain/entities/unique-identifier";
import type {
  VerifyLoginEmailStudentRequestDto,
  VerifyLoginEmailStudentResponseDto,
} from "../dtos/verify-login-email-student.dto";
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

  async createStudentByEmail(
    dto: CreateLoginEmailStudentRequestDto
  ): Promise<CreateLoginEmailStudentResponseDto> {
    const hashedPassword = await this.hashService.hash(dto.password);

    const account = await this.accountRepository.createByEmail({
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

  async verifyStudentByEmail(
    request: VerifyLoginEmailStudentRequestDto
  ): Promise<VerifyLoginEmailStudentResponseDto | null> {
    const accountStudent = await this.accountRepository.getByEmail(
      request.email,
      {
        withStudent: true,
      }
    );

    if (
      !accountStudent ||
      !accountStudent.password ||
      !accountStudent.student
    ) {
      return null;
    }

    const isValid = await this.hashService.compare(
      request.password,
      accountStudent.password
    );

    if (!isValid) {
      return null;
    }

    return {
      id: accountStudent.id.toString(),
      createdAt: accountStudent.createdAt,
      email: accountStudent.email,
      provider: accountStudent.provider,
      updatedAt: accountStudent.updatedAt,
      idOnProvider: accountStudent.idOnProvider || undefined,
      student: {
        id: accountStudent.student.id.toString(),
        firstName: accountStudent.student.firstName,
        lastName: accountStudent.student.lastName,
        createdAt: accountStudent.student.createdAt,
        updatedAt: accountStudent.student.updatedAt,
        avatarUrl: accountStudent.student.avatarUrl,
      },
    };
  }
}
