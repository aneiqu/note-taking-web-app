import GoogleLogo from "@/app/assets/icons/icon-google.svg";

export default function AuthLoginGoogle() {
  return (
    <div className='flex justify-center border border-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 duration-200 dark:border-neutral-600 rounded-(--radius-8) w-full py-3 gap-3 cursor-pointer'>
      <GoogleLogo className='fill-black dark:fill-white' />
      <p className='text-neutral-950 font-medium dark:text-white'>Google</p>
    </div>
  );
}
