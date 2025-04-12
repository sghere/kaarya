"use client";

import { FC } from "react";

interface MenuItemProps {
  onClick?: () => void;
  children: string;
}
const MenuItem: FC<MenuItemProps> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 transition font-semibold cursor-pointer py-3 hover:bg-neutral-100"
    >
      {children}
    </div>
  );
};

export default MenuItem;
