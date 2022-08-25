import classNames from "classnames";
import { ReactElement, useMemo } from "react";
import IconCheck from "@ant-design/icons/CheckOutlined";

export interface AccountSetUpStepProps {
  done?: boolean;
  isActive?: boolean;
  icon: ReactElement | string;
  text: string;
  subText?: string;
  isLast?: boolean;
  onClick?: () => void;
}

export const AccountSetUpStep = (props: AccountSetUpStepProps) => {
  const isDisabled = useMemo(
    () => !(props.done || props.isActive),
    [props.done, props.isActive]
  );
  return (
    <div
      className={classNames("flex", {
        "cursor-pointer": !isDisabled,
        "cursor-not-allowed": isDisabled,
      })}
      onClick={
        !isDisabled && props.onClick && !props.isActive
          ? props.onClick
          : undefined
      }
    >
      {props?.isLast ? (
        <>
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-full border bg-gray-200",
                  {
                    "bg-green-600 ring-2": props.isActive,
                  }
                )}
              >
                {props.icon}
              </div>
            </div>
          </div>
          <div className="pt-1">
            <p
              className={classNames(
                "text-md mb-2 font-semibold text-gray-500",
                {
                  "text-green-600": props.done,
                }
              )}
            >
              {props.text}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-full border",
                  {
                    "hover:shadow": !isDisabled,
                    "bg-green-500 text-white ring-2 ring-green-500": props.done,
                    "bg-blue-400 ring-2": props.isActive,
                    "bg-gray-200": isDisabled,
                  }
                )}
              >
                {props.done ? <IconCheck color="#fff" /> : props.icon}
              </div>
            </div>
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col pb-8">
            <p
              className={classNames("text-md mb-2 font-semibold", {
                "text-blue-500": props.isActive,
                "text-gray-500": !props.isActive,
              })}
            >
              {props.text}
            </p>
            {props.subText && (
              <p className="text-sm font-light text-gray-500">
                {props.subText}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export interface AccountSetUpTimelineProps {
  currentStep: number;
  steps: Omit<AccountSetUpStepProps, "done" | "isActive" | "isLast">[];
}

export const AccountSetUpTimeline = (props: AccountSetUpTimelineProps) => {
  return (
    <div className="w-full">
      {props.steps.map((step, index) => {
        return (
          <AccountSetUpStep
            icon={step.icon}
            text={step.text}
            done={props.currentStep > index}
            isActive={index === props.currentStep}
            key={index}
            subText={step.subText}
            isLast={index === props.steps.length - 1}
            onClick={step.onClick}
          />
        );
      })}
    </div>
  );
};
