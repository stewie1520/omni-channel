import { Menu, Transition } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import { Fragment } from "react";
import {
  LogoutIcon as IconLogout,
  UserIcon as IconProfile,
} from "@heroicons/react/outline";
import { AvatarHeader } from "./avatar-header";
import { useSetupContext } from "./hooks/use-setup.hook";

export const AvatarHeaderButton = (props: any) => {
  const { state } = useSetupContext();

  return (
    <Menu as="div" className="relative ml-auto inline-flex">
      <Menu.Button
        type="button"
        className="inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
      >
        <AvatarHeader
          url={state.avatarUrl}
          name={state.firstName + " " + state.lastName}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-[2.375rem] mt-2 min-w-[15rem] origin-top-right divide-y divide-gray-200 rounded-lg bg-white p-2 shadow-md  dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800">
          <Menu.Item>
            <div className="mt-2 py-2 first:pt-0 last:pb-0">
              <Link
                className="flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-blue-100 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                to={"/"}
              >
                <IconProfile width={16} className="text-blue-500" />{" "}
                {state.email}
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="py-2 first:pt-0 last:pb-0">
              <div className="mt-2 py-2 first:pt-0 last:pb-0 ">
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-blue-100 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <IconLogout width={16} className="text-blue-500" /> Log out
                  </button>
                </Form>
              </div>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
