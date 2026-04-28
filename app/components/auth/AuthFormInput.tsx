import Link from "next/link";
import PasswordInput from "./PasswordInput";

interface InputTypes {
  label: string;
  placeholder: string;
  id: string;
  type: string;
}

interface InputPasswordTypes {
  showForgetLink: boolean;
  id: string;
  label: string;
}

export function AuthFormTextInput({ label, placeholder, id, type }: InputTypes) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor={id} className='text-preset-4 text-neutral-950 dark:text-white'>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={true}
        placeholder={placeholder}
        className='text-preset-5 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-(--radius-8) dark:text-neutral-500 hover:bg-neutral-50 duration-200 dark:hover:bg-neutral-800'
      />
    </div>
  );
}

export function AuthFormPasswordInput({ showForgetLink, id, label }: InputPasswordTypes) {
  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between'>
        <label htmlFor={id} className='text-preset-4 text-neutral-950 dark:text-white'>
          {label}
        </label>

        {showForgetLink ? (
          <Link
            aria-disabled={true}
            href={"./forgot-password"}
            className='text-xs underline text-neutral-600 dark:text-neutral-400'
          >
            Forgot
          </Link>
        ) : null}
      </div>
      <PasswordInput
        name={id}
        id={id}
        ariaLabel={label}
        classes='text-preset-5 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg w-full dark:text-neutral-400 hover:bg-neutral-50 duration-200 dark:hover:bg-neutral-800'
      />
    </div>
  );
}
