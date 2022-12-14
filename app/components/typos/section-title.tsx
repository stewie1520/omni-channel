import classNames from "classnames/bind";
import React from "react";

export interface TitleSectionProps {
  icon?: React.ComponentType<any>;
  className?: string;
}

export const TitleSection = (
  props: React.PropsWithChildren & TitleSectionProps
) => {
  return (
    <span
      className={classNames(
        "my-5 inline-block flex w-fit cursor-pointer items-center space-x-2 text-xl font-semibold text-slate-900",
        props.className
      )}
    >
      {props.icon && <props.icon />}
      <span>{props.children}</span>
    </span>
  );
};
