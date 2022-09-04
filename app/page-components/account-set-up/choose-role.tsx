import { ActionType } from "./context/set-up.context";
import { useSetupContext } from "./hooks/use-setup.hook";
import { useAccount } from "~/utils";

export const ChooseRole = (props: any) => {
  const account = useAccount();
  const { dispatch, state } = useSetupContext();

  return (
    <>
      <div className="flex flex-col items-center space-y-2">
        <span className="text-2xl font-bold capitalize text-sky-900">
          Choose your role
        </span>
        <span className="text-md font-light text-sky-900">
          Hi {account.firstName}, to continue, please tell us who you are 🤟
        </span>
      </div>
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
    </>
  );
};
