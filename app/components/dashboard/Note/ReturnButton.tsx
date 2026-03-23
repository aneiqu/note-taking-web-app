import ArrowLeftIcon from "@/app/assets/icons/icon-arrow-left.svg";
import Link from "next/link";

interface ReturnButtonProps {
  noteHref: string;
  classes?: string;
}

export default function ReturnButton({ noteHref, classes }: ReturnButtonProps) {
  const fixedHref = noteHref
    .split("/")
    .filter((el) => el !== "n")
    .join("/");

  return (
    <Link
      href={fixedHref}
      className={`flex gap-1 items-center lg:hidden ${noteHref.includes("tag") || fixedHref.split("/").length > 2 ? "" : "hidden"}`}
    >
      <ArrowLeftIcon className='**:fill-neutral-600' />
      <p className={`text-neutral-600 ${classes}`}>Go Back</p>
    </Link>
  );
}
