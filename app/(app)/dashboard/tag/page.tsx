import SidebarTagItems from "@/app/components/dashboard/Sidebar/SidebarTagItems";

export default async function Tag() {
  return (
    <div className='flex flex-col w-screen px-4 py-5'>
      <h2 className='text-preset-1 pb-4'>Tags</h2>
      <SidebarTagItems />
    </div>
  );
}
