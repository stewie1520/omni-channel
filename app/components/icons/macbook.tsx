import ImageIcon from "public/images/icons/macbook.png";

export const IconMacbook = () => {
  return (
    <img
      src={ImageIcon}
      className="inline"
      width={24}
      height={24}
      draggable={false}
      alt={"macbook"}
    />
  );
};
