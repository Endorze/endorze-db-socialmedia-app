import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const CommentButton = () => {
    return (
        <button className='flex items-center cursor-pointer w-fit gap-1.5'>
            <span>
                <FontAwesomeIcon icon={faComment} style={{ fontSize: "18px" }} /> {/* Kommentera */}
            </span>
            Comment
        </button>
    )
}