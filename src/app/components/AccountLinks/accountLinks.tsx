import Link from "next/link"
import { createClient } from "../../../../utils/supabase/server-client"
import LogoutButton from "../Buttons/LogoutButton/logoutButton";

const AccountLinks = async () => {

  const supabase = await createClient("AccountLinks");
  const {data: {user}, error} = await supabase.auth.getUser();

  return (
    <>
      {user ? 
      <>
        <Link href="/create" className="button-tertiary fixed bottom-[50px] right-[50px] px-4 py-2 w-fit border-4">Create Post</Link>
        <LogoutButton />
      </>
       : <Link href="/auth/login" className="button-secondary">Log In</Link>
      }
    </>
  )
}

export default AccountLinks;