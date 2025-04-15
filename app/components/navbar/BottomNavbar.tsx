"use client";

import Link from "next/link";
import { FC, ReactNode, useEffect } from "react";
import useUser from "@/app/hooks/useUser";

import { GoBriefcase, GoHome, GoMail, GoPerson, GoPlus } from "react-icons/go";

interface BottomNavbarProps {
  currentUser: User;
}

const BottomNavbar: FC<BottomNavbarProps> = ({ currentUser }) => {
  const { setUser } = useUser();
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <div className="fixed bg-white w-full h-20 py-4 border-t text-primary-50 px-10 bottom-0 sm:hidden flex gap-4 items-center justify-between">
      <MenuItem href="/">
        <GoHome size={30} />
      </MenuItem>
      <MenuItem href="/gigs">
        <GoBriefcase size={30} />
      </MenuItem>
      <MenuItem href="/gigs/add">
        <GoPlus size={30} />
      </MenuItem>
      <MenuItem>
        <GoMail size={30} />
      </MenuItem>
      <MenuItem href="/account">
        <GoPerson size={30} />
      </MenuItem>
    </div>
  );
};

interface MenuItemProps {
  children: ReactNode;
  href?: string;
}

const MenuItem: FC<MenuItemProps> = ({ children, href = "" }) => {
  return (
    <Link
      href={href}
      className="flex gap-2 cursor-pointer text-black hover:text-primary-950 transition"
    >
      {children}
    </Link>
  );
};

export default BottomNavbar;
