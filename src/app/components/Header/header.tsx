import AccountLinks from "../AccountLinks/accountLinks";
import { BurgerMenu } from "../BurgerMenu/burgerMenu";
import Logo from "../Logo/logo";
import SearchBar from "./searchBar/searchBar";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between p-2 fixed top-0 left-0 w-full bg-white gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Logo />
          <SearchBar />
        </div>
        <AccountLinks />
      </header>

    </>
  );
}

export default Header;