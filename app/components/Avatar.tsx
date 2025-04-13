"use client";
import Image from "next/image";
import { FC, useMemo } from "react";

interface AvatarProps {
  src?: string | undefined | null;
  size?: string;
}

const Avatar: FC<AvatarProps> = ({ src = null, size = "sm" }) => {
  const imageSize = useMemo(() => {
    switch (size) {
      case "sm":
        return 30;
      case "lg":
        return 80;
      default:
        return 30;
    }
  }, [size]);
  console.log({ size });
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={imageSize}
      width={imageSize}
      src={src || "/images/placeholder.png"}
    />
  );
};

export default Avatar;
