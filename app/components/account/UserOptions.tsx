"use client";

import { signOut } from "next-auth/react";
import { Button } from "../Button";
import { GiWallet } from "react-icons/gi";
import Link from "next/link";
import { capitalize } from "@/app/lib/utils";
import {
  CiCircleInfo,
  CiLocationOn,
  CiSettings,
  CiStar,
  CiWallet,
} from "react-icons/ci";
import { BiStar } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

const UserOptions = () => {
  const options = [
    {
      label: "wallet",
      href: "wallet",
      icon: <CiWallet />,
    },
    {
      label: "My Rating",
      icon: <CiStar />,
      href: "rating",
    },
    {
      label: "Addresses",
      icon: <CiLocationOn />,
      href: "addresses",
    },
    {
      label: "Settings",
      icon: <CiSettings />,
      href: "settings",
    },
    {
      label: "About Kaarya",
      icon: <CiCircleInfo />,
      href: "about",
    },
  ];
  return (
    <div className="grow flex flex-col gap-2 shadow-sm overflow-y-auto">
      {options.map((e) => (
        <Link
          key={e.label + "-Link"}
          className="py-2 items-center flex gap-2 w-full hover:text-primary-950"
          href={"account/" + e.href}
        >
          {e.icon}
          {capitalize(e.label)}
        </Link>
      ))}
      <Button
        variant={"outlinered"}
        className="w-full"
        onClick={() => signOut()}
      >
        Log out
      </Button>
    </div>
  );
};

export default UserOptions;
