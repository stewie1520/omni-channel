export interface VerifyLoginEmailAccountRequestDto {
  email: string;
  password: string;
}

export interface VerifyLoginEmailAccountResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
