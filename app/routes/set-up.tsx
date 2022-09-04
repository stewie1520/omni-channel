import IconLogout from "@ant-design/icons/LogoutOutlined";
import IconProfile from "@ant-design/icons/UserOutlined";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import classNames from "classnames";
import _capitalize from "lodash/capitalize";
import { useReducer, useRef } from "react";
import { CountryResponse } from "~/core/application/dtos/country.dto";
import { CountryService } from "~/core/application/service/country.service";
import { container } from "~/models/container";
import { AvatarHeader } from "~/page-components/account-set-up/avatar-header";
import { ChooseRole } from "~/page-components/account-set-up/choose-role";
import {
  ActionType,
  defaultSetupState,
  SetupContext,
  setupReducer,
  SetupState,
} from "~/page-components/account-set-up/context/set-up.context";
import { SetUpProfile } from "~/page-components/account-set-up/profile";
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
  const { countries } = useLoaderData<LoaderData>();

  const [state, dispatch] = useReducer(setupReducer, {
    ...defaultSetupState,
    email: emailAccount.email,
    firstName: account.firstName,
    lastName: account.lastName,
    countries: countries as unknown as CountryResponse[],
  });

  const setupSteps = useRef<AccountSetUpTimelineProps["steps"]>([
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
  ]);

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
          <div
            className="hs-dropdown relative ml-auto inline-flex"
            data-hs-dropdown-placement="bottom-right"
          >
            <button
              id="hs-dropdown-with-header"
              type="button"
              className="hs-dropdown-toggle inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
            >
              <AvatarHeader
                url={state.avatarUrl}
                name={state.firstName + " " + state.lastName}
              />
            </button>

            <div
              className="hs-dropdown-menu duration hidden min-w-[15rem] divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800"
              aria-labelledby="hs-dropdown-with-header"
            >
              <div className="mt-2 py-2 first:pt-0 last:pb-0">
                <Link
                  className="flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  to={"/"}
                >
                  <IconProfile /> {state.email}
                </Link>
              </div>
              <div className="py-2 first:pt-0 last:pb-0">
                <div className="mt-2 py-2 first:pt-0 last:pb-0 ">
                  <Form action="/logout" method="post">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      <IconLogout /> Log out
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="top-50% absolute left-8">
          <AccountSetUpTimeline
            currentStep={state.step}
            steps={setupSteps.current}
          />
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
