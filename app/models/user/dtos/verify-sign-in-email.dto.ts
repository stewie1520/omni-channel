export interface VerifySignInEmailRequestDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface VerifySignInEmailResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
