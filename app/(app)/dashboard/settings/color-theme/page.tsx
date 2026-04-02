"use client";

import SettingsPageContent from "@/app/components/dashboard/Settings/SettingsPageContent";
import UpdateColorTheme from "@/utils/UpdateColorTheme";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function ColorTheme() {
  const [selectedTheme, selectTheme] = useState("system");
  const { theme, setTheme } = useTheme();

  return (
    <SettingsPageContent
      pageTitle='Color Theme'
      pageDescription='Pick a clean and classic light theme'
      updateFunction={() => {
        setTheme(selectedTheme);
      }}
      value={selectedTheme}
    >
      <UpdateColorTheme selectTheme={selectTheme} />
    </SettingsPageContent>
  );
}
