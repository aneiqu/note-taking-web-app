import Link from "next/link";
import PasswordInput from "./PasswordInput";

interface InputTypes {
  label: string;
  placeholder: string;
  id: string;
}

export function AuthFormTextInput({ label, placeholder, id }: InputTypes) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor={id} className='text-preset-4 text-neutral-950 dark:text-white'>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type='text'
        required={true}
        placeholder={placeholder}
        className='text-preset-5 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-(--radius-8) dark:text-neutral-500'
      />
    </div>
  );
}

export function AuthFormPasswordInput({ showForgetLink }: { showForgetLink: boolean }) {
  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between'>
        <label htmlFor='passwordInput' className='text-preset-4 text-neutral-950 dark:text-white'>
          Password
        </label>

        {showForgetLink ? (
          <Link
            href={"./forgot-password"}
            className='text-xs underline text-neutral-600 dark:text-neutral-400'
          >
            Forgot
          </Link>
        ) : null}
      </div>
      <PasswordInput
        name='passwordInput'
        id='passwordInput'
        ariaLabel='Password input'
        classes='text-preset-5 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg w-full dark:text-neutral-400'
      />
    </div>
  );
}
