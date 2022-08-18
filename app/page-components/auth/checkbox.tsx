import type { ForwardedRef } from "react";
import React from "react";
import _omit from "lodash/omit"

export interface AuthCheckboxPops {
  onChange: (event: {
    target: any;
    type?: any;
  }) => Promise<void | boolean>;
  onBlur: (event: {
    target: any;
    type?: any;
  }) => Promise<void | boolean>;
  name: string;
  id?: string;
  children: React.ReactNode;
}

export const AuthCheckbox = React.forwardRef((props: AuthCheckboxPops, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <>
      <div className="flex items-center">
        <div className="flex">
          <input
            ref={ref}
            type="checkbox"
            className="mt-0.5 shrink-0 cursor-pointer rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
            {..._omit(props, ["children"])}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={props.id}
            className="cursor-pointer text-sm dark:text-white"
          >
            {props.children}
          </label>
        </div>
      </div>
    </>
  );
});
