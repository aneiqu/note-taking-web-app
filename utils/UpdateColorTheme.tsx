"use client";
import MoonIcon from "@/app/assets/icons/icon-moon.svg";
import SunIcon from "@/app/assets/icons/icon-sun.svg";
import SystemThemeIcon from "@/app/assets/icons/icon-system-theme.svg";

import SettingsOption from "@/app/components/dashboard/Settings/SettingsOption";
import { Dispatch, SetStateAction } from "react";

export default function UpdateColorTheme({
  selectTheme,
}: {
  selectTheme: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <SettingsOption
        Icon={SunIcon}
        optionTitle='Light Mode'
        optionDescription='Pick a clean and classic light theme'
        radioName='color-theme'
        variant='stroke'
        value='light'
        changeTheme={selectTheme}
      />
      <SettingsOption
        Icon={MoonIcon}
        optionTitle='Dark Mode'
        optionDescription='Select a sleek and modern dark theme'
        radioName='color-theme'
        variant='fill'
        value='dark'
        changeTheme={selectTheme}
      />
      <SettingsOption
        Icon={SystemThemeIcon}
        optionTitle='System'
        optionDescription='Adapts to your device’s theme'
        radioName='color-theme'
        variant='fill'
        value='system'
        changeTheme={selectTheme}
      />
    </>
  );
}
