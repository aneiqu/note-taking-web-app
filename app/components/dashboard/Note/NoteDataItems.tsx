import ClockIcon from "@/app/assets/icons/icon-clock.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";
import { formatDate } from "@/utils/formatDate";

interface DataProps {
  tags: string[];
  date: string;
}

interface ContainerProps {
  title: string;
  data: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  greyedOut: boolean;
  variant: "stroke" | "fill";
}

function DataItemContainer({ title, data, Icon, greyedOut, variant }: ContainerProps) {
  return (
    <div className='grid grid-cols-8 text-preset-6 lg:text-preset-5 items-center'>
      <div className='flex col-span-3 md:col-span-1 lg:col-span-2 gap-1.5 items-center'>
        <Icon
          className={`${variant === "fill" ? "**:fill-neutral-700" : "**:stroke-neutral-700"}`}
        />
        <p className='text-neutral-600'>{title}</p>
      </div>
      <p className={`col-span-5 ${greyedOut ? "text-neutral-700" : "text-neutral-950"}`}>{data}</p>
    </div>
  );
}

export default function NoteDataItems({ tags, date }: DataProps) {
  return (
    <>
      <DataItemContainer
        title='Tags'
        data={tags.join(", ")}
        Icon={TagIcon}
        greyedOut={false}
        variant='stroke'
      />
      <DataItemContainer
        title='Last edited'
        data={formatDate(date)}
        Icon={ClockIcon}
        greyedOut={true}
        variant='fill'
      />
    </>
  );
}
