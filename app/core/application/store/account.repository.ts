import type { AccountEntity } from "~/core/domain/entities/account.entity";
import { injectable } from "inversify";

export interface GetAccountOptions {
  withStudent: boolean;
}

@injectable()
export abstract class AccountRepository {
  abstract isEmailTaken(email: string): Promise<boolean>;
  abstract getById(
    id: string,
    options?: GetAccountOptions
  ): Promise<AccountEntity | null>;
  abstract getByEmail(
    email: string,
    options?: GetAccountOptions
  ): Promise<AccountEntity | null>;
  abstract deleteByEmail(email: string): Promise<AccountEntity>;
  abstract createByEmail(data: {
    id?: string;
    email: string;
    password: string;
  }): Promise<AccountEntity>;
}
