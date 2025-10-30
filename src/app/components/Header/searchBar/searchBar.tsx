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
        <div className="relative flex items-center">
            <div className="flex h-[36px] items-center gap-2 p-2 border border-gray-300 rounded-2xl py-1 px-2">
                <Search size={16} />
                <input className="border-0 outline-0" name="search" placeholder="Search by post title" value={userInput} onChange={handleChange} />
            </div>

            {data &&
                <div className="border absolute z-1 bg-black text-white">
                    {data.map(({ title, slug }) => <Link onClick={reset} className="block" key={slug} href={`/${slug}`}>{title}</Link>)}
                </div>
            }
        </div>

    )
}

export default SearchBar;