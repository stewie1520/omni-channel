import IconMail from "@ant-design/icons/MailOutlined";
import IconLock from "@ant-design/icons/LockOutlined";
import { ButtonAuthGoogle } from "~/components/buttons/auth-google";
import { Input } from "~/components/inputs/input";
import { Button } from "~/components/buttons/button";
import { LoginSideBar } from "~/components/sidebar/login-sidebar";

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
                    <a
                      className="ml-1 font-medium text-blue-600 decoration-2 hover:underline"
                      href="sign-up"
                    >
                      Sign up here
                    </a>
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

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm dark:text-white"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

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
