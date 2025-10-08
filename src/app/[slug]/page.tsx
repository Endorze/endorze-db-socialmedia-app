import { getSinglePost } from "../../../utils/supabase/queries";
import Post from "../components/Post/post";

const singleFeed = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    
    const { data, error } = await getSinglePost(slug);
    console.log(data)

    return (
        <div>
            <p>single feed</p>
            <div className="flex gap-2">
                <Post content={data!.content} title={data!.title} username={data!.users.username} created_at={data!.created_at} slugText={data!.slug} />
            </div>
        </div>
    )
}

export default singleFeed