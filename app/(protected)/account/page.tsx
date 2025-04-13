import UserInfo from "@/app/components/account/UserInfo";
import UserOptions from "@/app/components/account/UserOptions";

const Account = () => {
  return (
    <div className="size-full flex flex-col gap-4 p-6">
      {/* Account Page */}
      <UserInfo />
      <UserOptions />
    </div>
  );
};

export default Account;
