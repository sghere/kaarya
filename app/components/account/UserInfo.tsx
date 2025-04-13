"use client";
import { GoPencil } from "react-icons/go";
import Avatar from "../Avatar";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import useApiStore from "@/app/hooks/useApiStore";

const UserInfo = () => {
  const { user } = useUser();
  const { wallet } = useApiStore();
  const router = useRouter();
  return (
    <div className="p-6 flex  border border-gray-50 rounded shadow-sm items-center gap-4">
      <Avatar src={user?.image} size="lg" />
      <div className="UserInfo  grid  ">
        <div className="flex gap-2 items-center truncate">
          <h1 className="text-lg  gap-2 max-w-[16ch] truncate">{user?.name}</h1>
          <GoPencil
            className="hover:text-primary-950 cursor-pointer transition"
            size={15}
            onClick={() => router.push("account/edit")}
          />
        </div>
        <p className="text-xs text-gray-400"> {user?.number}</p>
        {wallet?.balance && (
          <p className="text-xs text-gray-400">Balance: {wallet?.balance}</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
