import Image from "next/image";

export default function Home() {
  return (
    <div className='bg-neutral-100 h-screen flex items-center m-auto p-4 md:px-32 md:justify-center '>
      <div className='flex flex-col items-center bg-white py-10 px-4 border border-neutral-200 rounded-(--radius-8) w-full  max-w-135'>
        <Image src='/logo.svg' alt='logo' width={95} height={28} className='mb-4'></Image>
        <h2 className='text-preset-1 mb-2'>Welcome to Note</h2>
        <p className='text-preset-5 text-neutral-500'>Please log in to continue</p>
        <form className='flex flex-col my-4 gap-4 w-full' action=''>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='emailInput' className='text-preset-4 text-neutral-950'>
              Email Address
            </label>
            <input
              id='emailInput'
              type='text'
              placeholder='email@example.com'
              className='text-preset-5 px-4 py-3 border border-neutral-300 rounded-(--radius-8)'
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between'>
              <label htmlFor='passwordInput' className='text-preset-4 text-neutral-950'>
                Password
              </label>
              <p className='text-xs underline text-neutral-600'>Forgot</p>
            </div>
            <div className='flex relative w-full items-center'>
              <input
                id='passwordInput'
                type='password'
                className='text-preset-5 px-4 py-3 border border-neutral-300 rounded-(--radius-8) w-full'
              />
              <Image
                src='/icons/icon-show-password.svg'
                width={20}
                height={20}
                className='absolute right-4 cursor-pointer'
                alt='Visibility toggle'
              ></Image>
            </div>
          </div>
          <button
            type='submit'
            className='text-preset-3 py-3 bg-blue-500 text-white rounded-(--radius-8)'
          >
            Login
          </button>
        </form>
        <hr className='text-neutral-300 w-full' />
        <p className='text-preset-5 text-neutral-600 mb-4 mt-6'>Or log in with:</p>
        <div className='flex justify-center border border-neutral-300 rounded-(--radius-8) w-full py-3 gap-3'>
          <Image src='/icons/icon-google.svg' width={18} height={18} alt='Google icon'></Image>
          <p className='text-neutral-950 font-medium'>Google</p>
        </div>
        <hr className='text-neutral-300 w-full my-4' />
        <p className='text-preset-5 text-neutral-600'>
          No account yet?{" "}
          <a href='./' className='text-neutral-950'>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
