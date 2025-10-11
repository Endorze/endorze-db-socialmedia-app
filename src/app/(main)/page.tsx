import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMainFeedPosts } from "../../../utils/supabase/queries";
import MainFeed from "../components/Home/MainFeed/mainFeed";
import { createClient } from "../../../utils/supabase/server-client";

dayjs.extend(relativeTime);

export default async function Home() {
    const supabase = await createClient();
    const { data, error } = await getMainFeedPosts(supabase);

    console.log("data:", data, "error:", error)

    return (
        <div className="w-[80%] mx-auto mt-4">
            <MainFeed posts={data!}/>
        </div>
    )
}