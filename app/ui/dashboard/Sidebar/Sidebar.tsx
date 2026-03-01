import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className='flex-col gap-2 hidden lg:flex'>
      <div className='text-preset-4'>
        <Link href='/dashboard'>
          <SidebarItem icon={"home"} label='All Notes' activePath='' variant='fill' />
        </Link>
        <Link href='/dashboard/archived'>
          <SidebarItem
            icon={"archive"}
            label={"Archived Notes"}
            activePath='/archived'
            variant='stroke'
          />
        </Link>
      </div>
      <hr className='w-full h-1 text-neutral-200' />
      <div className='px-2 text-preset-4 text-neutral-500'>Tags</div>
      <div className=''>
        <Link href='/dashboard/tag'>
          <SidebarItem icon={"tag"} label={"Dummy note"} activePath='/tag' variant='stroke' />
        </Link>
      </div>
    </div>
  );
}
