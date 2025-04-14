import AddMoney from "./AddMoney";
import WalletCard from "./WalletCard";

const Wallet = async () => {
  return (
    <div className="py-10 flex flex-col gap-4">
      <WalletCard />
      <AddMoney />
    </div>
  );
};

export default Wallet;
