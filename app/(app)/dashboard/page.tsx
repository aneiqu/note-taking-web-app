import data from "@/app/assets/data/data.json";
import DashboardItem from "@/app/ui/dashboard/DashboardItem";

export default function Home() {
  const filteredNotes = data.notes.filter((note) => !note.isArchived);

  return (
    <div className='lg:grid lg:grid-cols-12 h-full'>
      <div className='flex flex-col w-screen lg:w-full lg:h-full py-5 px-4 gap-4 col-span-3 lg:pl-8 lg:pr-4 lg:pt-5 lg:border-r border-neutral-200'>
        <h2 className='text-preset-1 lg:hidden'>All Notes</h2>
        <button className='hidden lg:block rounded-lg text-preset-4 bg-blue-500 py-3 w-full text-white'>
          + Create New Note
        </button>
        <div className='flex flex-col gap-1 h-full overflow-y-scroll'>
          {filteredNotes.map((note) => (
            <DashboardItem note={note} key={note.id} />
          ))}
        </div>
      </div>
      <div className='hidden lg:block col-span-6'>
        <p></p>
      </div>
      <div className='hidden lg:block col-span-3'></div>
    </div>
  );
}
