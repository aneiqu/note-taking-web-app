import type { Metadata } from "next";
import "./globals.css";

import { inter, noto_serif, source_code_pro } from "@/app/assets/fonts/fonts";
import { fontClassFromKey, parseFontKey } from "@/utils/fontTheme";
import { cookies } from "next/headers";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Note Taking web app",
  description: "Frontend Mentor challenge",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const font = parseFontKey(cookieStore.get("font")?.value);
  const fontClass = fontClassFromKey(font);

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.variable} ${noto_serif.variable} ${source_code_pro.variable} ${fontClass} antialiased dark:bg-neutral-700`}
      >
        <ThemeProvider
          attribute='data-theme'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
