export const SetUpProfile = (props: any) => {
  return (
    <>
      <div className="grid max-w-4xl grid-cols-3 flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-slate-700/[.7] md:p-5">
        <div className="col-span-2"></div>
        <div className="">
          <div className="flex justify-between">
            <img
              className="inline-block rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://randomuser.me/api/portraits/men/15.jpg"
              alt="Description"
            />
          </div>
        </div>
      </div>
    </>
  );
};
