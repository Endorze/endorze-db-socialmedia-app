import { getSinglePost } from "../../../../utils/supabase/queries";
import Post from "@/app/components/Post/post";

const SingleFeed = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);

  if (error || !data) {
    console.error("Post fetch error:", error?.message);
    return <p>Post not found or failed to load.</p>;
  }

  return (
    <div>
      <p>single feed</p>
      <div className="flex gap-2">
        <Post
          content={data.content}
          title={data.title}
          username={data.users.username}
          created_at={data.created_at}
          slugText={data.slug}
        />
      </div>
    </div>
  );
};

export default SingleFeed;
