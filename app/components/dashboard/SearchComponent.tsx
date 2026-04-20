"use client";

import SearchIcon from "@/app/assets/icons/icon-search.svg";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>(() => {
    const search = searchParams.get("q");
    if (!search) return "";
    return search;
  });

  const handleUserActionSearch = (key: string) => {
    if (key === "Enter") router.replace(`/dashboard/search?q=${searchValue}`);
  };

  return (
    <div
      className='relative flex items-center ml-auto'
      onKeyDown={(e) => handleUserActionSearch(e.code)}
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
