type Props = {
    imageUrl: string | null,
}

export const ProfileAvatar = ({ imageUrl }: Props) => {
    return (
         <img
                src={imageUrl ?? "/default-avatar.png"}
                className="w-32 h-32 ml-6 -mt-16 md:w-48 md:h-48 rounded-full md:-mt-24 md:ml-16"
                alt="Profile avatar"
            />
    )
}