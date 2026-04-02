"use client";
import MoonIcon from "@/app/assets/icons/icon-moon.svg";
import SunIcon from "@/app/assets/icons/icon-sun.svg";
import SystemThemeIcon from "@/app/assets/icons/icon-system-theme.svg";
import SettingsOption from "@/app/components/dashboard/Settings/SettingsOption";
import SettingsPageContent from "@/app/components/dashboard/Settings/SettingsPageContent";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ColorTheme() {
  const { theme = "system", setTheme } = useTheme();
  const [selectedTheme, selectTheme] = useState("system");

  useEffect(() => {
    selectTheme(theme);
  }, [theme]);

  return (
    <SettingsPageContent
      pageTitle='Color Theme'
      pageDescription='Pick a clean and classic light theme'
      updateFunction={() => {
        setTheme(selectedTheme);
      }}
    >
      <SettingsOption
        Icon={SunIcon}
        optionTitle='Light Mode'
        optionDescription='Pick a clean and classic light theme'
        radioName='color-theme'
        variant='stroke'
        value='light'
        changeData={selectTheme}
        currentData={selectedTheme}
      />
      <SettingsOption
        Icon={MoonIcon}
        optionTitle='Dark Mode'
        optionDescription='Select a sleek and modern dark theme'
        radioName='color-theme'
        variant='fill'
        value='dark'
        changeData={selectTheme}
        currentData={selectedTheme}
      />
      <SettingsOption
        Icon={SystemThemeIcon}
        optionTitle='System'
        optionDescription='Adapts to your device’s theme'
        radioName='color-theme'
        variant='fill'
        value='system'
        changeData={selectTheme}
        currentData={selectedTheme}
      />
    </SettingsPageContent>
  );
}
