"use client";

import ChevronRightIcon from "@/app/assets/icons/icon-chevron-right.svg";
import FontIcon from "@/app/assets/icons/icon-font.svg";
import LockIcon from "@/app/assets/icons/icon-lock.svg";
import SunIcon from "@/app/assets/icons/icon-sun.svg";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface LinkTypes {
  linkHref: string;
  activeName: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconType?: "fill" | "stroke";
}

function SettingsLink({ linkHref, activeName, title, Icon, iconType = "fill" }: LinkTypes) {
  const pathname = usePathname();
  const currentSettingsPage = pathname.split("/")[pathname.split("/").length - 1];
  const isActive = currentSettingsPage === activeName;
  return (
    <Link
      href={linkHref}
      className={`flex items-center gap-2 p-2 rounded-md ${isActive ? "bg-neutral-100 dark:bg-neutral-800" : ""} `}
    >
      <Icon
        className={`dark:**:${iconType}-neutral-200 ${isActive ? `dark:**:${iconType}-blue-500!` : ""}`}
      />
      <p>{title}</p>
      <ChevronRightIcon
        className={`ml-auto **:fill-neutral-950 dark:**:fill-white ${isActive ? "" : "hidden"}`}
      />
    </Link>
  );
}

export default function SettingsLinks() {
  return (
    <>
      <SettingsLink
        linkHref='/dashboard/settings/color-theme'
        activeName='color-theme'
        title='Color Theme'
        Icon={SunIcon}
        iconType='stroke'
      />
      <SettingsLink
        linkHref='/dashboard/settings/font-theme'
        activeName='font-theme'
        title='Font Theme'
        Icon={FontIcon}
      />
      <SettingsLink
        linkHref='/dashboard/settings/change-password'
        activeName='change-password'
        title='Change Password'
        Icon={LockIcon}
        iconType='stroke'
      />
    </>
  );
}
