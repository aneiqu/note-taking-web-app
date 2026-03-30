import { getAllTags } from "@/utils/getNotes";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

export default async function SidebarTagItems() {
  const tags = await getAllTags();

  return (
    <>
      {tags.map((tag) => {
        const tagSlug = encodeURIComponent(tag).toLowerCase();
        return (
          <div key={tag} className='last:[&>hr]:hidden'>
            <Link href={`/dashboard/tag/${tagSlug}`}>
              <SidebarItem icon='tag' label={tag} activePath={`/tag/${tagSlug}`} variant='stroke' />
            </Link>
            <hr className='text-neutral-200 dark:text-neutral-800 lg:hidden' />
          </div>
        );
      })}
    </>
  );
}
