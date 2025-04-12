import Image from "next/image";

const Avatar = ({ src = null }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
      src={src || "/images/placeholder.png"}
    />
  );
};

export default Avatar;
