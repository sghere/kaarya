import Container from "../Container";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="w-full bg-white fixed">
      <div className="NavLogo py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            <h3>Logo Kaarya</h3>
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
