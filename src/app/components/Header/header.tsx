import AccountLinks from "../AccountLinks/accountLinks";
import Logo from "../Logo/logo";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center flex-wrap">
        <Logo />
        <AccountLinks />
      </header>
        <div className=" pt-4 mx-auto w-[90%] border-b-4"></div>
    </>
  );
}

export default Header;