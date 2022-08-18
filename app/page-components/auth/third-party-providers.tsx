export interface ThirdPartyProvidersProps extends React.PropsWithChildren {}

export const ThirdPartyProviders = (props: ThirdPartyProvidersProps) => {
  return (
    <>
      <div className="mt-5">
        {props.children}
        <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
          Or
        </div>
      </div>
    </>
  );
};
