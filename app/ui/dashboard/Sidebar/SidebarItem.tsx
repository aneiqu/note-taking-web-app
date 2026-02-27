interface ItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  label: string;
}

function ItemContainer({ Icon, label, isActive }: ItemProps) {
  return (
    <div className='flex gap-2 items-center py-2.5 px-3 bg-neutral-100 rounded-lg '>
      <Icon />
      {label}
    </div>
  );
}
