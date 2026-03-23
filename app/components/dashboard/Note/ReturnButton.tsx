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
    <Link href={fixedHref} className={`flex gap-1 items-center lg:hidden ${classes}`}>
      <ArrowLeftIcon className='**:fill-neutral-600' />
      <p className={`text-neutral-600 `}>Go Back</p>
    </Link>
  );
}
