import IconClose from "@ant-design/icons/CloseOutlined";
import { Popover, Transition } from "@headlessui/react";
import { backToStepRole } from "./context/action-creator";
import { useSetupContext } from "./hooks/use-setup.hook";
import IconCamera from "@ant-design/icons/CameraFilled";
import IconCalendar from "@ant-design/icons/CalendarOutlined";
import IconLeft from "@ant-design/icons/LeftOutlined";
import IconRight from "@ant-design/icons/RightOutlined";
import { Input } from "~/components/inputs/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const SetUpProfile = (props: any) => {
  const { dispatch, state } = useSetupContext();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      console.log({ ...ref2.current });
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        isOpen &&
        ref2.current &&
        !ref2.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, ref2]);

  return (
    <>
      <div className="fixed left-0 bottom-0 h-[95%] w-full">
        <IconClose
          onClick={() => {
            backToStepRole(dispatch);
          }}
          className="absolute right-3 -top-7 cursor-pointer font-bold text-white"
        />

        <div className="relative flex h-full flex-col items-center gap-3 rounded-tl-xl rounded-tr-xl border bg-white pt-5  shadow dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-slate-700/[.7]">
          <div className="flex w-[60%] items-center">
            <div className="flex w-full flex-col pt-5">
              <div className="group block flex-shrink-0 flex-row">
                <div className="flex items-end">
                  <div className="relative">
                    <img
                      draggable="false"
                      className="inline-block h-[154px] w-[154px] flex-shrink-0 rounded-full ring-4 ring-gray-400 ring-offset-4"
                      src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                      alt="User Avatar"
                    />
                    <button className="absolute -right-1 bottom-6 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-500 p-1 transition-all hover:bg-gray-600">
                      <IconCamera className="text-white" />
                    </button>
                  </div>
                  <div className="ml-5 mb-5">
                    <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
                      {state.firstName + " " + state.lastName}
                    </h3>
                    <p className="text-sm font-medium text-gray-400">
                      {state.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex">
                <div className="relative">
                  <Input
                    label="Your birthday"
                    leadingIcon={IconCalendar}
                    ref={ref2}
                    onFocus={() => setIsOpen(true)}
                  />
                  {isOpen && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        animate={{
                          opacity: 1,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                          },
                          display: "block",
                        }}
                      >
                        <div
                          ref={ref}
                          className="absolute mt-2 flex w-96 origin-top-right flex-col rounded-md bg-white px-2 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="flex flex-row items-center justify-between px-6 pb-2">
                            <span className="text-2xl font-semibold text-slate-800">
                              July 2022
                            </span>
                            <div className="flex flex-row space-x-8">
                              <IconLeft className="text-slate-700" />
                              <IconRight className="text-slate-700" />
                            </div>
                          </div>
                          <table className="w-full table-fixed border-separate border-spacing-5">
                            <thead>
                              <tr className="w-full text-sm font-medium text-slate-700">
                                <th>M</th>
                                <th>T</th>
                                <th>W</th>
                                <th>T</th>
                                <th>F</th>
                                <th>S</th>
                                <th>S</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="text-center text-xs font-medium text-slate-700">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                              </tr>
                              <tr className="w-full text-center text-xs font-medium text-slate-700">
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                              </tr>
                              <tr className="w-full text-center text-xs font-medium text-slate-700">
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                              </tr>
                              <tr className="w-full text-center text-xs font-medium text-slate-700">
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <figure className="relative z-[1] ml-auto mr-20 h-full w-full max-w-full rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
          <div className="relative flex max-w-full items-center rounded-t-lg bg-[#f6f4f7] py-5 px-24 dark:bg-gray-700">
            <div className="group absolute top-2/4 left-4 flex -translate-y-1 space-x-1">
              <span
                onClick={() => backToStepRole(dispatch)}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-red-400 dark:bg-gray-600"
              >
                <IconClose className="hidden text-[8px] font-bold text-gray-700 group-hover:block" />
              </span>
              <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-600"></span>
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-400 dark:bg-gray-600">
                <IconExpand className="hidden text-[8px] font-bold text-gray-700 group-hover:block" />
              </span>
            </div>
            <div className="flex h-full w-full items-center justify-center">
              Your Profile
            </div>
          </div>

          <div className="h-full rounded-b-lg bg-white"></div>
        </figure> */}
    </>
  );
};
