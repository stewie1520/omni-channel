import { useSetupContext } from "./hooks/use-setup.hook";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { ActionType } from "./context/set-up.context";
import { InputOTP } from "./input-otp";
import { useCallback } from "react";
import { toStepProfile } from "./context/action-creator";

export const SetUpVerification = (props: any) => {
  const { dispatch, state } = useSetupContext();
  const onBackClick = useCallback(() => {
    toStepProfile(dispatch);
  }, [dispatch]);

  return (
    <div className="flex flex-col rounded-xl border bg-white py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
      <div className="flex items-center justify-between py-3 px-4 ">
        <button
          type="button"
          className="hs-dropdown-toggle inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-sm text-gray-500 transition-all hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
          onClick={onBackClick}
        >
          <span className="sr-only">Close</span>
          <ArrowLeftIcon width={16} />
        </button>

        <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          That's great, {state.firstName} 💪
        </h3>
        <div></div>
      </div>
      <div className="flex w-full flex-col items-center justify-center overflow-y-auto p-4 pt-0">
        <p className="inline-block max-w-md px-5 text-center text-sm text-gray-800 dark:text-gray-400">
          We've just sent a verification code to your email address. Please
          enter it below to continue.
        </p>
        <div className="mt-4 flex w-full justify-center">
          <img
            draggable={false}
            src="images/receive-otp.svg"
            alt="receive otp"
            width={196}
          />
        </div>
        <div className="mt-4 flex w-full justify-center">
          <div className="flex w-fit">
            <InputOTP
              onChange={(value) =>
                dispatch({
                  type: ActionType.OTP_CHANGED,
                  payload: { otp: value },
                })
              }
              style={{ marginTop: 32 }}
              mode="numeric"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-2 py-3 px-4 ">
        <a
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          href="#"
        >
          Verify
        </a>
      </div>
    </div>
  );
};
