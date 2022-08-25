import { inject, injectable } from "inversify";
import { PRISMA_CLIENT } from "~/db.server";
import type { Account, PrismaClient, Student } from "@prisma/client";
import { AccountProvider } from "@prisma/client";
import { StudentRepository } from "~/core/application/store/student.repository";
import { StudentEntity } from "~/core/domain/entities/student.entity";
import { AccountEntity } from "~/core/domain/entities/account.entity";
import { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";

@injectable()
export class PostgresStudentRepository extends StudentRepository {
  constructor(@inject(PRISMA_CLIENT) private prismaClient: PrismaClient) {
    super();
  }

  private toAccountProviderEnum(ap: AccountProvider): AccountProviderEnum {
    if (ap === AccountProvider.Facebook) {
      return AccountProviderEnum.Facebook;
    }

    if (ap === AccountProvider.Google) {
      return AccountProviderEnum.Google;
    }

    return AccountProviderEnum.Mail;
  }

  private toAccountEntity(
    dbAccount: Account,
    student?: StudentEntity
  ): AccountEntity {
    return AccountEntity.create(
      {
        email: dbAccount.email,
        firstName: dbAccount.firstName,
        lastName: dbAccount.lastName,
        createdAt: dbAccount.createdAt,
        idOnProvider: dbAccount.idOnProvider,
        password: dbAccount.password,
        provider: this.toAccountProviderEnum(dbAccount.provider),
        updatedAt: dbAccount.updatedAt,
        student,
      },
      dbAccount.id
    );
  }

  private toStudentEntity(
    dbStudent: Student & { account: Account }
  ): StudentEntity {
    const account = this.toAccountEntity(dbStudent.account);
    const student = StudentEntity.create(
      {
        account,
        avatarUrl: dbStudent.avatarUrl || undefined,
        firstName: dbStudent.firstName,
        createdAt: dbStudent.createdAt,
        updatedAt: dbStudent.updatedAt,
        lastName: dbStudent.lastName,
      },
      dbStudent.id
    );

    account.student = student;

    return student;
  }

  async findById(id: string): Promise<StudentEntity | null> {
    const dbStudent = await this.prismaClient.student.findUnique({
      where: { id },
      include: { account: true },
    });

    if (!dbStudent) return null;
    return this.toStudentEntity(dbStudent);
  }

  async findByAccountId(accountId: string): Promise<StudentEntity | null> {
    const dbStudent = await this.prismaClient.student.findUnique({
      where: { accountId },
      include: {
        account: true,
      },
    });

    if (!dbStudent) return null;
    return this.toStudentEntity(dbStudent);
  }

  async createNewStudentWithAccount(
    student: { firstName: string; lastName: string; avatarUrl?: string },
    account: AccountEntity
  ): Promise<StudentEntity> {
    const dbStudent = await this.prismaClient.student.create({
      data: {
        firstName: student.firstName,
        lastName: student.lastName,
        avatarUrl: student.avatarUrl,
        accountId: account.id.toString(),
      },
      include: {
        account: true,
      },
    });

    return this.toStudentEntity(dbStudent);
  }
}
