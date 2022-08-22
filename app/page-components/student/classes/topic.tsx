import IconBook from "@ant-design/icons/BookFilled";
import IconUser from "@ant-design/icons/UserOutlined";
import classNames from "classnames";

export interface TopicCardProps {
  variant: "yellow" | "blue" | "purple";
  image: string;
  blob: string;
  topicName: string;
  topicDescription: string;
  courses: number;
  students: number;
}

export const TopicCard = (props: TopicCardProps) => {
  const bgColors = {
    "bg-[#f9af2b]": props.variant === "yellow",
    "bg-[#57b8eb]": props.variant === "blue",
    "bg-[#7383bf]": props.variant === "purple",
  };

  const textColors = {
    "text-[#f9af2b]": props.variant === "yellow",
    "text-[#57b8eb]": props.variant === "blue",
    "text-[#7383bf]": props.variant === "purple",
  };

  return (
    <>
      <div
        className={classNames(
          "relative flex w-1/4 flex-none cursor-pointer select-none flex-col overflow-hidden rounded-xl p-4 hover:shadow-md md:p-5",
          bgColors
        )}
      >
        <img
          className="self-center"
          draggable="false"
          src={props.image}
          width={200}
          alt="Topic illustration"
        />
        <img
          className="z-1 absolute bottom-0 right-2"
          draggable="false"
          src={props.blob}
          alt="blob"
          width={150}
        />
        <div className="container z-10">
          <p className="text-left text-xl font-semibold capitalize text-white">
            {props.topicName}
          </p>
          <span className="text-sm font-thin leading-5 text-white line-clamp-2">
            {props.topicDescription}
          </span>
          <div className="mt-2 flex justify-between">
            <div className="flex items-center gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                <IconBook
                  className={classNames(
                    "text-[10px] text-[#f9af2b]",
                    textColors
                  )}
                />
              </div>
              <span className="text-[12px] font-light text-white">
                {props.courses} courses
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                <IconUser className="text-[10px] text-blue-300" />
              </div>
              <span className="text-[12px] font-light text-white">
                {props.students} students
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
