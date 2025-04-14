"use client";

import useApiStore, { StoreValue } from "@/app/hooks/useApiStore";
import { useEffect } from "react";
import { CiWallet } from "react-icons/ci";

const WalletCard = () => {
  const { wallet, loading, error, fetchData } = useApiStore();

  const balance = wallet?.balance || 0;

  useEffect(() => {
    fetchData("/api/wallet", "wallet");
  }, []);

  if (error) return "Some error";

  return (
    <div className="relative p-4 shadow rounded-2xl h-[200px] group bg-[url(/images/low-poly-grid-haikei.svg)]  grid place-items-center">
      <div className="Seprator flex items-center gap-4 hover:scale-[1.2] transition cursor-pointer">
        <CiWallet size={50} className="text-gray-100 rotate-[325deg]" />
        <h3 className="text-5xl font-bold text-primary-50 ">
          <span className="text-2xl font-medium">$</span>
          {loading ? "Loading..." : balance}
          <span className="text-2xl font-medium text-gray-100">.56</span>
        </h3>
      </div>
      {/* <GoPlus
        className="text-primary-50 p-2 bg-primary-900 hover:scale-105 cursor-pointer transition rounded-full absolute bottom-[-20px]"
        size={50}
      /> 
    */}
    </div>
  );
};

export default WalletCard;
