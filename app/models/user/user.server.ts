import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) return null;

  return new ComputedUser(user);
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user === null) return null;

  return new ComputedUser(user);
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyEmailLogin(email: User["email"], password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export class ComputedUser implements User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.password = user.password;
  }

  get fullName(): string {
    return [this.firstName, this.lastName].map((name) => name.trim()).join(" ");
  }
}
