import AccountLinks from "../AccountLinks/accountLinks";
import { BurgerMenu } from "../BurgerMenu/burgerMenu";
import Logo from "../Logo/logo";
import SearchBar from "./searchBar/searchBar";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center p-2 fixed top-0 left-0 w-full bg-white">
        <div className="flex gap-2">
        <Logo />
        <SearchBar />

        </div>
        <AccountLinks />
      </header>
    </>
  );
}

export default Header;