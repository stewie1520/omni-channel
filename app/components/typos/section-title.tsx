import React from "react";

export const TitleSection = (props: React.PropsWithChildren) => {
  return (
    <span className="my-5 inline-block cursor-pointer text-xl font-semibold text-slate-900">
      {props.children}
    </span>
  );
};
