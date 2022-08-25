export interface CreateLoginEmailAccountRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateLoginEmailAccountResponseDto {
  id: string;
}
