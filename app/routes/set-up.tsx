import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import classNames from "classnames";
import _capitalize from "lodash/capitalize";
import { useMemo, useReducer } from "react";
import type { CountryResponse } from "~/core/application/dtos/country.dto";
import { CountryService } from "~/core/application/service/country.service";
import { container } from "~/models/container";
import { AvatarHeaderButton } from "~/page-components/account-set-up/avatar-header-button";
import { ChooseRole } from "~/page-components/account-set-up/choose-role";
import {
  ActionType,
  defaultSetupState,
  SetupContext,
  setupReducer,
} from "~/page-components/account-set-up/context/set-up.context";
import { SetUpProfile } from "~/page-components/account-set-up/profile";
import { SetUpVerification } from "~/page-components/account-set-up/verification";
import { StepMotion } from "~/page-components/account-set-up/step-motion";
import type { AccountSetUpTimelineProps } from "~/page-components/account-set-up/timeline";
import { AccountSetUpTimeline } from "~/page-components/account-set-up/timeline";
import type { Country } from "~/page-components/account-set-up/types";
import { getAccountId } from "~/session.server";
import { useAccount, useEmailAccount } from "~/utils";

export type LoaderData = {
  countries: Country[];
};

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

    const countries = await container
      .get<CountryService>(CountryService)
      .getAll();

    return json({
      accountId,
      countries,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default function SetUp() {
  const account = useAccount();
  const emailAccount = useEmailAccount();
  const loaderData = useLoaderData<LoaderData>();
  const countries = loaderData.countries as unknown as CountryResponse[];

  const [state, dispatch] = useReducer(setupReducer, {
    ...defaultSetupState,
    email: emailAccount.email,
    firstName: account.firstName,
    lastName: account.lastName,
    birthDay: new Date(2000, 4, 1),
    countries,
    selectedCountry: countries[0].code,
  });

  const setupSteps = useMemo<AccountSetUpTimelineProps["steps"]>(
    () => [
      {
        icon: "👨‍🎓",
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
        icon: "💳",
        text: "Verify your profile",
        subText: "Verify your details",
      },
      {
        icon: "🎉",
        text: "Get started",
      },
    ],
    [state.who]
  );

  return (
    <SetupContext.Provider value={{ dispatch, state }}>
      <div
        className={classNames(
          "relative flex h-full w-full flex-col items-center justify-center bg-slate-100",
          {
            "overflow-y-hidden": state.step == 1,
          }
        )}
      >
        <div className="header absolute top-0 right-0 z-20 flex w-full p-4">
          <AvatarHeaderButton />
        </div>
        <div className="top-50% invisible absolute left-8 lg:visible">
          <AccountSetUpTimeline currentStep={state.step} steps={setupSteps} />
        </div>
        <div className="flex h-full w-full justify-center">
          {state.step === 0 && (
            <div className="container h-full w-full">
              <StepMotion>
                <ChooseRole />
              </StepMotion>
            </div>
          )}
          {state.step === 1 && (
            <>
              <div className="fixed top-0 left-0 z-30 h-full w-full">
                <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
                <StepMotion>
                  <SetUpProfile />
                </StepMotion>
              </div>
            </>
          )}
          {state.step === 2 && (
            <>
              <div className="fixed top-0 left-0 z-30 h-full w-full">
                <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
                <StepMotion>
                  <SetUpVerification />
                </StepMotion>
              </div>
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
