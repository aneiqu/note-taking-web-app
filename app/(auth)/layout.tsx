import LogoFeather from "@/app/assets/icons/logo-feather.svg";
import LogoTextDark from "@/app/assets/icons/logo-text-dark.svg";
import LogoTextWhite from "@/app/assets/icons/logo-text-white.svg";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-700 h-screen flex items-center m-auto p-4 md:px-32 justify-center '>
      <div className='flex flex-col items-center bg-white py-12 px-4 gap-4 border border-neutral-200 dark:bg-neutral-950 dark:border-neutral-700 rounded-(--radius-12) w-full  max-w-135'>
        <Link href={"./"} className='flex gap-2.5 items-center justify-center mb-2'>
          <LogoFeather />
          <LogoTextWhite className='dark:hidden' />
          <LogoTextDark className='hidden dark:block' />
        </Link>
        {children}
      </div>
    </div>
  );
}
