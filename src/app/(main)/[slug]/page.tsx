import { getSinglePost } from "../../../../utils/supabase/queries";
import Post from "@/app/components/Post/post";
import { createClient } from "../../../../utils/supabase/server-client";
import DeleteButton from "@/app/components/Buttons/DeleteButton/deleteButton";
import EditPostButton from "@/app/components/Buttons/EditPostButton/editPostButton";

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

  return (
    <div>
      <p>{currentPost.user_id}</p>
      <p>Author: {user?.id}</p>

      {isAuthor && 
      
      <div>
        <DeleteButton postId={currentPost.id} />
        <EditPostButton slug={currentPost.slug}/>
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
          />
        </div>
      )}
    </div>
  );
};

export default SingleFeed;
