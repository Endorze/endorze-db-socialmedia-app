"use client"
import { useQuery } from "@tanstack/react-query"
import { getMainFeedPosts, PostType } from "../../../../../utils/supabase/queries"
import Post from "../../Post/post"
import { createClient } from "../../../../../utils/supabase/browser-client"

const MainFeed = ({ posts }: { posts: PostType[] }) => {

    const { data } = useQuery({
        queryKey: ["mainfeed-posts"],
        queryFn: async () => {
            const supabase = createClient();
            const { posts, error } = await getMainFeedPosts(supabase)
            if (error) throw new Error;
            return posts;
        },
        initialData: posts,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    })

    return (
        <div>
            <div className=" mx-auto mt-4">
                {
                    data && data.map((post, index) => {
                        return (
                            <div key={index}>
                                <div className="flex gap-2">
                                    <Post
                                        post={post}
                                    />
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainFeed;