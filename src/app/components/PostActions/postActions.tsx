import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import LikeButton from '../Buttons/LikeButton/likeButton'
import { CommentButton } from '../Buttons/CommentButton/commentButton';
import { useState } from 'react';

export default function PostActions({
    postId,
    initialLiked,
    likeCount,
    commentsVisible,
    setCommentsVisible
}: {
    postId: number;
    initialLiked: boolean;
    likeCount: number;
    commentsVisible: boolean;
    setCommentsVisible: (newVisible: boolean) => void;
}) {

    return (
        <div className="flex gap-2 justify-evenly max-w-[600px] mx-auto border-b">
            <LikeButton postId={postId} initialLiked={initialLiked} likeCount={likeCount} />
            <CommentButton onClick={() => setCommentsVisible(!commentsVisible)}/>
            <button className='flex items-center cursor-pointer w-fit gap-1.5'>
                <span>
                    <FontAwesomeIcon icon={faShare} style={{ fontSize: "18px" }} /> {/* Dela */}
                </span>
                Share
            </button>
            <button className='flex items-center cursor-pointer w-fit gap-1.5'>
                <span>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "18px" }} /> {/* Skicka */}
                </span>
                Send
            </button>
        </div>
    )

}
