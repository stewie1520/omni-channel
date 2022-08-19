export interface AvatarHeaderProps {
  url?: string;
  name: string;
}

export const AvatarHeader = (props: AvatarHeaderProps) => {
  return props.url ? (
    <img
      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
      src={props.url}
      alt="Avatar of user"
    />
  ) : (
    <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
    </div>
  );
};
