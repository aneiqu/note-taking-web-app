import FontIcon from "@/app/assets/icons/icon-font.svg";
import LockIcon from "@/app/assets/icons/icon-lock.svg";
import LogoutIcon from "@/app/assets/icons/icon-logout.svg";
import SunIcon from "@/app/assets/icons/icon-sun.svg";
import Link from "next/link";

export default function Settings() {
  return (
    <div className='text-neutral-950 dark:text-neutral-200 lg:grid lg:grid-cols-12 h-full w-screen px-4 pt-6 lg:px-0 lg:pt-0 lg:w-full dark:bg-neutral-950'>
      <div className='flex flex-col col-span-3 lg:border-r border-neutral-200 dark:border-neutral-800 gap-2 lg:pt-5 lg:pr-4 lg:pl-8'>
        <h2 className='text-preset-1 dark:text-white pb-2 lg:hidden'>Settings</h2>
        <div className='text-preset-4 flex flex-col gap-2'>
          <Link href={"/dashboard/settings/theme"} className='flex items-center gap-2 py-2'>
            <SunIcon className='dark:**:stroke-neutral-200' />
            <p>Color Theme</p>
          </Link>
          <Link href={"/dashboard/settings/font"} className='flex items-center gap-2 py-2'>
            <FontIcon className='dark:**:fill-neutral-200' />
            <p>Font Theme</p>
          </Link>
          <Link
            href={"/dashboard/settings/update-password"}
            className='flex items-center gap-2 py-2'
          >
            <LockIcon className='dark:**:stroke-neutral-200' />
            <p>Change Password</p>
          </Link>
        </div>
        <hr className='text-neutral-200 dark:text-neutral-800' />
        <div className='flex items-center gap-2 py-2'>
          <LogoutIcon className='dark:**:stroke-neutral-200' />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}
