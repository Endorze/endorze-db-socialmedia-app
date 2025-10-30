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
        <Link href="/create" className="max-[500px]:bottom-[20px] max-[500px]:right-[20px] button-tertiary fixed bottom-[50px] right-[50px] w-fit">Create Post</Link>

      </>
       : <Link href="/auth/login" className="button-secondary">Log In</Link>
      }
    </>
  )
}

export default AccountLinks;