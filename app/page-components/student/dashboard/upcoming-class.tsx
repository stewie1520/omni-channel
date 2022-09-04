import IconBook from "@ant-design/icons/BookOutlined";
import IconClock from "@ant-design/icons/ClockCircleOutlined";
import IconAssignment from "@ant-design/icons/FolderOutlined";
import IconUser from "@ant-design/icons/UserOutlined";
import classNames from "classnames/bind";
import moment from "moment";
import { CircleProgress } from "~/components/progress";

export interface UpcomingClassProps {
  variant?: "green" | "blue" | "purple" | "red";
  category: string;
  title: string;
  lesson: number;
  minutes: number;
  assignment: number;
  students: number;
  percent: number;
}

const textColorProps: Record<
  NonNullable<UpcomingClassProps["variant"]>,
  string
> = {
  green: "text-green-500",
  blue: "text-blue-500",
  red: "text-red-500",
  purple: "text-purple-500",
};

const borderColorProps: Record<
  NonNullable<UpcomingClassProps["variant"]>,
  string
> = {
  green: "border-green-500",
  blue: "border-blue-500",
  red: "border-red-500",
  purple: "border-purple-500",
};

const bgColorProps: Record<
  NonNullable<UpcomingClassProps["variant"]>,
  string
> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
};

const ringColorProps: Record<
  NonNullable<UpcomingClassProps["variant"]>,
  string
> = {
  green: "ring-green-200",
  blue: "ring-blue-200",
  red: "ring-red-200",
  purple: "ring-purple-200",
};

export const UpcomingClass = (props: UpcomingClassProps) => {
  const formattedMinutes = moment
    .duration(props.minutes, "minutes")
    .humanize(true);
  const formattedStudents = Intl.NumberFormat("en", {
    notation: "compact",
  }).format(props.students);
  return (
    <div className="grid grid-cols-3 bg-[#f9f8fd] rounded-xl hover:shadow-md cursor-pointer transition-all p-4 dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7] md:p-5">
      <CircleProgress
        variant={props.variant}
        percent={props.percent}
        radius={30}
        image={`images/subjects/${props.category}.png`}
      />

      <div className="col-span-2 flex flex-col">
        <div className="hs-tooltip inline-block">
          <span className="block hs-tooltip-toggle font-semibold text-[18px] text-slate-700 line-clamp-1 text-left">
            {props.title}
          </span>
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-60 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-600 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
            role="tooltip"
          >
            {props.title}
          </span>
        </div>

        <div className="grid grid-cols-2 mt-3 gap-4">
          <span className=" flex text-[12px] text-gray-500 items-center space-x-2">
            <IconBook />
            <span>{props.lesson} lessons</span>
          </span>

          <span className="flex text-[12px] text-gray-500 items-center space-x-2">
            <IconClock />
            <span>{formattedMinutes}</span>
          </span>

          <span className="flex text-[12px] text-gray-500 items-center space-x-2">
            <IconAssignment />
            <span>{props.assignment} assignments</span>
          </span>

          <span className="flex text-[12px] text-gray-500 items-center space-x-2">
            <IconUser />
            <span>{formattedStudents} students</span>
          </span>
        </div>
      </div>
      <span
        className={classNames(
          "inline-block font-semibold mt-4 align-bottom text-xl text-center",
          textColorProps[props.variant!]
        )}
      >
        {props.percent}%
      </span>
      <div className="flex justify-between col-span-2 mt-4">
        <button
          type="button"
          className={classNames(
            "py-2 px-8 font-light inline-flex justify-center items-center gap-2 rounded-md border hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800",
            [
              textColorProps[props.variant!],
              borderColorProps[props.variant!],
              `hover:${borderColorProps[props.variant!]}`,
              `hover:${bgColorProps[props.variant!]}`,
              `focus:${ringColorProps[props.variant!]}`,
            ]
          )}
        >
          Skip
        </button>
        <button
          type="button"
          className={classNames(
            "py-2 px-8 font-light inline-flex justify-center items-center gap-2 rounded-md border text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800",
            [
              borderColorProps[props.variant!],
              bgColorProps[props.variant!],
              `hover:${bgColorProps[props.variant!]}`,
              `hover:${borderColorProps[props.variant!]}`,
              `focus:${ringColorProps[props.variant!]}`,
            ]
          )}
        >
          Join
        </button>
      </div>
    </div>
  );
};

UpcomingClass.defaultProps = {
  variant: "green",
};
