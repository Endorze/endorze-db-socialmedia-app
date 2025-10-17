import Link from "next/link"

const EditPostButton = async ({slug}: {slug: string}) => {
    return (
        <Link href={`${slug}/edit`} className="button-tertiary">Edit Post</Link>
    )
}

export default EditPostButton;