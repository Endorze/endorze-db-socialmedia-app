import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import LikeButton from '../Buttons/LikeButton/likeButton'
import { CommentButton } from '../Buttons/CommentButton/commentButton';


export default function PostActions({
    postId,
    initialLiked,
    likeCount,
    commentCount,
    commentsVisible,
    setCommentsVisible
}: {
    postId: number;
    initialLiked: boolean;
    likeCount: number;
    commentCount: number;
    commentsVisible: boolean;
    setCommentsVisible: (newVisible: boolean) => void;
}) {

    return (
        <div className="flex gap-2 justify-evenly max-w-[600px] mx-auto w-full  mt-4 ">
            <LikeButton postId={postId} initialLiked={initialLiked} likeCount={likeCount} />
            <CommentButton onClick={() => setCommentsVisible(!commentsVisible)} commentCount={commentCount} />
            <button className='flex items-center cursor-pointer w-fit gap-1.5'>
                <span>
                    <FontAwesomeIcon icon={faShare} style={{ fontSize: "18px" }} />
                </span>
                <p className="max-[500px]:hidden">

                    Share
                </p>
            </button>
            <button className='flex items-center cursor-pointer w-fit gap-1.5'>
                <span>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "18px" }} />
                </span>
                <p className="max-[500px]:hidden">
                    Send
                </p>
            </button>
        </div>
    )

}
