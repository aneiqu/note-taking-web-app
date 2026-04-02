export const fontKeys = ["sans", "serif", "mono"] as const;
export type FontKey = (typeof fontKeys)[number];

export const fontClassByKey: Record<FontKey, string> = {
  sans: "font-theme-sans",
  serif: "font-theme-serif",
  mono: "font-theme-mono",
};

export const fontClasses = Object.values(fontClassByKey);

export const fontClassFromKey = (font: FontKey) => {
  return fontClassByKey[font];
};

export const parseFontKey = (value: string | undefined): FontKey => {
  if (!value) return "sans";

  if ((fontKeys as readonly string[]).includes(value)) {
    return value as FontKey;
  }

  if (value === "font-theme-serif") return "serif";
  if (value === "font-theme-mono") return "mono";
  return "sans";
};
