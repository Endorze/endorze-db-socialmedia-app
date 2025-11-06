import { getSinglePost } from "../../../../utils/supabase/queries";
import Post from "@/app/components/Post/post";
import { createClient } from "../../../../utils/supabase/server-client";
import DeleteButton from "@/app/components/Buttons/DeleteButton/deleteButton";
import EditPostButton from "@/app/components/Buttons/EditPostButton/editPostButton";
import { init } from "next/dist/compiled/webpack/webpack";

export const dynamic = "force-dynamic";

const SingleFeed = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { value: currentPost, error } = await getSinglePost(slug);

  if (error) {
    console.error("Post fetch error:", error?.message);
    return <p>Post not found or failed to load.</p>;
  }

  const supabase = await createClient("SingleFeed");
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  const isAuthor = user?.id === currentPost.user_id;

  const uniqueUserLikes = new Set(currentPost.likes.map((like) => like.user_id));
  const likeCount = uniqueUserLikes.size;
  const initialLiked = user ? uniqueUserLikes.has(user.id) : false;

  return (
    <div>
      {isAuthor &&

        <div className="flex flex-col mx-auto">
          <DeleteButton postId={currentPost.id} />
          <EditPostButton slug={currentPost.slug} />
        </div>
      }

      <div className="flex gap-2">
        <Post
          post={currentPost}
        />
      </div>

    </div>
  );
};

export default SingleFeed;
