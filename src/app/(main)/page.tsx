import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMainFeedPosts } from "../../../utils/supabase/queries";
import MainFeed from "../components/Home/MainFeed/mainFeed";
import { createClient } from "../../../utils/supabase/server-client";

dayjs.extend(relativeTime);

export const revalidate = 30;

export default async function Home() {
    const supabase = await createClient("Home");
    const { data, error } = await getMainFeedPosts(supabase);

    return (
        <div>
            <MainFeed posts={data!}/>
        </div>
    )
}