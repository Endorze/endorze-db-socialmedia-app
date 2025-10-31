import Link from "next/link"
import { createClient } from "../../../../utils/supabase/server-client"
import LogoutButton from "../Buttons/LogoutButton/logoutButton";
import { BurgerMenu } from "../BurgerMenu/burgerMenu";

const AccountLinks = async () => {

  const supabase = await createClient("AccountLinks");
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <>
      {user ?
        <>
          <BurgerMenu />
        </>
        : <Link href="/auth/login" className="button-secondary">Log In</Link>
      }
    </>
  )
}

export default AccountLinks;