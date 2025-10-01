import Avatar from "./components/Avatar/avatar"
import PostAuthor from "./components/PostAuthor/postAuthor"

export default function Home() {

    const posts = [
        {
            title: "Hello World",
            author: "Stephen King"
        },
        {
            title: "Hello World",
            author: "Stephen King"
        },
        {
            title: "Hello World",
            author: "Stephen King"
        },
    ]

    return (
        <div className="w-[80%] mx-auto mt-4">
            {
                posts && posts.map((post) => {
                    return (

                        <div className="rounded-xl border-1 p-4">
                            <div className="flex gap-2">
                                <PostAuthor author={post.author}/>
                            </div>
                            <h2 className="font-bold text-xl">{post.title}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}