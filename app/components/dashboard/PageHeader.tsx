"use client";

import { usePathname, useSearchParams } from "next/navigation";

interface PageHeaderProps {
  classes?: string;
}

export default function PageHeader({ classes }: PageHeaderProps) {
  const path = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className={`text-preset-1 ${classes}`}>
      {path.includes("tag") && path.split("/").length > 3 ? (
        <div className='text-neutral-600 dark:text-neutral-400'>
          Notes Tagged:
          <span className='text-neutral-950 dark:text-white'>
            {" " +
              decodeURIComponent(path.split("/")[3])[0].toUpperCase() +
              decodeURIComponent(path.split("/")[3]).slice(1)}
          </span>
        </div>
      ) : path.includes("archived") ? (
        <div className='dark:text-white'>Archived Notes</div>
      ) : path.includes("settings") ? (
        <div className='dark:text-white'>Settings</div>
      ) : path.includes("search") ? (
        <div className='text-neutral-600 dark:text-neutral-300'>
          {searchParams.get("q") !== null ? (
            <>
              Showing results for:{" "}
              <span className='text-neutral-950 dark:text-white'>{searchParams.get("q")}</span>{" "}
            </>
          ) : (
            <span className='text-neutral-950 dark:text-white'>Search</span>
          )}
        </div>
      ) : (
        <div className='dark:text-white'>All Notes</div>
      )}
    </div>
  );
}
