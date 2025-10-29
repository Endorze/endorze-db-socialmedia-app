type Props = {
    onClick: () => void;
    replyCount: number;
};

export const ReplyButton = ({ onClick, replyCount }: Props) => {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer w-fit font-semibold text-sm text-blue-600 hover:underline"
        >
            <span>
                {replyCount > 0
                    ? `Show ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`
                    : "Reply"}
            </span>
        </button>
    );
};
