export interface StudentDto {
  id: string;
  account: {
    id: string;
    email: string;
  };
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
