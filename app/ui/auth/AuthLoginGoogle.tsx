import Image from "next/image";

export default function AuthLoginGoogle() {
  return (
    <div className='flex justify-center border border-neutral-300 dark:border-neutral-600 rounded-(--radius-8) w-full py-3 gap-3'>
      <Image
        src='/icons/icon-google.svg'
        width={18}
        height={18}
        alt='Google icon'
        className='dark:invert'
      ></Image>
      <p className='text-neutral-950 font-medium dark:text-white'>Google</p>
    </div>
  );
}
