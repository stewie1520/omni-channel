import React from "react";
import classNames from "classnames/bind";

export interface TitleSectionProps {
  icon?: React.ComponentType<any>;
  className?: string
}

export const TitleSection = (props: React.PropsWithChildren & TitleSectionProps) => {
  return (
    <span className={classNames("my-5 inline-block flex items-center space-x-2 cursor-pointer text-xl font-semibold text-slate-900", props.className)}>
      {props.icon && <props.icon/>}
      <span>{props.children}</span>
    </span>
  );
};
