import data from "@/app/assets/data/data.json";
import DashboardItem from "@/app/ui/dashboard/DashboardItem";

export default function Home() {
  const formatDate = (date: string) => {
    const formatedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
    return formatedDate;
  };

  return (
    <div className='lg:grid lg:grid-cols-12 h-full'>
      <div className='flex flex-col w-screen lg:w-full lg:h-full py-5 px-4 gap-4 col-span-3 lg:pl-8 lg:pr-4 lg:pt-5 lg:border-r border-neutral-200'>
        <h2 className='text-preset-1 lg:hidden'>All Notes</h2>
        <button className='hidden lg:block rounded-lg text-preset-4 bg-blue-500 py-3 w-full text-white'>
          + Create New Note
        </button>
        <div className='flex flex-col gap-1 h-full overflow-y-scroll'>
          {data.notes.map((note) => (
            <DashboardItem
              key={note.title}
              title={note.title}
              tags={note.tags}
              lastEdited={formatDate(note.lastEdited)}
            />
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
