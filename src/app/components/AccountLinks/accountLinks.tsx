"use server"
import Link from "next/link"
import { BurgerMenu } from "../BurgerMenu/burgerMenu";
import { getLoggedInUser } from "../../../../utils/supabase/server-queries";

const AccountLinks = async () => {

  const { user, error } = await getLoggedInUser();

console.log(error)

  return (
    <>
      {user ?
        <>
          <BurgerMenu user={user}/>
        </>
        : <Link
          href="/auth/login"
          className="button-secondary whitespace-nowrap flex items-center justify-center px-3 flex-shrink-0"
        >
          Log In
        </Link>

      }
    </>
  )
}

export default AccountLinks;