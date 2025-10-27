type Props = {
    onClick: () => void,
    replyCount: number;
}

export const ReplyButton = ({ onClick, replyCount }: Props) => {
    return (
        <button
            className="cursor border-1"
            onClick={onClick}>
            <span>{replyCount === 1 ? "show replies" : "reply"}</span>
        </button>
    )
}

