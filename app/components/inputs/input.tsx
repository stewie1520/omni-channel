import IconLoading from "@ant-design/icons/LoadingOutlined";
import classNames from "classnames";
import type { ForwardedRef } from "react";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  label?: string;
  leadingIcon?: React.ComponentType<any>;
  loading?: boolean;
  placeholder?: string;
  readonly?: boolean;
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef(
  (
    { leadingIcon: LeadingIcon, loading, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={props.className}>
        {props.label && (
          <label
            htmlFor={props.name}
            className="mb-2 block text-left text-sm font-medium text-gray-600 dark:text-white"
          >
            {props.label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={props.type || "text"}
            className={classNames(
              "block w-full rounded-md border-gray-200 py-3 px-4 text-sm shadow-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
              {
                "pl-11": !!LeadingIcon,
              },
              props.error && [
                "border-red-500",
                "dark:border-red-500",
                "focus:border-red-500",
                "focus:ring-red-500",
              ]
            )}
            placeholder={props.placeholder}
            {...props}
          />
          {props.error && (
            <div
              className="hs-tooltip absolute inset-y-0 right-0 flex items-center pr-3"
              data-hs-tooltip-placement="left"
            >
              <svg
                className="hs-tooltip-toggle h-5 w-5 text-red-500"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              <span
                className="hs-tooltip-content invisible absolute z-10 inline-block rounded-md bg-gray-900 py-1 px-2 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 dark:bg-slate-700"
                role="tooltip"
              >
                {props.error}
              </span>
            </div>
          )}
          {LeadingIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
              <LeadingIcon className="dark:text-gray-400" />
            </div>
          )}
          {loading && (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
              <IconLoading className="text-blue-500 dark:text-blue-500 dark:text-gray-400" />
            </div>
          )}
        </div>
        {props.error && (
          <p
            className="mt-2 text-sm text-red-600"
            id="hs-validation-name-error-helper"
          >
            {props.error}
          </p>
        )}
      </div>
    );
  }
);
