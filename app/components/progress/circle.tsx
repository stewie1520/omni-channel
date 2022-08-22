import type { ProgressProps } from "~/components/progress/index";
import classNames from "classnames/bind";

export interface CircleProgressProps extends ProgressProps {
  variant?: "blue" | "green" | "red" | "purple",
  radius: number,
  withLabel?: boolean,
  image?: string,
}

const fullCircleColorProps: Record<NonNullable<CircleProgressProps["variant"]>, string> = {
  blue: "text-blue-200",
  green: "text-green-200",
  red: "text-red-200",
  purple: "text-purple-200",
}

const strokeCircleColorProps: Record<NonNullable<CircleProgressProps["variant"]>, string> = {
  blue: "text-blue-500",
  green: "text-green-500",
  red: "text-red-500",
  purple: "text-purple-500",
}

const labelColorProps: Record<NonNullable<CircleProgressProps["variant"]>, string> = {
  blue: "text-blue-700",
  green: "text-green-700",
  red: "text-red-700",
  purple: "text-purple-700",
}

export const CircleProgress = (props: CircleProgressProps) => {
  const circumference = 2 * Math.PI * props.radius;

  return (<div
    className="inline-flex relative items-center justify-center overflow-hidden rounded-full z-10"
  >
    <svg className="w-20 h-20">
      <circle
        className={classNames(fullCircleColorProps[props.variant!])}
        strokeWidth="5"
        stroke="currentColor"
        fill="transparent"
        r="30"
        cx="40"
        cy="40"
      />
      <circle
        className={classNames(strokeCircleColorProps[props.variant!])}
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - props.percent / 100 * circumference}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="30"
        cx="40"
        cy="40"
      />
    </svg>
    {props.withLabel && <span className={classNames("absolute text-xl", labelColorProps[props.variant!])}>{props.percent}%</span>}
    {props.image && (<div className="absolute items-center flex justify-center bg-[#f5effa] w-[40px] h-[40px] rounded-[40px] -z-10">
      <img className="w-[24px] h-[24px]" src={props.image} alt={"center"} />
    </div>)}

  </div>);
}

CircleProgress.defaultProps = {
  variant: "green",
}
