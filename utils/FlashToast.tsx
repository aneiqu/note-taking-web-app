"use client";

import { clearFlashMessage } from "@/app/actions/flash";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function FlashToast({
  flash,
}: {
  flash?: { type: "success" | "error"; message: string };
}) {
  useEffect(() => {
    if (!flash) return;

    if (flash.type === "success") toast.success(flash.message);
    if (flash.type === "error") toast.error(flash.message);

    void clearFlashMessage();
  }, [flash]);

  return null;
}
