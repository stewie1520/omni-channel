import { CalendarIcon as IconCalendar } from "@heroicons/react/outline";
import IconLeft from "@ant-design/icons/LeftOutlined";
import IconRight from "@ant-design/icons/RightOutlined";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "~/components/inputs/input";
import {
  formatter,
  isIn,
  isNow,
  isSameDate,
  isSameMonth,
  isSameYear,
} from "~/libs/date";
import { getMonthText } from "~/libs/date/getMonthText";

export interface DatePickerProps {
  value?: Date;
  label: string;
  onChange?: (value: Date) => void;
  min?: Date;
  max?: Date;
}

export const DatePicker = (props: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const [current, setCurrent] = useState<Date>(props.value || new Date());
  const today = useMemo(() => new Date(), []);
  const [viewMode, setViewMode] = useState<"month" | "year" | "day">("day");

  const toDisplay = useCallback<(i: null | Date) => string | null | number>(
    (i) => {
      if (i === null) {
        return null;
      }

      if (viewMode === "year") {
        return i.getFullYear();
      }

      if (viewMode === "day") {
        return i.getDate();
      }

      if (viewMode === "month") {
        return getMonthText(i.getMonth());
      }

      return null;
    },
    [viewMode]
  );

  const display = useMemo<(null | Date)[]>(() => {
    if (viewMode === "day") {
      const month = current.getMonth();
      const year = current.getFullYear();
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
      const numberOfDays = endOfMonth.getDate();
      const startDay = startOfMonth.getDay();

      const patchingNumber = startDay === 0 ? 6 : startDay - 1;

      return [
        ...[...Array(patchingNumber)].map(() => null),
        ...[...Array(numberOfDays)].map((_, i) => new Date(year, month, i + 1)),
      ];
    }

    if (viewMode === "month") {
      return [...Array(12)].map(
        (_, i) => new Date(current.getFullYear(), i, 1)
      );
    }

    if (viewMode === "year") {
      const baseYear = current.getFullYear();
      return [...Array(30)].map((_, i) => new Date(baseYear - 29 + i, 0, 1));
    }

    return [];
  }, [current, viewMode]);

  const handleDateChange = (i: Date | null | number) => {
    if (i === null) return;
    if (viewMode === "day" && typeof i === "object") {
      setCurrent(i);
      props.onChange?.(i);
      setIsOpen(false);
    }

    if (viewMode === "month" && typeof i === "object") {
      setCurrent(i);
      setViewMode("day");
    }

    if (viewMode === "year" && typeof i === "object") {
      setCurrent(i);
      setViewMode("month");
    }
  };

  const handleChangeViewMode = useCallback(() => {
    if (viewMode === "day") {
      setViewMode("month");
    }

    if (viewMode === "month") {
      setViewMode("year");
    }
  }, [viewMode]);

  const handleClickNext = useCallback(() => {
    if (viewMode === "day") {
      setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    }

    if (viewMode === "month") {
      setCurrent(new Date(current.getFullYear() + 1, 0, 1));
    }

    if (viewMode === "year") {
      setCurrent(new Date(current.getFullYear() + 10, 0, 1));
    }
  }, [viewMode, current]);

  const handleClickPrevious = useCallback(() => {
    if (viewMode === "day") {
      setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    }

    if (viewMode === "month") {
      setCurrent(new Date(current.getFullYear() - 1, 0, 1));
    }

    if (viewMode === "year") {
      setCurrent(new Date(current.getFullYear() - 10, 0, 1));
    }
  }, [viewMode, current]);

  useEffect(() => {
    function handleClickOutside(event: any) {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, ref2]);

  return (
    <div className="relative z-50">
      <Input
        label={props.label}
        leadingIcon={() => (
          <IconCalendar width={16} className="dark:text-gray-400" />
        )}
        ref={ref2}
        onFocus={() => setIsOpen(true)}
        value={formatter(current)}
        readOnly
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
              className="absolute z-50 mt-2 flex w-96 origin-top-right flex-col rounded-md bg-white px-2 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="flex flex-row items-center justify-between px-6 pb-2">
                <span
                  className="cursor-pointer select-none text-2xl font-semibold text-slate-800 hover:text-slate-500"
                  onClick={handleChangeViewMode}
                >
                  {viewMode === "year"
                    ? current.getFullYear()
                    : [
                        getMonthText(current.getMonth()),
                        current.getFullYear(),
                      ].join(" ")}
                </span>
                <div className="flex flex-row space-x-8">
                  <IconLeft
                    onClick={handleClickPrevious}
                    className="text-slate-700 hover:text-blue-600"
                  />
                  <IconRight
                    onClick={handleClickNext}
                    className="text-slate-700 hover:text-blue-600"
                  />
                </div>
              </div>

              {viewMode === "day" && (
                <motion.div
                  initial={{
                    translateX: "10%",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  animate={{
                    opacity: 1,
                    translateX: "0%",
                  }}
                >
                  <div className="mt-4 grid select-none grid-cols-7 gap-4 px-6 text-center text-sm font-medium text-slate-800">
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>Su</span>

                    {display.map((i, index) => {
                      const display = toDisplay(i);
                      if (!display) return <div></div>;

                      const isDisabled = !isIn({
                        i,
                        min: props.min,
                        max: props.max,
                        unit: "day",
                      });

                      return (
                        <span
                          className={classNames(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                            {
                              "cursor-pointer text-slate-800 hover:bg-gray-100":
                                !isSameDate(i, current) && !isDisabled,
                              "bg-blue-500 text-white": isSameDate(i, current),
                              "bg-gray-200 text-blue-500":
                                !isSameDate(i, current) &&
                                isNow(i, viewMode, today),
                              " text-gray-400": isDisabled,
                            }
                          )}
                          onClick={() =>
                            isDisabled ? null : handleDateChange(i)
                          }
                          key={index}
                        >
                          {toDisplay(i)}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {viewMode === "month" && (
                <motion.div
                  initial={{
                    translateX: "10%",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  animate={{
                    opacity: 1,
                    translateX: "0%",
                  }}
                >
                  <div className="mt-4 grid grid-cols-4 gap-4 px-6 text-center text-sm font-medium text-slate-800">
                    {display.map((i, index) => {
                      const isDisabled = !isIn({
                        i,
                        min: props.min,
                        max: props.max,
                        unit: "month",
                      });

                      return (
                        <span
                          className={classNames(
                            "flex h-8 items-center justify-center rounded-lg text-xs font-medium",
                            {
                              "cursor-pointer text-slate-800 hover:bg-gray-100":
                                !isSameMonth(i, current) && !isDisabled,
                              "bg-blue-500 text-white": isSameMonth(i, current),
                              "bg-blue-200 text-blue-500":
                                !isSameMonth(i, current) &&
                                isNow(i, viewMode, today),
                              "text-gray-400": isDisabled,
                            }
                          )}
                          onClick={() =>
                            isDisabled ? null : handleDateChange(i)
                          }
                          key={index}
                        >
                          {toDisplay(i)}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {viewMode === "year" && (
                <motion.div
                  initial={{
                    translateX: "10%",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  animate={{
                    opacity: 1,
                    translateX: "0%",
                  }}
                >
                  <div className="mt-4 grid grid-cols-5 gap-4 px-6 text-center text-sm font-medium text-slate-800">
                    {display.map((i, index) => {
                      const isDisabled = !isIn({
                        i,
                        min: props.min,
                        max: props.max,
                        unit: "month",
                      });

                      return (
                        <span
                          className={classNames(
                            "flex h-8 items-center justify-center rounded-lg text-xs font-medium",
                            {
                              "cursor-pointer text-slate-800 hover:bg-gray-100":
                                !isSameYear(i, current) && !isDisabled,
                              "bg-blue-500 text-white": isSameYear(i, current),
                              "bg-blue-200 text-blue-500":
                                !isSameYear(i, current) &&
                                isNow(i, viewMode, today),
                              "bg-gray-200 text-gray-400": isDisabled,
                            }
                          )}
                          onClick={() =>
                            isDisabled ? null : handleDateChange(i)
                          }
                          key={index}
                        >
                          {toDisplay(i)}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
