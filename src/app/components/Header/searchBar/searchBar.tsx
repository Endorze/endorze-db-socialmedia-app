"use client"
import { SetStateAction, useState } from "react"
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchForPosts } from "../../../../../utils/supabase/queries";
import Link from "next/link";

const SearchBar = () => {

    const [userInput, setUserInput] = useState<string>("");

    const { data } = useQuery({
        queryKey: ["search-results", userInput],
        queryFn: async () => {
            const { data, error } = await searchForPosts(userInput)
            if (error) throw new Error;
            return data;
        },
        enabled: userInput && userInput.length > 0 ? true : false
    })

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUserInput(e.target.value)
    }

    const reset = () => {
        setUserInput("");
    }

    return (
        <div className="relative flex items-center min-w-0 flex-1">
            <div className="flex h-[36px] items-center max-w-[250px] sm:max-w-[400px] md:max-w-[600px] flex-shrink gap-2 p-2 border border-gray-300 rounded-2xl">
                <Search size={16} />
                <input
                    className="border-0 outline-none w-full min-w-0 text-sm"
                    name="search"
                    placeholder="Search by post title"
                    value={userInput}
                    onChange={handleChange}
                />
            </div>

            {data && (
                <div className="absolute z-10 bg-gray-200 text-white w-[300px] top-full left-0 mt-1  rounded-md shadow-sm">
                    {data.map(({ title, slug }) => (
                        <Link
                            onClick={reset}
                            className="block px-2 py-1 hover:bg-gray-300 text-black font-sem"
                            key={slug}
                            href={`/${slug}`}
                        >
                            {title}
                        </Link>
                    ))}
                </div>
            )}
        </div>


    )
}

export default SearchBar;