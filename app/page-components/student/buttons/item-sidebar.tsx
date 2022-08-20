import { NavLink } from "@remix-run/react";
import classNames from "classnames";

export interface ItemSideBarProps {
  text: string;
  active?: boolean;
  to: string;
  icon?: React.ComponentType<any>;
}

export const ItemSideBar = ({ icon: Icon, ...props }: ItemSideBarProps) => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          classNames(
            "flex items-center gap-x-3 rounded-md py-2 px-2.5 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-white",
            {
              "bg-gray-100 text-blue-400 text-slate-700 dark:bg-slate-700 dark:text-white":
                props.active || isActive,
            }
          )
        }
        to={props.to}
      >
        {({ isActive }) => (
          <>
            {Icon && (
              <Icon
                className={classNames({
                  "text-blue-500": props.active || isActive,
                  "font-bold": props.active || isActive,
                })}
              />
            )}
            {props.text}
          </>
        )}
      </NavLink>
    </>
  );
};
