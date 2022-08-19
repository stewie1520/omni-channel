export interface CreateLoginEmailUserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateLoginEmailUserResponseDto {
  id: string;
}
