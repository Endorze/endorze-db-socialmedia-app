import { ProfileBanner } from "@/app/components/profile/ProfileBanner/profileBanner";
import { createClient } from "../../../../../utils/supabase/browser-client";
import { ProfileAvatar } from "@/app/components/profile/ProfileAvatar/profileAvatar";

interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
    const { username } = await params;
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, username")
        .eq("username", username)
        .single();

    if (userError || !userData) {
        return <p className="text-center mt-20">Profile could not be found.</p>;
    }

    const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userData.id)
        .single();

    console.log("userData:", userData);
    console.log("profileError:", profileError);
    console.log("profile:", profile);


    if (profileError || !profile) {
        return <p className="text-center mt-20">This user has no profile yet.</p>;
    }

    return (
        <div>
            <ProfileBanner bannerUrl={profile.banner_url} />

            <div className="flex">
                <ProfileAvatar imageUrl={profile.avatar_url} />
                <div className="flex flex-col leading-tight">
                    <p className="text-3xl md:text-4xl font-bold ">{username}</p>
                    <p className="text-gray-700">
                        {profile.description || "No description."}
                    </p>
                </div>
            </div>


        </div>
    );
};

export default ProfilePage;
