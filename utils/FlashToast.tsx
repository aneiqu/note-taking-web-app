"use client";

import { clearFlashMessage } from "@/app/actions/flash";
import SaveIcon from "@/app/assets/icons/icon-checkmark.svg";
import CloseIcon from "@/app/assets/icons/icon-cross.svg";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function FlashToast({
  flash,
}: {
  flash?: { type: "success" | "error"; message: string };
}) {
  useEffect(() => {
    if (!flash) return;

    if (flash.type === "success")
      toast(
        (t) => (
          <div className='flex items-center'>
            <p>{flash.message}</p>
            <button onClick={() => toast.dismiss(t.id)}>
              <CloseIcon className='-mr-3 ml-5 cursor-pointer **:stroke-neutral-400 dark:**:stroke-neutral-800' />
            </button>
          </div>
        ),
        {
          icon: <SaveIcon className='**:fill-green-500' />,
        },
      );
    if (flash.type === "error")
      toast(
        (t) => (
          <div className='flex items-center'>
            <p>{flash.message}</p>
            <button onClick={() => toast.dismiss(t.id)}>
              <CloseIcon className='-mr-3 ml-5 cursor-pointer **:stroke-neutral-400 dark:**:stroke-neutral-800' />
            </button>
          </div>
        ),
        {
          icon: <CloseIcon className='**:stroke-white rounded-full bg-red-500 ' />,
        },
      );

    void clearFlashMessage();
  }, [flash]);

  return null;
}
