"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import useToggle from "@/app/hooks/useToggle";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const [isOpen, toggleOpen] = useToggle();
  const { onOpen } = useRegisterModal();
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
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-[20ch] top-12 right-0 bg-white  rounded-xl border-gray-200 border-[1px]">
          <div className="grid gap-2">
            <>
              <MenuItem>Login</MenuItem>
              <MenuItem onClick={onOpen}>Signup </MenuItem>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
