import SettingsPageLayout from "@/app/components/dashboard/Settings/SettingsPageLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className='hidden lg:block'>
        <SettingsPageLayout>{children}</SettingsPageLayout>;
      </div>
      <div className='lg:hidden'>{children}</div>
    </>
  );
}
