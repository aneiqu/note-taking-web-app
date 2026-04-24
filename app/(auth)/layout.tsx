import LogoFeather from "@/app/assets/icons/logo-feather.svg";
import LogoTextDark from "@/app/assets/icons/logo-text-dark.svg";
import LogoTextWhite from "@/app/assets/icons/logo-text-white.svg";
import FlashToast from "@/utils/FlashToast";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rawFlash = cookieStore.get("flash")?.value;
  const flash = rawFlash ? JSON.parse(rawFlash) : undefined;

  return (
    <>
      <FlashToast flash={flash} />
      <div className='bg-neutral-100 dark:bg-neutral-700 h-screen flex items-center m-auto p-4 md:px-32 justify-center '>
        <div className='flex flex-col items-center bg-white py-10 px-4 gap-4 border border-neutral-200 dark:bg-neutral-950 dark:border-neutral-700 rounded-(--radius-12) w-full  max-w-135'>
          <Link href={"/login"} className='flex gap-2.5 items-center justify-center mb-2'>
            <LogoFeather />
            <LogoTextWhite className='dark:hidden' />
            <LogoTextDark className='hidden dark:block' />
          </Link>
          {children}
        </div>
      </div>
    </>
  );
}
