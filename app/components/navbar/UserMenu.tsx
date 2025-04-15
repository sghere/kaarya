"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import useToggle from "@/app/hooks/useToggle";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { FC } from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface UserMenuProps {
  currentUser?: User;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, toggleOpen] = useToggle();
  const { onOpen } = useRegisterModal();
  const { onOpen: onLoginOpen } = useLoginModal();
  const avatar = currentUser?.image;
  return (
    <div className="relative">
      <div
        className="cursor-pointer
        rounded-full
        border-2 border-solid border-gray-300
        md:px-2
        md:py-1
        p-4
        flex gap-2
        items-center
      "
        onClick={toggleOpen}
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={avatar} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-[20ch] top-12 right-0 bg-white  rounded-xl border-gray-200 border-[1px]">
          <div className="grid gap-2">
            {currentUser ? (
              <>
                <label htmlFor="" className="p-4 font-bold text-xl">
                  Hello, {currentUser?.name}
                </label>
                <MenuItem
                  className="text-red-500"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={onLoginOpen}>Login</MenuItem>
                <MenuItem onClick={onOpen}>Signup </MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
