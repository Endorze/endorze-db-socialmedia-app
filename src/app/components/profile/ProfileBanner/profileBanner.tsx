type Props = {
    bannerUrl: string | null,
}

export const ProfileBanner = ({bannerUrl}: Props) => {
    return (
        <div>
            <img className="w-full h-36 md:h-64 object-cover" src={bannerUrl ?? "/default-banner.jpg"}></img>
        </div>
    )
}