"use client";

import { signOut } from "next-auth/react";
import { Button } from "../Button";

const UserOptions = () => {
  const options = [];
  return (
    <div className="grow shadow-sm overflow-y-auto">
      <Button variant={"outline"} onClick={() => signOut()}>
        Log Out
      </Button>
    </div>
  );
};

export default UserOptions;
