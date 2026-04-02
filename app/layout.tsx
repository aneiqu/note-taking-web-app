import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/app/assets/fonts/fonts";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Note Taking web app",
  description: "Frontend Mentor challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased dark:bg-neutral-700`}>
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
