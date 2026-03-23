import data from "@/app/assets/data/data.json";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

export default function SidebarTagItems() {
  const tags = Array.from(new Set(data.notes.flatMap((note) => note.tags)));

  return (
    <>
      {tags.map((tag) => {
        const tagSlug = encodeURIComponent(tag).toLowerCase();
        return (
          <Link key={tag} href={`/dashboard/tag/${tagSlug}`}>
            <SidebarItem icon='tag' label={tag} activePath={`/tag/${tagSlug}`} variant='stroke' />
          </Link>
        );
      })}
    </>
  );
}
