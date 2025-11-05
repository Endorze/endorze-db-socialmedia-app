"use client"
import { useRef, useState } from "react"
import { createClient } from "../../../../../utils/supabase/browser-client"
import { updateProfileAvatar } from "../../../../../actions/updateProfileAvatar"
import { uploadProfileAvatar } from "../../../../../actions/uploadProfileAvatar"

type Props = {
    userId: string | null,
}

export const ProfileAvatar = ({ userId }: Props) => {

    const [useBackupImage, setUseBackupImage] = useState(false)
    const [random, setRandom] = useState(new Date().valueOf())
    const avatarUrl = `https://zjlhxbimfkzninrfzaiy.supabase.co/storage/v1/object/public/avatars-enddit/${userId}.avatar?t=${random}`

    const fileInputRef = useRef<HTMLInputElement>(null)
    // const [currentImage, setCurrentImage] = useState(imageUrl);

    //this function keeps track on filechange for avatar iamge on profilepage
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const publicUrl = await uploadProfileAvatar(file);

        if (publicUrl) {
            setRandom(new Date().valueOf())
            setUseBackupImage(false)
        }
    }

    return (
        <div className="relative w-32 h-32 md:w-48 md:h-48 ml-6 -mt-16 md:-mt-24 md:ml-16">
      <img
        src={useBackupImage ? "/default-avatar.png" : avatarUrl}
        className="rounded-full object-cover w-full h-full border"
        alt="Profile avatar"
        onError={() => {
            setUseBackupImage(true)
        }}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
        title="Byt profilbild"
      >
        byt bild
      </button>
    </div>
    )
}