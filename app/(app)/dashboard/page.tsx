import data from "@/app/assets/data/data.json";
import DashboardItem from "@/app/ui/dashboard/DashboardItem";

export default function Home() {
  return (
    <div className='flex flex-col w-screen py-5 px-4 gap-4'>
      <h2 className='text-preset-1'>All Notes</h2>
      <div className='flex flex-col gap-3'>
        {data.notes.map((note) => (
          <DashboardItem
            key={note.title}
            title={note.title}
            tags={note.tags}
            lastEdited={note.lastEdited}
          />
        ))}
      </div>
    </div>
  );
}
