import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "link"
    | "gradient-primary";
}

const gradientPrimary =
  "mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800";

export const Button = (props: ButtonProps) => {
  const className = `disabled:bg-blue-400 disabled:cursor-not-allowed disabled:cursor inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
    props.className || ""
  }`;
  return (
    <button
      {...props}
      type={props.type || "submit"}
      className={classNames(className, {
        [gradientPrimary]: props.variant === "gradient-primary",
      })}
    >
      {props.children}
    </button>
  );
};
