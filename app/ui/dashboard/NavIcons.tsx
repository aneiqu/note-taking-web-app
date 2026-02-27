"use client";

import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import HomeIcon from "@/app/assets/icons/icon-home.svg";
import SearchIcon from "@/app/assets/icons/icon-search.svg";
import SettingsIcon from "@/app/assets/icons/icon-settings.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IconProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  variant: "fill" | "stroke";
  label: string;
}

function IconContainer({ Icon, variant, isActive, label }: IconProps) {
  return (
    <div
      className={`transition-all duration-200 flex flex-col items-center w-[68.6px]   md:w-[80px] py-1 gap-1 rounded-sm ${isActive ? "bg-blue-50" : ""}`}
    >
      <Icon
        className={`${variant === "fill" ? "**:fill-neutral-600" : "**:stroke-neutral-600"} ${isActive ? (variant === "fill" ? "**:fill-blue-500!" : "**:stroke-blue-500!") : ""}`}
      />
      <p
        className={`hidden md:block text-preset-6 ${isActive ? "text-blue-500" : "text-neutral-600"}`}
      >
        {label}
      </p>
    </div>
  );
}

export function Icons() {
  const pathname = usePathname();
  return (
    <>
      <Link href={"/dashboard"}>
        <IconContainer
          Icon={HomeIcon}
          variant='fill'
          isActive={pathname.endsWith("/dashboard")}
          label='Home'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={"/dashboard/search"}>
        <IconContainer
          Icon={SearchIcon}
          variant='fill'
          isActive={pathname.startsWith("/dashboard/search")}
          label='Search'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={"/dashboard/archived"}>
        <IconContainer
          Icon={ArchiveIcon}
          variant='stroke'
          isActive={pathname.startsWith("/dashboard/archived")}
          label='Archived'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={"/dashboard/tag"}>
        <IconContainer
          Icon={TagIcon}
          variant='stroke'
          isActive={pathname.startsWith("/dashboard/tag")}
          label='Tags'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={"/dashboard/settings"}>
        <IconContainer
          Icon={SettingsIcon}
          variant='fill'
          isActive={pathname.startsWith("/dashboard/settings")}
          label='Settings'
        />
      </Link>
    </>
  );
}
