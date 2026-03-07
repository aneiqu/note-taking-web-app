import PlusIcon from "@/app/assets/icons/icon-plus.svg";
import SearchIcon from "@/app/assets/icons/icon-search.svg";
import SettingsIcon from "@/app/assets/icons/icon-settings.svg";
import LogoFeather from "@/app/assets/icons/logo-feather.svg";
import LogoTextDark from "@/app/assets/icons/logo-text-dark.svg";
import LogoTextWhite from "@/app/assets/icons/logo-text-white.svg";
import { Icons } from "@/app/ui/dashboard/NavIcons";
import Sidebar from "@/app/ui/dashboard/Sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-700 h-screen flex flex-col lg:flex-row '>
      <div className='flex flex-col gap-7 pl-4 py-3 lg:py-4 lg:px-3 lg:bg-white lg:min-w-68 border-r border-neutral-100'>
        <div className='flex gap-2.5 '>
          <LogoFeather />
          <LogoTextWhite className='dark:hidden' />
          <LogoTextDark className='hidden dark:block' />
        </div>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full h-full '>
        <div className='flex flex-col items-center bg-white px-4 gap-4 dark:bg-neutral-950 rounded-12 rounded-b-0 h-full lg:rounded-0 lg:h-fit lg:flex-row lg:px-8 lg:py-[18.5px] lg:items-center lg:border-b border-neutral-100'>
          <div className='hidden lg:flex items-center w-full gap-4'>
            <h2 className='text-preset-1'>All Notes</h2>
            <div className='relative flex items-center ml-auto'>
              <SearchIcon className='fill-neutral-500 left-4 absolute' />
              <input
                type='text'
                placeholder='Search by title, content, or tags…'
                className='border border-neutral-300 px-4 py-3 text-preset-5 rounded-lg w-75 pl-11'
              />
            </div>
            <SettingsIcon className='**:fill-neutral-500 cursor-pointer' />
          </div>
          <div className='lg:hidden h-full'>{children}</div>
        </div>
        <div className='hidden w-full h-full bg-white lg:block overflow-hidden'>{children}</div>
      </div>
      <nav className='grid grid-flow-col auto-cols-fr w-screen bottom-0 items-center fixed h-fit py-3 px-4 bg-white shadow-[-2.5px_10px_15px_6px] shadow-neutral-200 outline-1 outline-neutral-200 lg:hidden'>
        <div className='absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500 flex items-center justify-center right-4 md:right-8 bottom-full mb-4 md:mb-8'>
          <PlusIcon className='**:fill-white' />
        </div>
        <Icons />
      </nav>
    </div>
  );
}
