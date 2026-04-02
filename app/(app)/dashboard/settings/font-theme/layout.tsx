import SettingsPageLayout from "@/app/components/dashboard/Settings/SettingsPageLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return <SettingsPageLayout>{children}</SettingsPageLayout>;
}
