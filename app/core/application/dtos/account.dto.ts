import type { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";

export interface AccountDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  provider: AccountProviderEnum;
  idOnProvider?: string;
  createdAt: Date;
  updatedAt: Date;
}
