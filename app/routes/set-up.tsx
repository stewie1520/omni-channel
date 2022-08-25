import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import _capitalize from "lodash/capitalize";
import { useReducer } from "react";
import { ChooseRole } from "~/page-components/account-set-up/choose-role";
import {
  defaultSetupState,
  SetupState,
} from "~/page-components/account-set-up/context/set-up.context";
import {
  ActionType,
  SetupContext,
  setupReducer,
} from "~/page-components/account-set-up/context/set-up.context";
import { SetUpProfile } from "~/page-components/account-set-up/profile";
import { StepMotion } from "~/page-components/account-set-up/step-motion";
import type { AccountSetUpTimelineProps } from "~/page-components/account-set-up/timeline";
import { AccountSetUpTimeline } from "~/page-components/account-set-up/timeline";
import { getAccountId } from "~/session.server";

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Welcome ${parentsData.root.account.firstName}`,
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const accountId = await getAccountId(request);
    if (!accountId) {
      return redirect("/");
    }

    return json({
      accountId,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default function SetUp() {
  const [state, dispatch] = useReducer(setupReducer, defaultSetupState);

  const setupSteps: AccountSetUpTimelineProps["steps"] = [
    {
      icon: "🧑‍🎓",
      text: "Join as",
      subText: state.who ? _capitalize(state.who) : "Choose your role",
      onClick: () => {
        dispatch({
          type: ActionType.CHANGE_STEP,
          payload: { step: 0, who: null },
        });
      },
    },
    {
      icon: "📝",
      text: "Create your profile",
      subText: "Fill in your details",
    },
    {
      icon: "🪪",
      text: "Verify your profile",
      subText: "Verify your details",
    },
    {
      icon: "🎉",
      text: "Congratulations",
    },
  ];

  return (
    <SetupContext.Provider value={{ dispatch, state }}>
      <div className="relative flex h-full w-full flex-col items-center justify-center space-y-8 bg-slate-100">
        <div className="top-50% absolute left-8">
          <AccountSetUpTimeline currentStep={state.step} steps={setupSteps} />
        </div>
        <div className="container z-10">
          {state.step === 0 && (
            <StepMotion>
              <ChooseRole />
            </StepMotion>
          )}
          {state.step === 1 && (
            <>
              <StepMotion>
                <SetUpProfile />
              </StepMotion>
            </>
          )}
        </div>
        <img
          draggable="false"
          className=" pointer-events-none absolute -bottom-20 left-0"
          src="images/wave-2.svg"
          alt="wave"
        />
      </div>
    </SetupContext.Provider>
  );
}
