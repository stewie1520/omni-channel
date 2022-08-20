import type { IllustrationProps } from ".";

export const IllustrationEmpty = (props: IllustrationProps) => {
  return (
    <img draggable={false} src="images/empty.svg" alt="empty" {...props} />
  );
};
