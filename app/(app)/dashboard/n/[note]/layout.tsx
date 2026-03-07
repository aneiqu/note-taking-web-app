import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import TrashIcon from "@/app/assets/icons/icon-delete.svg";
import ReturnButton from "../../../../ui/dashboard/Note/ReturnButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-3 py-5 w-screen px-4 overflow-hidden h-full pb-16 md:pb-20'>
      <div className='flex items-center justify-between text-preset-5'>
        <ReturnButton />

        <div className='flex gap-4 **:stroke-neutral-600'>
          <ArchiveIcon />
          <TrashIcon />
          <button className='text-neutral-600'>Cancel</button>
          <button className='text-blue-500'>Save Note</button>
        </div>
      </div>
      <hr className='text-neutral-200' />
      {children}
    </div>
  );
}
