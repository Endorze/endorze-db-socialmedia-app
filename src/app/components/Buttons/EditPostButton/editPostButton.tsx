import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"

const EditPostButton = async ({slug}: {slug: string}) => {
    return (
        <Link href={`${slug}/edit`} className="button-tertiary px-4 py-2 w-fit">
            <span><FontAwesomeIcon icon={faPenToSquare}/></span>Edit Post</Link>
    )
}

export default EditPostButton;