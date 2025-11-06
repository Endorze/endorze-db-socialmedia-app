import { useState } from "react";
import { getAvatarUrl } from "../../../../actions/getAvatarUrl";

const Avatar = ({ userId }: { userId: string }) => {

    const [imageUrl, setImageUrl] = useState(getAvatarUrl(userId));

    return (
        <img
        onError={() => setImageUrl("/default-avatar.png")} src={imageUrl} className="rounded-full w-[40px] h-[40px] object-cover" />
    )
}

export default Avatar;