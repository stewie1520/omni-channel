import type { CreateLoginEmailAccountRequestDto } from "./create-login-email-account.dto";

export interface CreateLoginEmailStudentRequestDto
  extends CreateLoginEmailAccountRequestDto {
  avatarUrl?: string;
}

export interface CreateLoginEmailStudentResponseDto {
  id: string;
}
