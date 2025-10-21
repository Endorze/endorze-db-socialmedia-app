import { createClient } from "./server-client";
import { v4 as uuid } from "uuid";

export const uploadImage = async (image: File) => {
  const supabase = await createClient();

  const imageName = image.name.split(".");
  const path = `${imageName[0]}-${uuid()}.${imageName[1]}`;

  const { data, error } = await supabase.storage
    .from("images-enddit")
    .upload(path, image);

  if (error) throw error;

  const { data: { publicUrl } } = await supabase.storage
    .from("images-enddit")
    .getPublicUrl(data.path);

  return publicUrl;
};
