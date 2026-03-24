"use client";

import { usePathname } from "next/navigation";

interface PageHeaderProps {
  classes?: string;
}

export default function PageHeader({ classes }: PageHeaderProps) {
  const path = usePathname();

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
      ) : (
        <div className='dark:text-white'>All Notes</div>
      )}
    </div>
  );
}
