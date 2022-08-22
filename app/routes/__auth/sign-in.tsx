import * as yup from "yup";
import IconLock from "@ant-design/icons/LockOutlined";
import IconMail from "@ant-design/icons/MailOutlined";
import {
  Form,
  Link,
  useActionData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { ButtonAuthGoogle } from "~/page-components/auth/auth-google";
import { Button } from "~/components/buttons/button";
import { Input } from "~/components/inputs/input";
import { LoginSideBar } from "~/page-components/auth/login-sidebar";
import { AuthCheckbox } from "~/page-components/auth/checkbox";
import type { ActionFunction } from "@remix-run/server-runtime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThirdPartyProviders } from "~/page-components/auth/third-party-providers";
import { createUserSession } from "~/session.server";
import { AlertError } from "~/components/alerts/error";
import IconLoading from "@ant-design/icons/LoadingOutlined";
import { container } from "~/models/container";
import { UserController } from "~/models/user/web/user.controller";
import { HttpInternalServerErrorResponse, HttpResponse } from "~/models/http-response";

type ActionData = {
  email?: string;
  password?: string;
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const dto = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
      rememberMe: !!formData.get("rememberMe"),
    };

    const controller = await container.get<UserController>(UserController);
    const user = await controller.verifyLoginByEmail(dto);

    return createUserSession({
      request,
      userId: user.id,
      remember: dto.rememberMe,
      redirectTo: "/dashboard",
    });
  } catch (err: any) {
    let error = err;
    if (!(error instanceof HttpResponse)) {
      error = new HttpInternalServerErrorResponse(err.message as string, { err });
    }

    return error.toJson();
  }
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  rememberMe: yup.boolean(),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const serverError = useActionData() as ActionData;

  const submit = useSubmit();
  const transition = useTransition();

  return (
    <>
      <div className="grid h-full grid-cols-2">
        <LoginSideBar></LoginSideBar>
        <div>
          <div className="container h-full px-5">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex w-8/12 flex-col rounded-xl border bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign in
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account yet?
                    <Link
                      className="ml-1 font-medium text-blue-600 decoration-2 hover:underline"
                      to="/sign-up"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
                <ThirdPartyProviders>
                  <ButtonAuthGoogle label="Sign in with Google" />
                </ThirdPartyProviders>
                {serverError?.error && (
                  <>
                    <AlertError dismissable short="We have some trouble">
                      Email/password combination is unable to identified
                    </AlertError>
                  </>
                )}
                <Form
                  onSubmit={handleSubmit((data) =>
                    submit(data, { method: "post" })
                  )}
                  className="mt-5 grid gap-y-4"
                >
                  <Input
                    leadingIcon={IconMail}
                    label="Your Email"
                    placeholder="jane.doe@example.com"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                  <Input
                    leadingIcon={IconLock}
                    label="Your Password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    error={errors.password?.message}
                  />

                  <AuthCheckbox id="remember-me" {...register("rememberMe")}>
                    Remember me
                  </AuthCheckbox>
                  <Button
                    variant="gradient-primary"
                    disabled={transition.state === "submitting"}
                  >
                    {transition.state === "submitting" ? (
                      <>
                        <IconLoading /> Verifying
                      </>
                    ) : (
                      "Continue"
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
