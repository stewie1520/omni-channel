import type { ControllerFunction } from "~/libs/types/controller";
import * as yup from "yup";
import { getUserByEmail } from "./user.server";

export const checkEmailExists: ControllerFunction<
  { email: string },
  boolean
> = async ({ email }) => {
  const user = await getUserByEmail(email);
  return !!user;
};

checkEmailExists.validate = async (t) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
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
