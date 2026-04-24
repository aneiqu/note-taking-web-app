import InfoIcon from "@/app/assets/icons/icon-info.svg";
import PasswordInput from "@/app/components/auth/PasswordInput";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";
import Form from "next/form";

export default function Theme() {
  async function updatePassword() {
    "use server";
  }

  return (
    <Form action={updatePassword}>
      <div className='lg:hidden'>
        <ReturnButton noteHref={"/dashboard/settings"} title='Settings' />
      </div>
      <div className='flex flex-col gap-2 mt-3 mb-5'>
        <h2 className='text-preset-1 lg:text-preset-3 dark:text-white'>Change Password</h2>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1.5'>
            <label
              className='text-preset-4 text-neutral-950 dark:text-neutral-100'
              htmlFor='current-password'
            >
              Old Password
            </label>
            <PasswordInput
              id='current-password'
              name='currentPassword'
              ariaLabel='Old password'
              classes='border rounded-lg px-4 py-3 border-neutral-300 dark:border-neutral-600 w-full'
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label
              className='text-preset-4 text-neutral-950 dark:text-neutral-100'
              htmlFor='new-password'
            >
              New Password
            </label>
            <PasswordInput
              id='new-password'
              name='newPassword'
              ariaLabel='New password'
              classes='border rounded-lg px-4 py-3 border-neutral-300 dark:border-neutral-600 w-full'
            />
            <label
              className='text-neutral-600 dark:text-neutral-400 text-preset-6 flex gap-2 items-center'
              htmlFor='new-password'
            >
              <InfoIcon className='**:stroke-neutral-400' />
              At least 8 characters
            </label>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label
              className='text-preset-4 text-neutral-950 dark:text-neutral-100'
              htmlFor='confirm-new-password'
            >
              Confirm New Password
            </label>
            <PasswordInput
              id='confirm-new-password'
              name='confirmNewPassword'
              ariaLabel='Confirm new password'
              classes='border rounded-lg px-4 py-3 border-neutral-300 dark:border-neutral-600 w-full'
            />
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='text-preset-4 px-4 py-3 bg-blue-500 text-white rounded-lg mt-6 justify-self-end flex'
      >
        Apply Changes
      </button>
    </Form>
  );
}
