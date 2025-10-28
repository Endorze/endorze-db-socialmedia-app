import AccountLinks from "../AccountLinks/accountLinks";
import Logo from "../Logo/logo";
import SearchBar from "./searchBar/searchBar";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center flex-wrap relative">
        <Logo />
        <SearchBar />
        <AccountLinks />
      </header>
        <div className=" pt-4 mx-auto w-[90%] border-b-4"></div>
    </>
  );
}

export default Header;