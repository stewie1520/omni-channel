import ImageIcon from "public/images/icons/university.png";

export const IconUniversity = () => {
  return (
    <img
      src={ImageIcon}
      className="inline"
      width={24}
      height={24}
      draggable={false}
      alt={"university"}
    />
  );
};
