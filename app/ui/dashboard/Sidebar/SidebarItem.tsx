"use client";

import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import ChevronRightIcon from "@/app/assets/icons/icon-chevron-right.svg";
import HomeIcon from "@/app/assets/icons/icon-home.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";
import { usePathname } from "next/navigation";

interface ItemProps {
  icon: "home" | "archive" | "tag";
  label: string;
  activePath: string;
  variant: string;
}

export default function SidebarItem({ icon, label, activePath, variant }: ItemProps) {
  const defaultPath = "/dashboard";
  const pathname = usePathname();
  const fullPath = `${defaultPath}${activePath}`;
  const isActive =
    activePath === ""
      ? pathname === defaultPath
      : pathname === fullPath || pathname.startsWith(`${fullPath}/`);
  const classes = `${isActive ? (variant === "fill" ? "fill-blue-500" : "**:stroke-blue-500") : variant === "fill" ? "fill-neutral-700" : "stroke-neutral-700"}`;
  const icons = {
    home: <HomeIcon className={classes} />,
    archive: <ArchiveIcon className={classes} />,
    tag: <TagIcon className={classes} />,
  };
  return (
    <div
      className={`flex gap-2 items-center py-2.5 px-3 rounded-lg ${isActive ? "bg-neutral-100" : ""}`}
    >
      {icons[icon]}
      {label}
      <ChevronRightIcon className={`ml-auto ${isActive ? "block" : "hidden"}`} />
    </div>
  );
}
