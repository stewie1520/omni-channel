export interface CreateLoginEmailStudentRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface CreateLoginEmailStudentResponseDto {
  id: string;
}
