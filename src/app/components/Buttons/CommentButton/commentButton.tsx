import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    onClick: () => void
}

export const CommentButton = ({onClick}: Props) => {
    return (
        <button onClick={onClick} className='flex items-center cursor-pointer w-fit gap-1.5'>
            <span>
                <FontAwesomeIcon icon={faComment} style={{ fontSize: "18px" }} /> {/* Kommentera */}
            </span>
            Comment
        </button>
    )
}