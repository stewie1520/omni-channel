import type { StudentDto } from "./student.dto";
import type { AccountProviderEnum } from "~/core/domain/enums/account-provider.enum";

export interface VerifyLoginEmailStudentRequestDto {
  email: string;
  password: string;
}

export interface VerifyLoginEmailStudentResponseDto {
  id: string;
  email: string;
  provider: AccountProviderEnum;
  idOnProvider?: string;
  createdAt: Date;
  updatedAt: Date;
  student: Omit<StudentDto, "account">;
}
