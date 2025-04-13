"use client";
import { capitalize } from "@/app/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { CgChevronLeft } from "react-icons/cg";

const layout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname() || "";
  const pageName = pathname.split("/").pop();
  const router = useRouter();

  if (!pageName) return;

  return (
    <div className="size-full p-6">
      <div className="Header flex items-center justify-between">
        <CgChevronLeft
          className="cursor-pointer hover:text-primary-950"
          size={30}
          onClick={() => router.back()}
        />
        <h1 className="font-medium text-2xl">{capitalize(pageName)}</h1>
        <span></span>
      </div>
      {children}
    </div>
  );
};

export default layout;
