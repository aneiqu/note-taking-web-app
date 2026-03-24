import SidebarTagItems from "@/app/components/dashboard/Sidebar/SidebarTagItems";

export default async function Tag() {
  return (
    <div className='flex flex-col w-screen px-4 md:px-8 py-6 gap-1'>
      <h2 className='text-preset-1 dark:text-white pb-4'>Tags</h2>
      <SidebarTagItems />
    </div>
  );
}
