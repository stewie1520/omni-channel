import type { PrismaClient } from "@prisma/client";
import { AccountProvider } from "@prisma/client";
import { inject, injectable } from "inversify";
import { AccountRepository } from "~/core/application/store/account.repository";
import { AccountEntity } from "~/core/domain/entities/account.entity";
import { StudentEntity } from "~/core/domain/entities/student.entity";
import { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";
import { PRISMA_CLIENT } from "~/db.server";

@injectable()
export class PostgresAccountRepository extends AccountRepository {
  constructor(@inject(PRISMA_CLIENT) private prismaClient: PrismaClient) {
    super();
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const count = await this.prismaClient.account.count({ where: { email } });
    return count !== 0;
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

  private toAccountProvider(ap: AccountProviderEnum): AccountProvider {
    if (ap === AccountProviderEnum.Facebook) {
      return AccountProvider.Facebook;
    }

    if (ap === AccountProviderEnum.Google) {
      return AccountProvider.Google;
    }

    return AccountProvider.Mail;
  }

  private toStudent(student: any, account: AccountEntity): StudentEntity {
    return StudentEntity.create(
      {
        account,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        firstName: student.firstName,
        lastName: student.lastName,
        avatarUrl: student.avatarUrl,
      },
      student.id
    );
  }

  private toEntity(acc: any): AccountEntity {
    const account = AccountEntity.create(
      {
        firstName: acc.firstName,
        lastName: acc.lastName,
        email: acc.email!,
        createdAt: acc.createdAt,
        idOnProvider: acc.idOnProvider!,
        password: acc.password!,
        provider: this.toAccountProviderEnum(acc.provider),
        updatedAt: acc.updatedAt,
      },
      acc.id
    );

    if (acc.student) {
      const student = this.toStudent(acc.student, account);
      account.student = student;
    }

    return acc;
  }

  async deleteByEmail(email: string): Promise<AccountEntity> {
    const dbAccount = await this.prismaClient.account.delete({
      where: { email },
    });

    return this.toEntity(dbAccount);
  }

  async getByEmail(email: string): Promise<AccountEntity | null> {
    const dbAccount = await this.prismaClient.account.findUnique({
      where: { email },
      include: {
        student: true,
        teacher: true,
        verification: true,
      },
    });

    if (dbAccount === null) return null;

    return this.toEntity(dbAccount);
  }

  async getById(id: string): Promise<AccountEntity | null> {
    const dbAccount = await this.prismaClient.account.findUnique({
      where: { id },
      include: {
        student: true,
        teacher: true,
        verification: true,
      },
    });

    if (dbAccount === null) return null;

    return this.toEntity(dbAccount);
  }

  async createByEmail(data: {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AccountEntity> {
    const dbAccount = await this.prismaClient.account.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        provider: this.toAccountProvider(AccountProviderEnum.Mail),
        id: data.id,
      },
    });

    return this.toEntity(dbAccount);
  }
}