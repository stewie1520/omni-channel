import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import joi from "joi";

import { prisma } from "~/db.server";
import type { CreateLoginEmailUserDto } from "./dtos/create-login-email-user.dto";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export const createLoginEmailUser: {
  (requestPayload: CreateLoginEmailUserDto): Promise<User>;
  validate: (t: any) => {
    value?: CreateLoginEmailUserDto;
    error?: { [key in keyof CreateLoginEmailUserDto]: string };
  };
} = async (dto: CreateLoginEmailUserDto) => {
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  return prisma.user.create({
    data: {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: hashedPassword,
    },
  });
};

createLoginEmailUser.validate = (t) => {
  const schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(6).alphanum(),
  });

  const validationResult = schema.validate(t);

  const error = validationResult.error?.details.reduce((carry, detail) => {
    carry![detail.path[0] as keyof CreateLoginEmailUserDto] = detail.message;
    return carry;
  }, {} as ReturnType<typeof createLoginEmailUser.validate>["error"]);

  return { value: validationResult.value, error };
};

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
