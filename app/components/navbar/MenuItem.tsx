"use client";

import { cn } from "@/app/lib/utils";
import { FC } from "react";

interface MenuItemProps {
  onClick?: () => void;
  children: string;
  className?: string;
}
const MenuItem: FC<MenuItemProps> = ({ onClick, children, className }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "px-4 transition font-semibold cursor-pointer py-3 hover:bg-neutral-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MenuItem;
