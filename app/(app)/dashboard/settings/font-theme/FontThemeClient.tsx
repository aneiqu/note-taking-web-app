"use client";

import MonospaceIcon from "@/app/assets/icons/icon-font-monospace.svg";
import SansIcon from "@/app/assets/icons/icon-font-sans-serif.svg";
import SerifIcon from "@/app/assets/icons/icon-font-serif.svg";
import SettingsOption from "@/app/components/dashboard/Settings/SettingsOption";
import SettingsPageContent from "@/app/components/dashboard/Settings/SettingsPageContent";
import { fontClasses, fontClassFromKey, FontKey } from "@/utils/fontTheme";
import { useState } from "react";

interface FontThemeClientProps {
  initialFont: FontKey;
}

export default function FontThemeClient({ initialFont }: FontThemeClientProps) {
  const [selectedFont, selectFont] = useState<FontKey>(initialFont);

  const applyChanges = () => {
    document.cookie = `font=${selectedFont}; path=/; max-age=31536000; samesite=lax`;
    document.body.classList.remove(...fontClasses);
    document.body.classList.add(fontClassFromKey(selectedFont));
  };

  return (
    <SettingsPageContent
      pageTitle='Font Theme'
      pageDescription='Choose your preferred reading style for notes.'
      updateFunction={applyChanges}
    >
      <SettingsOption
        Icon={SansIcon}
        optionTitle='Sans-serif'
        optionDescription='Clean and modern, easy to read.'
        radioName='font-theme'
        variant='fill'
        value='sans'
        changeData={(value) => selectFont(value as FontKey)}
        currentData={selectedFont}
      />
      <SettingsOption
        Icon={SerifIcon}
        optionTitle='Serif'
        optionDescription='Classic and elegant for a timeless feel.'
        radioName='font-theme'
        variant='fill'
        value='serif'
        changeData={(value) => selectFont(value as FontKey)}
        currentData={selectedFont}
      />
      <SettingsOption
        Icon={MonospaceIcon}
        optionTitle='Monospace'
        optionDescription='Code-like, great for a technical vibe.'
        radioName='font-theme'
        variant='fill'
        value='mono'
        changeData={(value) => selectFont(value as FontKey)}
        currentData={selectedFont}
      />
    </SettingsPageContent>
  );
}
