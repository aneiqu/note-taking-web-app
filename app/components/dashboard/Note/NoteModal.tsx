"use client";

import { ReactNode, useRef, useState } from "react";

interface ModalTypes {
  formId: string;
  formAction: () => void;
  title: string;
  description: string;
  icon: ReactNode;
  toastTitle: string;
}
export default function NoteModal({ formId, formAction, title, description, icon }: ModalTypes) {
  const [modalVisible, showModal] = useState<boolean>(false);
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  return (
    <div>
      <button
        className='lg:border cursor-pointer lg:border-neutral-300 dark:border-neutral-600 lg:rounded-lg lg:flex lg:px-4 lg:py-3 gap-2 items-center lg:w-full hover:bg-neutral-100 hover:border-transparent duration-200 focus:border-neutral-950 focus:ring-offset-2 focus:ring-2 focus:ring-neutral-400 group dark:hover:bg-neutral-800 '
        type='button'
        onClick={() => {
          showModal(true);
          dialogRef.current?.showModal();
        }}
      >
        {icon}
        <p className='hidden lg:block dark:text-white'>{title}</p>
      </button>
      {modalVisible ? (
        <dialog
          aria-labelledby={title}
          aria-describedby={description}
          ref={dialogRef}
          aria-modal='true'
          className='absolute max-w-none max-h-none left-0 top-0 h-screen w-screen bg-neutral-950/50 open:flex open:items-center open:justify-center'
          onClick={() => showModal(false)}
        >
          <div
            className='bg-white max-w-110 rounded-xl dark:bg-neutral-700'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex gap-4 p-5'>
              <div className='p-2 bg-neutral-100 dark:bg-neutral-600 h-fit rounded-lg'>{icon}</div>
              <div className='flex flex-col gap-1.5'>
                <h2 className='text-preset-3 text-neutral-950 dark:text-white'>{title}</h2>
                <p className='text-preset-5 text-neutral-700 dark:text-neutral-200'>
                  {description}
                </p>
              </div>
            </div>
            <hr className='text-neutral-200 w-full dark:text-neutral-600' />
            <div className='flex p-4 justify-end gap-4'>
              <button
                className='px-4 py-2 text-preset-4 bg-neutral-100 dark:bg-neutral-500 text-neutral-600 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-offset-2 focus:ring-2 focus:ring-neutral-400 cursor-pointer duration-200'
                onClick={() => {
                  showModal(false);
                  dialogRef.current?.close();
                }}
              >
                Cancel
              </button>
              <button
                className='px-4 py-3 text-preset-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-offset-2 focus:ring-2 focus:ring-neutral-400 cursor-pointer duration-200'
                form={formId}
                formAction={() => formAction()}
              >
                {title}
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
