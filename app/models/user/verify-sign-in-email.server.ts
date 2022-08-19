import * as yup from "yup";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import type { ControllerFunction } from "~/libs/types/controller";
import type {
  VerifySignInEmailRequestDto,
  VerifySignInEmailResponseDto,
} from "./dtos/verify-sign-in-email.dto";

export const verifySignInEmail: ControllerFunction<
  VerifySignInEmailRequestDto,
  VerifySignInEmailResponseDto | null
> = async ({ email, password, rememberMe }) => {
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

  return {
    id: userWithPassword.id,
    email: userWithPassword.email,
    firstName: userWithPassword.firstName,
    lastName: userWithPassword.lastName,
  };
};

verifySignInEmail.validate = async (t) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      rememberMe: yup.boolean().default(false),
    });

    const validationResult = await schema.validate(t);
    return { value: validationResult };
  } catch (err) {
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
