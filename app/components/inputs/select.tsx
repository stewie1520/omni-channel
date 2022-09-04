import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useCallback, useMemo, useState } from "react";
import type { ArrayElement } from "../../libs/types";

export interface SelectProps {
  label?: string;
  name?: string;
  options: Readonly<{ name: any; value: unknown }[]>;
}

export function Select(props: SelectProps) {
  const [selected, setSelected] = useState(props.options[0]);
  const optionValues = props.options.map((option) => option.value);

  const value2Options = useMemo(() => {
    const map = new Map();
    props.options.forEach((option) => map.set(option.value, option));
    return map;
  }, [props.options]);

  const handleSelectChanged = useCallback<
    (selectedValue: ArrayElement<SelectProps["options"]>["value"]) => void
  >(
    (selectedValue) => {
      const found = value2Options.get(selectedValue);
      if (!found) throw new Error("No option matched");
      setSelected(found);
    },
    [value2Options]
  );

  return (
    <div className="flex w-full flex-col gap-x-2">
      {props.label && (
        <label
          htmlFor={props.name}
          className="mb-2 block text-left text-sm font-medium text-gray-600 dark:text-white"
        >
          {props.label}
        </label>
      )}
      <Listbox value={selected.value} onChange={handleSelectChanged}>
        <div className="relative w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-md border-gray-200 bg-white py-3 px-4 pr-10  text-left text-sm shadow-sm ring-1 ring-black ring-opacity-5 focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
