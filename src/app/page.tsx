import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Post from "./components/Post/post";
import { getMainFeedPosts } from "../../utils/supabase/queries";
import MainFeed from "./components/Home/MainFeed";

dayjs.extend(relativeTime);

export default async function Home() {
    const { data, error } = await getMainFeedPosts();

    console.log("data:", data, "error:", error)

    return (
        <div className="w-[80%] mx-auto mt-4">
            <MainFeed posts={data!}/>
        </div>
    )
}