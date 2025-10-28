"use client"
import { useQuery } from "@tanstack/react-query"
import { getMainFeedPosts, MainPostType } from "../../../../../utils/supabase/queries"
import Post from "../../Post/post"
import { createClient } from "../../../../../utils/supabase/browser-client"

const MainFeed = ({ posts }: { posts: MainPostType }) => {

    const { data } = useQuery({
        queryKey: ["mainfeed-posts"],
        queryFn: async () => {
            const supabase = createClient();
            const { data, error } = await getMainFeedPosts(supabase)
            if (error) throw new Error;
            return data;
        },
        initialData: posts,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    })

    return (
        <div>
            <div className="w-[80%] mx-auto mt-4">
                {
                    data && data.map((post, index) => {
                        return (
                            <div key={index}>
                                <div className="flex gap-2">
                                    <Post
                                        id={post.id}
                                        content={post.content}
                                        title={post.title}
                                        username={post.users.username}
                                        created_at={post.created_at}
                                        slugText={post.slug}
                                        image={post.image ?? undefined}
                                        initialLiked={post.initialLiked}
                                        likeCount={post.likes_count}
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