import ArrowLeftIcon from "@/app/assets/icons/icon-arrow-left.svg";
import Link from "next/link";

interface ReturnButtonProps {
  noteHref: string;
  classes?: string;
  title?: string;
}

export default function ReturnButton({ noteHref, classes, title = "Go Back" }: ReturnButtonProps) {
  const fixedHref = noteHref
    .split("/")
    .filter((el) => el !== "n")
    .join("/");
  return (
    <Link href={fixedHref} className={`flex gap-1 items-center lg:hidden ${classes}`}>
      <ArrowLeftIcon className='**:fill-neutral-600 dark:**:fill-neutral-300' />
      <p className={`text-neutral-600 dark:text-neutral-300`}>{title}</p>
    </Link>
  );
}
