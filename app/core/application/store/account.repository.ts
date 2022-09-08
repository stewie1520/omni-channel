import type { AccountEntity } from "~/core/domain/entities/account.entity";
import { injectable } from "inversify";

@injectable()
export abstract class AccountRepository {
  abstract isEmailTaken(email: string): Promise<boolean>;
  abstract getById(id: string): Promise<AccountEntity | null>;
  abstract getByEmail(email: string): Promise<AccountEntity | null>;
  abstract deleteByEmail(email: string): Promise<AccountEntity>;
  abstract generateOTP(
    account: AccountEntity,
    otpHashed: string,
    ttl?: number
  ): Promise<{ otpId: string; expiredAt: Date }>;
  abstract createByEmail(data: {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AccountEntity>;
}
