import IconDashboard from "@ant-design/icons/DashboardOutlined";
import IconGroup from "@ant-design/icons/GroupOutlined";
import { Link } from "@remix-run/react";
import { ItemSideBar } from "./buttons/item-sidebar";

const items: { to: string; text: string; icon: any }[] = [
  {
    to: "/me",
    icon: IconDashboard,
    text: "Dashboard",
  },
  {
    to: "/classes",
    icon: IconGroup,
    text: "Classes",
  },
];

export const Sidebar = () => {
  return (
    <>
      {/* <!-- Sidebar Toggle --> */}
      <div className="sticky inset-x-0 top-[59px] z-20 border-y bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:top-[71px] sm:px-6 md:px-8 lg:hidden">
        <div className="flex items-center py-4">
          {/* <!-- Navigation Toggle --> */}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            data-hs-sidebar="#docs-sidebar"
            aria-controls="docs-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="h-5 w-5"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          {/* <!-- End Navigation Toggle --> */}

          {/* <!-- Breadcrumb --> */}
          <ol
            className="ml-3 flex min-w-0 items-center whitespace-nowrap"
            aria-label="Breadcrumb"
          >
            <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
              Application Layout
              <svg
                className="mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-gray-400 dark:text-gray-600"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </li>
            <li
              className="truncate text-sm font-semibold text-gray-800 dark:text-gray-400"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          {/* <!-- End Breadcrumb --> */}
        </div>
      </div>
      {/* <!-- End Sidebar Toggle --> */}

      {/* <!-- Sidebar --> */}
      <div
        id="docs-sidebar"
        className="hs-sidebar scrollbar-y dark:scrollbar-y fixed top-0 left-0 bottom-0 z-[60] hidden w-64 -translate-x-full transform overflow-y-auto border-r border-gray-200 bg-white pt-7 pb-10 transition-all duration-300 hs-sidebar-open:translate-x-0 dark:border-gray-700 dark:bg-gray-800 lg:right-auto lg:bottom-0 lg:block lg:translate-x-0"
      >
        <div className="px-6">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            to="#"
            aria-label="Brand"
          >
            Buzz
          </Link>
        </div>

        <nav className="flex w-full flex-col flex-wrap p-6">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                <ItemSideBar
                  to={item.to}
                  text={item.text}
                  icon={item.icon}
                  active={false}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* <!-- End Sidebar --> */}
    </>
  );
};
