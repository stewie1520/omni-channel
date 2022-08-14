import type { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import bcrypt from "bcryptjs";
import joi from "joi";
import { prisma } from "~/db.server";

import type { CreateLoginEmailUserDto } from "./dtos/create-login-email-user.dto";

export const createLoginEmailUser: {
  (requestPayload: CreateLoginEmailUserDto): Promise<User>;
  validate: (t: any) => {
    value?: CreateLoginEmailUserDto;
    error?: { [key in keyof CreateLoginEmailUserDto]: string };
  };
} = async (dto: CreateLoginEmailUserDto) => {
  try {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return await prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code == "P2002") {
      throw { email: "User already exists" };
    }

    throw { error: "Unknown error" };
  }
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
