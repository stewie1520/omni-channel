import IconLoading from "@ant-design/icons/LoadingOutlined";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import type { ForwardedRef } from "react";
import { useCallback } from "react";
import { useMemo, useState } from "react";
import { Fragment } from "react";
import React from "react";
import type { ArrayElement } from "~/libs/types";

export interface InputSelectProps {
  className?: string;
  name?: string;
  error?: any;
  label?: string;
  value?: string;
  leadingIcon?: React.ComponentType<any>;
  loading?: boolean;
  placeholder?: string;
  readonly?: boolean;
  options: { value: string; name: string; short?: string }[];
  onChange?: (value: string) => void;
}

// eslint-disable-next-line react/display-name
export const InputSelect = React.forwardRef(
  (
    { leadingIcon: LeadingIcon, loading, ...props }: InputSelectProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [selected, setSelected] = useState(props.options[0]);
    const optionValues = props.options.map((option) => option.value);

    const value2Options = useMemo(() => {
      const map = new Map();
      props.options.forEach((option) => map.set(option.value, option));
      return map;
    }, [props.options]);

    const handleSelectChanged = useCallback<
      (
        selectedValue: ArrayElement<InputSelectProps["options"]>["value"]
      ) => void
    >(
      (selectedValue) => {
        const found = value2Options.get(selectedValue);
        if (!found) throw new Error("No option matched");
        setSelected(found);
      },
      [value2Options]
    );

    return (
      <div className={classNames("w-full", props.className)}>
        {props.label && (
          <label
            htmlFor={props.name}
            className="mb-2 block text-left text-sm font-medium text-gray-600 dark:text-white"
          >
            {props.label}
          </label>
        )}
        <div className="relative flex">
          <div className="ring-gray relative box-border flex rounded-md bg-gray-100 ring-1 ring-black ring-opacity-5 focus-within:rounded-md focus-within:border-transparent focus-within:ring-2  focus-within:ring-blue-500">
            <Listbox
              as={Fragment}
              value={selected.value}
              onChange={handleSelectChanged}
            >
              <Listbox.Button className="relative w-16 rounded-bl-md rounded-tl-md bg-gray-100 px-4 py-3 text-sm shadow-sm ">
                <span className="block truncate">
                  {selected.short || selected.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 -right-2 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
              >
                <Listbox.Options className="absolute top-[2.375rem] mt-3 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {optionValues.map((value, valueIdx) => (
                    <Listbox.Option
                      key={valueIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={value}
                    >
                      {({ selected }) => {
                        return (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {value2Options.get(value)?.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        );
                      }}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
            <input
              value={props.value}
              ref={ref}
              type={"text"}
              className={classNames(
                "block w-full rounded-br-md rounded-tr-md border-none py-3 px-4 text-sm shadow-sm focus:border-none focus:ring-0",
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
              {...(props as any)}
              onChange={(e) => {
                props.onChange?.(e.target.value);
              }}
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
