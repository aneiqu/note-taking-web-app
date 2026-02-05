import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import HomeIcon from "@/app/assets/icons/icon-home.svg";
import SearchIcon from "@/app/assets/icons/icon-search.svg";
import SettingsIcon from "@/app/assets/icons/icon-settings.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";
import LogoFeather from "@/app/assets/icons/logo-feather.svg";
import LogoTextDark from "@/app/assets/icons/logo-text-dark.svg";
import LogoTextWhite from "@/app/assets/icons/logo-text-white.svg";
import IconContainer from "@/app/ui/dashboard/IconContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-700 h-screen flex flex-col'>
      <div className='flex gap-2.5 pl-4 py-3'>
        <LogoFeather />
        <LogoTextWhite className='dark:hidden' />
        <LogoTextDark className='hidden dark:block' />
      </div>
      <div className='flex flex-col items-center bg-white my-12 px-4 gap-4  dark:bg-neutral-950 rounded-(--radius-12)'>
        {children}
      </div>
      <div className='flex h-fit py-3 px-4 justify-around bg-white'>
        <HomeIcon className='my-1' />
        <SearchIcon className='my-1' />
        <ArchiveIcon className='my-1' />
        <TagIcon className='my-1' />
        <SettingsIcon className='my-1' />
      </div>
    </div>
  );
}
