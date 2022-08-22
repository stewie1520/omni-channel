import type { User } from "@prisma/client";

export class UserEntity {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}
