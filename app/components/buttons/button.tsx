export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const className = `disabled:bg-blue-400 disabled:cursor-not-allowed disabled:cursor inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
    props.className || ""
  }`;
  return (
    <button {...props} type={props.type || "submit"} className={className}>
      {props.children}
    </button>
  );
};
