"use client";
import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import TrashIcon from "@/app/assets/icons/icon-delete.svg";
import RestoreIcon from "@/app/assets/icons/icon-restore.svg";

import { useState } from "react";

interface ModalTypes {
  formId: string;
  formAction: () => void;
  type: "delete" | "archive";
  title: string;
  description: string;
  isArchived?: boolean;
}
export default function NoteModal({
  formId,
  formAction,
  type,
  title,
  description,
  isArchived,
}: ModalTypes) {
  const [modalVisible, showModal] = useState<boolean>(false);

  return (
    <>
      <button
        className='lg:border cursor-pointer lg:border-neutral-300 dark:border-neutral-600 lg:rounded-lg lg:flex lg:px-4 lg:py-3 gap-2 items-center lg:w-full hover:bg-neutral-100 hover:border-transparent duration-200 focus:border-neutral-950 focus:ring-offset-2 focus:ring-2 focus:ring-neutral-400 group'
        type='button'
        onClick={() => showModal(true)}
      >
        {type === "delete" ? (
          <TrashIcon className='lg:**:stroke-neutral-950 dark:**:stroke-neutral-300 group-hover:**:stroke-neutral-600' />
        ) : (
          <>
            <ArchiveIcon
              className={`lg:**:stroke-neutral-950 dark:**:stroke-neutral-300 group-hover:**:stroke-neutral-600 ${isArchived ? "hidden" : ""}`}
            />
            <RestoreIcon
              className={`lg:**:stroke-neutral-950 **:fill-neutral-950 dark:**:stroke-neutral-300 dark:**:fill-neutral-300 group-hover:**:stroke-neutral-600 ${isArchived ? "" : "hidden"}`}
            />
          </>
        )}
        <p className='hidden lg:block dark:text-white'>{title}</p>
      </button>
      <div
        className={`absolute left-0 top-0 w-screen h-screen bg-neutral-950/50 flex items-center justify-center ${modalVisible ? "" : "hidden"}`}
      >
        <div className='bg-white max-w-110 rounded-xl'>
          <div className='flex gap-4 p-5'>
            <div>icon</div>
            <div>
              <h2 className='text-preset-3 text-neutral-950'>
                {type === "archive" ? (isArchived ? "Restore" : "Archive") : "Delete"} Note
              </h2>
              <p className='text-preset-5 text-neutral-700'>{description}</p>
            </div>
          </div>
          <hr className='text-neutral-200 w-full' />
          <div className='flex p-4 justify-end gap-4'>
            <button
              className='px-4 py-2 text-preset-4 bg-neutral-100 text-neutral-600 rounded-lg'
              onClick={() => showModal(false)}
            >
              Cancel
            </button>
            <button
              className='px-4 py-3 text-preset-4 bg-red-500 text-white rounded-lg'
              form={formId}
              formAction={() => formAction()}
            >
              {type === "archive" ? (isArchived ? "Restore" : "Archive") : "Delete"} Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
