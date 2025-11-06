import { getSinglePost } from "../../../../../utils/supabase/queries"
import EditForm from "./editForm/editForm"


const EditPage = async ({params}: {params: {slug:string}}) => {
    const {slug} = await params
    const {value: data, error} = await getSinglePost(slug)

    return (
        <div>
            {data && (
                <div>
                    <EditForm postId={data.id} currentPost={{title: data.title, content: data.content, image: data.image}}/>
                </div>
            )}
        </div>
    )
}

export default EditPage;