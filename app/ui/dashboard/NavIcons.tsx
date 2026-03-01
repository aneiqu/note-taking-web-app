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
      className={`transition-all duration-200 flex flex-col items-center w-[68.6px] md:w-20 py-1 gap-1 rounded-sm ${isActive ? "bg-blue-50" : ""}`}
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
  const defaultPath = "/dashboard";
  return (
    <>
      <Link href={defaultPath}>
        <IconContainer
          Icon={HomeIcon}
          variant='fill'
          isActive={pathname.endsWith(`${defaultPath}`)}
          label='Home'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={`${defaultPath}/search`}>
        <IconContainer
          Icon={SearchIcon}
          variant='fill'
          isActive={pathname.startsWith(`${defaultPath}/search`)}
          label='Search'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={`${defaultPath}/archived`}>
        <IconContainer
          Icon={ArchiveIcon}
          variant='stroke'
          isActive={pathname.startsWith(`${defaultPath}/archived`)}
          label='Archived'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={`${defaultPath}/tag`}>
        <IconContainer
          Icon={TagIcon}
          variant='stroke'
          isActive={pathname.startsWith(`${defaultPath}/tag`)}
          label='Tags'
        />
      </Link>
      <div className='hidden md:block w-px h-full bg-neutral-100'></div>
      <Link href={`${defaultPath}/settings`}>
        <IconContainer
          Icon={SettingsIcon}
          variant='fill'
          isActive={pathname.startsWith(`${defaultPath}/settings`)}
          label='Settings'
        />
      </Link>
    </>
  );
}
