import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import ChevronRightIcon from "@/app/assets/icons/icon-chevron-right.svg";
import HomeIcon from "@/app/assets/icons/icon-home.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";

export default function Sidebar() {
  return (
    <div className='flex-col gap-2 hidden lg:flex'>
      <div className='text-preset-4'>
        <div className='flex gap-2 items-center py-2.5 px-3 bg-neutral-100 rounded-lg '>
          <HomeIcon className='fill-blue-500' />
          <p>All Notes</p>
          <ChevronRightIcon className='ml-auto' />
        </div>
        <div className='flex gap-2 items-center py-2.5 px-3 rounded-lg'>
          <ArchiveIcon />
          <p>Archived Notes</p>
        </div>
      </div>
      <hr className='w-full h-1 text-neutral-200' />
      <div className='px-2 text-preset-4 text-neutral-500'>Tags</div>
      <div className=''>
        <div className='flex gap-2 items-center py-2.5 px-3 rounded-lg'>
          <TagIcon />
          <p>Dummy note</p>
        </div>
      </div>
    </div>
  );
}
