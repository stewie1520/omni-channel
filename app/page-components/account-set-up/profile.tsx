import { Select } from "../../components/inputs/select";
import { backToStepRole, changeBirthDay } from "./context/action-creator";
import { useSetupContext } from "./hooks/use-setup.hook";
import IconCamera from "@ant-design/icons/CameraFilled";
import IconClose from "@ant-design/icons/CloseOutlined";
import { DatePicker } from "~/components/inputs/date-picker";

const genderOptions: Readonly<{ value: string; name: string }[]> = [
  { name: "👨 Male", value: "male" },
  { name: "👩 Female", value: "female" },
  { name: "🏳️‍🌈 Other", value: "other" },
];

export const SetUpProfile = (props: any) => {
  const { dispatch, state } = useSetupContext();
  const today = new Date();

  return (
    <>
      <div className="fixed left-0 bottom-0 h-[95%] w-full">
        <IconClose
          onClick={() => {
            backToStepRole(dispatch);
          }}
          className="absolute right-3 -top-7 cursor-pointer font-bold text-white"
        />

        <div className="relative flex h-full flex-col items-center gap-3 rounded-tl-xl rounded-tr-xl border bg-white pt-5  shadow dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-slate-700/[.7]">
          <div className="flex w-[60%] items-center">
            <div className="flex w-full flex-col pt-5">
              <div className="group block flex-shrink-0 flex-row">
                <div className="flex items-end">
                  <div className="relative">
                    <img
                      draggable="false"
                      className="inline-block h-[154px] w-[154px] flex-shrink-0 rounded-full ring-4 ring-gray-400 ring-offset-4"
                      src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                      alt="User Avatar"
                    />
                    <button className="absolute -right-1 bottom-6 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-500 p-1 transition-all hover:bg-gray-600">
                      <IconCamera className="text-white" />
                    </button>
                  </div>
                  <div className="ml-5 mb-5">
                    <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
                      {state.firstName + " " + state.lastName}
                    </h3>
                    <p className="text-sm font-medium text-gray-400">
                      {state.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid w-2/4 grid-cols-2 gap-2">
                <DatePicker
                  value={state.birthDay}
                  label="Birthday 🥳"
                  onChange={(date) => changeBirthDay(dispatch, date)}
                  max={today}
                />
                <Select label={"Gender"} options={genderOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
