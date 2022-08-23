import type { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";

export interface AccountDto {
  id: string;
  email: string;
  password?: string;
  provider: AccountProviderEnum;
  idOnProvider?: string;
  createdAt: Date;
  updatedAt: Date;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
}
