import { User } from "@/app/generated/prisma";
import Container from "../Container";
import UserMenu from "./UserMenu";
import { FC } from "react";

interface NavbarProps {
  currentUser?: User;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className={"hidden sm:block w-full bg-white fixed"}>
      <div className="NavLogo py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            <h3>Logo Kaarya</h3>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
