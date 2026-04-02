import PasswordInput from "@/app/components/auth/PasswordInput";
import SettingsPageContent from "@/app/components/dashboard/Settings/SettingsPageContent";

export default function Theme() {
  return (
    <SettingsPageContent pageTitle='Change Password' pageDescription=''>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1.5'>
          <label className='text-preset-4 text-neutral-950' htmlFor=''>
            Old Password
          </label>
          <PasswordInput classes='border rounded-lg px-4 py-3 border-neutral-300 w-full' />
        </div>
        <div className='flex flex-col gap-1.5'>
          <label className='text-preset-4 text-neutral-950' htmlFor=''>
            New Password
          </label>
          <PasswordInput classes='border rounded-lg px-4 py-3 border-neutral-300 w-full' />
          <label className='text-neutral-600 text-preset-6' htmlFor=''>
            At least 8 characters
          </label>
        </div>
        <div className='flex flex-col gap-1.5'>
          <label className='text-preset-4 text-neutral-950' htmlFor=''>
            Confirm New Password
          </label>
          <PasswordInput classes='border rounded-lg px-4 py-3 border-neutral-300 w-full' />
        </div>
      </div>
    </SettingsPageContent>
  );
}
