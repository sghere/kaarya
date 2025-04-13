"use client";
import { GoPencil } from "react-icons/go";
import Avatar from "../Avatar";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="p-6 flex justify-center border border-gray-50 rounded shadow-sm items-center gap-4">
      <Avatar src={user?.image} size="lg" />
      <div className="UserInfo  grid gap-2 ">
        <div className="flex gap-2 truncate">
          <h1 className="text-3xl  font-bold  gap-2 max-w-[13ch] truncate">
            {user?.name}
          </h1>
          <GoPencil
            className="hover:text-primary-950 cursor-pointer transition"
            size={30}
            onClick={() => router.push("account/edit")}
          />
        </div>
        <p className="text-xs text-gray-400"> {user?.number}</p>
      </div>
    </div>
  );
};

export default UserInfo;
