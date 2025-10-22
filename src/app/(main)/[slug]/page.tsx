import { getSinglePost } from "../../../../utils/supabase/queries";
import Post from "@/app/components/Post/post";
import { createClient } from "../../../../utils/supabase/server-client";
import DeleteButton from "@/app/components/Buttons/DeleteButton/deleteButton";
import EditPostButton from "@/app/components/Buttons/EditPostButton/editPostButton";
import { init } from "next/dist/compiled/webpack/webpack";

export const dynamic = "force-dynamic";

const SingleFeed = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data: currentPost, error } = await getSinglePost(slug);

  if (error || !currentPost) {
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
      <p>{currentPost.user_id}</p>
      <p>Author: {user?.id}</p>

      {isAuthor &&

        <div>
          <DeleteButton postId={currentPost.id} />
          <EditPostButton slug={currentPost.slug} />
        </div>
      }

      {currentPost.image ? (
        <div className="flex gap-2">
          <Post
            content={currentPost.content}
            title={currentPost.title}
            username={currentPost.users.username}
            created_at={currentPost.created_at}
            slugText={currentPost.slug}
            image={currentPost.image}
            likeCount={likeCount}
            initialLiked={initialLiked}
            id={currentPost.id}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Post
            content={currentPost.content}
            title={currentPost.title}
            username={currentPost.users.username}
            created_at={currentPost.created_at}
            slugText={currentPost.slug}
            initialLiked={initialLiked}
            likeCount={likeCount}
            id={currentPost.id}
          />
        </div>
      )}
    </div>
  );
};

export default SingleFeed;
