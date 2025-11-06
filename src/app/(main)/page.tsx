import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMainFeedPosts } from "../../../utils/supabase/queries";
import MainFeed from "../components/Home/MainFeed/mainFeed";
import { createClient } from "../../../utils/supabase/server-client";
import Link from "next/link";

dayjs.extend(relativeTime);

export const revalidate = 30;

export default async function Home() {
    const supabase = await createClient("Home");
    const { posts, error } = await getMainFeedPosts(supabase);

    if (error) {
        console.log(posts)
        return <>Could not load main feed</>
    }

    return (
        <div>
            <Link href="/create" className="max-[500px]:bottom-[20px] max-[500px]:right-[20px] button-tertiary fixed bottom-[50px] right-[50px] w-fit">Create Post</Link>
            <MainFeed posts={posts} />
        </div>
    )
}