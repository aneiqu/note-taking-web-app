"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface InputTypes {
  label: string;
  placeholder: string;
}

export function AuthFormTextInput({ label, placeholder }: InputTypes) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor='emailInput' className='text-preset-4 text-neutral-950 dark:text-white'>
        {label}
      </label>
      <input
        id='emailInput'
        type='text'
        placeholder={placeholder}
        className='text-preset-5 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-(--radius-8) dark:text-neutral-500'
      />
    </div>
  );
}

export function AuthFormPasswordInput() {
  const PasswordInput = useRef<null | HTMLInputElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisibility = () => setVisible((prev) => !prev);
  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between'>
        <label htmlFor='passwordInput' className='text-preset-4 text-neutral-950 dark:text-white'>
          Password
        </label>
        <p className='text-xs underline text-neutral-600 dark:text-neutral-400'>Forgot</p>
      </div>
      <div className='flex relative w-full items-center'>
        <input
          ref={PasswordInput}
          id='passwordInput'
          type={visible ? "text" : "password"}
          className='text-preset-5 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-(--radius-8) w-full'
        />
        <Image
          src='./icons/icon-show-password.svg'
          width={20}
          height={20}
          className='absolute right-4 cursor-pointer'
          alt='Visibility toggle'
          onClick={() => toggleVisibility()}
        ></Image>
      </div>
    </div>
  );
}
