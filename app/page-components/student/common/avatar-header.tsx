import classNames from "classnames";
import { useMemo } from "react";
import { getGradient } from "~/libs/gradients";

export interface AvatarHeaderProps {
  url?: string;
  name: string;
}

export const AvatarHeader = (props: AvatarHeaderProps) => {
  const name = useMemo(() => {
    if (!props.name) return "U";
    const names = props.name.split(/\s+/);
    if (names.length < 2) return names[0][0].toUpperCase();

    return [names.shift() || "", names.pop() || ""]
      .map((n) => n[0].toUpperCase())
      .join("");
  }, [props.name]);

  const colorClass = useMemo(() => {
    return getGradient(props.name);
  }, [props.name]);

  return props.url ? (
    <img
      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
      src={props.url}
      alt="Avatar of user"
    />
  ) : (
    <div
      className={classNames(
        "relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full",
        colorClass
      )}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name}
      </span>
    </div>
  );
};
