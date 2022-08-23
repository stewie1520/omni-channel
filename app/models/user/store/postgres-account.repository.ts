import type { GetAccountOptions } from "~/core/application/store/account.repository";
import { AccountRepository } from "~/core/application/store/account.repository";
import { inject, injectable } from "inversify";
import { PRISMA_CLIENT } from "~/db.server";
import type { PrismaClient } from "@prisma/client";
import { AccountProvider } from "@prisma/client";
import { AccountEntity } from "~/core/domain/entities/account.entity";
import { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";

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

  private toEntity(acc: any): AccountEntity {
    return AccountEntity.create(
      {
        email: acc.email!,
        createdAt: acc.createdAt,
        idOnProvider: acc.idOnProvider!,
        password: acc.password!,
        provider: this.toAccountProviderEnum(acc.provider),
        updatedAt: acc.updatedAt,
        student: acc.student || undefined,
      },
      acc.id
    );
  }

  async deleteByEmail(email: string): Promise<AccountEntity> {
    const dbAccount = await this.prismaClient.account.delete({
      where: { email },
    });

    return this.toEntity(dbAccount);
  }

  async getByEmail(
    email: string,
    options?: GetAccountOptions
  ): Promise<AccountEntity | null> {
    const dbAccount = await this.prismaClient.account.findUnique({
      where: { email },
      include: {
        student: options?.withStudent,
      },
    });

    if (dbAccount === null) return null;

    return this.toEntity(dbAccount);
  }

  async getById(
    id: string,
    options?: GetAccountOptions
  ): Promise<AccountEntity | null> {
    const dbAccount = await this.prismaClient.account.findUnique({
      where: { id },
      include: {
        student: options?.withStudent,
      },
    });

    if (dbAccount === null) return null;

    return this.toEntity(dbAccount);
  }

  async createByEmail(data: {
    id?: string;
    email: string;
    password: string;
  }): Promise<AccountEntity> {
    const dbAccount = await this.prismaClient.account.create({
      data: {
        email: data.email,
        password: data.password,
        provider: this.toAccountProvider(AccountProviderEnum.Mail),
        id: data.id,
      },
    });

    return this.toEntity(dbAccount);
  }
}
