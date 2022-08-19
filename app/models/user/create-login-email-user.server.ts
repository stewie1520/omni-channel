import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import bcrypt from "bcryptjs";
import { prisma } from "~/db.server";
import type { ControllerFunction } from "~/libs/types/controller";
import * as yup from "yup";

import type {
  CreateLoginEmailUserRequestDto,
  CreateLoginEmailUserResponseDto,
} from "./dtos/create-login-email-user.dto";

export const createLoginEmailUser: ControllerFunction<
  CreateLoginEmailUserRequestDto,
  CreateLoginEmailUserResponseDto
> = async (dto) => {
  try {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
    };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code == "P2002") {
      throw { email: "User already exists" };
    }

    throw { error: "Unknown error" };
  }
};

createLoginEmailUser.validate = async (t) => {
  try {
    const validationSchema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    });

    const result = await validationSchema.validate(t);

    return { value: result };
  } catch (err: any) {
    if (err instanceof yup.ValidationError) {
      return {
        error: {
          [err.path!]: err.errors[0],
        },
      };
    }

    throw err;
  }
};
