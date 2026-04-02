"use client";

import HidePassword from "@/app/assets/icons/icon-hide-password.svg";
import ShowPassword from "@/app/assets/icons/icon-show-password.svg";

import { useState } from "react";

interface InputTypes {
  classes: string;
}

export default function PasswordInput({ classes }: InputTypes) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative flex items-center'>
      <input
        className={`${classes}`}
        type={showPassword ? "text" : "password"}
        minLength={8}
        required={true}
      />
      <button className='absolute right-4' type='button' onClick={() => setShowPassword((v) => !v)}>
        {showPassword ? (
          <HidePassword className='**:stroke-neutral-600' />
        ) : (
          <ShowPassword className='**:fill-neutral-600' />
        )}
      </button>
    </div>
  );
}
