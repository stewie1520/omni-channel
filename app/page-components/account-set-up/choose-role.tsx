import { Form } from "@remix-run/react";
import { Button } from "~/components/buttons/button";
import { useAccount } from "~/utils";
import { ActionType } from "./context/set-up.context";
import { useSetupContext } from "./hooks/use-setup.hook";

export const ChooseRole = (props: any) => {
  const account = useAccount();
  const { dispatch, state } = useSetupContext();

  return (
    <>
      <span className="text-xl font-light text-slate-600">
        Hi{" "}
        <span className="font-semibold text-blue-500">{account.firstName}</span>
        , to continue, please tell us who you are
      </span>
      <div className="flex flex-row justify-center space-x-4">
        <div
          onClick={() =>
            dispatch({
              type: ActionType.CHOSE_WHO,
              payload: { who: "student" },
            })
          }
          className="relative flex w-1/4 flex-none cursor-pointer select-none flex-col space-y-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-300 to-purple-400 p-4 hover:shadow-md md:p-5"
        >
          <img alt="student" draggable="false" src="images/student.png" />
          <span className="flex w-full items-center justify-center space-x-2 text-center font-bold text-white">
            <span>Student</span>
          </span>
        </div>

        <div
          onClick={() =>
            dispatch({
              type: ActionType.CHOSE_WHO,
              payload: { who: "teacher" },
            })
          }
          className="relative flex w-1/4 flex-none cursor-pointer select-none flex-col space-y-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-4 hover:shadow-md md:p-5"
        >
          <img alt="teacher" draggable="false" src="images/teacher.png" />
          <span className="flex w-full items-center justify-center space-x-2 text-center font-bold text-white">
            <span>Teacher</span>
          </span>
        </div>
      </div>
      <Form action="/logout" method="post">
        <Button variant="tertiary">Log out 👋</Button>
      </Form>
    </>
  );
};
