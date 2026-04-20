"use client";

import SearchIcon from "@/app/assets/icons/icon-search.svg";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchComponent() {
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>(() => {
    const search = searchParams.get("q");
    if (!search) return "";
    return search;
  });

  return (
    <div
      className='relative flex items-center ml-auto'
      onKeyDown={(e) => {
        if (e.code === "Enter") redirect(`/dashboard/search?q=${searchValue}`);
      }}
    >
      <Link
        href={{
          pathname: "/dashboard/search",
          query: { q: searchValue },
        }}
        className='left-4 absolute'
      >
        <SearchIcon className='**:fill-neutral-500 dark:**:fill-neutral-400 ' />
      </Link>
      <input
        type='text'
        placeholder='Search by title, content, or tags…'
        className='border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-preset-5 dark:text-neutral-400 rounded-lg w-full lg:w-75 pl-11 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-1 focus:outline-neutral-950 focus:ring-2 focus:ring-offset-3 focus:ring-neutral-400  duration-200 '
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
