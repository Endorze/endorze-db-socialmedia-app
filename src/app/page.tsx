import { createClient } from "../../utils/supabase/browser-client"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Post from "./components/Post/post";

dayjs.extend(relativeTime);

export default async function Home() {

    const supabase = createClient();
    const { data, error } = await supabase.from("posts").select("id, title, content, created_at, user_id, users(username)")

    console.log("data:", data, "error:", error)

    return (
        <div className="w-[80%] mx-auto mt-4">
            {
                data && data.map((post, index) => {
                    return (

                        <div key={index} className="rounded-xl border-1 p-4">
                            <div className="flex gap-2">
                                <Post content={post.content} title={post.title} username={post.users.username} created_at={post.created_at}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}