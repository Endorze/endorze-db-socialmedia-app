import { MainPostType } from "../../../../../utils/supabase/queries"
import Post from "../../Post/post"

const MainFeed = ({ posts }: { posts: MainPostType }) => {
    return (
        <div>
            <div className="w-[80%] mx-auto mt-4">
                {
                    posts && posts.map((post, index) => {
                        return (
                            <div key={index}>
                                <div className="flex gap-2">
                                    <Post content={post.content} title={post.title} username={post.users.username} created_at={post.created_at} />
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