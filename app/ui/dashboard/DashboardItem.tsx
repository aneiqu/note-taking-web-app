interface DashboardItemProps {
  title: string;
  tags: string[];
  lastEdited: string;
}

export default function DashboardItem({ title, tags, lastEdited }: DashboardItemProps) {
  const tagsFormatted = tags.map((tag) => (
    <p key={tag} className='text-preset-6 px-1.5 py-0.5 bg-neutral-200 rounded-sm'>
      {tag}
    </p>
  ));
  return (
    <div className='flex flex-col p-2 gap-3'>
      <h3 className='text-preset-3'>{title}</h3>
      <div className='flex gap-1'>{tagsFormatted}</div>
      <p className='text-neutral-700'>{lastEdited}</p>
    </div>
  );
}
