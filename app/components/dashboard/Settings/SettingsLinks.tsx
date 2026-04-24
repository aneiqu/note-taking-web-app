"use client";

import FontIcon from "@/app/assets/icons/icon-font.svg";
import LockIcon from "@/app/assets/icons/icon-lock.svg";
import SunIcon from "@/app/assets/icons/icon-sun.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLinks() {
  const pathname = usePathname();
  const currentSettingsPage = pathname.split("/")[pathname.split("/").length - 1];
  console.log(currentSettingsPage);
  return (
    <>
      <Link
        href={"/dashboard/settings/color-theme"}
        className={`flex items-center gap-2 p-2 rounded-md ${currentSettingsPage === "color-theme" ? "bg-neutral-100 dark:bg-neutral-800" : ""} `}
      >
        <SunIcon className='dark:**:stroke-neutral-200' />
        <p>Color Theme</p>
      </Link>
      <Link
        href={"/dashboard/settings/font-theme"}
        className={`flex items-center gap-2 p-2 rounded-md ${currentSettingsPage === "font-theme" ? "bg-neutral-100 dark:bg-neutral-800" : ""} `}
      >
        <FontIcon className='dark:**:fill-neutral-200' />
        <p>Font Theme</p>
      </Link>
      <Link
        href={"/dashboard/settings/change-password"}
        className={`flex items-center gap-2 p-2 rounded-md ${currentSettingsPage === "change-password" ? "bg-neutral-100 dark:bg-neutral-800" : ""} `}
      >
        <LockIcon className='dark:**:stroke-neutral-200' />
        <p>Change Password</p>
      </Link>
    </>
  );
}
