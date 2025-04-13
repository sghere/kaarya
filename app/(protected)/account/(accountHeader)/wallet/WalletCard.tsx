"use client";
import useApiStore from "@/app/hooks/useApiStore";
import useUser from "@/app/hooks/useUser";
import { useEffect } from "react";
const WalletCard = () => {
  const { wallet, loading, error, fetchData } = useApiStore();

  useEffect(() => {
    fetchData("/api/wallet", "wallet");
  }, []);

  if (loading) return "Loading...";

  if (error) return "Some error";

  return (
    <div className="p-4">
      <h1 className="text-4xl">Balance: {wallet?.balance}</h1>
    </div>
  );
};

export default WalletCard;
