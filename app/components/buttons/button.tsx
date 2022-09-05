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

const tertiary =
  "mr-2 mb-2 rounded-lg ring-black ring-opacity-5 ring-1 px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-2 border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800";

const gradientPrimary =
  "mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800";

export const Button = (props: ButtonProps) => {
  const className = `disabled:cursor-not-allowed disabled:cursor inline-flex items-center justify-center gap-2 rounded-md border border-transparent py-3 px-4 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
    props.className || ""
  }`;
  return (
    <button
      {...props}
      type={props.type || "submit"}
      className={classNames(className, {
        [gradientPrimary]: props.variant === "gradient-primary",
        [tertiary]: props.variant === "tertiary",
      })}
    >
      {props.children}
    </button>
  );
};
