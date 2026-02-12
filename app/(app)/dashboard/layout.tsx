import LogoFeather from "@/app/assets/icons/logo-feather.svg";
import LogoTextDark from "@/app/assets/icons/logo-text-dark.svg";
import LogoTextWhite from "@/app/assets/icons/logo-text-white.svg";
import Icons from "@/app/ui/dashboard/NavIcons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-700 h-screen flex flex-col'>
      <div className='flex gap-2.5 pl-4 py-3'>
        <LogoFeather />
        <LogoTextWhite className='dark:hidden' />
        <LogoTextDark className='hidden dark:block' />
      </div>
      <div className='flex flex-col items-center bg-white px-4 gap-4  dark:bg-neutral-950 rounded-(--radius-12) rounded-b-0 h-full'>
        {children}
      </div>
      <div className='flex h-fit py-3 px-4 justify-around bg-white shadow-[-2.5px_10px_15px_6px] shadow-neutral-200 outline-1 outline-neutral-200'>
        <Icons />
      </div>
    </div>
  );
}
