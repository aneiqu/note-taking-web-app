import SettingsOption from "@/app/components/dashboard/Settings/SettingsOption";
import SettingsPageContent from "@/app/components/dashboard/Settings/SettingsPageContent";

import MonospaceIcon from "@/app/assets/icons/icon-font-monospace.svg";
import SansIcon from "@/app/assets/icons/icon-font-sans-serif.svg";
import SerifIcon from "@/app/assets/icons/icon-font-serif.svg";

export default function FontPage() {
  return (
    <SettingsPageContent
      pageTitle='Font Theme'
      pageDescription='Choose your preferred reading style for notes.'
    >
      <SettingsOption
        Icon={SansIcon}
        optionTitle='Sans-serif'
        optionDescription='Clean and modern, easy to read.'
        radioName='font-theme'
      />
      <SettingsOption
        Icon={SerifIcon}
        optionTitle='Serif'
        optionDescription='Classic and elegant for a timeless feel.'
        radioName='font-theme'
      />
      <SettingsOption
        Icon={MonospaceIcon}
        optionTitle='Monospace'
        optionDescription='Code-like, great for a technical vibe.'
        radioName='font-theme'
      />
    </SettingsPageContent>
  );
}
