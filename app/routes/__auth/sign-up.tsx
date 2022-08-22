import IconLock from "@ant-design/icons/LockOutlined";
import IconMail from "@ant-design/icons/MailOutlined";
import IconUser from "@ant-design/icons/UserOutlined";
import IconLoading from "@ant-design/icons/LoadingOutlined";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { Button } from "~/components/buttons/button";
import { Input } from "~/components/inputs/input";
import { ButtonAuthGoogle } from "~/page-components/auth/auth-google";
import { AuthCheckbox } from "~/page-components/auth/checkbox";
import { SignUpSideBar } from "~/page-components/auth/sign-up-sidebar";
import { ThirdPartyProviders } from "~/page-components/auth/third-party-providers";
import { isEmail } from "~/libs/strings/isEmail";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { UserController } from "~/models/user/web/user.controller";
import { container } from "~/models/container";
import { HttpInternalServerErrorResponse, HttpResponse } from "~/models/http-response";

type ActionData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const dto = {
      firstName: formData.get("firstName")!.toString(),
      lastName: formData.get("lastName")!.toString(),
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };

    await container.get<UserController>(UserController).createUserByEmail(dto);
    return redirect("/");
  } catch (err: any) {
    let error = err;
    if (!(error instanceof HttpResponse)) {
      error = new HttpInternalServerErrorResponse(err.message as string, { err });
    }

    return error.toJson();
  }
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  accept: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const validateEmailAsync = async (email: string) => {
  try {
    if (!isEmail(email)) return;
    const result = await fetch("/api/user/email-exists", {
      method: "post",
      body: JSON.stringify({ email }),
    });

    const data = await result.json();
    if (data.exists) {
      return "Email already exists";
    }
  } catch (err: any) {
    return err.message as string;
  }
};

export default function SignUpPage() {
  const actionData = useActionData() as ActionData;

  const [serverError, setServerError] = useState(actionData);

  useEffect(() => {
    setServerError(actionData);
  }, [actionData]);

  const {
    register,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const [isValidating, setIsValidating] = useState(false);

  const transition = useTransition();

  const validateEmailDebounced = useCallback(
    _debounce((email) => {
      setIsValidating(true);
      validateEmailAsync(email)
        .then((result) => {
          if (result) {
            return setError("email", {
              type: "manual",
              message: result,
            });
          }

          setServerError({});
          return clearErrors("email");
        })
        .finally(() => setIsValidating(false));
    }, 500),
    [setError]
  );

  const handleEmailChanged = useCallback(
    (e: any) => {
      setValue("email", e.target.value);
      if (!touchedFields["email"]) return;
      validateEmailDebounced(e.target.value);
    },
    [setValue, validateEmailDebounced, touchedFields]
  );

  const handleInputEmailBlurred = useCallback(
    (e: any) => {
      setValue("email", e.target.value, { shouldTouch: true });
      validateEmailDebounced(e.target.value);
    },
    [validateEmailDebounced, setValue]
  );

  return (
    <>
      <div className="grid h-full grid-cols-2">
        <SignUpSideBar></SignUpSideBar>
        <div>
          <div className="container h-full px-5">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex w-8/12 flex-col rounded-xl border bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign up
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?
                    <Link
                      className="ml-1 font-medium text-blue-600 decoration-2 hover:underline"
                      to="/sign-in"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                <ThirdPartyProviders>
                  <ButtonAuthGoogle label="Sign up with Google" />
                </ThirdPartyProviders>

                <Form method="post" className="mt-5 grid gap-y-4">
                  <div className="grid grid-cols-2 gap-x-2">
                    <Input
                      label="First Name"
                      leadingIcon={IconUser}
                      type="text"
                      error={
                        serverError?.firstName || errors?.firstName?.message
                      }
                      placeholder="Jane"
                      {...register("firstName")}
                    />
                    <Input
                      label="Last Name"
                      error={serverError?.lastName || errors?.lastName?.message}
                      leadingIcon={IconUser}
                      type="text"
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                  </div>

                  <Input
                    loading={isValidating}
                    leadingIcon={IconMail}
                    label="Your Email"
                    type="email"
                    error={
                      !isValidating &&
                      (serverError?.email || errors?.email?.message)
                    }
                    placeholder="jane.doe@example.com"
                    {...register("email")}
                    onChange={handleEmailChanged}
                    onBlur={handleInputEmailBlurred}
                  />
                  <Input
                    leadingIcon={IconLock}
                    label="Your Password"
                    type="password"
                    error={serverError?.password || errors?.password?.message}
                    placeholder="Password"
                    {...register("password")}
                  />

                  <AuthCheckbox
                    id="accept-term"
                    {...register("accept", {
                      onChange: () => trigger("accept"),
                    })}
                  >
                    I accept the{" "}
                    <Link
                      className="font-medium text-blue-600 hover:underline"
                      to="#"
                    >
                      Terms and Conditions
                    </Link>
                  </AuthCheckbox>
                  <Button
                    variant="gradient-primary"
                    disabled={
                      !isEmpty(serverError) ||
                      !isValid ||
                      !isEmpty(errors) ||
                      transition.state === "submitting"
                    }
                  >
                    {transition.state === "submitting" ? (
                      <>
                        <IconLoading /> Creating
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
