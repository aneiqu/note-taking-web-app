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
    <>
      {/* Medium screen size padding to prevent overlaping elements */}
      <div className='flex flex-col p-2 gap-3 nth-last-2:pb-11'>
        <h3 className='text-preset-3'>{title}</h3>
        <div className='flex gap-1 flex-wrap'>{tagsFormatted}</div>
        <p className='text-neutral-700'>{lastEdited}</p>
      </div>
      <hr className='text-neutral-200 last:hidden' />
    </>
  );
}
