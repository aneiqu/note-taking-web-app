"use client";

import InfoIcon from "@/app/assets/icons/icon-info.svg";
import { useRef } from "react";
import PasswordInput from "./PasswordInput";

export default function ChangePasswordFields() {
  const confirmPassword = useRef<HTMLInputElement>(null);
  const newPassword = useRef<HTMLInputElement>(null);

  function validatePasswordsMatch() {
    if (!newPassword.current || !confirmPassword.current) return;

    const passwordsMatch = newPassword.current.value === confirmPassword.current.value;

    confirmPassword.current.setCustomValidity(passwordsMatch ? "" : "Passwords do not match");
  }
  return (
    <>
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
          ref={newPassword}
          onChange={validatePasswordsMatch}
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
          ref={confirmPassword}
          onChange={validatePasswordsMatch}
        />
      </div>
    </>
  );
}
