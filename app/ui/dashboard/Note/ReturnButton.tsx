"use client";
import ArrowLeftIcon from "@/app/assets/icons/icon-arrow-left.svg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ReturnButton() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") ?? "dashboard";

  return (
    <Link href={`/${redirectPath}`} className='flex gap-1 items-center lg:hidden'>
      <ArrowLeftIcon className='**:fill-neutral-600' />
      <p className='text-neutral-600'>Go Back</p>
    </Link>
  );
}
