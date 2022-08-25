import { Form } from "@remix-run/react";
import { Button } from "~/components/buttons/button";
import { useAccount } from "~/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function SetUp() {
  const account = useAccount();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-8 bg-slate-100">
      <div className="top-50% absolute left-8 w-1/2">
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-blue-400 ring-2">
                🧑‍🎓
              </div>
            </div>
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col pb-8">
            <p className="text-md mb-2 font-semibold text-blue-500">Join as</p>
            <p className="text-sm font-light text-gray-500">
              Tell us who you are
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-200">
                🪪
              </div>
            </div>
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col pb-8">
            <p className="text-md mb-2 font-semibold text-gray-500">
              Your profile
            </p>
            <p className="text-sm font-light text-gray-500">
              Basic information
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-200">
                👻
              </div>
            </div>
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col pb-8">
            <p className="text-md mb-2 font-semibold text-gray-500">
              Verification
            </p>
            <p className="text-sm font-light text-gray-500">
              Verify your account
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-200">
                🎉
              </div>
            </div>
          </div>
          <div className="pt-1">
            <p className="text-md mb-2 font-semibold text-gray-500">Done</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center justify-center space-y-8 "
          initial={{
            translateY: "10%",
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          animate={{
            opacity: 1,
            translateY: "0%",
          }}
        >
          <span className="text-xl font-light text-slate-600">
            Hi <span className="text-blue-500">{account.firstName}</span>, to
            continue, please tell us who you are
          </span>
          <div className="flex flex-row justify-center space-x-4">
            <div className="relative flex w-1/4 flex-none cursor-pointer select-none flex-col space-y-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-300 to-purple-400 p-4 hover:shadow-md md:p-5">
              <img alt="student" draggable="false" src="images/student.png" />
              <span className="flex w-full items-center justify-center space-x-2 text-center font-bold text-white">
                <span>Student</span>
              </span>
            </div>
            <div className="flex items-center text-xs uppercase text-gray-400  dark:text-gray-500">
              Or
            </div>
            <div className="relative flex w-1/4 flex-none cursor-pointer select-none flex-col space-y-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-4 hover:shadow-md md:p-5">
              <img alt="teacher" draggable="false" src="images/teacher.png" />
              <span className="flex w-full items-center justify-center space-x-2 text-center font-bold text-white">
                <span>Teacher</span>
              </span>
            </div>
          </div>
          <Form action="/logout" method="post">
            <Button variant="tertiary">Log out 👋</Button>
          </Form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
