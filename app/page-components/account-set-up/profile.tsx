import { useSetupContext } from "./hooks/use-setup.hook";
import IconClose from "@ant-design/icons/CloseOutlined";
import IconExpand from "@ant-design/icons/ExpandOutlined";
import { backToStepRole } from "./context/action-creator";

export const SetUpProfile = (props: any) => {
  const { dispatch, state } = useSetupContext();

  return (
    <>
      <div className="fixed left-0 bottom-0 h-[90%] w-full">
        <div className="relative flex h-full flex-col gap-3 rounded-tl-3xl rounded-tr-3xl border bg-white  shadow dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-slate-700/[.7]">
          <div className="flex border-b py-4">
            <IconClose
              onClick={() => {
                backToStepRole(dispatch);
              }}
              className="absolute right-5 top-5 cursor-pointer text-[14px] font-bold text-sky-900 hover:text-gray-600"
            />
            <span className="text-md pl-5 font-semibold capitalize text-sky-900">
              {state.who === "student" ? "👨‍🎓" : "👨‍🏫"} Create your profile
            </span>
          </div>

          <div className="grid grid-cols-3 p-5">
            <div className="col-span-2 p-3">
              <div className="flex w-[50%] flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="with-corner-hint"
                    className="mb-2 block text-sm font-medium dark:text-white"
                  >
                    Email
                  </label>
                </div>
                <input
                  disabled
                  type="email"
                  id="with-corner-hint"
                  className="block w-full rounded-md border-gray-200 py-3 px-4 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  value={state.email}
                />
              </div>
            </div>
            <div className="">
              <div className="flex justify-between"></div>
            </div>
          </div>
        </div>
        {/* <figure className="relative z-[1] ml-auto mr-20 h-full w-full max-w-full rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
          <div className="relative flex max-w-full items-center rounded-t-lg bg-[#f6f4f7] py-5 px-24 dark:bg-gray-700">
            <div className="group absolute top-2/4 left-4 flex -translate-y-1 space-x-1">
              <span
                onClick={() => backToStepRole(dispatch)}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-red-400 dark:bg-gray-600"
              >
                <IconClose className="hidden text-[8px] font-bold text-gray-700 group-hover:block" />
              </span>
              <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-600"></span>
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-400 dark:bg-gray-600">
                <IconExpand className="hidden text-[8px] font-bold text-gray-700 group-hover:block" />
              </span>
            </div>
            <div className="flex h-full w-full items-center justify-center">
              Your Profile
            </div>
          </div>

          <div className="h-full rounded-b-lg bg-white"></div>
        </figure> */}
      </div>
    </>
  );
};
