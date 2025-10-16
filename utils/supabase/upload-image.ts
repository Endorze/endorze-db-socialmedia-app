import { createClient } from "./server-client"
import { v4 as uuid } from "uuid"

//this util makes sure we can upload an image through post.
//To setup a bucket you go to supabase, storage, new bucket, public bucket and enter a name, create.
//In my example my bucket is named "images-enddit". We're making sure to format the img name so that we can use UUID.
export const uploadImage = async (image: File) => {
    const supabase = await createClient()

    const imageName = image.name.split('.')
    const path = `${imageName[0]}-${uuid()}.${imageName[1]}`

    const {data, error} = await supabase.storage.from("images-enddit").upload(path, image)

    if (error) throw error

    const {data: {publicUrl}} = await supabase.storage.from("images-enddit").getPublicUrl(data.path)

    return publicUrl;
}