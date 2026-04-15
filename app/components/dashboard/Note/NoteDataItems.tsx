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
  editable: boolean;
  label?: string;
}

function DataItemContainer({
  title,
  data,
  Icon,
  greyedOut,
  variant,
  editable,
  label,
}: ContainerProps) {
  return (
    <div className='grid grid-cols-8 text-preset-6 lg:text-preset-5 items-center'>
      <div className='flex col-span-3 md:col-span-1 lg:col-span-2 gap-1.5 items-center'>
        <Icon
          className={`${variant === "fill" ? "**:fill-neutral-700 dark:**:fill-neutral-300" : "**:stroke-neutral-700 dark:**:stroke-neutral-300"}`}
        />
        <p className='text-neutral-600 dark:text-neutral-300'>{title}</p>
      </div>
      <input
        required={editable}
        name='noteSpecs'
        aria-label={label}
        disabled={!editable}
        defaultValue={data}
        pattern={editable ? ".*[^,\\s].*" : undefined}
        title={editable ? "Add at least one tag. Use commas to separate tags." : undefined}
        className={`col-span-5 ${greyedOut ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-950 dark:text-white"}`}
      ></input>
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
        editable={true}
        label='Note tags'
      />
      <DataItemContainer
        title='Last edited'
        data={formatDate(date)}
        Icon={ClockIcon}
        greyedOut={true}
        variant='fill'
        editable={false}
      />
    </>
  );
}
