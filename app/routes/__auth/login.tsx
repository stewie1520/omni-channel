import IconLock from "@ant-design/icons/LockOutlined";
import IconMail from "@ant-design/icons/MailOutlined";
import { Link } from "@remix-run/react";
import { ButtonAuthGoogle } from "~/page-components/auth/auth-google";
import { Button } from "~/components/buttons/button";
import { Input } from "~/components/inputs/input";
import { LoginSideBar } from "~/page-components/auth/login-sidebar";
import { AuthCheckbox } from "~/page-components/auth/checkbox";

export default function LoginPage() {
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
                <div className="mt-5 grid gap-y-4">
                  <ButtonAuthGoogle label="Sign in with Google" />
                  <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                    Or
                  </div>

                  <Input
                    leadingIcon={IconMail}
                    label="Your Email"
                    type="email"
                    placeholder="jane.doe@example.com"
                  />
                  <Input
                    leadingIcon={IconLock}
                    label="Your Password"
                    type="password"
                    placeholder="Password"
                  />

                  <AuthCheckbox>Remember me</AuthCheckbox>

                  <Button>Continue</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
