import type { PrismaClient } from "@prisma/client";
import { AccountProvider } from "@prisma/client";
import { inject, injectable } from "inversify";
import { AccountRepository } from "~/core/application/store/account.repository";
import { AccountEntity } from "~/core/domain/entities/account.entity";
import { StudentEntity } from "~/core/domain/entities/student.entity";
import { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";
import { PRISMA_CLIENT } from "~/db.server";
import { getAccountOTPRepository } from "./redis-entities/account-otp";

@injectable()
export class PostgresAccountRepository extends AccountRepository {
  async generateOTP(
    account: AccountEntity,
    provider: { name: "email" | "phone"; id: string },
    otpHashed: string,
    ttl?: number
  ): Promise<{ otpId: string; expiredAt: Date; provider: string }> {
    ttl = ttl || 300;
    const repository = await getAccountOTPRepository();
    const existed = await repository
      .search()
      .where("accountId")
      .equals(account.id.toString())
      .and("provider")
      .equals(provider.name)
      .and("providerId")
      .equals(provider.id)
      .returnFirst();

    if (existed) {
      return {
        otpId: existed.entityId,
        expiredAt: new Date(existed.toJSON().issueDate.getTime() + ttl * 1000),
        provider: existed.toJSON().provider,
      };
    }

    const entity = await repository.createAndSave({
      accountId: account.id.toString(),
      otpHashed,
      issueDate: new Date(),
      provider: provider.name,
      providerId: provider.id,
    });

    if (ttl !== undefined) {
      await repository.expire(entity.entityId, ttl);
    }

    const raw = entity.toJSON();

    return {
      otpId: entity.entityId,
      expiredAt: new Date(raw.issueDate.getTime() + ttl * 1000),
      provider: raw.provider,
    };
  }

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
