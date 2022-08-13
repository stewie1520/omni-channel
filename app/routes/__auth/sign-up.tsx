import IconLock from "@ant-design/icons/LockOutlined";
import IconMail from "@ant-design/icons/MailOutlined";
import IconUser from "@ant-design/icons/UserOutlined";
import { Link, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { ButtonAuthGoogle } from "~/components/buttons/auth-google";
import { Button } from "~/components/buttons/button";
import { Input } from "~/components/inputs/input";
import { SignUpSideBar } from "~/components/sidebar/sign-up-sidebar";
import { createLoginEmailUser } from "~/models/user/user.server";

type ActionData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const dto = {
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error, value } = createLoginEmailUser.validate(dto);

  if (error) {
    return json<ActionData>(error);
  }

  await createLoginEmailUser(value!);
  return redirect("/");
};

export default function SignUpPage() {
  const error = useActionData() as ActionData;

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
                      to="/login"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
                <div className="mt-5">
                  <ButtonAuthGoogle label="Sign up with Google" />
                  <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                    Or
                  </div>
                </div>

                <form method="POST" className="mt-5 grid gap-y-4">
                  <div className="grid grid-cols-2 gap-x-2">
                    <Input
                      name="first-name"
                      label="First Name"
                      leadingIcon={IconUser}
                      type="text"
                      error={error?.firstName}
                      placeholder="Jane"
                    />
                    <Input
                      name="last-name"
                      label="Last Name"
                      error={error?.lastName}
                      leadingIcon={IconUser}
                      type="text"
                      placeholder="Doe"
                    />
                  </div>

                  <Input
                    name="email"
                    leadingIcon={IconMail}
                    label="Your Email"
                    type="email"
                    error={error?.email}
                    placeholder="jane.doe@example.com"
                  />
                  <Input
                    name="password"
                    leadingIcon={IconLock}
                    label="Your Password"
                    type="password"
                    error={error?.password}
                    placeholder="Password"
                  />

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="agree-terms"
                        name="agree-terms"
                        type="checkbox"
                        className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="agree-terms"
                        className="text-sm dark:text-white"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-blue-600 decoration-2 hover:underline"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>

                  <Button>Create account</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
