import SettingsOption from "@/app/components/dashboard/Settings/SettingsOption";
import SettingsPageContent from "@/app/components/dashboard/Settings/SettingsPageContent";

import MoonIcon from "@/app/assets/icons/icon-moon.svg";
import SunIcon from "@/app/assets/icons/icon-sun.svg";
import SystemThemeIcon from "@/app/assets/icons/icon-system-theme.svg";

export default function ColorTheme() {
  return (
    <SettingsPageContent
      pageTitle='Color Theme'
      pageDescription='Pick a clean and classic light theme'
    >
      <SettingsOption
        Icon={SunIcon}
        optionTitle='Light Mode'
        optionDescription='Pick a clean and classic light theme'
        radioName='color-theme'
      />
      <SettingsOption
        Icon={MoonIcon}
        optionTitle='Dark Mode'
        optionDescription='Select a sleek and modern dark theme'
        radioName='color-theme'
      />
      <SettingsOption
        Icon={SystemThemeIcon}
        optionTitle='System'
        optionDescription='Adapts to your device’s theme'
        radioName='color-theme'
      />
    </SettingsPageContent>
  );
}
