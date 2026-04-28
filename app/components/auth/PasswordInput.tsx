"use client";

import HidePassword from "@/app/assets/icons/icon-hide-password.svg";
import ShowPassword from "@/app/assets/icons/icon-show-password.svg";

import { Ref, useState } from "react";

interface InputTypes {
  classes: string;
  id: string;
  name: string;
  ariaLabel: string;
  ref?: Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function PasswordInput({ classes, id, name, ariaLabel, ref, onChange }: InputTypes) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative flex items-center'>
      <input
        className={`hover:bg-neutral-50 dark:hover:bg-neutral-800 duration-200 ${classes}`}
        type={showPassword ? "text" : "password"}
        minLength={8}
        required={true}
        id={id}
        name={name}
        aria-label={ariaLabel}
        ref={ref}
        onChange={onChange}
      />
      <button
        aria-label={showPassword ? "Hide password" : "Show password"}
        className='absolute right-4 cursor-pointer'
        type='button'
        onClick={() => setShowPassword((v) => !v)}
      >
        {showPassword ? (
          <HidePassword className='**:stroke-neutral-600' />
        ) : (
          <ShowPassword className='**:fill-neutral-600' />
        )}
      </button>
    </div>
  );
}
