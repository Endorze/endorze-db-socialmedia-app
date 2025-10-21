import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const PostActions = () => {
    return (
        <div className="flex gap-2 justify-evenly max-w-[600px] mx-auto">
            <button className='flex items-center cursor-pointer w-fit gap-1.5'>
                <span>
                    <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: "18px" }} />
                </span>
                Like
            </button>
            <button className='flex items-center cursor-pointer w-fit gap-1.5'>
                <span>
                    <FontAwesomeIcon icon={faComment} style={{ fontSize: "18px" }} /> {/* Kommentera */}
                </span>
                Comment
            </button>
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

export default PostActions