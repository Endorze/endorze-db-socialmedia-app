import { getSinglePost } from "../../../../../utils/supabase/queries"
import EditForm from "./editForm/editForm"


const EditPage = async ({params}: {params: {slug:string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePost(slug)

    return (
        <div>
            {data && (
                <div>
                    <EditForm postId={data.id} currentPost={{title: data.title, content: data.content}}/>
                </div>
            )}
        </div>
    )
}

export default EditPage;