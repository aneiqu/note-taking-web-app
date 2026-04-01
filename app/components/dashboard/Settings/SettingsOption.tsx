import { SVGProps } from "react";

interface OptionTypes {
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  optionTitle: string;
  optionDescription: string;
  radioName: string;
}

export default function SettingsOption({
  Icon,
  optionTitle,
  optionDescription,
  radioName,
}: OptionTypes) {
  return (
    <label className='flex p-4 items-center gap-4 bg-neutral-100 rounded-xl border border-neutral-200 cursor-pointer'>
      <div className='p-2 bg-white rounded-xl border border-neutral-200'>
        <Icon />
      </div>
      <div>
        <h3 className='text-preset-4'>{optionTitle}</h3>
        <p className='text-preset-6'>{optionDescription}</p>
      </div>
      <input
        type='radio'
        name={radioName}
        className='appearance-none w-3 h-3 border-2 border-neutral-200 rounded-full bg-white focus:border-blue-500 focus:border-4 duration-200 ml-auto'
      />
    </label>
  );
}
