import classNames from "classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leadingIcon?: React.ComponentType<any>;
  placeholder?: string;
}

export const Input = (props: InputProps) => {
  return (
    <div className={props.className}>
      {props.label && (
        <label
          htmlFor="hs-leading-icon"
          className="mb-2 block text-sm font-medium dark:text-white"
        >
          {props.label}
        </label>
      )}
      <div className="relative">
        <input
          type={props.type || "text"}
          id="hs-leading-icon"
          name="hs-leading-icon"
          className={classNames(
            "block w-full rounded-md border-gray-200 py-3 px-4 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
            { "pl-11": !!props.leadingIcon }
          )}
          placeholder={props.placeholder}
        />
        {props.leadingIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
            <props.leadingIcon />
          </div>
        )}
      </div>
    </div>
  );
};
